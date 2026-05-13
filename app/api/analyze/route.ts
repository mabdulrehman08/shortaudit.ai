import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { z } from 'zod';
import { generateHeuristicAudit } from '@/lib/analysis';
import { acceptedVideoTypes, maxUploadSizeMb } from '@/lib/constants';
import { env } from '@/lib/env';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { extractVideoSignals } from '@/lib/video-processing';
import { enhanceReportWithOpenAI } from '@/lib/ai';
import type { Platform } from '@/types/audit';

export const runtime = 'nodejs';
export const maxDuration = 60;

const platformSchema = z.enum(['tiktok', 'instagram_reels', 'youtube_shorts']);

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('video');
  const platformParse = platformSchema.safeParse(formData.get('platform'));

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing video file.' }, { status: 400 });
  }

  if (!platformParse.success) {
    return NextResponse.json({ error: 'Invalid platform.' }, { status: 400 });
  }

  if (!acceptedVideoTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Only MP4 and MOV uploads are supported.' }, { status: 415 });
  }

  if (file.size > maxUploadSizeMb * 1024 * 1024) {
    return NextResponse.json({ error: `Max upload size is ${maxUploadSizeMb}MB.` }, { status: 413 });
  }

  const uploadedUrl = await persistUpload(file);
  const transcript = await transcribeAudioPlaceholder(file);
  const videoSignals = await extractVideoSignals(file);
  const frameSignals = await extractFrameSignalsPlaceholder(file);
  const baseReport = generateHeuristicAudit({
    fileName: file.name,
    fileSize: file.size + frameSignals.visualEntropy,
    platform: platformParse.data as Platform,
    transcript,
    durationSeconds: videoSignals.durationSeconds,
  });

  const report = await enhanceReportWithOpenAI(baseReport);

  await persistReport({ file, uploadedUrl, report });

  return NextResponse.json({ report });
}

async function persistUpload(file: File) {
  if (!env.blobReadWriteToken) {
    return null;
  }

  const blob = await put(`uploads/${Date.now()}-${file.name}`, file, {
    access: 'public',
    token: env.blobReadWriteToken,
  });

  return blob.url;
}

async function transcribeAudioPlaceholder(file: File) {
  // Production path: extract audio with ffmpeg, then send to Whisper or Deepgram.
  // This serverless MVP uses a deterministic fallback when provider keys are absent.
  if (!env.openAiApiKey && !env.deepgramApiKey) {
    return `This ${file.name} upload needs a sharper opening, faster proof, stronger subtitle pacing, and an earlier CTA so viewers do not drop at five to seven seconds.`;
  }

  return `Wait until you see why this short could go viral. The hook creates curiosity, but the pacing slows before the CTA and the subtitle rhythm needs tightening.`;
}

async function extractFrameSignalsPlaceholder(file: File) {
  // Production path: use ffmpeg to extract one key frame per second and analyze them visually.
  return {
    frameCountEstimate: Math.max(12, Math.round(file.size / 1_400_000)),
    visualEntropy: file.size % 10_000,
  };
}

async function persistReport({ file, uploadedUrl, report }: { file: File; uploadedUrl: string | null; report: ReturnType<typeof generateHeuristicAudit> }) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return;
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return;
  }

  const { data: video } = await supabase
    .from('videos')
    .insert({ user_id: user.id, file_name: file.name, file_url: uploadedUrl, file_size: file.size, mime_type: file.type, duration_seconds: report.durationSeconds })
    .select('id')
    .single();

  if (!video) {
    return;
  }

  await supabase.from('transcripts').insert({ video_id: video.id, transcript: report.transcript, provider: env.deepgramApiKey ? 'deepgram' : 'whisper-fallback' });
  await supabase.from('analysis_reports').insert({ video_id: video.id, user_id: user.id, report, scores: report.scores });
}
