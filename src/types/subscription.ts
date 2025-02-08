export type SubscriptionType = 'per-session' | 'monthly' | 'package';
export type PlanFeature = 'workout' | 'nutrition' | 'both';

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: SubscriptionType;
  features: PlanFeature;
  price: number;
  description: string;
  duration?: number; // in days for packages/monthly
  sessions?: number; // for per-session plans
  trainerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TraineeSubscription {
  id: string;
  traineeId: string;
  planId: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'expired' | 'cancelled';
  remainingSessions?: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: 'credit_card' | 'bank_transfer' | 'cash';
  transactionId?: string;
  createdAt: Date;
}