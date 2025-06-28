import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { collections, serverTimestamp } from '../firebase';
import { GraphQLContext } from '../../types';

// Custom scalar types
const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  serialize: (value: any) => value instanceof Date ? value.toISOString() : value,
  parseValue: (value: any) => new Date(value),
  parseLiteral: (ast) => ast.kind === Kind.STRING ? new Date(ast.value) : null,
});

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  serialize: (value: any) => value instanceof Date ? value.toISOString().split('T')[0] : value,
  parseValue: (value: any) => new Date(value),
  parseLiteral: (ast) => ast.kind === Kind.STRING ? new Date(ast.value) : null,
});

export const resolvers = {
  DateTime: DateTimeScalar,
  Date: DateScalar,

  Query: {
    me: async (_: any, __: any, { user }: GraphQLContext) => {
      if (!user) throw new Error('Authentication required');
      
      const userDoc = await collections.users().doc(user.id).get();
      
      if (!userDoc.exists) {
        // Create user if doesn't exist
        const userData = {
          id: user.id,
          email: user.email,
          createdAt: serverTimestamp(),
        };
        await collections.users().doc(user.id).set(userData);
        return userData;
      }
      
      return { id: userDoc.id, ...userDoc.data() };
    },

    healthRecords: async (_: any, { limit = 50 }: any, { user }: GraphQLContext) => {
      if (!user) throw new Error('Authentication required');
      
      const snapshot = await collections.healthRecords(user.id)
        .orderBy('recordedAt', 'desc')
        .limit(limit)
        .get();
        
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  },

  Mutation: {
    updateProfile: async (_: any, input: any, { user }: GraphQLContext) => {
      if (!user) throw new Error('Authentication required');
      
      const updateData = {
        ...input,
        updatedAt: serverTimestamp(),
      };
      
      await collections.users().doc(user.id).update(updateData);
      
      const doc = await collections.users().doc(user.id).get();
      return { id: doc.id, ...doc.data() };
    },

    addHealthRecord: async (_: any, { input }: any, { user }: GraphQLContext) => {
      if (!user) throw new Error('Authentication required');
      
      const recordData = {
        ...input,
        recordedAt: input.recordedAt || serverTimestamp(),
        createdAt: serverTimestamp(),
      };
      
      const docRef = await collections.healthRecords(user.id).add(recordData);
      const doc = await docRef.get();
      
      return { id: doc.id, ...doc.data() };
    },
  },
};
