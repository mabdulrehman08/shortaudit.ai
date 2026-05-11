import OpenAI from 'openai'
import { buildFallbackAnalysis } from '../lib/fallbackAnalysis.js'

const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini'
const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

const analysisSchema = {
  name: 'shortaudit_analysis',
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      hookStrength: {
        type: 'object',
        additionalProperties: false,
        properties: {
          score: { type: 'number' },
          explanation: { type: 'string' },
        },
        required: ['score', 'explanation'],
      },
      retentionRisk: riskObject(),
      algorithmRisk: riskObject(),
      ctaAggression: riskObject(),
      aiGeneratedDetectionRisk: riskObject(),
      duplicateContentRisk: riskObject(),
      platformSpecificAdvice: { type: 'array', items: { type: 'string' } },
      viralPotentialScore: { type: 'number' },
      shadowbanProbability: { type: 'number' },
      aiConfidence: { type: 'number' },
      manualVsApiComparison: {
        type: 'object',
        additionalProperties: false,
        properties: {
          manual: { type: 'string' },
          api: { type: 'string' },
        },
        required: ['manual', 'api'],
      },
      recommendedFixes: { type: 'array', items: { type: 'string' } },
    },
    required: [
      'hookStrength',
      'retentionRisk',
      'algorithmRisk',
      'ctaAggression',
      'aiGeneratedDetectionRisk',
      'duplicateContentRisk',
      'platformSpecificAdvice',
      'viralPotentialScore',
      'shadowbanProbability',
      'aiConfidence',
      'manualVsApiComparison',
      'recommendedFixes',
    ],
  },
}

function riskObject() {
  return {
    type: 'object',
    additionalProperties: false,
    properties: {
      level: { type: 'string' },
      explanation: { type: 'string' },
    },
    required: ['level', 'explanation'],
  }
}

export async function analyzeVideo(input) {
  if (!client) {
    return { ...buildFallbackAnalysis(input), source: 'mock' }
  }

  const prompt = `Act as an elite short-form content strategist and algorithm analyst. Analyze this short-form video concept for distribution risk and growth potential. Be direct, premium, and useful for a serious creator.

Video title: ${input.title}
Description/transcript/context: ${input.description}
Platform: ${input.platform}
Upload method: ${input.uploadMethod}
CTA intensity: ${input.ctaIntensity}

Analyze hook quality, retention risk, CTA problems, AI-generated appearance, platform risks, repetitive formatting, algorithmic weaknesses, shadowban-like suppression patterns, and manual vs API upload considerations. Return calibrated scores, not hype.`

  const response = await client.responses.create({
    model,
    input: [
      {
        role: 'system',
        content: 'You are ShortAudit AI. You return strict JSON and never claim certainty about platform algorithms. Use practical creator strategy language.',
      },
      { role: 'user', content: prompt },
    ],
    text: {
      format: {
        type: 'json_schema',
        ...analysisSchema,
      },
    },
  })

  return { ...JSON.parse(response.output_text), source: 'openai' }
}

export async function rewriteHook({ hook, style }) {
  if (!client) {
    return {
      source: 'mock',
      hooks: [
        `Nobody tells you this before ${hook.toLowerCase()}`,
        `I tested this so you do not waste the next 30 days`,
        `The uncomfortable truth behind: ${hook}`,
      ],
    }
  }

  const response = await client.responses.create({
    model,
    input: `Rewrite this short-form video hook in a ${style} style. Return JSON with a hooks array of 5 punchy options. Hook: ${hook}`,
    text: {
      format: {
        type: 'json_schema',
        name: 'hook_rewrites',
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: { hooks: { type: 'array', items: { type: 'string' } } },
          required: ['hooks'],
        },
      },
    },
  })

  return { ...JSON.parse(response.output_text), source: 'openai' }
}

export async function localizeHook({ hook, audience }) {
  if (!client) {
    const examples = {
      'Pakistan Gen-Z': 'POV: sab maze le rahe thay aur maine AI se paisa banana start kar diya',
      Dubai: 'POV: everyone is flexing, but you used AI to build the income first',
      'Spanish-speaking audience': 'POV: todos dudaban de la IA y tú ya la convertiste en ingresos',
    }
    return { source: 'mock', localizedHook: examples[audience] || `POV: your friends ignored this, but ${hook.toLowerCase()}` }
  }

  const response = await client.responses.create({
    model,
    input: `Culturally localize this short-form video hook for ${audience}. Do not literally translate. Make it native, punchy, and platform-ready. Return JSON with localizedHook only. Original hook: ${hook}`,
    text: {
      format: {
        type: 'json_schema',
        name: 'localized_hook',
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: { localizedHook: { type: 'string' } },
          required: ['localizedHook'],
        },
      },
    },
  })

  return { ...JSON.parse(response.output_text), source: 'openai' }
}
