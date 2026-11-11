import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { submitLead } from '../lib/submitLead'

type LeadFormProps = {
  id?: string
  compact?: boolean
  onOpenPrivacy?: () => void
}

export function LeadForm({ id, compact = false, onOpenPrivacy }: LeadFormProps) {
  const { t, i18n } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const [fieldError, setFieldError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setFieldError(null)

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFieldError(t('form.invalidEmail'))
      return
    }
    if (!consent) {
      setFieldError(t('form.consentRequired'))
      return
    }

    setStatus('loading')
    const result = await submitLead({
      name,
      email,
      uiLanguage: i18n.resolvedLanguage || 'ua',
    })
    setStatus(result.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div
        id={id}
        className="rounded-2xl border border-line bg-white p-6 text-left shadow-[0_12px_40px_rgba(20,20,20,0.06)]"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          OK
        </p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          {t('form.successTitle')}
        </h3>
        <p className="mt-2 text-muted">{t('form.successText')}</p>
      </div>
    )
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className={`rounded-2xl border border-line bg-white shadow-[0_12px_40px_rgba(20,20,20,0.06)] ${
        compact ? 'p-5' : 'p-6 sm:p-7'
      }`}
      data-cta="lead-form"
    >
      <div className={`grid gap-3 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <label className="block text-left">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            {t('form.name')}
          </span>
          <input
            required
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('form.namePlaceholder')}
            className="w-full rounded-xl border border-line bg-cream px-3.5 py-3 text-ink outline-none transition focus:border-brand"
          />
        </label>
        <label className="block text-left">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            {t('form.email')}
          </span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('form.emailPlaceholder')}
            className="w-full rounded-xl border border-line bg-cream px-3.5 py-3 text-ink outline-none transition focus:border-brand"
          />
        </label>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-left text-sm leading-snug text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 size-4 shrink-0 accent-brand"
        />
        <span>
          {t('form.consent')}{' '}
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="font-semibold text-ink underline decoration-brand/40 underline-offset-2 hover:text-brand"
          >
            {t('form.privacyLink')}
          </button>
          .
        </span>
      </label>

      {(fieldError || status === 'error') && (
        <p className="mt-3 text-sm font-medium text-brand" role="alert">
          {fieldError || t('form.error')}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand px-5 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70"
        data-cta="submit-sample"
      >
        {status === 'loading' ? t('form.submitting') : t('form.submit')}
      </button>
    </form>
  )
}
