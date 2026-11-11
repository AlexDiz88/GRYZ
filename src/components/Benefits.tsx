import { useTranslation } from 'react-i18next'

export function Benefits() {
  const { t } = useTranslation()
  const items = t('benefits.items', { returnObjects: true }) as {
    title: string
    text: string
  }[]

  return (
    <section className="border-b border-line bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          {t('benefits.eyebrow')}
        </p>
        <h2 className="mt-3 min-h-[2.5em] max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('benefits.title')}
        </h2>

        <div className="mt-10 grid items-start gap-8 md:grid-cols-3 md:gap-10">
          {items.map((item, index) => (
            <div key={index} className="border-t border-line pt-5">
              <h3 className="min-h-[1.75rem] text-xl font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 min-h-[6.5rem] text-sm leading-relaxed text-muted sm:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
