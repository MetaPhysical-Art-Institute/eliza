import { z } from "zod";

// ---------------------------
// Start Workout
// ---------------------------
export const StartWorkoutSchema = z.object({
  day_index: z.number().min(0, { message: "Day index must be a non-negative number" }),
});
export type StartWorkoutContent = z.infer<typeof StartWorkoutSchema>;
export function isStartWorkoutContent(obj: any): obj is StartWorkoutContent {
  return StartWorkoutSchema.safeParse(obj).success;
}

// ---------------------------
// Complete Workout
// ---------------------------
// Define the schema for each exercise in the workout.
export const WorkoutExerciseSchema = z.object({
  name: z.string(),
  sets: z.number().min(1, { message: "Sets must be at least 1" }),
  reps: z.string(), // You can refine this with a regex if needed.
  recommended_weight_lbs: z.number().min(0, { message: "Recommended weight must be non-negative" }),
  completed: z.boolean(),
});
export type WorkoutExerciseContent = z.infer<typeof WorkoutExerciseSchema>;

// Define the complete workout schema. It includes the day_index and an array of exercises.
export const CompleteWorkoutSchema = z.object({
  day_index: z.number().min(0, { message: "Day index must be a non-negative number" }),
  exercises: z.array(WorkoutExerciseSchema),
});
export type CompleteWorkoutContent = z.infer<typeof CompleteWorkoutSchema>;
export function isCompleteWorkoutContent(obj: any): obj is CompleteWorkoutContent {
  return CompleteWorkoutSchema.safeParse(obj).success;
}

// ---------------------------
// Log Workout
// ---------------------------
export const LogWorkoutSchema = z.object({
  exercise_name: z.string(),
  weight_used_lbs: z.number().min(0),
  sets_completed: z.number().min(1),
  reps_completed: z.number().min(1),
});
export type LogWorkoutContent = z.infer<typeof LogWorkoutSchema>;
export function isLogWorkoutContent(obj: any): obj is LogWorkoutContent {
  return LogWorkoutSchema.safeParse(obj).success;
}

// ---------------------------
// Log Macros
// ---------------------------
export const LogMacroSchema = z.object({
  // Make log_date optional so that if the user does not provide it,
  // the server can default to today's date.
  log_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in YYYY-MM-DD format",
    })
    .optional(),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fats: z.number().min(0),
});
export type LogMacroContent = z.infer<typeof LogMacroSchema>;
export function isLogMacroContent(obj: any): obj is LogMacroContent {
  return LogMacroSchema.safeParse(obj).success;
}

// ---------------------------
// Login
// ---------------------------
export const LoginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export type LoginContent = z.infer<typeof LoginSchema>;
export function isLoginContent(obj: any): obj is LoginContent {
  return LoginSchema.safeParse(obj).success;
}

// ---------------------------
// Register
// ---------------------------
export const RegisterSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export type RegisterContent = z.infer<typeof RegisterSchema>;
export function isRegisterContent(obj: any): obj is RegisterContent {
  return RegisterSchema.safeParse(obj).success;
}

// ---------------------------
// Update User Profile
// ---------------------------


export const UpdateUserProfileSchema = z.object({
  height_ft: z.number().optional(),
  weight_lbs: z.number().optional(),
  age: z.number().optional(),
  sex: z.enum(["M", "F", "O"]).optional(),
  goal: z.enum(["maintain", "bulk", "cut"]).optional(),
  theme: z.enum(["light", "dark"]).optional(),
  profile_pic_path: z.string().nullable().optional(), // allow null
  progress_pics: z.array(z.string()).optional(),
});

export type UpdateUserProfileContent = z.infer<typeof UpdateUserProfileSchema>;
export function isUpdateUserProfileContent(obj: any): obj is UpdateUserProfileContent {
  return UpdateUserProfileSchema.safeParse(obj).success;
}

// ---------------------------
// Log Weight
// ---------------------------
export const LogWeightSchema = z.object({
  weight_lbs: z.number().min(0, { message: "Weight must be a positive number" }),
});
export type LogWeightContent = z.infer<typeof LogWeightSchema>;
export function isLogWeightContent(obj: any): obj is LogWeightContent {
  return LogWeightSchema.safeParse(obj).success;
}

// ---------------------------
// Update Weekly Plan
// ---------------------------
export const UpdateWeeklyPlanSchema = z.object({
  week_start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "week_start must be in YYYY-MM-DD format" }),
  plan: z.array(
    z.object({
      day_index: z.number().min(0, { message: "day_index must be a non-negative number" }),
      start_time: z.string().optional(),
      end_time: z.string().optional(),
      completed: z.boolean().optional(),
    })
  ),
});
export type UpdateWeeklyPlanContent = z.infer<typeof UpdateWeeklyPlanSchema>;
export function isUpdateWeeklyPlanContent(obj: any): obj is UpdateWeeklyPlanContent {
  return UpdateWeeklyPlanSchema.safeParse(obj).success;
}
