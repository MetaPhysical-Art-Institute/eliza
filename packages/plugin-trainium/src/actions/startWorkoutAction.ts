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
  function extractInput(
    key: string,
    message: Memory,
    state: State
  ): any | undefined {
    // Try to get from message.content first
    if (message.content && message.content[key] !== undefined) {
      return message.content[key];
    }
    // Fallback to state
    if (state && state[key] !== undefined) {
      return state[key];
    }
    return undefined;
  }
  
  export const startWorkoutAction: Action = {
    name: "START_WORKOUT",
    description: "Start a workout session and record its start time.",
    similes: ["start workout", "begin workout", "workout start"],
    validate: async (_runtime: IAgentRuntime) => true,
    handler: async (
      runtime: IAgentRuntime,
      message: Memory,
      state: State,
      _options: any,
      callback: HandlerCallback
    ) => {
      try {
        // First check if day_index is already provided in content/state
        let dayIndex = extractInput("day_index", message, state);
    
        // If not found, try to extract from message text
        if (dayIndex === undefined && message.content?.text) {
          const text = message.content.text;
          // Use regex to find "day X" pattern in message text
          const dayMatch = text.match(/day\s*(\d+)/i);
          if (dayMatch) {
            dayIndex = parseInt(dayMatch[1]);
            // Store in state for future reference
            state.day_index = dayIndex;
          }
        }
    
        if (dayIndex === undefined) {
          callback({ text: "I didn't catch which day you want to start. Could you please provide the day index?" }, []);
          return;
        }

        if (isNaN(dayIndex) || dayIndex < 1 || dayIndex > 7) {
          callback({ text: "Please provide a valid day number between 1 and 7." }, []);
          return;
        }
    
        const response = await trainiumProvider.startWorkout({ day_index: dayIndex });
        callback({ text: `Let's kick off your workout for day ${dayIndex}! 🚀 Your session started at ${new Date(response.start_time).toLocaleTimeString()}. Ready to get moving?` }, 
        [], // No additional memories
       
      );
      } catch (error) {
        elizaLogger.error("Error in startWorkoutAction:", error);
        callback({ text: "Failed to start workout. Please try again later." }, []);
      }
    },
    examples: [
      [
        { 
          user: "{{user1}}", 
          content: { 
            text: "Can we start a workout for day 1" // Natural language input
          } 
        },
        { 
          user: "{{agentName}}", 
          content: { 
            text: "Let's kick off your workout for day 1! 🚀 Your session started at 10:00 AM. Ready to get moving?" 
          } 
        },
      ],
    ],
  };
  