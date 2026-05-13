import type { Metadata } from 'next';
import { ReportDashboard } from '@/components/report-dashboard';
import { Badge, Section } from '@/components/ui';
import { sampleReport } from '@/lib/constants';
import { ScanEye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Analysis Report',
};

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = { ...sampleReport, id };

  return (
    <main>
      <Section className="pb-8 pt-12">
        <Badge icon={ScanEye}>AI Report Dashboard</Badge>
        <h1 className="mt-5 text-5xl font-black tracking-tight">Audit report for {report.videoName}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">A premium report with viral score, hook strength, retention prediction, scroll risk timeline, caption quality, CTA effectiveness, emotional engagement, visual stimulation, and AI detection risk.</p>
      </Section>
      <Section className="pt-0">
        <ReportDashboard report={report} />
      </Section>
    </main>
  );
}
