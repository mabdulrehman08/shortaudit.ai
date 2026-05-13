'use client';

import { useState } from 'react';
import { CloudUpload, FileVideo2, Loader2, Play, ShieldCheck } from 'lucide-react';
import { useUploadAnalysis } from '@/hooks/use-upload-analysis';
import { Card } from '@/components/ui';
import { ReportDashboard } from '@/components/report-dashboard';
import type { Platform } from '@/types/audit';

const platforms: Array<{ value: Platform; label: string }> = [
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram_reels', label: 'Instagram Reels' },
  { value: 'youtube_shorts', label: 'YouTube Shorts' },
];

export function UploadDropzone() {
  const [platform, setPlatform] = useState<Platform>('tiktok');
  const { file, previewUrl, state, progress, error, report, validate, analyze } = useUploadAnalysis();
  const busy = state === 'uploading' || state === 'analyzing';

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <label
            className="grid min-h-[420px] cursor-pointer place-items-center rounded-[1.6rem] border border-dashed border-neon/40 bg-neon/5 p-8 text-center transition hover:border-neon hover:bg-neon/10"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const dropped = event.dataTransfer.files?.[0];
              if (dropped) validate(dropped);
            }}
          >
            <input className="sr-only" type="file" accept="video/mp4,video/quicktime" onChange={(event) => event.target.files?.[0] && validate(event.target.files[0])} />
            <div>
              <CloudUpload className="mx-auto h-16 w-16 text-neon" />
              <h2 className="mt-5 text-3xl font-black">Drag-and-drop your short</h2>
              <p className="mx-auto mt-3 max-w-md text-slate-400">Supports MP4 and MOV. We validate size, preview the upload, extract audio and key frames, transcribe speech, then generate an AI audit.</p>
              <span className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-black text-ink">Choose video</span>
            </div>
          </label>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-neon" />
            <h2 className="text-2xl font-black">Upload preview & analysis</h2>
          </div>
          <div className="mt-5 aspect-[9/16] max-h-[460px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/40">
            {previewUrl ? (
              <video src={previewUrl} controls className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center text-center text-slate-500">
                <div>
                  <FileVideo2 className="mx-auto mb-4 h-12 w-12" />
                  TikTok-style preview player appears here
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {platforms.map((item) => (
              <button key={item.value} onClick={() => setPlatform(item.value)} className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${platform === item.value ? 'border-neon bg-neon text-ink' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                {item.label}
              </button>
            ))}
          </div>
          <button disabled={!file || busy} onClick={() => analyze(platform)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-neon px-5 py-4 font-black text-ink disabled:cursor-not-allowed disabled:opacity-50">
            {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}
            {busy ? 'Analyzing video...' : 'Run AI audit'}
          </button>
          {(busy || state === 'complete') && (
            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500"><span>{state}</span><span>{progress}%</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-neon to-flare" style={{ width: `${progress}%` }} /></div>
            </div>
          )}
          {error && <p className="mt-4 rounded-2xl border border-flare/30 bg-flare/10 p-4 text-sm text-pink-100">{error}</p>}
        </Card>
      </div>
      {report && <ReportDashboard report={report} />}
    </div>
  );
}
