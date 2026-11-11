import { detectMarket, type Market } from './detectMarket'

export type LeadPayload = {
  name: string
  email: string
  uiLanguage: string
  market: Market
  detectedCountry: string | null
  marketSource: string
  userAgent: string
  timestamp: string
  consent: true
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: 'config' | 'network' | 'server' | 'duplicate' }

export async function submitLead(input: {
  name: string
  email: string
  uiLanguage: string
}): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_GAS_ENDPOINT as string | undefined
  if (!endpoint) {
    console.warn('VITE_GAS_ENDPOINT is not set')
    return { ok: false, reason: 'config' }
  }

  const marketInfo = await detectMarket()

  const payload: LeadPayload = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    uiLanguage: input.uiLanguage,
    market: marketInfo.market,
    detectedCountry: marketInfo.detectedCountry,
    marketSource: marketInfo.source,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    timestamp: new Date().toISOString(),
    consent: true,
  }

  try {
    // Apps Script often needs no-cors text/plain to avoid CORS preflight issues
    const res = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      return { ok: false, reason: 'server' }
    }

    try {
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (data.ok === false) {
        if (data.error === 'duplicate') {
          return { ok: false, reason: 'duplicate' }
        }
        return { ok: false, reason: 'server' }
      }
    } catch {
      // Some deployments return empty body — treat HTTP 200 as success
    }

    return { ok: true }
  } catch {
    return { ok: false, reason: 'network' }
  }
}
