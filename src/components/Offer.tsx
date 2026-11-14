import { useTranslation } from 'react-i18next'
import { LeadForm } from './LeadForm'

type OfferProps = {
  onOpenPrivacy: () => void
}

export function Offer({ onOpenPrivacy }: OfferProps) {
  const { t } = useTranslation()

  return (
    <section
      id="offer"
      className="scroll-mt-[60px] border-b border-line bg-sand py-12 sm:py-16"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t('offer.title')}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {t('offer.body')}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink">
            {t('offer.action')}
          </p>
          <p className="mt-6 max-w-md text-sm font-medium leading-relaxed text-brand">
            {t('offer.note')}
          </p>
        </div>

        <LeadForm compact onOpenPrivacy={onOpenPrivacy} />
      </div>
    </section>
  )
}
