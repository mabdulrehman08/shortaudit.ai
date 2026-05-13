import crypto from 'node:crypto';
import type { AuditReport, Platform, TimelineMoment } from '@/types/audit';

const weakHookWords = ['today', 'welcome', 'in this video', 'hey guys', 'quick update'];
const emotionalWords = ['secret', 'mistake', 'hidden', 'stop', 'steal', 'warning', 'flop', 'viral', 'ignored'];
const ctaWords = ['follow', 'subscribe', 'comment', 'share', 'download', 'try', 'buy'];

type HeuristicInput = {
  fileName: string;
  fileSize: number;
  platform: Platform;
  transcript?: string;
  durationSeconds?: number;
};

export function generateHeuristicAudit(input: HeuristicInput): AuditReport {
  const transcript = input.transcript?.trim() || fallbackTranscript(input.fileName);
  const durationSeconds = input.durationSeconds || inferDuration(input.fileSize);
  const normalized = transcript.toLowerCase();
  const hookText = normalized.split(/[.!?]/).filter(Boolean)[0] || normalized.slice(0, 90);
  const hookPenalty = weakHookWords.some((word) => hookText.includes(word)) ? 18 : 0;
  const emotionalBoost = emotionalWords.filter((word) => normalized.includes(word)).length * 5;
  const ctaIndex = findFirstIndex(normalized, ctaWords);
  const ctaLate = ctaIndex > normalized.length * 0.65 || ctaIndex === -1;
  const subtitleDensity = Math.min(100, Math.round((transcript.split(/\s+/).length / durationSeconds) * 32));
  const pacingScore = scorePacing(durationSeconds, transcript);
  const visualStimulation = Math.max(38, Math.min(94, pacingScore + (input.fileSize % 19) - 6));
  const hookStrength = clamp(72 + emotionalBoost - hookPenalty + platformBoost(input.platform));
  const retentionPrediction = clamp(Math.round((hookStrength * 0.34 + pacingScore * 0.36 + subtitleDensity * 0.3) - (ctaLate ? 7 : 0)));
  const captionQuality = clamp(subtitleDensity + (normalized.includes('?') ? 7 : 0) - (subtitleDensity < 42 ? 12 : 0));
  const ctaEffectiveness = clamp(ctaLate ? 58 : 82);
  const emotionalEngagement = clamp(58 + emotionalBoost + (hookText.includes('you') ? 8 : 0));
  const aiDetectionRisk = clamp(52 - emotionalBoost + (normalized.includes('ai') ? 10 : 0) + (pacingScore < 60 ? 9 : 0));
  const viralScore = clamp(Math.round(hookStrength * 0.24 + retentionPrediction * 0.27 + captionQuality * 0.15 + ctaEffectiveness * 0.1 + emotionalEngagement * 0.14 + visualStimulation * 0.1 - aiDetectionRisk * 0.08));
  const timeline = buildTimeline({ durationSeconds, hookStrength, retentionPrediction, pacingScore, ctaLate });

  return {
    id: crypto.randomUUID(),
    videoName: input.fileName,
    platform: input.platform,
    createdAt: new Date().toISOString(),
    durationSeconds,
    transcript,
    summary: summarize({ hookStrength, retentionPrediction, pacingScore, ctaLate, aiDetectionRisk }),
    scores: {
      viralScore,
      hookStrength,
      retentionPrediction,
      captionQuality,
      ctaEffectiveness,
      emotionalEngagement,
      visualStimulation,
      aiDetectionRisk,
    },
    retentionCurve: buildRetentionCurve(retentionPrediction, hookStrength, ctaLate),
    timeline,
    whyItCouldGoViral: viralReasons(hookStrength, emotionalEngagement, visualStimulation),
    whyItMayFlop: flopReasons(hookStrength, pacingScore, ctaLate, aiDetectionRisk),
    recommendations: recommendations(hookStrength, pacingScore, ctaLate, captionQuality, aiDetectionRisk),
    suggestedCaption: suggestCaption(transcript, input.platform),
    suggestedHashtags: suggestHashtags(input.platform),
    bestThumbnailSecond: hookStrength > 82 ? 2 : 4,
    exportReady: true,
  };
}

function fallbackTranscript(fileName: string) {
  return `This upload ${fileName} has a promising AI creator angle, but the intro needs a sharper emotional hook, faster subtitle pacing, and earlier proof to reduce the likely drop at 5 to 7 seconds.`;
}

function inferDuration(fileSize: number) {
  return Math.max(12, Math.min(60, Math.round(fileSize / 1_400_000)));
}

function scorePacing(duration: number, transcript: string) {
  const wordsPerSecond = transcript.split(/\s+/).length / Math.max(duration, 1);
  return clamp(Math.round(58 + wordsPerSecond * 13 + (duration < 35 ? 8 : -4)));
}

function findFirstIndex(text: string, words: string[]) {
  const indexes = words.map((word) => text.indexOf(word)).filter((index) => index >= 0);
  return indexes.length ? Math.min(...indexes) : -1;
}

