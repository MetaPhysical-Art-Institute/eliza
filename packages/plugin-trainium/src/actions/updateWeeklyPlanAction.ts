// src/actions/updateWeeklyPlanAction.ts

import {
    Action,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
    composeContext,
    generateObject,
    ModelClass,
    elizaLogger,
  } from "@elizaos/core";
  import { UpdateWeeklyPlanSchema, isUpdateWeeklyPlanContent } from "../trainiumTypes";
  import { weeklyPlanTemplate } from "../trainiumTemplates";
  import { trainiumProvider } from "../providers/trainiumProvider";
  
  export const updateWeeklyPlanAction: Action = {
    name: "UPDATE_WEEKLY_PLAN",
    description: "Update the current weekly plan in Trainium with new data.",
    similes: ["update weekly plan", "modify weekly plan", "change my plan"],
    validate: async (_runtime: IAgentRuntime) => true,
    handler: async (
      runtime: IAgentRuntime,
      _message: Memory,
      state: State,
      _options: any,
      callback: HandlerCallback
    ) => {
      try {
        const context = composeContext({ state, template: weeklyPlanTemplate });
        const weeklyPlanDetails = await generateObject({
          runtime,
          context,
          modelClass: ModelClass.SMALL,
          schema: UpdateWeeklyPlanSchema,
        });
        if (!isUpdateWeeklyPlanContent(weeklyPlanDetails.object)) {
          callback({ text: "Invalid weekly plan details provided." }, []);
          return;
        }
        const response = await trainiumProvider.updateWeeklyPlan(weeklyPlanDetails.object);
        callback(
          {
            text: `Weekly plan updated successfully:\n${JSON.stringify(response, null, 2)}`,
          },
          []
        );
      } catch (error) {
        elizaLogger.error("Error in updateWeeklyPlanAction:", error);
        callback({ text: "Failed to update weekly plan. Please check the logs." }, []);
      }
    },
    examples: [
      [
        {
          user: "{{user1}}",
          content: { text: "Update my weekly plan with new exercise details." },
        },
        {
          user: "{{agentName}}",
          content: { text: "Your weekly plan has been updated successfully." },
        },
      ],
    ],
  };
  