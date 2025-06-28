// Quick test file to verify Gemini integration works
// This file is for development testing only

import { geminiHealthAnalyzer } from './gemini';

export async function testGeminiConnection() {
  try {
    console.log('🧪 Testing Gemini connection...');
    
    // Test simple recommendation generation
    const recommendation = await geminiHealthAnalyzer.generateHealthRecommendation(
      'heart_rate',
      [72, 75, 73, 70, 74],
      70
    );
    
    console.log('✅ Gemini connection successful!');
    console.log('Sample recommendation:', recommendation);
    
    return true;
  } catch (error) {
    console.error('❌ Gemini connection failed:', error);
    return false;
  }
}

// Export for potential testing
export { geminiHealthAnalyzer };
