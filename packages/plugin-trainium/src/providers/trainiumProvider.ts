// src/providers/trainiumProvider.ts

import { Provider, IAgentRuntime, Memory, State, elizaLogger } from "@elizaos/core";
import fetch from "node-fetch";
import { LogWorkoutContent, LogMacroContent } from "../trainiumTypes";

// Base URL for your API. Adjust as needed.
const TRAINIUM_API_BASE = "https://workouts-1.onrender.com";

// Variable to store the JWT token returned on login.
let jwtToken: string | null = null;

// Helper function to construct Authorization headers with JWT.
function getAuthHeaders(): { [key: string]: string } {
  if (!jwtToken) {
    throw new Error("JWT token not available. Please log in first.");
  }
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${jwtToken}`,
  };
}

export const trainiumProvider: Provider & {
  // Authentication endpoints
  login: (loginData: any) => Promise<any>;
  register: (registerData: any) => Promise<any>;
  logout: () => Promise<any>;

  // User endpoints  
  getUserProfile: () => Promise<any>;
  updateUserProfile: (updateData: any) => Promise<any>;

  // Workout/Macro/Weight endpoints
  logWorkout: (data: LogWorkoutContent) => Promise<any>;
  logMacros: (data: LogMacroContent) => Promise<any>;
  logWeight: (weightData: any) => Promise<any>;
  startWorkout: (data: { day_index: number }) => Promise<any>;
  completeWorkout: (data: any) => Promise<any>;

  // History endpoints
  getWorkouts: () => Promise<any>;
  getMacros: () => Promise<any>;
  getWeights: () => Promise<any>;

  // Dashboard, Analytics, Calendar, and Recent Performance endpoints
  getDashboard: () => Promise<any>;
  getAnalytics: () => Promise<any>;
  getCalendar: () => Promise<any>;
  getRecentPerformance: () => Promise<any>;

  // Achievement endpoints
  updateAchievements: () => Promise<any>;
  getAchievements: () => Promise<any>;

  // Weekly Plan endpoints
  getWeeklyPlan: () => Promise<any>;
  updateWeeklyPlan: (data: any) => Promise<any>;
  resetWeeklyPlan: () => Promise<any>;
} = {
  async get(runtime: IAgentRuntime, message: Memory, state: State) {
    elizaLogger.log("trainiumProvider: 'get' method invoked (not used here).");
  },

  // ---------------------------
  // Authentication Methods
  // ---------------------------
  async login(loginData: any): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from login API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      jwtToken = result.token; // Store the token for future requests
      return result;
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.login:", error);
      throw error;
    }
  },

  async register(registerData: any): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from register API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.register:", error);
      throw error;
    }
  },

  async logout(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/logout`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from logout API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      jwtToken = null; // Clear the token on logout
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.logout:", error);
      throw error;
    }
  },

  // ---------------------------
  // User Methods
  // ---------------------------
  async getUserProfile(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/user/profile`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from getUserProfile API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.getUserProfile:", error);
      throw error;
    }
  },

  async updateUserProfile(updateData: any): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/user/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from updateUserProfile API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.updateUserProfile:", error);
      throw error;
    }
  },

  // ---------------------------
  // Workout/Macro/Weight Methods
  // ---------------------------
  async logWorkout(data: LogWorkoutContent): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/workout/log`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from logWorkout API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      elizaLogger.log("API returned JSON (logWorkout):", json);
      return json;
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.logWorkout:", error);
      throw error;
    }
  },

  async logMacros(data: LogMacroContent): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/macro`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from logMacros API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.logMacros:", error);
      throw error;
    }
  },

  async logWeight(weightData: any): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/weight/log`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(weightData),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from logWeight API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.logWeight:", error);
      throw error;
    }
  },

  async startWorkout(data: { day_index: number }): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/workout/start`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from startWorkout API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.startWorkout:", error);
      throw error;
    }
  },

  async completeWorkout(data: any): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/workout/complete`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from completeWorkout API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.completeWorkout:", error);
      throw error;
    }
  },

  // ---------------------------
  // History Methods
  // ---------------------------
  async getWorkouts(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/user/workouts`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from getWorkouts API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.getWorkouts:", error);
      throw error;
    }
  },

  async getMacros(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/user/macros`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from getMacros API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.getMacros:", error);
      throw error;
    }
  },

  async getWeights(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/user/weights`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from getWeights API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.getWeights:", error);
      throw error;
    }
  },

  // ---------------------------
  // Dashboard, Analytics, Calendar, and Recent Performance
  // ---------------------------
  async getDashboard(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/dashboard`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from getDashboard API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.getDashboard:", error);
      throw error;
    }
  },

  async getAnalytics(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/analytics`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from getAnalytics API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.getAnalytics:", error);
      throw error;
    }
  },

  async getCalendar(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/calendar`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from getCalendar API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.getCalendar:", error);
      throw error;
    }
  },

  async getRecentPerformance(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/user/recent_performance`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from getRecentPerformance API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.getRecentPerformance:", error);
      throw error;
    }
  },

  // ---------------------------
  // Achievement Methods
  // ---------------------------
  async updateAchievements(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/achievements/update`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from updateAchievements API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.updateAchievements:", error);
      throw error;
    }
  },

  async getAchievements(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/achievements`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from getAchievements API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.getAchievements:", error);
      throw error;
    }
  },

  // ---------------------------
  // Weekly Plan Methods
  // ---------------------------
  async getWeeklyPlan(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/weekly_plan`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from getWeeklyPlan API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.getWeeklyPlan:", error);
      throw error;
    }
  },

  async updateWeeklyPlan(data: any): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/weekly_plan`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from updateWeeklyPlan API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.updateWeeklyPlan:", error);
      throw error;
    }
  },

  async resetWeeklyPlan(): Promise<any> {
    try {
      const response = await fetch(`${TRAINIUM_API_BASE}/api/weekly_plan/reset`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const text = await response.text();
        elizaLogger.error("Non-OK response from resetWeeklyPlan API:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      elizaLogger.error("Error in trainiumProvider.resetWeeklyPlan:", error);
      throw error;
    }
  },
};
