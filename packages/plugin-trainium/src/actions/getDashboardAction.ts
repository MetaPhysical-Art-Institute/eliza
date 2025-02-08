import {
    Action,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
    elizaLogger,
  } from "@elizaos/core";
  import { trainiumProvider } from "../providers/trainiumProvider";
  
  export const getDashboardAction: Action = {
    name: "GET_DASHBOARD",
    description: "Retrieve dashboard data including user profile, weekly plan, and workout summary",
    similes: ["dashboard", "show dashboard"],
    validate: async (_runtime: IAgentRuntime) => true,
    handler: async (
      runtime: IAgentRuntime,
      _message: Memory,
      _state: State,
      _options: any,
      callback: HandlerCallback
    ) => {
      try {
        const response = await trainiumProvider.getDashboard();
        callback({
          text: `Dashboard data:\n${JSON.stringify(response, null, 2)}`,
        }, []);
      } catch (error) {
        elizaLogger.error("Error in getDashboardAction:", error);
        callback({ text: "Failed to retrieve dashboard data." }, []);
      }
    },
    examples: [
      [
        { user: "{{user1}}", content: { text: "Show me my dashboard" } },
        { user: "{{agentName}}", content: { text: "Here's your dashboard: [...]" } },
      ],
    ],
  };
  