// Shared types for backend API

export interface User {
  id: string;
  email: string;
  fullName?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  heightCm?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface HealthRecord {
  id: string;
  userId: string;
  recordType: 'blood_pressure' | 'heart_rate' | 'weight' | 'blood_glucose' | 'sleep' | 'exercise';
  valueNumeric?: number;
  valueText?: string;
  unit?: string;
  systolic?: number; // for blood pressure
  diastolic?: number; // for blood pressure
  notes?: string;
  recordedAt: Date;
  createdAt: Date;
}

export interface Medication {
  id: string;
  userId: string;
  name: string;
  dosage?: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  userId: string;
  providerName: string;
  appointmentType?: string;
  scheduledAt: Date;
  location?: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface HealthInsight {
  id: string;
  userId: string;
  insightType: 'trend_analysis' | 'recommendation' | 'risk_alert' | 'achievement';
  title: string;
  description: string;
  confidenceScore?: number;
  isRead: boolean;
  relatedRecordIds: string[];
  createdAt: Date;
}

export interface HealthGoal {
  id: string;
  userId: string;
  goalType: string;
  targetValue: number;
  targetUnit: string;
  currentValue: number;
  targetDate?: string;
  isAchieved: boolean;
  createdAt: Date;
}

// GraphQL Context type
export interface GraphQLContext {
  user: {
    id: string;
    email: string;
  } | null;
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
