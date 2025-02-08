// loginAction.ts
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
import { LoginSchema, isLoginContent } from "../trainiumTypes";
import { loginTemplate } from "../trainiumTemplates";
import { trainiumProvider } from "../providers/trainiumProvider";

export const loginAction: Action = {
  name: "LOGIN",
  description: "Log in a user to Trainium and receive a JWT token",
  similes: ["auth login", "user login"],
  validate: async (_runtime: IAgentRuntime) => true, // no API key needed
  handler: async (
    runtime: IAgentRuntime,
    _message: Memory,
    state: State,
    _options: any,
    callback: HandlerCallback
  ) => {
    try {
      const context = composeContext({ state, template: loginTemplate });
      const loginDetails = await generateObject({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
        schema: LoginSchema,
      });
      if (!isLoginContent(loginDetails.object)) {
        callback({ text: "Invalid login details provided." }, []);
        return;
      }
      // Log in using your provider and obtain the JWT token.
      const response = await trainiumProvider.login(loginDetails.object);
      
      // Instead of using postMessage, call your dashboard's external login API.
      try {
        // Adjust the URL to match your dashboard’s API endpoint.
        await fetch("http://localhost:3002/api/auth/external-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.token }),
        });
      } catch (apiError) {
        console.error("Error transferring login to dashboard:", apiError);
      }

      callback(
        {
          text: `Logged in successfully. JWT Token:\n${JSON.stringify(
            response,
            null,
            2
          )}`,
        },
        []
      );
    } catch (error) {
      elizaLogger.error("Error in loginAction:", error);
      callback({ text: "Failed to log in. Please check the logs." }, []);
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Log in with username 'user1' and password 'password123'",
        },
      },
      {
        user: "{{agentName}}",
        content: {
          text: "Logged in successfully. JWT: <token>",
        },
      },
    ],
  ],
};
