import { useTranslation } from 'react-i18next'
import flavorCheeseburger from '../assets/flavor-cheeseburger.jpg'
import flavorTeriyaki from '../assets/flavor-teriyaki.jpg'
import flavorRisotto from '../assets/flavor-risotto.jpg'
import flavorPizza from '../assets/flavor-pizza.jpg'
import flavorPadthai from '../assets/flavor-padthai.jpg'
import flavorLasagna from '../assets/flavor-lasagna.jpg'

const flavorImages = [
  flavorCheeseburger,
  flavorTeriyaki,
  flavorRisotto,
  flavorPizza,
  flavorPadthai,
  flavorLasagna,
] as const

type MacroKey = 'kcal' | 'protein' | 'fat' | 'carbs' | 'fiber'

type FlavorItem = {
  name: string
  text: string
  nutrition: Record<MacroKey, string>
}

function MacroIcon({ name }: { name: MacroKey }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.35,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'size-5 shrink-0 sm:size-7',
    'aria-hidden': true,
  }

  switch (name) {
    case 'kcal':
      return (
        <svg {...common}>
          <path d="M12 3c1.6 2.4 3 4.2 3 7a3 3 0 1 1-6 0c0-2.8 1.4-4.6 3-7Z" />
          <path d="M8.5 15.5c.8 1.7 2 2.5 3.5 3.5 1.5-1 2.7-1.8 3.5-3.5" />
        </svg>
      )
    case 'protein':
      return (
        <svg {...common}>
          <path d="M7 8.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5-2.2 4.5-5 4.5" />
          <path d="M12 12.5c-2.8 0-5 2-5 4.5v1h10v-1c0-2.5-2.2-4.5-5-4.5Z" />
        </svg>
      )
    case 'fat':
      return (
        <svg {...common}>
          <path d="M12 5.25c2.55 3.15 4.5 5.55 4.5 8.35a4.5 4.5 0 1 1-9 0c0-2.8 1.95-5.2 4.5-8.35Z" />
        </svg>
      )
    case 'carbs':
      return (
        <svg {...common}>
          <path d="M12 20V9" />
          <path d="M12 13c-2.2-1.2-3.8-3.2-4.5-5.5" />
          <path d="M12 13c2.2-1.2 3.8-3.2 4.5-5.5" />
          <path d="M12 17c-2.5-.6-4.5-2-6-4" />
          <path d="M12 17c2.5-.6 4.5-2 6-4" />
        </svg>
      )
    case 'fiber':
      return (
        <svg {...common}>
          <path d="M5 19c6-1 9-4 10-10 0 0 4 1 4 6-5 1-9 3-14 4Z" />
          <path d="M9 15c1.5-2.5 3.5-4.2 6-5" />
        </svg>
      )
  }
}

export function Flavors() {
  const { t } = useTranslation()
  const items = t('flavors.items', { returnObjects: true }) as FlavorItem[]
  const macros = t('flavors.macros', { returnObjects: true }) as Record<
    MacroKey,
    string
  >

  return (
    <section
      id="flavors"
      className="scroll-mt-20 border-b border-line bg-cream"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          {t('flavors.eyebrow')}
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('flavors.title')}
        </h2>
        <p className="mt-4 max-w-xl text-muted sm:max-w-3xl lg:max-w-4xl">
          {t('flavors.sub')}
        </p>

        <ul className="mt-8 divide-y divide-line border-y border-line sm:mt-10">
          {items.map((item, index) => (
            <li
              key={index}
              className="grid grid-cols-[5.75rem_minmax(0,1fr)] gap-x-4 gap-y-2.5 pt-5 pb-3 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-x-6 sm:gap-y-0 sm:py-6 lg:grid-cols-[11rem_minmax(0,1fr)]"
            >
              <div className="relative min-h-[5.75rem] overflow-hidden bg-sand sm:row-span-2 sm:h-full sm:min-h-0">
                <img
                  src={flavorImages[index]}
                  alt=""
                  width={440}
                  height={586}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
                  {item.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {item.text}
                </p>
              </div>

              <dl className="col-span-2 grid grid-cols-5 gap-1 pt-0 sm:col-span-1 sm:col-start-2 sm:mt-4 sm:gap-3">
                {(
                  [
                    ['kcal', item.nutrition.kcal],
                    ['protein', item.nutrition.protein],
                    ['fat', item.nutrition.fat],
                    ['carbs', item.nutrition.carbs],
                    ['fiber', item.nutrition.fiber],
                  ] as const
                ).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex min-w-0 flex-col items-center gap-1 text-center sm:flex-row sm:items-stretch sm:gap-2 sm:text-left"
                  >
                    <span className="hidden items-center justify-center text-brand sm:flex sm:w-8 sm:shrink-0 sm:self-stretch">
                      <MacroIcon name={key} />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[0.55rem] font-semibold uppercase leading-tight tracking-[0.06em] text-brand sm:text-[0.65rem] sm:tracking-[0.1em] sm:text-muted">
                        {macros[key]}
                      </dt>
                      <dd className="mt-0.5 text-xs font-bold leading-none tabular-nums text-ink sm:text-sm">
                        {value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
