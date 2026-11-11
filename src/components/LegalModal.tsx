import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export type LegalDoc = 'privacy' | 'cookies'

type LegalModalProps = {
  doc: LegalDoc | null
  onClose: () => void
}

export function LegalModal({ doc, onClose }: LegalModalProps) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!doc) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [doc, onClose])

  if (!doc) return null

  const title =
    doc === 'privacy' ? t('legal.privacyTitle') : t('legal.cookiesTitle')
  const body = t(
    doc === 'privacy' ? 'legal.privacyBody' : 'legal.cookiesBody',
    { returnObjects: true },
  ) as string[]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-cream p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="legal-title" className="text-2xl font-bold text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line px-2.5 py-1 text-sm font-semibold text-ink"
          >
            {t('legal.close')}
          </button>
        </div>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
          {body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
