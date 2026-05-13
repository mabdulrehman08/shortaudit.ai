import { env } from '@/lib/env';
import type { AuditReport } from '@/types/audit';

export async function enhanceReportWithOpenAI(report: AuditReport): Promise<AuditReport> {
  if (!env.openAiApiKey) {
    return report;
  }

  // This keeps the MVP deployable without requiring an SDK at runtime during previews.
  // Production can swap this fetch call for the official OpenAI SDK if preferred.
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.openAiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      input: `Improve these short-form video recommendations without changing scores: ${JSON.stringify(report.recommendations)}`,
    }),
  });

  if (!response.ok) {
    return report;
  }

  return report;
}
