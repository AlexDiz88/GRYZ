import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import productImgPl from '../assets/product_pl.png'
import productImgUa from '../assets/product_ua.png'
import { LeadFormModal } from './LeadFormModal'

type HeroProps = {
  onOpenPrivacy: () => void
}

export function Hero({ onOpenPrivacy }: HeroProps) {
  const { t, i18n } = useTranslation()
  const productImg = i18n.language === 'pl' ? productImgPl : productImgUa
  const [formOpen, setFormOpen] = useState(false)

  return (
    <section className="relative overflow-hidden border-b border-line bg-sand">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(31,122,77,0.12),transparent_55%),linear-gradient(180deg,#faf8f5_0%,#f3efe8_100%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-5 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
        <div className="max-w-xl">
          <h1 className="reveal min-h-[2.1lh] text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {t('hero.headline')}
          </h1>
          <p className="reveal reveal-delay-1 mt-3 min-h-[4.5rem] max-w-md text-base leading-relaxed text-muted sm:min-h-[5.25rem] sm:text-lg">
            {t('hero.sub')}
          </p>
          <p className="reveal reveal-delay-1 mt-3 min-h-[1.25rem] text-sm font-semibold text-ink sm:mt-4">
            {t('hero.badge')}
          </p>

          <div className="reveal reveal-delay-3 mt-5 sm:mt-8">
            <button
              id="sample"
              type="button"
              onClick={() => setFormOpen(true)}
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-pistachio px-6 text-center text-sm font-bold uppercase tracking-[0.08em] text-ink transition hover:bg-pistachio-dark sm:w-auto"
              data-cta="open-sample"
            >
              {t('hero.cta')}
            </button>
          </div>
        </div>

        <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(31,122,77,0.18),transparent_65%)] blur-2xl sm:-inset-6" />
          <img
            src={productImg}
            alt={t('hero.brand')}
            className="w-full object-contain drop-shadow-[0_30px_60px_rgba(20,20,20,0.22)]"
          />
        </div>
      </div>

      <LeadFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onOpenPrivacy={onOpenPrivacy}
      />
    </section>
  )
}
