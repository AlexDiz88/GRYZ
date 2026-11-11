import { useTranslation } from 'react-i18next'

type FooterProps = {
  onOpenPrivacy: () => void
  onOpenCookies: () => void
}

export function Footer({ onOpenPrivacy, onOpenCookies }: FooterProps) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="max-w-md">
          <p className="text-lg font-bold tracking-[0.04em]">{t('footer.brand')}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {t('footer.tagline')}
          </p>
          <p className="mt-3 text-sm text-white/50">{t('footer.markets')}</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-[0.12em] text-white/40">
            {t('footer.contact')}
          </p>
          <a
            href={`mailto:${t('footer.email')}`}
            className="block text-white transition hover:text-brand"
          >
            {t('footer.email')}
          </a>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-white/70 underline-offset-2 hover:text-white hover:underline"
            >
              {t('footer.privacy')}
            </button>
            <button
              type="button"
              onClick={onOpenCookies}
              className="text-white/70 underline-offset-2 hover:text-white hover:underline"
            >
              {t('footer.cookies')}
            </button>
          </div>
          <p className="pt-4 text-white/40">{t('footer.rights', { year })}</p>
        </div>
      </div>
    </footer>
  )
}
