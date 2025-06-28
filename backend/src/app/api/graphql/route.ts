import { ApolloServer } from '@apollo/server';
import { NextRequest, NextResponse } from 'next/server';
import type { GraphQLContext } from '../../../lib/graphql/context';

import { typeDefs } from '../../../lib/graphql/typeDefs';
import { resolvers } from '../../../lib/graphql/resolvers';
import { createContext } from '../../../lib/graphql/context';

// Create Apollo Server
const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
});

// Ensure server is started
let serverStarted = false;
async function ensureStarted() {
  if (!serverStarted) {
    await server.start();
    serverStarted = true;
  }
}

// Manual GraphQL handler for Next.js compatibility
async function handleGraphQL(request: NextRequest): Promise<NextResponse> {
  await ensureStarted();

  try {
    // Parse the request body
    const body = await request.text();
    let query, variables, operationName;

    // Handle different content types
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const parsed = JSON.parse(body);
      query = parsed.query;
      variables = parsed.variables;
      operationName = parsed.operationName;
    } else {
      // Handle GET requests with query parameters
      const url = new URL(request.url);
      query = url.searchParams.get('query');
      variables = url.searchParams.get('variables') 
        ? JSON.parse(url.searchParams.get('variables')!) 
        : undefined;
      operationName = url.searchParams.get('operationName');
    }

    // Create GraphQL context
    const contextValue = await createContext(request);

    // Execute GraphQL query
    const result = await server.executeOperation(
      {
        query: query!,
        variables,
        operationName,
      },
      {
        contextValue,
      }
    );

    // Return response
    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-HealthTracker-Version': '1.0.0',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('GraphQL Handler Error:', error);
    
    return NextResponse.json(
      { 
        errors: [{ 
          message: 'Internal server error',
          extensions: { 
            code: 'INTERNAL_ERROR',
            timestamp: new Date().toISOString(),
          }
        }] 
      },
      { status: 500 }
    );
  }
}

// Export Next.js route handlers
export async function GET(request: NextRequest): Promise<NextResponse> {
  return handleGraphQL(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return handleGraphQL(request);
}

export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
