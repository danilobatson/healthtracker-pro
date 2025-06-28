import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime
  scalar Date

  type User {
    id: ID!
    email: String!
    fullName: String
    dateOfBirth: Date
    gender: Gender
    heightCm: Int
    createdAt: DateTime!
    updatedAt: DateTime
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
    PREFER_NOT_TO_SAY
  }

  type HealthRecord {
    id: ID!
    recordType: HealthRecordType!
    valueNumeric: Float
    valueText: String
    unit: String
    systolic: Int
    diastolic: Int
    notes: String
    recordedAt: DateTime!
    createdAt: DateTime!
  }

  enum HealthRecordType {
    BLOOD_PRESSURE
    HEART_RATE
    WEIGHT
    BLOOD_GLUCOSE
    SLEEP
    EXERCISE
  }

  type Query {
    me: User
    healthRecords(limit: Int): [HealthRecord!]!
  }

  type Mutation {
    updateProfile(
      fullName: String
      dateOfBirth: Date
      gender: Gender
      heightCm: Int
    ): User!
    
    addHealthRecord(input: HealthRecordInput!): HealthRecord!
  }

  input HealthRecordInput {
    recordType: HealthRecordType!
    valueNumeric: Float
    valueText: String
    unit: String
    systolic: Int
    diastolic: Int
    notes: String
    recordedAt: DateTime
  }
`;
