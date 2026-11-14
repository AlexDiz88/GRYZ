import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LeadForm } from './LeadForm'

type LeadFormModalProps = {
  open: boolean
  onClose: () => void
  onOpenPrivacy: () => void
}

export function LeadFormModal({
  open,
  onClose,
  onOpenPrivacy,
}: LeadFormModalProps) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!open) return
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
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center bg-ink/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-form-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-cream p-5 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2
            id="lead-form-title"
            className="text-xl font-bold tracking-tight text-ink sm:text-2xl"
          >
            {t('form.modalTitle')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-line px-2.5 py-1 text-sm font-semibold text-ink"
          >
            {t('legal.close')}
          </button>
        </div>
        <LeadForm compact onOpenPrivacy={onOpenPrivacy} />
      </div>
    </div>
  )
}
