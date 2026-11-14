import { useTranslation } from 'react-i18next'

export function Benefits() {
  const { t } = useTranslation()
  const items = t('benefits.items', { returnObjects: true }) as {
    title: string
    text: string
  }[]

  return (
    <section className="border-b border-line bg-cream py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          {t('benefits.eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl text-[2rem] font-bold leading-tight tracking-tight text-ink sm:mt-3 sm:text-4xl">
          {t('benefits.title')}
          <br />
          {t('benefits.titleLine2')}
        </h2>

        <div className="mt-8 grid items-start md:mt-10 md:grid-cols-3 md:gap-10">
          {items.map((item, index) => (
            <div key={index} className="border-t border-line py-6 md:py-0 md:pt-5">
              <span className="text-sm font-bold tabular-nums tracking-wide text-brand">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-ink md:min-h-[2.5lh]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-base leading-[1.65] text-ink/70 md:min-h-[7.5rem]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
