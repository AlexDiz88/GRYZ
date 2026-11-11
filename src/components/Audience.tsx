import { useTranslation } from 'react-i18next'

export function Audience() {
  const { t } = useTranslation()
  const items = t('audience.items', { returnObjects: true }) as {
    title: string
    text: string
  }[]

  return (
    <section className="border-b border-line bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          {t('audience.eyebrow')}
        </p>
        <h2 className="mt-3 min-h-[2.5em] max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('audience.title')}
        </h2>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={index}
              className="border-l-2 border-brand/70 bg-white px-5 py-6"
            >
              <h3 className="min-h-[3rem] text-lg font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 min-h-[5rem] text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
