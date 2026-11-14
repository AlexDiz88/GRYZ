import { useTranslation } from 'react-i18next'
import type { AppLanguage } from '../i18n'

const options: { code: AppLanguage; label: string }[] = [
  { code: 'ua', label: 'UA' },
  { code: 'pl', label: 'PL' },
  { code: 'ru', label: 'RU' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = (i18n.resolvedLanguage || 'ua').split('-')[0] as AppLanguage

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-line bg-white p-0.5"
      role="group"
      aria-label="Language"
    >
      {options.map(({ code, label }) => {
        const active = current === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => void i18n.changeLanguage(code)}
            className={`min-w-9 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition ${
              active
                ? 'bg-ink text-white'
                : 'text-muted hover:text-ink'
            }`}
            aria-pressed={active}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
