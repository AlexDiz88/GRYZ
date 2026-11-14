import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Audience } from './components/Audience'
import { Benefits } from './components/Benefits'
import { CookieBanner } from './components/CookieBanner'
import { Faq } from './components/Faq'
import { Flavors } from './components/Flavors'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { LegalModal, type LegalDoc } from './components/LegalModal'
import { Nutrition } from './components/Nutrition'
import { Offer } from './components/Offer'

export default function App() {
  const { t, i18n } = useTranslation()
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null)

  const openPrivacy = useCallback(() => setLegalDoc('privacy'), [])
  const openCookies = useCallback(() => setLegalDoc('cookies'), [])
  const closeLegal = useCallback(() => setLegalDoc(null), [])

  useEffect(() => {
    const title = t('meta.title')
    const description = t('meta.description')
    document.title = title

    const setMeta = (selector: string, content: string, attr = 'content') => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, content)
    }

    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)

    document.documentElement.lang =
      i18n.resolvedLanguage === 'ua'
        ? 'uk'
        : i18n.resolvedLanguage === 'pl'
          ? 'pl'
          : i18n.resolvedLanguage === 'ru'
            ? 'ru'
            : 'uk'
  }, [t, i18n.resolvedLanguage])

  useEffect(() => {
    const y = window.scrollY
    const id = window.requestAnimationFrame(() => {
      window.scrollTo(0, y)
    })
    return () => window.cancelAnimationFrame(id)
  }, [i18n.language])

  return (
    <div id="top" className="min-h-dvh">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <Audience />
        <Nutrition />
        <Flavors />
        <Offer onOpenPrivacy={openPrivacy} />
        <Faq />
      </main>
      <Footer onOpenPrivacy={openPrivacy} onOpenCookies={openCookies} />
      <CookieBanner onOpenPolicy={openCookies} />
      <LegalModal doc={legalDoc} onClose={closeLegal} />
    </div>
  )
}
