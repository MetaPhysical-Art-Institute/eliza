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
  import { LogMacroSchema, isLogMacroContent } from "../trainiumTypes";
  import { logMacroTemplate } from "../trainiumTemplates";
  import { trainiumProvider } from "../providers/trainiumProvider";
  
  export const logMacrosAction: Action = {
    name: "LOG_MACROS",
    description: "Log daily macros and health metrics to the Trainium system",
    similes: ["macro logger", "diet tracker"],
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
          template: logMacroTemplate,
        });
        const macroDetails = await generateObject({
          runtime,
          context,
          modelClass: ModelClass.SMALL,
          schema: LogMacroSchema,
        });
        if (!isLogMacroContent(macroDetails.object)) {
          callback({ text: "Invalid macro details provided." }, []);
          return;
        }
        const response = await trainiumProvider.logMacros(macroDetails.object);
        callback(
          {
            text: `Macros logged successfully on Trainium:\n${JSON.stringify(response, null, 2)}`,
          },
          []
        );
      } catch (error) {
        elizaLogger.error("Error in logMacrosAction:", error);
        callback({ text: "Failed to log macros. Please check the logs." }, []);
      }
    },
    examples: [
      [
        {
          user: "{{user1}}",
          content: {
            text: "Log today's macros with 150g protein, 200g carbs, 70g fats",
          },
        },
        {
          user: "{{agentName}}",
          content: {
            text: "Macros logged successfully on Trainium.",
          },
        },
      ],
    ],
  };
  