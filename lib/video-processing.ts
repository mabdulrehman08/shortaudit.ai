export type ExtractedVideoSignals = {
  audioPath?: string;
  framePaths: string[];
  durationSeconds: number;
  averageSceneChangeSeconds: number;
  subtitleActivity: number;
};

export async function extractVideoSignals(file: File): Promise<ExtractedVideoSignals> {
  // Production implementation options:
  // 1. Run ffmpeg.wasm for small preview jobs.
  // 2. Dispatch a Vercel-compatible background job or managed worker for larger files.
  // 3. Extract one key frame per second and an audio track for Whisper/Deepgram.
  const estimatedDuration = Math.max(12, Math.min(60, Math.round(file.size / 1_400_000)));

  return {
    framePaths: Array.from({ length: estimatedDuration }, (_, index) => `frame-${index}.jpg`),
    durationSeconds: estimatedDuration,
    averageSceneChangeSeconds: 1.8,
    subtitleActivity: 0.74,
  };
}
