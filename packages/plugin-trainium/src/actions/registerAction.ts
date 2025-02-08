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
import { RegisterSchema, isRegisterContent } from "../trainiumTypes";
import { registerTemplate } from "../trainiumTemplates";
import { trainiumProvider } from "../providers/trainiumProvider";

export const registerAction: Action = {
  name: "REGISTER",
  description: "Register a new user in the Trainium system",
  similes: ["auth register", "user signup"],
  validate: async (_runtime: IAgentRuntime) => true,
  handler: async (
    runtime: IAgentRuntime,
    _message: Memory,
    state: State,
    _options: any,
    callback: HandlerCallback
  ) => {
    try {
      const context = composeContext({ state, template: registerTemplate });
      const registerDetails = await generateObject({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
        schema: RegisterSchema,
      });
      if (!isRegisterContent(registerDetails.object)) {
        callback({ text: "Invalid registration details provided." }, []);
        return;
      }
      const response = await trainiumProvider.register(registerDetails.object);
      callback(
        {
          text: `User registered successfully:\n${JSON.stringify(response, null, 2)}`,
        },
        []
      );
    } catch (error) {
      elizaLogger.error("Error in registerAction:", error);
      callback({ text: "Failed to register user. Please check the logs." }, []);
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Register a new user with username 'newuser' and password 'password123'",
        },
      },
      {
        user: "{{agentName}}",
        content: { text: "User registered successfully." },
      },
    ],
  ],
};
