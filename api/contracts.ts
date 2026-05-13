import type { AuditReport, Platform } from '@/types/audit';

export type AnalyzeVideoRequest = {
  platform: Platform;
  fileName: string;
  mimeType: 'video/mp4' | 'video/quicktime';
  fileSize: number;
};

export type AnalyzeVideoResponse = {
  report: AuditReport;
};
