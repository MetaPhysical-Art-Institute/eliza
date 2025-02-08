import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
  elizaLogger,
  composeContext,
  generateObject,
  ModelClass,
} from "@elizaos/core";
import { LogWeightSchema, isLogWeightContent } from "../trainiumTypes";
import { logWeightTemplate } from "../trainiumTemplates";
import { trainiumProvider } from "../providers/trainiumProvider";

export const logWeightAction: Action = {
  name: "LOG_WEIGHT",
  description: "Log a new weight entry to the Trainium system",
  similes: ["weight logger", "weight tracker"],
  validate: async (_runtime: IAgentRuntime) => true,
  handler: async (
    runtime: IAgentRuntime,
    _message: Memory,
    state: State,
    _options: any,
    callback: HandlerCallback
  ) => {
    try {
      const context = composeContext({
        state,
        template: logWeightTemplate,
      });
      const weightDetails = await generateObject({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
        schema: LogWeightSchema,
      });
      if (!isLogWeightContent(weightDetails.object)) {
        callback({ text: "Invalid weight details provided." }, []);
        return;
      }
      const response = await trainiumProvider.logWeight(weightDetails.object);
      callback(
        {
          text: `Weight logged successfully on Trainium:\n${JSON.stringify(response, null, 2)}`,
        },
        []
      );
    } catch (error) {
      elizaLogger.error("Error in logWeightAction:", error);
      callback({ text: "Failed to log weight. Please check the logs." }, []);
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Log my weight as 160 lbs" },
      },
      {
        user: "{{agentName}}",
        content: { text: "Weight logged successfully on Trainium." },
      },
    ],
  ],
};