function platformBoost(platform: Platform) {
  return platform === 'tiktok' ? 4 : platform === 'youtube_shorts' ? 1 : 2;
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function buildRetentionCurve(retention: number, hook: number, ctaLate: boolean) {
  return Array.from({ length: 12 }, (_, index) => {
    const drop = index * (ctaLate ? 4.2 : 3.4);
    const hookLift = index < 3 ? hook / 22 : 0;
    return clamp(Math.round(98 - drop + hookLift - Math.max(0, 72 - retention) / 4));
  });
}

function buildTimeline(input: { durationSeconds: number; hookStrength: number; retentionPrediction: number; pacingScore: number; ctaLate: boolean }): TimelineMoment[] {
  return [
    { second: 0, label: input.hookStrength > 78 ? 'Strong hook' : 'Weak hook', intensity: input.hookStrength > 78 ? 'strong' : 'risk', note: input.hookStrength > 78 ? 'Opening line creates a clear curiosity gap.' : 'The first 3 seconds need a stronger emotional trigger.' },
    { second: 3, label: 'Subtitle pacing', intensity: input.pacingScore > 70 ? 'strong' : 'risk', note: input.pacingScore > 70 ? 'Speech and caption density feel native to short-form.' : 'Subtitle pacing is too slow for the expected scroll speed.' },
    { second: 6, label: 'Retention valley', intensity: input.retentionPrediction > 74 ? 'neutral' : 'drop', note: 'High probability of viewer drop around 5-7 seconds if the visual does not change.' },
    { second: Math.min(12, input.durationSeconds - 4), label: input.ctaLate ? 'CTA too late' : 'CTA placed well', intensity: input.ctaLate ? 'risk' : 'strong', note: input.ctaLate ? 'Move the CTA before the main retention decay.' : 'CTA arrives while enough viewers remain.' },
  ];
}

function summarize(input: { hookStrength: number; retentionPrediction: number; pacingScore: number; ctaLate: boolean; aiDetectionRisk: number }) {
  return `This short has ${input.hookStrength > 80 ? 'a strong' : 'an underdeveloped'} hook, ${input.retentionPrediction > 75 ? 'healthy' : 'fragile'} predicted retention, and ${input.pacingScore > 70 ? 'competitive' : 'slow'} pacing. ${input.ctaLate ? 'The CTA appears too late.' : 'The CTA placement is workable.'} AI-pattern risk is ${input.aiDetectionRisk > 60 ? 'elevated' : 'manageable'}.`;
}

function viralReasons(hook: number, emotion: number, visual: number) {
  return [
    hook > 80 ? 'The opening creates a fast curiosity gap that can stop the scroll.' : 'The premise is clear enough to become viral after a sharper first sentence.',
    emotion > 72 ? 'The script uses emotional language that gives viewers a reason to care.' : 'The concept can become stronger by naming fear, gain, or identity earlier.',
    visual > 76 ? 'Visual stimulation is high enough for native short-form pacing.' : 'A tighter pattern break could improve replay and completion signals.',
  ];
}

function flopReasons(hook: number, pacing: number, ctaLate: boolean, aiRisk: number) {
  return [
    hook < 76 ? 'The first 3 seconds lack a strong emotional hook.' : 'The hook is good, but it needs a clearer payoff promise.',
    pacing < 70 ? 'Visual changes are too infrequent and may feel generated or static.' : 'Pacing is solid, but a mid-video scene swap would reduce fatigue.',
    ctaLate ? 'The CTA appears too late, after the predicted retention drop.' : 'The CTA is placed early enough, but it should be softer and more native.',
    aiRisk > 55 ? 'Repeated AI visuals or voice patterns may increase detection risk.' : 'AI-generated detection risk is currently manageable.',
  ];
}

function recommendations(hook: number, pacing: number, ctaLate: boolean, captions: number, aiRisk: number) {
  return [
    hook < 80 ? 'Rewrite the hook around a painful creator problem or surprising result.' : 'Keep the hook, but add an even faster visual proof beat.',
    pacing < 72 ? 'Add a scene change or zoom every 1-2 seconds during the first 8 seconds.' : 'Preserve current pacing and add one intentional pause before the payoff.',
    captions < 70 ? 'Increase subtitle contrast and speed up caption chunking.' : 'Subtitle quality is strong; keep line length under six words.',
    ctaLate ? 'Move the CTA to the midpoint and repeat it as a loop in the final second.' : 'Make the CTA feel like a continuation of the story rather than an ad.',
    aiRisk > 55 ? 'Insert humanized footage, original B-roll, or non-template motion to reduce AI sameness.' : 'Maintain original footage ratio to keep AI risk low.',
  ];
}

function suggestCaption(transcript: string, platform: Platform) {
  const platformLabel = platform === 'youtube_shorts' ? 'Shorts' : platform === 'instagram_reels' ? 'Reels' : 'TikTok';
  return `Why this ${platformLabel} could flop before anyone sees it: ${transcript.split(/[.!?]/)[0]?.slice(0, 70) || 'fix the hook before posting'}.`;
}

function suggestHashtags(platform: Platform) {
  const common = ['#shortform', '#contentstrategy', '#aitools', '#creatorgrowth'];
  return platform === 'youtube_shorts' ? ['#shorts', ...common] : platform === 'instagram_reels' ? ['#reels', ...common] : ['#tiktokgrowth', ...common];
}
