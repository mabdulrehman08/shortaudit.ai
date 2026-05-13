export type Platform = 'tiktok' | 'instagram_reels' | 'youtube_shorts';

export type ScoreKey =
  | 'viralScore'
  | 'hookStrength'
  | 'retentionPrediction'
  | 'captionQuality'
  | 'ctaEffectiveness'
  | 'emotionalEngagement'
  | 'visualStimulation'
  | 'aiDetectionRisk';

export type TimelineMoment = {
  second: number;
  label: string;
  intensity: 'strong' | 'risk' | 'drop' | 'neutral';
  note: string;
};

export type AuditScores = Record<ScoreKey, number>;

export type AuditReport = {
  id: string;
  videoName: string;
  platform: Platform;
  createdAt: string;
  durationSeconds: number;
  transcript: string;
  summary: string;
  scores: AuditScores;
  retentionCurve: number[];
  timeline: TimelineMoment[];
  whyItCouldGoViral: string[];
  whyItMayFlop: string[];
  recommendations: string[];
  suggestedCaption: string;
  suggestedHashtags: string[];
  bestThumbnailSecond: number;
  exportReady: boolean;
};

export type UploadState = 'idle' | 'validating' | 'uploading' | 'analyzing' | 'complete' | 'error';
