import {
    Action,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
    elizaLogger,
  } from "@elizaos/core";
  import { trainiumProvider } from "../providers/trainiumProvider";
  
  export const updateAchievementsAction: Action = {
    name: "UPDATE_ACHIEVEMENTS",
    description: "Update achievements based on the user’s recent performance",
    similes: ["update achievements", "check achievements"],
    validate: async (_runtime: IAgentRuntime) => true,
    handler: async (
      runtime: IAgentRuntime,
      _message: Memory,
      _state: State,
      _options: any,
      callback: HandlerCallback
    ) => {
      try {
        const response = await trainiumProvider.updateAchievements();
        callback({
          text: `Achievements updated:\n${JSON.stringify(response, null, 2)}`,
        }, []);
      } catch (error) {
        elizaLogger.error("Error in updateAchievementsAction:", error);
        callback({ text: "Failed to update achievements." }, []);
      }
    },
    examples: [
      [
        { user: "{{user1}}", content: { text: "Update my achievements" } },
        { user: "{{agentName}}", content: { text: "Your achievements have been updated." } },
      ],
    ],
  };
  