import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function Faq() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as {
    q: string
    a: string
  }[]
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="scroll-mt-20 border-b border-line bg-cream py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          {t('faq.eyebrow')}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('faq.title')}
        </h2>

        <div className="mt-8 divide-y divide-line border-y border-line sm:mt-10">
          {items.map((item, index) => {
            const open = openIndex === index
            return (
              <div key={index}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span className="text-base font-semibold text-ink sm:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`text-brand transition ${open ? 'rotate-45' : ''}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {open && (
                  <p className="pb-5 text-sm leading-relaxed text-muted sm:text-base">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
