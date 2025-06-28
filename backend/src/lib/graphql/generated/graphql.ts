export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

import { GraphQLContext } from '../context';

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  Date: Date;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  healthRecord?: Maybe<HealthRecord>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateProfile: User;
  addHealthRecord: HealthRecord;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
};

export type HealthRecord = {
  __typename?: 'HealthRecord';
  id: Scalars['ID'];
  recordType: HealthRecordType;
  valueNumeric?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['String']>;
  recordedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
};

export enum HealthRecordType {
  BloodPressure = 'BLOOD_PRESSURE',
  HeartRate = 'HEART_RATE',
  Weight = 'WEIGHT',
  BloodGlucose = 'BLOOD_GLUCOSE',
  Sleep = 'SLEEP',
  Exercise = 'EXERCISE'
}

export type HealthRecordInput = {
  recordType: HealthRecordType;
  valueNumeric?: InputMaybe<Scalars['Float']>;
  unit?: InputMaybe<Scalars['String']>;
  recordedAt?: InputMaybe<Scalars['DateTime']>;
};

export type QueryHealthRecordArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateProfileArgs = {
  fullName?: InputMaybe<Scalars['String']>;
};

export type MutationAddHealthRecordArgs = {
  input: HealthRecordInput;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  HealthRecord?: HealthRecordResolvers<ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext> = {
  me?: Resolver<Maybe<User>, {}, ContextType>;
  healthRecord?: Resolver<Maybe<HealthRecord>, QueryHealthRecordArgs, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext> = {
  updateProfile?: Resolver<User, MutationUpdateProfileArgs, ContextType>;
  addHealthRecord?: Resolver<HealthRecord, MutationAddHealthRecordArgs, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext> = {
  id?: Resolver<Scalars['ID'], {}, ContextType>;
  email?: Resolver<Scalars['String'], {}, ContextType>;
  fullName?: Resolver<Maybe<Scalars['String']>, {}, ContextType>;
  createdAt?: Resolver<Scalars['DateTime'], {}, ContextType>;
  __isTypeOf?: (obj: any, context: ContextType, info: any) => boolean | Promise<boolean>;
};

export type HealthRecordResolvers<ContextType = GraphQLContext> = {
  id?: Resolver<Scalars['ID'], {}, ContextType>;
  recordType?: Resolver<HealthRecordType, {}, ContextType>;
  valueNumeric?: Resolver<Maybe<Scalars['Float']>, {}, ContextType>;
  unit?: Resolver<Maybe<Scalars['String']>, {}, ContextType>;
  recordedAt?: Resolver<Scalars['DateTime'], {}, ContextType>;
  createdAt?: Resolver<Scalars['DateTime'], {}, ContextType>;
  __isTypeOf?: (obj: any, context: ContextType, info: any) => boolean | Promise<boolean>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: any,
) => Promise<TResult> | TResult;
