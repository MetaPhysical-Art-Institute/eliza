import {
    Action,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
    elizaLogger,
  } from "@elizaos/core";
  import { trainiumProvider } from "../providers/trainiumProvider";
  
  export const resetWeeklyPlanAction: Action = {
    name: "RESET_WEEKLY_PLAN",
    description: "Reset the current weekly workout plan",
    similes: ["reset weekly plan", "new workout plan"],
    validate: async (_runtime: IAgentRuntime) => true,
    handler: async (
      runtime: IAgentRuntime,
      _message: Memory,
      _state: State,
      _options: any,
      callback: HandlerCallback
    ) => {
      try {
        const response = await trainiumProvider.resetWeeklyPlan();
        callback({
          text: `Weekly plan reset successfully:\n${JSON.stringify(response, null, 2)}`,
        }, []);
      } catch (error) {
        elizaLogger.error("Error in resetWeeklyPlanAction:", error);
        callback({ text: "Failed to reset weekly plan." }, []);
      }
    },
    examples: [
      [
        { user: "{{user1}}", content: { text: "Reset my weekly plan" } },
        { user: "{{agentName}}", content: { text: "Your weekly plan has been reset." } },
      ],
    ],
  };
  