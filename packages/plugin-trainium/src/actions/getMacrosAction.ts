import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
  elizaLogger,
} from "@elizaos/core";
import { trainiumProvider } from "../providers/trainiumProvider";

export const getMacrosAction: Action = {
  name: "GET_MACROS",
  description: "Retrieve all logged macros for the authenticated user",
  similes: ["macro history", "get macros"],
  validate: async (_runtime: IAgentRuntime) => true,
  handler: async (
    runtime: IAgentRuntime,
    _message: Memory,
    _state: State,
    _options: any,
    callback: HandlerCallback
  ) => {
    try {
      const response = await trainiumProvider.getMacros();
      callback(
        { text: `Macros retrieved:\n${JSON.stringify(response, null, 2)}` },
        []
      );
    } catch (error) {
      elizaLogger.error("Error in getMacrosAction:", error);
      callback({ text: "Failed to retrieve macros." }, []);
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Show me my macros" },
      },
      {
        user: "{{agentName}}",
        content: { text: "Here are your macros: [...]" },
      },
    ],
  ],
};
