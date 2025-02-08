import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
  elizaLogger,
} from "@elizaos/core";
import { trainiumProvider } from "../providers/trainiumProvider";

/**
 * Helper function to extract a property from the conversation context.
 * It checks both message.content and state.
 */
function extractInput(key: string, message: Memory, state: State): any | undefined {
  if (message.content && message.content[key] !== undefined) {
    return message.content[key];
  }
  if (state && state[key] !== undefined) {
    return state[key];
  }
  return undefined;
}

export const completeWorkoutAction: Action = {
  name: "COMPLETE_WORKOUT",
  description: "Mark your current workout as complete, log the details, and record the end time.",
  similes: ["complete workout", "finish workout"],
  validate: async (_runtime: IAgentRuntime) => true,
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: any,
    callback: HandlerCallback
  ) => {
    try {
      // First, check if day_index is already provided in content/state
      let dayIndex = extractInput("day_index", message, state);

      // If not found, try to extract it from the natural language message text
      if (dayIndex === undefined && message.content?.text) {
        const text = message.content.text;
        // Use regex to search for a pattern like "day 1"
        const dayMatch = text.match(/day\s*(\d+)/i);
        if (dayMatch) {
          dayIndex = parseInt(dayMatch[1]);
          // Store in state for future reference
          state.day_index = dayIndex;
        }
      }

      // Validate day index
      if (dayIndex === undefined) {
        callback({ text: "I didn't catch which day your workout is for. Could you please provide the day index?" }, []);
        return;
      }
      if (isNaN(dayIndex) || dayIndex < 1 || dayIndex > 7) {
        callback({ text: "Please provide a valid day number between 1 and 7." }, []);
        return;
      }

      // Extract exercise details
      const exercises = extractInput("exercises", message, state);
      if (!exercises) {
        callback({ text: "Please provide the exercise details to complete your workout." }, []);
        return;
      }

      // Complete the workout
      const response = await trainiumProvider.completeWorkout({
        day_index: dayIndex,
        exercises,
      });

      callback({
        text: `Workout completed successfully!
Start Time: ${response.start_time}
End Time: ${response.end_time}
Total Lbs: ${response.total_lbs}
${response.new_achievements && response.new_achievements.length ? "New Achievements: " + JSON.stringify(response.new_achievements, null, 2) : ""}`,
      }, []);
    } catch (error) {
      elizaLogger.error("Error in completeWorkoutAction:", error);
      callback({ text: "Failed to complete workout." }, []);
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "I finished my workout for day 1 with 4 sets of bench press at 125 lbs.",
          day_index: 1,
          exercises: [
            { name: "Barbell Bench Press", sets: 4, reps: "8-10", recommended_weight_lbs: 125, completed: true }
          ]
        },
      },
      {
        user: "{{agentName}}",
        content: { text: "Workout completed successfully! Your workout started at ... and ended at ..." },
      },
    ],
  ],
};
