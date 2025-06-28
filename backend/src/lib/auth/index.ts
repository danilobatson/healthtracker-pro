// Authentication helpers using Clerk

import { auth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export interface AuthUser {
  id: string;
  email: string;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return null;
    }

    // In a real app, you might want to get additional user info from Clerk
    // For now, we'll use the userId and mock an email
    return {
      id: userId,
      email: `user-${userId}@healthtracker.app`, // Temporary until we get real email
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
}

// Middleware helper for API routes
export async function withAuth<T>(
  handler: (user: AuthUser) => Promise<T>
): Promise<T> {
  const user = await requireAuth();
  return handler(user);
}
