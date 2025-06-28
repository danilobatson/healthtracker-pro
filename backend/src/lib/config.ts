// Environment configuration and validation

import { z } from 'zod';

const envSchema = z.object({
  // Clerk authentication
  CLERK_SECRET_KEY: z.string().min(1, 'Clerk secret key is required'),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  
  // Firebase configuration
  FIREBASE_PROJECT_ID: z.string().min(1, 'Firebase project ID is required'),
  FIREBASE_PRIVATE_KEY: z.string().min(1, 'Firebase private key is required'),
  FIREBASE_CLIENT_EMAIL: z.string().email('Valid Firebase client email is required'),
  
  // Google Gemini configuration
  GOOGLE_GEMINI_API_KEY: z.string().min(1, 'Google Gemini API key is required'),
  
  // App configuration
  NEXTAUTH_SECRET: z.string().min(1, 'NextAuth secret is required'),
  NEXTAUTH_URL: z.string().url('Valid NextAuth URL is required'),
  
  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  console.error('❌ Invalid environment variables:', error);
  throw new Error('Invalid environment configuration');
}

export { env };

// Helper to check if we're in development
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
