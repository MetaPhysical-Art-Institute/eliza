import {
    Evaluator,
    IAgentRuntime,
    Memory,
    State,
    elizaLogger,
} from "@elizaos/core";

/**
 * Example Trainium evaluator that checks if the memory or message
 * contains references to "workout" or "macro" to mark it as "important."
 */
export const trainiumEvaluator: Evaluator = {
    alwaysRun: false,
    description: "Checks memory for references to 'workout' or 'macro' to see if it's relevant to Trainium plugin.",
    similes: ["trainium content checker", "health log evaluator"],

    examples: [
        {
            // Short context about what this example is for
            context: "User wants to log a workout or macros",
            
            // 'messages' must match the shape ElizaOS expects:
            messages: [
                
            ],
            outcome: "Should produce a higher score due to mention of workout logging.",
        },
    ],

    handler: async (runtime: IAgentRuntime, memory: Memory, _state: State) => {
        elizaLogger.log("Evaluating data in trainiumEvaluator...");

        // Make sure memory.content is a string
        const text = typeof memory.content === "string" ? memory.content : "";

        const matchWorkout = text.toLowerCase().includes("workout");
        const matchMacro = text.toLowerCase().includes("macro");

        if (matchWorkout || matchMacro) {
            elizaLogger.log("TrainiumEvaluator found references in memory.");
            return {
                score: 1,
                reason: "Memory references 'workout' or 'macro'.",
            };
        } else {
            return {
                score: 0,
                reason: "Memory does not reference workouts or macros.",
            };
        }
    },

    validate: async () => true,

    name: "trainiumEvaluator",
};
