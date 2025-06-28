import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime
  scalar Date

  type Query {
    hello: String
    me: User
    healthRecord(id: ID!): HealthRecord
    healthSummary: HealthSummary
    generateHealthInsights: [HealthInsight!]!
  }

  type Mutation {
    updateProfile(fullName: String, dateOfBirth: Date, gender: Gender, heightCm: Int): User!
    addHealthRecord(input: HealthRecordInput!): HealthRecord!
    updateHealthRecord(id: ID!, input: HealthRecordInput!): HealthRecord!
    deleteHealthRecord(id: ID!): Boolean!
    markInsightAsRead(id: ID!): HealthInsight!
  }

  type User {
    id: ID!
    email: String!
    fullName: String
    dateOfBirth: Date
    gender: Gender
    heightCm: Int
    createdAt: DateTime!
    healthRecords(limit: Int, type: HealthRecordType): [HealthRecord!]!
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
    TEMPERATURE
    MEDICATION
  }

  type HealthSummary {
    totalRecords: Int!
    recentTrends: [TrendData!]!
    lastRecordedAt: DateTime
    avgHeartRate: Float
    avgBloodPressure: String
    latestWeight: Float
  }

  type TrendData {
    recordType: HealthRecordType!
    trend: String!
    changePercentage: Float
    period: String!
  }

  type HealthInsight {
    id: ID!
    insightType: InsightType!
    title: String!
    description: String!
    confidenceScore: Float
    isRead: Boolean!
    createdAt: DateTime!
  }

  enum InsightType {
    TREND_ANALYSIS
    RECOMMENDATION
    RISK_ALERT
    ACHIEVEMENT
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
