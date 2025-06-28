// Main AI service exports

import { GeminiHealthAnalyzer, geminiHealthAnalyzer } from './gemini';

// Re-export the class and instance
export { GeminiHealthAnalyzer, geminiHealthAnalyzer };

// AI service interface for future extensibility
export interface AIHealthService {
  generateHealthInsights(
    healthRecords: any[],
    userProfile: any
  ): Promise<any[]>;
  
  generateHealthRecommendation(
    recordType: string,
    recentValues: number[],
    target?: number
  ): Promise<string>;
}

// Default AI service (currently Gemini)
export const aiHealthService = geminiHealthAnalyzer;
