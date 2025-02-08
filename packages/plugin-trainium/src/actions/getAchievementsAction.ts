import {
    Action,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
    elizaLogger,
  } from "@elizaos/core";
  import { trainiumProvider } from "../providers/trainiumProvider";
  
  export const getAchievementsAction: Action = {
    name: "GET_ACHIEVEMENTS",
    description: "Retrieve all earned achievements for the authenticated user",
    similes: ["achievements", "show achievements"],
    validate: async (_runtime: IAgentRuntime) => true,
    handler: async (
      runtime: IAgentRuntime,
      _message: Memory,
      _state: State,
      _options: any,
      callback: HandlerCallback
    ) => {
      try {
        const response = await trainiumProvider.getAchievements();
        callback({
          text: `Your achievements:\n${JSON.stringify(response, null, 2)}`,
        }, []);
      } catch (error) {
        elizaLogger.error("Error in getAchievementsAction:", error);
        callback({ text: "Failed to retrieve achievements." }, []);
      }
    },
    examples: [
      [
        { user: "{{user1}}", content: { text: "Show me my achievements" } },
        { user: "{{agentName}}", content: { text: "Here are your achievements: [...]" } },
      ],
    ],
  };
  