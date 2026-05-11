export function buildFallbackAnalysis(input) {
  const isAggressive = input.ctaIntensity === 'Aggressive'
  const isApi = input.uploadMethod !== 'Manual Upload'
  const platform = input.platform || 'TikTok'
  const hasVideoUrl = Boolean(input.videoUrl)
  const hasPerformanceData = Boolean(input.views || input.retentionPercent || input.avgWatchTime || input.pastWinners)

  return {
    hookStrength: {
      score: isAggressive ? 6.4 : 7.2,
      explanation: 'The concept is clear, but the first two seconds need a more specific pattern interrupt and open loop. Extra creator data and pasted links are treated as context, not private analytics access.',
    },
    retentionRisk: {
      level: isAggressive ? 'High' : 'Medium',
      explanation: isAggressive
        ? 'The CTA may arrive before viewers understand the payoff, which can compress average view duration.'
        : 'Retention risk is manageable if the edit gets to proof quickly and avoids generic AI pacing. Use the supplied watch-time and retention notes to identify the exact drop-off moment.',
    },
    algorithmRisk: {
      level: isApi ? 'Medium' : 'Low',
      explanation: isApi
        ? 'API or scheduler uploads can look operationally repetitive when paired with templated metadata and similar posting cadence.'
        : 'Manual upload lowers distribution friction, but the content still needs stronger early engagement signals.',
    },
    ctaAggression: {
      level: input.ctaIntensity,
      explanation: isAggressive
        ? 'Move the strongest CTA after value delivery. Start with payoff, proof, or tension instead of asking for action immediately.'
        : 'CTA pressure is acceptable. Keep it brief and tie it to the viewer outcome.',
    },
    aiGeneratedDetectionRisk: {
      level: 'Medium',
      explanation: 'The metadata could read synthetic if paired with slideshow pacing, generic captions, or a too-polished voiceover cadence.',
    },
    duplicateContentRisk: {
      level: 'Medium',
      explanation: 'Reused format language may resemble mass-produced AI clips. Add creator-specific proof, imperfect details, or native comments.',
    },
    platformSpecificAdvice: [
      hasVideoUrl ? `The pasted ${platform} link helps frame the audit, but add title/transcript notes for a sharper diagnosis.` : `${platform} rewards native-feeling openings that create tension before explanation.`,
      isApi ? 'Compare this with a manual upload test using distinct captions and thumbnail framing.' : 'Test a second manual version with a sharper first-frame claim.',
      hasPerformanceData ? 'Back up the winning metrics, thumbnails, and reference links, then compare future uploads against those patterns.' : 'Avoid repeating the same stock b-roll rhythm across multiple uploads in a row.',
    ],
    viralPotentialScore: isAggressive ? 68 : 76,
    shadowbanProbability: isApi || isAggressive ? 34 : 18,
    aiConfidence: 84,
    manualVsApiComparison: {
      manual: 'Manual upload likely wins if you add native captions, creator comments, and platform-specific cover text.',
      api: 'API upload is safer when metadata, timing, and asset structure are meaningfully varied between posts.',
    },
    recommendedFixes: [
      'Rewrite the hook as a specific contradiction or painful creator insight.',
      'Delay direct CTA until after the first proof moment.',
      'Add one human detail that could not be generated from a generic template.',
      'Save the audit backup and compare the next upload against views, retention, saves, shares, and cover notes.',
    ],
  }
}
