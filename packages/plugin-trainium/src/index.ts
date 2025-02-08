import { Plugin } from "@elizaos/core";
import { logWorkoutAction } from "./actions/logWorkoutAction";
import { logMacrosAction } from "./actions/logMacrosAction";
import { trainiumProvider } from "./providers/trainiumProvider";
import { getMacrosAction } from "./actions/getMacrosAction";

import { getUserProfileAction } from "./actions/getUserProfileAction";
import { getWeightsAction } from "./actions/getWeightAction";
import { getWorkoutsAction } from "./actions/getWorkoutsAction";
import { loginAction } from "./actions/loginAction";
import { logWeightAction } from "./actions/logWeightAction";
import { registerAction } from "./actions/registerAction";
import { updateUserProfileAction } from "./actions/updateUserProfileAction";
import { trainiumEvaluator } from "./evaluators/trainiumEvalutor";
import { completeWorkoutAction } from "./actions/completeWorkoutAction";
import { getAchievementsAction } from "./actions/getAchievementsAction";
import { getAllUsersAction } from "./actions/getAllUsersAction";
import { getDashboardAction } from "./actions/getDashboardAction";
import { getRecentPerformanceAction } from "./actions/getRecentPerformanceAction";
import { resetWeeklyPlanAction } from "./actions/resetWeeklyPlanAction";
import { startWorkoutAction } from "./actions/startWorkoutAction";
import { updateAchievementsAction } from "./actions/updateAchievementsAction";


// Log when the plugin is being loaded
console.log("Loading Trainium plugin...");

export const trainiumPlugin: Plugin = {
    name: "trainium",
    description: "Enables logging of workouts, macros, and health metrics via the Trainium API",
    actions: [logWorkoutAction, logMacrosAction, getMacrosAction,getUserProfileAction,getWeightsAction,getWorkoutsAction,loginAction,logWeightAction,registerAction,updateUserProfileAction,
        completeWorkoutAction, getAchievementsAction, getAllUsersAction, getDashboardAction, getRecentPerformanceAction, resetWeeklyPlanAction, startWorkoutAction, updateAchievementsAction
    ],
    providers: [trainiumProvider],
    evaluators: [trainiumEvaluator], // Add evaluators if you have any
    services: [],   // Add services if you have any
    clients: [],    // Add clients if you have any
};

// Log success message after the plugin is defined
console.log("Trainium plugin loaded successfully.");