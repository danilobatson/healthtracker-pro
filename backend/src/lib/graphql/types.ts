// Generated TypeScript types for HealthTracker Pro GraphQL Schema

export type Maybe<T> = T | null;
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  Date: string;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  heightCm?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  healthRecords: Array<HealthRecord>;
};

export type HealthRecord = {
  __typename?: 'HealthRecord';
  id: Scalars['ID'];
  recordType: HealthRecordType;
  valueNumeric?: Maybe<Scalars['Float']>;
  valueText?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  systolic?: Maybe<Scalars['Int']>;
  diastolic?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  recordedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
  PreferNotToSay = 'PREFER_NOT_TO_SAY'
}

export enum HealthRecordType {
  BloodPressure = 'BLOOD_PRESSURE',
  HeartRate = 'HEART_RATE',
  Weight = 'WEIGHT',
  BloodGlucose = 'BLOOD_GLUCOSE',
  Sleep = 'SLEEP',
  Exercise = 'EXERCISE',
  Temperature = 'TEMPERATURE',
  Medication = 'MEDICATION'
}

export enum InsightType {
  TrendAnalysis = 'TREND_ANALYSIS',
  Recommendation = 'RECOMMENDATION',
  RiskAlert = 'RISK_ALERT',
  Achievement = 'ACHIEVEMENT'
}

export type HealthSummary = {
  __typename?: 'HealthSummary';
  totalRecords: Scalars['Int'];
  recentTrends: Array<TrendData>;
  lastRecordedAt?: Maybe<Scalars['DateTime']>;
  avgHeartRate?: Maybe<Scalars['Float']>;
  avgBloodPressure?: Maybe<Scalars['String']>;
  latestWeight?: Maybe<Scalars['Float']>;
};

export type HealthInsight = {
  __typename?: 'HealthInsight';
  id: Scalars['ID'];
  insightType: InsightType;
  title: Scalars['String'];
  description: Scalars['String'];
  confidenceScore?: Maybe<Scalars['Float']>;
  isRead: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
};

export type TrendData = {
  __typename?: 'TrendData';
  recordType: HealthRecordType;
  trend: Scalars['String'];
  changePercentage?: Maybe<Scalars['Float']>;
  period: Scalars['String'];
};
