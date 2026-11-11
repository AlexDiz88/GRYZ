export type Market = 'UA' | 'PL' | 'OTHER'

export type MarketInfo = {
  market: Market
  detectedCountry: string | null
  source: 'ip' | 'language' | 'fallback'
}

function marketFromCountry(code: string | null | undefined): Market | null {
  if (!code) return null
  const c = code.toUpperCase()
  if (c === 'UA') return 'UA'
  if (c === 'PL') return 'PL'
  return 'OTHER'
}

function marketFromLanguage(lang: string | undefined): Market {
  const base = (lang || '').toLowerCase().split('-')[0]
  if (base === 'pl') return 'PL'
  if (base === 'uk' || base === 'ua') return 'UA'
  return 'OTHER'
}

export async function detectMarket(): Promise<MarketInfo> {
  try {
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 3500)
    const res = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
    })
    window.clearTimeout(timer)

    if (res.ok) {
      const data = (await res.json()) as { country_code?: string }
      const country = data.country_code?.toUpperCase() ?? null
      const market = marketFromCountry(country) ?? 'OTHER'
      return { market, detectedCountry: country, source: 'ip' }
    }
  } catch {
    // fall through
  }

  const lang =
    typeof navigator !== 'undefined'
      ? navigator.languages?.[0] || navigator.language
      : undefined

  return {
    market: marketFromLanguage(lang),
    detectedCountry: null,
    source: lang ? 'language' : 'fallback',
  }
}
