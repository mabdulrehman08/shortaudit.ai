const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function post(path, payload) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || 'Request failed')
  }

  return response.json()
}

export function analyzeVideo(payload) {
  return post('/api/analyze', payload)
}

export function rewriteHook(payload) {
  return post('/api/rewrite-hook', payload)
}

export function localizeHook(payload) {
  return post('/api/localize-hook', payload)
}
