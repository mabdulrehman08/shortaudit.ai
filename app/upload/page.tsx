import type { Metadata } from 'next';
import { UploadDropzone } from '@/components/upload-dropzone';
import { Badge, Section } from '@/components/ui';
import { CloudUpload } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Upload',
  description: 'Upload or sample a short-form video and generate a demo-ready AI audit report.',
};

export default function UploadPage() {
  return (
    <main>
      <Section className="pb-8 pt-12">
        <Badge icon={CloudUpload}>Audit studio</Badge>
        <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight">Generate a polished short-form audit in one click.</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">Upload your own MP4/MOV or use the sample short for a clean live demo with scorecards, retention forecast, ranked fixes, hook rewrites, and caption ideas.</p>
      </Section>
      <Section className="pt-0">
        <UploadDropzone />
      </Section>
    </main>
  );
}
