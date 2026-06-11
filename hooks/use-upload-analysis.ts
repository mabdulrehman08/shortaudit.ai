'use client';

import { useMemo, useState } from 'react';
import type { AuditReport, Platform, UploadState } from '@/types/audit';
import { acceptedVideoTypes, maxUploadSizeMb } from '@/lib/constants';

export function useUploadAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  const isDemoFile = file?.name === 'shortaudit-demo-short.mp4';

  function validate(nextFile: File) {
    setState('validating');
    setError(null);

    if (!acceptedVideoTypes.includes(nextFile.type)) {
      setState('error');
      setError('Please upload an MP4 or MOV file.');
      return false;
    }

    if (nextFile.size > maxUploadSizeMb * 1024 * 1024) {
      setState('error');
      setError(`Max upload size is ${maxUploadSizeMb}MB.`);
      return false;
    }

    setFile(nextFile);
    setState('idle');
    return true;
  }

  function useSampleVideo() {
    const sample = new File(
      ['ShortAudit demo video placeholder: founder explains an AI workflow, shows proof, and asks viewers to save the post.'],
      'shortaudit-demo-short.mp4',
      { type: 'video/mp4' },
    );

    setFile(sample);
    setReport(null);
    setProgress(0);
    setError(null);
    setState('idle');
  }

  async function analyze(platform: Platform) {
    if (!file) {
      setError('Choose a video first.');
      return;
    }

    setState('uploading');
    setProgress(18);

    const formData = new FormData();
    formData.append('video', file);
    formData.append('platform', platform);

    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 9, 88));
    }, 350);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      setState('analyzing');
      setProgress(92);

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || 'Analysis failed.');
      }

      const data = (await response.json()) as { report: AuditReport };
      setReport(data.report);
      setProgress(100);
      setState('complete');
    } catch (analysisError) {
      setState('error');
      setError(analysisError instanceof Error ? analysisError.message : 'Analysis failed.');
    } finally {
      window.clearInterval(progressTimer);
    }
  }

  return { file, previewUrl, isDemoFile, state, progress, error, report, validate, analyze, useSampleVideo };
}
