import { useTranslation } from 'react-i18next'
import { LeadForm } from './LeadForm'

type OfferProps = {
  onOpenPrivacy: () => void
}

export function Offer({ onOpenPrivacy }: OfferProps) {
  const { t } = useTranslation()

  return (
    <section className="border-b border-line bg-sand py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            {t('offer.eyebrow')}
          </p>
          <h2 className="mt-3 min-h-[2.5em] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t('offer.title')}
          </h2>
          <p className="mt-5 text-lg font-semibold text-ink">{t('offer.pack')}</p>
          <ul className="mt-4 space-y-2 text-muted">
            <li>{t('offer.priceUa')}</li>
            <li>{t('offer.pricePl')}</li>
            <li className="font-medium text-ink">{t('offer.delivery')}</li>
          </ul>
          <p className="mt-6 min-h-[4rem] max-w-md text-sm leading-relaxed text-muted">
            {t('offer.note')}
          </p>
        </div>

        <LeadForm compact onOpenPrivacy={onOpenPrivacy} />
      </div>
    </section>
  )
}
