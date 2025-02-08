import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
  elizaLogger,
} from "@elizaos/core";
import { trainiumProvider } from "../providers/trainiumProvider";

export const getWeightsAction: Action = {
  name: "GET_WEIGHTS",
  description: "Retrieve all logged weight entries for the authenticated user",
  similes: ["weight history", "get weights"],
  validate: async (_runtime: IAgentRuntime) => true,
  handler: async (
    runtime: IAgentRuntime,
    _message: Memory,
    _state: State,
    _options: any,
    callback: HandlerCallback
  ) => {
    try {
      const response = await trainiumProvider.getWeights();
      callback(
        { text: `Weight history retrieved:\n${JSON.stringify(response, null, 2)}` },
        []
      );
    } catch (error) {
      elizaLogger.error("Error in getWeightsAction:", error);
      callback({ text: "Failed to retrieve weight history." }, []);
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Show me my weight logs" },
      },
      {
        user: "{{agentName}}",
        content: { text: "Your weight logs are: [...]" },
      },
    ],
  ],
};
