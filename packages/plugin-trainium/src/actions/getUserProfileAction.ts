import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
  elizaLogger,
} from "@elizaos/core";
import { trainiumProvider } from "../providers/trainiumProvider";

export const getUserProfileAction: Action = {
  name: "GET_USER_PROFILE",
  description: "Retrieve the authenticated user's full profile",
  similes: ["get profile", "user profile"],
  validate: async (_runtime: IAgentRuntime) => true,
  handler: async (
    runtime: IAgentRuntime,
    _message: Memory,
    _state: State,
    _options: any,
    callback: HandlerCallback
  ) => {
    try {
      const response = await trainiumProvider.getUserProfile();
      callback(
        {
          text: `User profile retrieved:\n${JSON.stringify(response, null, 2)}`,
        },
        []
      );
    } catch (error) {
      elizaLogger.error("Error in getUserProfileAction:", error);
      callback({ text: "Failed to retrieve user profile." }, []);
    }
  },
  examples: [
    [
      { user: "{{user1}}", content: { text: "Show me my profile" } },
      {
        user: "{{agentName}}",
        content: { text: "Your profile is: { height_ft: 5.8, weight_lbs: 150, ... }" },
      },
    ],
  ],
};
