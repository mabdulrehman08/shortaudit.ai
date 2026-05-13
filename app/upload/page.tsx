import type { Metadata } from 'next';
import { UploadDropzone } from '@/components/upload-dropzone';
import { Badge, Section } from '@/components/ui';
import { CloudUpload } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Upload',
  description: 'Upload an MP4 or MOV short-form video and generate an AI audit report.',
};

export default function UploadPage() {
  return (
    <main>
      <Section className="pb-8 pt-12">
        <Badge icon={CloudUpload}>Video Upload</Badge>
        <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight">Upload a short and get a production-ready AI audit.</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">The MVP validates MP4/MOV uploads, shows a preview, simulates Vercel-safe upload progress, and calls a serverless analysis route that models ffmpeg extraction, transcription, frame review, and AI scoring.</p>
      </Section>
      <Section className="pt-0">
        <UploadDropzone />
      </Section>
    </main>
  );
}
