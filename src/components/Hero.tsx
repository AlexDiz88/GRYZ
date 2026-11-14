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

      <div className="relative mx-auto grid max-w-6xl items-center gap-0 px-4 pt-6 pb-0 sm:gap-6 sm:px-6 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-8">
        <div className="max-w-xl">
          <h1 className="reveal min-h-[4.5lh] max-w-xl text-[1.85rem] font-bold leading-[1.12] tracking-tight text-ink sm:min-h-[3.2lh] sm:text-4xl lg:text-[2.75rem]">
            {t('hero.headline')}
          </h1>
          <p className="reveal reveal-delay-1 mt-3 min-h-[4.5rem] max-w-md text-base leading-relaxed text-muted sm:min-h-[4.5rem] sm:text-lg lg:mt-2">
            {t('hero.sub')}
          </p>
          <p className="reveal reveal-delay-1 mt-3 min-h-[2.75rem] max-w-md text-sm font-semibold leading-snug text-ink sm:mt-3 sm:min-h-[2.5rem]">
            {t('hero.badge')}
          </p>

          <div className="reveal reveal-delay-3 mt-4 sm:mt-6">
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

        <div className="reveal reveal-delay-2 relative -mt-1 -mb-2 mx-auto w-full max-w-[20.5rem] sm:mt-0 sm:mb-0 sm:max-w-[22.5rem] lg:max-w-[25rem]">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(31,122,77,0.18),transparent_65%)] blur-2xl sm:-inset-6" />
          <img
            src={productImg}
            alt={t('hero.brand')}
            className="w-full object-contain drop-shadow-[0_16px_28px_rgba(20,20,20,0.16)] sm:drop-shadow-[0_30px_60px_rgba(20,20,20,0.22)]"
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
