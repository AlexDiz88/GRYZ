import { useTranslation } from 'react-i18next'

export function HowItWorks() {
  const { t } = useTranslation()
  const steps = t('how.steps', { returnObjects: true }) as {
    title: string
    text: string
  }[]

  return (
    <section id="how" className="scroll-mt-20 border-b border-line bg-sand py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          {t('how.eyebrow')}
        </p>
        <h2 className="mt-3 min-h-[2.5em] max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('how.title')}
        </h2>

        <ol className="mt-12 grid items-start gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={index} className="relative">
              <span className="text-5xl font-bold tabular-nums text-brand/20">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 min-h-[1.75rem] text-xl font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-3 min-h-[5.5rem] text-sm leading-relaxed text-muted sm:text-base">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
