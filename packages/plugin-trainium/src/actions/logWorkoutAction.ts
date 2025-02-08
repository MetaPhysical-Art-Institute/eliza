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
import { LogWorkoutSchema, isLogWorkoutContent } from "../trainiumTypes";
import { logWorkoutTemplate } from "../trainiumTemplates";
import { trainiumProvider } from "../providers/trainiumProvider";

export const logWorkoutAction: Action = {
    name: "LOG_WORKOUT",
    description: "Log a new workout to the Trainium system",

    // "similes" is required by the Action interface
    similes: ["workout logger", "fitness tracker"],

    // Check if the plugin has the required API key stored
    validate: async (runtime: IAgentRuntime) => {
        return !!runtime.character.settings.secrets?.API_KEY;
    },
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        state: State,
        _options: any,
        callback: HandlerCallback
    ) => {
        try {
            // 1) Build a prompt context from recent conversation, using the logWorkoutTemplate
            const context = composeContext({
                state,
                template: logWorkoutTemplate,
            });

            // 2) Ask the LLM to produce a JSON object matching LogWorkoutSchema
            const workoutDetails = await generateObject({
                runtime,
                context,
                modelClass: ModelClass.SMALL,
                schema: LogWorkoutSchema,
            });

            // 3) Validate the result
            if (!isLogWorkoutContent(workoutDetails.object)) {
                callback({ text: "Invalid workout details provided." }, []);
                return;
            }

            // 4) Call the Trainium API provider to actually log the workout
            
            elizaLogger.log("Generated workout details:", workoutDetails.object);
            const response = await trainiumProvider.logWorkout(workoutDetails.object);

            // 5) Return a success message
            callback(
                {
                    text: `Workout logged successfully on Trainium:
${JSON.stringify(response, null, 2)}`,
                },
                []
            );
        } catch (error) {
            elizaLogger.error("Error in logWorkoutAction:", error);
            callback({ text: "Failed to log workout. Please check the logs." }, []);
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Log a workout with exercise 'Barbell Bench Press', 135 lbs, 3 sets, 10 reps",
                },
            },
            {
                user: "{{agentName}}",
                content: {
                    text: "Workout logged successfully on Trainium:\n{...}",
                },
            },
        ],
    ],
};
