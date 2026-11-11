export type CookieConsent = 'necessary' | 'all'

const KEY = 'gryz_cookie_consent'

export function getCookieConsent(): CookieConsent | null {
  try {
    const value = localStorage.getItem(KEY)
    if (value === 'necessary' || value === 'all') return value
  } catch {
    // ignore
  }
  return null
}

export function setCookieConsent(value: CookieConsent): void {
  localStorage.setItem(KEY, value)
  // Hook for future GA4 / Ads — only fire when value === 'all'
  window.dispatchEvent(
    new CustomEvent('gryz:cookie-consent', { detail: { value } }),
  )
}
