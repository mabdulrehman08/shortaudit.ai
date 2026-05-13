import type { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { Badge, Card, Section, ScoreBar } from '@/components/ui';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <main>
      <Section className="pt-12">
        <Badge icon={Settings}>Workspace settings</Badge>
        <h1 className="mt-5 text-5xl font-black tracking-tight">Configure model sensitivity, platform defaults, and team behavior.</h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-2xl font-black">Brand safety defaults</h2>
            <div className="mt-5 space-y-4">
              {['Detect banned words', 'Flag repetitive AI voices', 'Watermark detection', 'Duplicate caption warning'].map((item) => <Toggle key={item} label={item} />)}
            </div>
          </Card>
          <Card>
            <h2 className="text-2xl font-black">Risk thresholds</h2>
            <div className="mt-5 space-y-4">
              <ScoreBar label="AI-generated detection risk" value={58} tone="warning" />
              <ScoreBar label="Visual overstimulation" value={82} tone="pulse" />
              <ScoreBar label="Engagement bait language" value={44} tone="flare" />
            </div>
          </Card>
        </div>
      </Section>
    </main>
  );
}

function Toggle({ label }: { label: string }) {
  return <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4"><span className="font-semibold">{label}</span><span className="h-7 w-12 rounded-full bg-neon p-1"><span className="block h-5 w-5 translate-x-5 rounded-full bg-ink" /></span></div>;
}
