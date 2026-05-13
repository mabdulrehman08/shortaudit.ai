import type { AuditReport } from '@/types/audit';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      videos: {
        Row: {
          id: string;
          user_id: string;
          file_name: string;
          file_url: string | null;
          file_size: number;
          mime_type: string;
          duration_seconds: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          file_name: string;
          file_url?: string | null;
          file_size: number;
          mime_type: string;
          duration_seconds?: number | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['videos']['Insert']>;
      };
      transcripts: {
        Row: {
          id: string;
          video_id: string;
          transcript: string;
          provider: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          video_id: string;
          transcript: string;
          provider?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['transcripts']['Insert']>;
      };
      analysis_reports: {
        Row: {
          id: string;
          video_id: string;
          user_id: string;
          report: AuditReport;
          scores: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          video_id: string;
          user_id: string;
          report: AuditReport;
          scores: Json;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['analysis_reports']['Insert']>;
      };
    };
  };
};
