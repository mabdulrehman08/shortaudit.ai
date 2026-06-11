import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(dirname, "../../.env") });

const app = express();
const port = Number(process.env.PORT) || 8787;
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const auditSchema = z.object({
  platform: z.string().trim().min(1).max(40).default("TikTok"),
  title: z.string().trim().max(160).optional().default(""),
  description: z.string().trim().max(1000).optional().default(""),
  transcript: z.string().trim().min(20).max(12000),
  goal: z.string().trim().max(300).optional().default("")
});

app.use(helmet());
app.use(cors({ origin: frontendOrigin }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, model, openaiConfigured: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/audit", async (req, res) => {
  const parsed = auditSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request",
      details: parsed.error.flatten()
    });
  }

  try {
    const audit = process.env.OPENAI_API_KEY
      ? await runOpenAiAudit(parsed.data)
      : createLocalAudit(parsed.data);

    return res.json({ audit });
  } catch (error) {
    console.error("Audit failed", error);
    return res.status(500).json({
      error: "Could not generate audit",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

app.listen(port, () => {
  console.log(`ShortAudit API listening on http://localhost:${port}`);
});

async function runOpenAiAudit(input) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model,
    input: [
      {
        role: "system",
        content:
          "You are ShortAudit, a concise short-form video strategist. Return strict JSON only."
      },
      {
        role: "user",
        content: JSON.stringify({
          task:
            "Audit this short-form video draft. Score it and provide practical edits.",
          schema: {
            score: "number from 0 to 100",
            verdict: "one sentence",
            strengths: ["three short bullets"],
            fixes: ["five prioritized bullets"],
            hookOptions: ["three rewritten hooks"],
            caption: "one optimized caption"
          },
          input
        })
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "short_audit",
        schema: {
          type: "object",
          additionalProperties: false,
          required: ["score", "verdict", "strengths", "fixes", "hookOptions", "caption"],
          properties: {
            score: { type: "number", minimum: 0, maximum: 100 },
            verdict: { type: "string" },
            strengths: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 3 },
            fixes: { type: "array", items: { type: "string" }, minItems: 5, maxItems: 5 },
            hookOptions: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 3 },
            caption: { type: "string" }
          }
        }
      }
    }
  });

  return JSON.parse(response.output_text);
}

function createLocalAudit({ platform, title, transcript, goal }) {
  const wordCount = transcript.split(/\s+/).filter(Boolean).length;
  const hasQuestion = /[?]/.test(transcript);
  const hasNumbers = /\d/.test(transcript);
  const hasCallToAction = /(follow|subscribe|comment|share|save|try|download|join)/i.test(transcript);
  const score = Math.max(
    45,
    Math.min(88, 55 + (hasQuestion ? 8 : 0) + (hasNumbers ? 7 : 0) + (hasCallToAction ? 8 : 0))
  );

  return {
    score,
    verdict:
      wordCount > 180
        ? "The idea is usable, but the script needs a sharper opening and tighter pacing."
        : "The draft has a workable shape; make the promise clearer in the first three seconds.",
    strengths: [
      title ? `Clear topic signal from "${title}".` : `The ${platform} concept is easy to understand.`,
      goal ? `The stated goal gives the edit a measurable direction: ${goal}.` : "The transcript has enough substance for a focused cut.",
      hasNumbers ? "Specific numbers can make the claim feel more concrete." : "The script can be tightened without changing the core idea."
    ],
    fixes: [
      "Move the main payoff into the first sentence.",
      "Cut setup lines that do not change what the viewer knows.",
      "Add one visual beat every two to three seconds.",
      "Turn the ending into a single direct call to action.",
      "Rewrite the caption around the viewer's problem, not the creator's process."
    ],
    hookOptions: [
      "You are probably missing this before you post.",
      "I audited this in 30 seconds, and the fix is simple.",
      "Before you upload, check these three things."
    ],
    caption: `Quick ${platform} audit: sharper hook, faster payoff, clearer next step.`
  };
}
