import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
  elizaLogger,
} from "@elizaos/core";
import { trainiumProvider } from "../providers/trainiumProvider";

export const getWorkoutsAction: Action = {
  name: "GET_WORKOUTS",
  description: "Retrieve all logged workouts for the authenticated user",
  similes: ["workout history", "get workouts"],
  validate: async (_runtime: IAgentRuntime) => true,
  handler: async (
    runtime: IAgentRuntime,
    _message: Memory,
    _state: State,
    _options: any,
    callback: HandlerCallback
  ) => {
    try {
      const response = await trainiumProvider.getWorkouts();
      callback(
        { text: `Workouts retrieved:\n${JSON.stringify(response, null, 2)}` },
        []
      );
    } catch (error) {
      elizaLogger.error("Error in getWorkoutsAction:", error);
      callback({ text: "Failed to retrieve workouts." }, []);
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Show me my workouts" },
      },
      {
        user: "{{agentName}}",
        content: { text: "Here are your workouts: [...]" },
      },
    ],
  ],
};
