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
import { UpdateUserProfileSchema, isUpdateUserProfileContent } from "../trainiumTypes";
import { updateUserProfileTemplate } from "../trainiumTemplates";
import { trainiumProvider } from "../providers/trainiumProvider";

export const updateUserProfileAction: Action = {
  name: "UPDATE_USER_PROFILE",
  description: "Update the authenticated user's profile information",
  similes: ["update profile", "edit user info"],
  // (Optionally, remove this validate if you no longer store an API key in character settings.)
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
        template: updateUserProfileTemplate,
      });
      const updateDetails = await generateObject({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
        schema: UpdateUserProfileSchema,
      });
      if (!isUpdateUserProfileContent(updateDetails.object)) {
        callback({ text: "Invalid profile update details provided." }, []);
        return;
      }
      // Now call the provider without an API key argument.
      const response = await trainiumProvider.updateUserProfile(updateDetails.object);
      callback(
        {
          text: `Profile updated successfully:\n${JSON.stringify(response, null, 2)}`,
        },
        []
      );
    } catch (error) {
      elizaLogger.error("Error in updateUserProfileAction:", error);
      callback({ text: "Failed to update profile. Please check the logs." }, []);
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Update my profile: weight_lbs to 160, goal to 'bulk'" },
      },
      {
        user: "{{agentName}}",
        content: { text: "Profile updated successfully." },
      },
    ],
  ],
};
