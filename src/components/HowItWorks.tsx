import { useTranslation } from 'react-i18next'
import howImg from '../assets/image1.png'

export function HowItWorks() {
  const { t } = useTranslation()
  const steps = t('how.steps', { returnObjects: true }) as {
    title: string
    text: string
  }[]

  return (
    <section id="how" className="scroll-mt-20 border-b border-line bg-sand">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-[minmax(220px,280px)_1fr]">
        <div className="relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-0">
          <img
            src={howImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center justify-start px-4 py-8 sm:py-10 sm:pr-6 sm:pl-8 lg:pl-10">
          <div className="w-full max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              {t('how.eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t('how.title')}
            </h2>

            <ol className="mt-6 space-y-5">
              {steps.map((step, index) => (
                <li key={index} className="relative">
                  <span className="text-3xl font-bold tabular-nums text-brand/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
