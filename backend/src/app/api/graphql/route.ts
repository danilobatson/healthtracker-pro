import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../../../lib/graphql/typeDefs';
import { resolvers } from '../../../lib/graphql/resolvers';
import { createContext } from '../../../lib/graphql/context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable GraphQL Playground in development
});

const handler = startServerAndCreateNextHandler(server, {
  context: createContext,
});

export { handler as GET, handler as POST };
