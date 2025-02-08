import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
  elizaLogger,
} from "@elizaos/core";
import { trainiumProvider } from "../providers/trainiumProvider";

export const getAllUsersAction: Action = {
  name: "GET_ALL_USERS",
  description: "Retrieve all users (admin endpoint)",
  similes: ["get users", "admin users"],
  validate: async (_runtime: IAgentRuntime) => true,
  handler: async (
    runtime: IAgentRuntime,
    _message: Memory,
    _state: State,
    _options: any,
    callback: HandlerCallback
  ) => {
    try {
      const response = await trainiumProvider.getAllUsers();
      callback(
        { text: `All users retrieved:\n${JSON.stringify(response, null, 2)}` },
        []
      );
    } catch (error) {
      elizaLogger.error("Error in getAllUsersAction:", error);
      callback({ text: "Failed to retrieve users." }, []);
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Show me all users" },
      },
      {
        user: "{{agentName}}",
        content: { text: "Users: [ { id: 1, username: 'user1' }, ... ]" },
      },
    ],
  ],
};
