import { useTranslation } from 'react-i18next'

export function Nutrition() {
  const { t } = useTranslation()
  const items = t('nutrition.items', { returnObjects: true }) as {
    value: string
    label: string
    hint: string
  }[]

  return (
    <section
      id="nutrition"
      className="scroll-mt-20 border-b border-line bg-ink py-12 text-white sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          {t('nutrition.eyebrow')}
        </p>
        <h2 className="mt-3 min-h-[2.5em] max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {t('nutrition.title')}
        </h2>
        <p className="mt-4 min-h-[2.5rem] max-w-2xl text-sm leading-relaxed text-white/65">
          {t('nutrition.disclaimer')}
        </p>

        <div className="mt-8 grid items-start gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {items.map((item, index) => (
            <div key={index} className="border-t border-white/15 pt-5">
              <p className="min-h-[2.25rem] text-3xl font-bold tracking-tight text-white">
                {item.value}
              </p>
              <p className="mt-1 min-h-[1.25rem] text-sm font-semibold uppercase tracking-[0.12em] text-brand">
                {item.label}
              </p>
              <p className="mt-3 min-h-[2.5rem] text-sm text-white/60">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
