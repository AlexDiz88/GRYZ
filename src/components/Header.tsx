import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

const links = [
  { href: '#how', key: 'nav.how' },
  { href: '#nutrition', key: 'nav.nutrition' },
  { href: '#flavors', key: 'nav.flavors' },
  { href: '#faq', key: 'nav.faq' },
] as const

export function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="text-2xl font-bold tracking-[0.04em] text-ink sm:text-[1.75rem]">
          {t('hero.brand')}
        </a>

        <nav className="hidden items-center gap-5 lg:gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-muted transition hover:text-ink"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex rounded-lg border border-line px-2.5 py-2 text-ink md:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-cream px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink"
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
