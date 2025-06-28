import { NextRequest } from 'next/server';

// Health app user interface
export interface HealthUser {
  id: string;
  email: string;
  fullName?: string;
  role?: 'patient' | 'provider' | 'admin';
  permissions?: string[];
}

// GraphQL context interface for health app
export interface GraphQLContext {
  user?: HealthUser;
  request: NextRequest;
  userAgent?: string;
  ip?: string;
  sessionId?: string;
  timestamp: string;
}

// Create GraphQL context with health app security considerations
export async function createContext(req: NextRequest): Promise<GraphQLContext> {
  const timestamp = new Date().toISOString();
  
  // Extract request metadata for health app audit logging
  const userAgent = req.headers.get('user-agent') || 'Unknown';
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'Unknown';
  
  // TODO: Add Clerk authentication integration
  // For now, return context with request metadata
  const context: GraphQLContext = {
    user: undefined, // Will be populated after Clerk integration
    request: req,
    userAgent,
    ip,
    sessionId: `session-${Date.now()}`, // Temporary session ID
    timestamp,
  };

  // Health app specific: Log context creation for audit trail
  if (process.env.NODE_ENV === 'development') {
    console.log('GraphQL Context Created:', {
      ip: context.ip,
      userAgent: context.userAgent,
      timestamp: context.timestamp,
      hasUser: !!context.user,
    });
  }

  return context;
}

// Helper function for authentication checks in resolvers
export function requireAuth(context: GraphQLContext): HealthUser {
  if (!context.user) {
    throw new Error('Authentication required. Please log in to access health data.');
  }
  return context.user;
}

// Helper function for role-based access control
export function requireRole(
  context: GraphQLContext, 
  allowedRoles: Array<'patient' | 'provider' | 'admin'>
): HealthUser {
  const user = requireAuth(context);
  
  if (!user.role || !allowedRoles.includes(user.role)) {
    throw new Error(`Access denied. Required role: ${allowedRoles.join(' or ')}`);
  }
  
  return user;
}
