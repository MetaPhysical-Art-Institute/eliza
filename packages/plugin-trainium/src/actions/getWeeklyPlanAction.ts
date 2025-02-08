// src/actions/getWeeklyPlanAction.ts

import {
    Action,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
    elizaLogger,
  } from "@elizaos/core";
  import { trainiumProvider } from "../providers/trainiumProvider";
  
  export const getWeeklyPlanAction: Action = {
    name: "GET_WEEKLY_PLAN",
    description: "Retrieve the current weekly plan from Trainium.",
    similes: ["weekly plan", "get weekly plan", "show my plan"],
    validate: async (_runtime: IAgentRuntime) => true, // no extra validation required
    handler: async (
      runtime: IAgentRuntime,
      _message: Memory,
      state: State,
      _options: any,
      callback: HandlerCallback
    ) => {
      try {
        const response = await trainiumProvider.getWeeklyPlan();
        callback(
          {
            text: `Weekly plan retrieved successfully:\n${JSON.stringify(response, null, 2)}`,
          },
          []
        );
      } catch (error) {
        elizaLogger.error("Error in getWeeklyPlanAction:", error);
        callback({ text: "Failed to retrieve weekly plan. Please check the logs." }, []);
      }
    },
    examples: [
      [
        {
          user: "{{user1}}",
          content: { text: "Show me my weekly plan" },
        },
        {
          user: "{{agentName}}",
          content: { text: "Here is your weekly plan: <plan details>" },
        },
      ],
    ],
  };
  