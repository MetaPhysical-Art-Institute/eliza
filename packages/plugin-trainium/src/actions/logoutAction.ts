// src/actions/logoutAction.ts

import {
    Action,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
    elizaLogger,
  } from "@elizaos/core";
  import { trainiumProvider } from "../providers/trainiumProvider";
  
  export const logoutAction: Action = {
    name: "LOGOUT",
    description: "Log out the current user from Trainium and clear the JWT token",
    similes: ["auth logout", "user logout", "log out"],
    validate: async (_runtime: IAgentRuntime) => true, // no special validation needed
    handler: async (
      runtime: IAgentRuntime,
      _message: Memory,
      state: State,
      _options: any,
      callback: HandlerCallback
    ) => {
      try {
        const response = await trainiumProvider.logout();
        callback(
          {
            text: `Logged out successfully. Response:\n${JSON.stringify(response, null, 2)}`,
          },
          []
        );
      } catch (error) {
        elizaLogger.error("Error in logoutAction:", error);
        callback({ text: "Failed to log out. Please check the logs." }, []);
      }
    },
    examples: [
      [
        {
          user: "{{user1}}",
          content: { text: "Log me out" },
        },
        {
          user: "{{agentName}}",
          content: { text: "You have been logged out successfully." },
        },
      ],
    ],
  };
  