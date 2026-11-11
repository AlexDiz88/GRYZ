import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getCookieConsent, setCookieConsent } from '../lib/cookies'

type CookieBannerProps = {
  onOpenPolicy: () => void
}

export function CookieBanner({ onOpenPolicy }: CookieBannerProps) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getCookieConsent() === null)
  }, [])

  if (!visible) return null

  function choose(value: 'necessary' | 'all') {
    setCookieConsent(value)
    setVisible(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-[0_20px_60px_rgba(20,20,20,0.18)] sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="text-sm font-bold text-ink">{t('cookies.title')}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {t('cookies.text')}{' '}
            <button
              type="button"
              onClick={onOpenPolicy}
              className="font-semibold text-ink underline decoration-brand/40 underline-offset-2"
            >
              {t('cookies.policy')}
            </button>
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => choose('necessary')}
            className="rounded-xl border border-line px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-ink transition hover:border-ink"
          >
            {t('cookies.acceptNecessary')}
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="rounded-xl bg-brand px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-brand-dark"
          >
            {t('cookies.acceptAll')}
          </button>
        </div>
      </div>
    </div>
  )
}
