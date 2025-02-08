export interface SystemMetric {
  label: string;
  value: number;
  total: number;
  color: string;
}

export interface DashboardSummary {
  totalUsers: number;
  activeTrainers: number;
  activeTrainees: number;
  activePlans: number;
}

export interface ActivityLog {
  id: string;
  type: 'workout' | 'nutrition' | 'user' | 'system';
  description: string;
  timestamp: Date;
  userId?: string;
  metadata?: Record<string, any>;
}