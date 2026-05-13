import { AlertTriangle, CheckCircle2, Download, Hash, Sparkles, WandSparkles, type LucideIcon } from 'lucide-react';
import type { AuditReport } from '@/types/audit';
import { Card, ScoreBar } from '@/components/ui';
import { RetentionGraph } from '@/components/retention-graph';
import { TimelineHeatmap } from '@/components/timeline-heatmap';

export function ReportDashboard({ report }: { report: AuditReport }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-neon/20 blur-3xl" />
          <p className="text-sm font-bold text-neon">Viral Score</p>
          <div className="mt-3 flex items-end gap-3">
            <span className="text-7xl font-black tracking-tighter text-white">{report.scores.viralScore}</span>
            <span className="pb-3 text-xl font-bold text-slate-400">/100</span>
          </div>
          <p className="mt-5 leading-7 text-slate-300">{report.summary}</p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-black text-ink transition hover:bg-neon">
            <Download className="h-4 w-4" /> Export PDF report
          </button>
        </Card>
        <Card>
          <div className="grid gap-3 sm:grid-cols-2">
            <ScoreBar label="Hook Strength" value={report.scores.hookStrength} />
            <ScoreBar label="Retention Prediction" value={report.scores.retentionPrediction} tone="pulse" />
            <ScoreBar label="Caption Quality" value={report.scores.captionQuality} />
            <ScoreBar label="CTA Effectiveness" value={report.scores.ctaEffectiveness} tone="warning" />
            <ScoreBar label="Emotional Engagement" value={report.scores.emotionalEngagement} tone="flare" />
            <ScoreBar label="AI Detection Risk" value={report.scores.aiDetectionRisk} tone="warning" />
            <ScoreBar label="Visual Stimulation" value={report.scores.visualStimulation} tone="pulse" />
            <ScoreBar label="Scroll Risk" value={100 - report.scores.retentionPrediction} tone="flare" />
          </div>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <RetentionGraph data={report.retentionCurve} />
        <TimelineHeatmap moments={report.timeline} duration={report.durationSeconds} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <FeedbackPanel icon={Sparkles} title="Why it could go viral" items={report.whyItCouldGoViral} positive />
        <FeedbackPanel icon={AlertTriangle} title="Why it may flop" items={report.whyItMayFlop} />
        <FeedbackPanel icon={WandSparkles} title="AI recommendations" items={report.recommendations} positive />
      </div>
      <Card>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-sm font-bold text-neon">Suggested caption</p>
            <h3 className="mt-2 text-2xl font-black">{report.suggestedCaption}</h3>
          </div>
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-neon"><Hash className="h-4 w-4" /> Suggested hashtags</p>
            <div className="flex flex-wrap gap-2">
              {report.suggestedHashtags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function FeedbackPanel({ icon: Icon, title, items, positive = false }: { icon: LucideIcon; title: string; items: string[]; positive?: boolean }) {
  return (
    <Card>
      <Icon className={`h-6 w-6 ${positive ? 'text-neon' : 'text-flare'}`} />
      <h3 className="mt-4 text-xl font-black">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
