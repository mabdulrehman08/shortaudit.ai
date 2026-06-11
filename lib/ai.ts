import { env } from '@/lib/env';
import type { AuditReport } from '@/types/audit';

export async function enhanceReportWithOpenAI(report: AuditReport): Promise<AuditReport> {
  if (!env.openAiApiKey) {
    return report;
  }

  let response: Response;

  try {
    response = await fetch('https://api.openai.com/v1/responses', {
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
  } catch {
    return report;
  }

  if (!response.ok) {
    return report;
  }

  return report;
}
