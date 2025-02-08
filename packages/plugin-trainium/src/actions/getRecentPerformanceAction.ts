import {
    Action,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
    elizaLogger,
  } from "@elizaos/core";
  import { trainiumProvider } from "../providers/trainiumProvider";
  
  export const getRecentPerformanceAction: Action = {
    name: "GET_RECENT_PERFORMANCE",
    description: "Retrieve recent workout performance data",
    similes: ["recent performance", "workout history", "performance data"],
    validate: async (_runtime: IAgentRuntime) => true,
    handler: async (
      runtime: IAgentRuntime,
      _message: Memory,
      _state: State,
      _options: any,
      callback: HandlerCallback
    ) => {
      try {
        const response = await trainiumProvider.getRecentPerformance();
        callback({
          text: `Recent performance data:\n${JSON.stringify(response, null, 2)}`,
        }, []);
      } catch (error) {
        elizaLogger.error("Error in getRecentPerformanceAction:", error);
        callback({ text: "Failed to retrieve recent performance data." }, []);
      }
    },
    examples: [
      [
        { user: "{{user1}}", content: { text: "Show me my recent performance data" } },
        { user: "{{agentName}}", content: { text: "Here is your recent performance: [...]" } },
      ],
    ],
  };
  