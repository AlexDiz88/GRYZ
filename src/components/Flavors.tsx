import { useTranslation } from 'react-i18next'
import flavorsImg from '../assets/image2.png'

export function Flavors() {
  const { t } = useTranslation()
  const items = t('flavors.items', { returnObjects: true }) as {
    name: string
    text: string
  }[]

  return (
    <section
      id="flavors"
      className="scroll-mt-20 border-b border-line bg-cream"
    >
      <div className="mx-auto grid max-w-6xl lg:grid-cols-[1fr_minmax(220px,280px)]">
        <div className="px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            {t('flavors.eyebrow')}
          </p>
          <h2 className="mt-3 min-h-[2.5em] max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t('flavors.title')}
          </h2>
          <p className="mt-4 min-h-[3rem] max-w-xl text-muted">{t('flavors.sub')}</p>

          <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border border-line bg-white px-5 py-5 transition hover:border-brand/40"
              >
                <span
                  aria-hidden
                  className="mt-1 size-2.5 shrink-0 rounded-full bg-brand"
                />
                <div>
                  <h3 className="text-lg font-bold text-ink">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-0">
          <img
            src={flavorsImg}
            alt=""
            width={376}
            height={1040}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
