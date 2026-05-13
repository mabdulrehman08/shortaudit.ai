import type { AuditReport } from '@/types/audit';

export const maxUploadSizeMb = 250;
export const acceptedVideoTypes = ['video/mp4', 'video/quicktime'];

export const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Upload', href: '/upload' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Login', href: '/login' },
];

export const sampleReport: AuditReport = {
  id: 'demo-report',
  videoName: 'ai-productivity-hook.mov',
  platform: 'tiktok',
  createdAt: new Date('2026-05-13T02:00:00.000Z').toISOString(),
  durationSeconds: 28,
  transcript:
    'Wait until you see the AI workflow that turns one idea into ten short videos. Most creators miss the first prompt, and that is why their videos stall.',
  summary:
    'Strong premise and clear niche, but the second scene repeats a familiar AI dashboard visual and the CTA arrives after the main retention drop.',
  scores: {
    viralScore: 84,
    hookStrength: 88,
    retentionPrediction: 76,
    captionQuality: 82,
    ctaEffectiveness: 61,
    emotionalEngagement: 73,
    visualStimulation: 79,
    aiDetectionRisk: 34,
  },
  retentionCurve: [97, 93, 89, 86, 80, 71, 66, 64, 61, 58, 54, 52],
  timeline: [
    { second: 0, label: 'Pattern interrupt', intensity: 'strong', note: 'Bold claim creates curiosity immediately.' },
    { second: 3, label: 'Subtitle lag', intensity: 'risk', note: 'Caption cadence slows while speech accelerates.' },
    { second: 6, label: 'Likely drop', intensity: 'drop', note: 'Dashboard visual repeats and movement stalls.' },
    { second: 11, label: 'Proof spike', intensity: 'strong', note: 'Before/after result increases trust.' },
    { second: 19, label: 'Late CTA', intensity: 'risk', note: 'CTA appears after predicted retention decay.' },
  ],
  whyItCouldGoViral: [
    'The first line creates a clear knowledge gap for AI creators.',
    'Fast subtitle contrast and neon UI visuals fit short-form discovery patterns.',
    'The payoff can be understood without sound, improving replay potential.',
  ],
  whyItMayFlop: [
    'The first 3 seconds lack a human emotional trigger beyond curiosity.',
    'Visual changes are too infrequent between seconds 5 and 8.',
    'The CTA appears too late for the expected retention curve.',
    'AI-generated dashboard footage creates moderate sameness risk.',
  ],
  recommendations: [
    'Move the proof screenshot to second 5 and cut the repeated zoom.',
    'Rewrite the hook to name a painful creator outcome in the first sentence.',
    'Add a 0.4 second motion burst or face reaction before the first retention valley.',
    'Place the CTA as a soft loop at second 13 instead of the final beat.',
  ],
  suggestedCaption: 'This is why AI videos stall before they ever reach the right audience.',
  suggestedHashtags: ['#shortsstrategy', '#aitools', '#contentcreator', '#facelessbrand', '#tiktokgrowth'],
  bestThumbnailSecond: 2,
  exportReady: true,
};
