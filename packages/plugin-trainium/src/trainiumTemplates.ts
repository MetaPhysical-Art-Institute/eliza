// trainiumTemplates.ts

// ---------------------------
// Workout Logging Template
// ---------------------------
export const logWorkoutTemplate = `
Extract the following details to log a new workout in JSON format:
- exercise_name: string (e.g. "Barbell Bench Press")
- weight_used_lbs: number (e.g. 135)
- sets_completed: number (e.g. 3)
- reps_completed: number (e.g. 10)

Respond with valid JSON only, for example:

\`\`\`json
{
  "exercise_name": "Barbell Bench Press",
  "weight_used_lbs": 135,
  "sets_completed": 3,
  "reps_completed": 10
}
\`\`\`

{{recentMessages}}
`;

// ---------------------------
// Macro Logging Template
// ---------------------------
export const logMacroTemplate = `
Extract the following details to log macros/health data in JSON format:
- log_date: string in YYYY-MM-DD format (e.g. "2025-02-01")
- protein: number (e.g. 150)
- carbs: number (e.g. 200)
- fats: number (e.g. 70)

Respond with valid JSON only, for example:

\`\`\`json
{
  "log_date": "2025-02-01",
  "protein": 150,
  "carbs": 200,
  "fats": 70
}
\`\`\`

{{recentMessages}}
`;

// ---------------------------
// Login Template
// ---------------------------
export const loginTemplate = `
Extract the following details to log in in JSON format:
- username: string
- password: string

Respond with valid JSON only, for example:

\`\`\`json
{
  "username": "user1",
  "password": "password123"
}
\`\`\`

{{recentMessages}}
`;

// ---------------------------
// Registration Template
// ---------------------------
export const registerTemplate = `
Extract the following details to register a new user in JSON format:
- username: string
- password: string

Respond with valid JSON only, for example:

\`\`\`json
{
  "username": "newuser",
  "password": "password123"
}
\`\`\`

{{recentMessages}}
`;

// ---------------------------
// Update User Profile Template
// ---------------------------
export const updateUserProfileTemplate = `
Extract the following details to update your profile in JSON format.
You may include any of these fields (all are optional):
- height_ft: number (e.g. 5.9)
- weight_lbs: number (e.g. 160)
- age: number (e.g. 32)
- sex: string (one of "M", "F", "O")
- goal: string (one of "maintain", "bulk", "cut")
- theme: string (one of "light", "dark")
- profile_pic_path: string (e.g. "profile.jpg")
- progress_pics: array of strings (e.g. ["progress1.jpg", "progress2.jpg"])

Respond with valid JSON only, for example:

\`\`\`json
{
  "height_ft": 5.9,
  "weight_lbs": 160,
  "age": 32,
  "sex": "M",
  "goal": "bulk",
  "theme": "dark",
  "profile_pic_path": "profile.jpg",
  "progress_pics": ["progress1.jpg", "progress2.jpg"]
}
\`\`\`

{{recentMessages}}
`;

// ---------------------------
// Log Weight Template
// ---------------------------
export const logWeightTemplate = `
Extract the following detail to log your weight for today in JSON format:
- weight_lbs: number (e.g. 160)

Respond with valid JSON only, for example:

\`\`\`json
{
  "weight_lbs": 160
}
\`\`\`

{{recentMessages}}
`;

// ---------------------------
// Start Workout Template
// ---------------------------
export const startWorkoutTemplate = `
Extract the following detail to start a workout session in JSON format:
- day_index: number (e.g. 1)

Respond with valid JSON only, for example:

\`\`\`json
{
  "day_index": 1
}
\`\`\`

{{recentMessages}}
`;

// ---------------------------
// Complete Workout Template
// ---------------------------
export const completeWorkoutTemplate = `
Extract the following details to mark your workout as complete in JSON format:
- day_index: number (e.g. 1)
- exercises: array of objects, where each object has:
    - name: string (e.g. "Barbell Bench Press")
    - sets: number (e.g. 4)
    - reps: string (e.g. "8-10")
    - recommended_weight_lbs: number (e.g. 125)
    - completed: boolean (true if completed)
    
Respond with valid JSON only, for example:

\`\`\`json
{
  "day_index": 1,
  "exercises": [
    {
      "name": "Barbell Bench Press",
      "sets": 4,
      "reps": "8-10",
      "recommended_weight_lbs": 125,
      "completed": true
    },
    {
      "name": "Dumbbell Shoulder Press",
      "sets": 3,
      "reps": "10-12",
      "recommended_weight_lbs": 40,
      "completed": true
    }
  ]
}
\`\`\`

{{recentMessages}}
`;

// ---------------------------
// Weekly Plan Update Template
// ---------------------------
export const weeklyPlanTemplate = `
Extract the following details to update your weekly plan in JSON format:
- week_start: string in YYYY-MM-DD format (e.g. "2025-02-02")
- plan: an array of daily plan objects. Each daily plan object should include:
  - day_index: number (e.g. 1)
  - start_time: string in ISO format (optional)
  - end_time: string in ISO format (optional)
  - completed: boolean (true/false)

Respond with valid JSON only, for example:

\`\`\`json
{
  "week_start": "2025-02-02",
  "plan": [
    {
      "day_index": 1,
      "start_time": "2025-02-02T10:00:00Z",
      "end_time": "2025-02-02T11:00:00Z",
      "completed": true
    },
    {
      "day_index": 2,
      "completed": false
    }
  ]
}
\`\`\`

{{recentMessages}}
`;
