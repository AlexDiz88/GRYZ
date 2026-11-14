import { useTranslation } from 'react-i18next'
import audienceBusy from '../assets/audience-busy.jpg'
import audienceSport from '../assets/audience-sport.jpg'
import audienceTravel from '../assets/audience-travel.jpg'

const images = [audienceBusy, audienceSport, audienceTravel]

export function Audience() {
  const { t } = useTranslation()
  const items = t('audience.items', { returnObjects: true }) as {
    title: string
    text: string
  }[]

  return (
    <section className="border-b border-line bg-cream py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          {t('audience.eyebrow')}
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('audience.title')}
        </h2>

        <div className="mt-4 grid items-stretch gap-6 sm:gap-8 lg:grid-cols-3">
          {items.map((item, index) => (
            <article key={index} className="flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-sand">
                <img
                  src={images[index]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
