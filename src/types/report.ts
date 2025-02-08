export type ReportType = 'attendance' | 'progress' | 'financial';

export interface ReportSection {
  title: string;
  content: string | React.ReactNode;
}

export interface Report {
  id: string;
  type: ReportType;
  title: string;
  sections: ReportSection[];
  createdAt: Date;
  createdBy: string;
  metadata?: Record<string, any>;
};