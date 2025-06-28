import { NextRequest } from 'next/server';
import { getCurrentUser } from '../auth';
import { GraphQLContext } from '../../types';

export async function createContext({ req }: { req: NextRequest }): Promise<GraphQLContext> {
  try {
    const user = await getCurrentUser();
    return { user };
  } catch (error) {
    console.warn('Authentication failed:', error);
    return { user: null };
  }
}
