'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import type { SiteContentField } from '@/lib/site-content/definitions'

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function setNestedValue(target: unknown, path: Array<string | number>, value: unknown): unknown {
  if (path.length === 0) return value

  const [head, ...tail] = path
  const current = Array.isArray(target) ? [...target] : { ...(target as Record<string, unknown>) }

  if (tail.length === 0) {
    ;(current as Record<string | number, unknown>)[head] = value
    return current
  }

  const nextCurrent = (current as Record<string | number, unknown>)[head]
  ;(current as Record<string | number, unknown>)[head] = setNestedValue(
    nextCurrent ?? (typeof tail[0] === 'number' ? [] : {}),
    tail,
    value
  )

  return current
}

function getNestedValue(target: any, path: Array<string | number>) {
  return path.reduce((acc, key) => acc?.[key], target)
}

function getEmptyValue(field: SiteContentField): unknown {
  switch (field.type) {
    case 'number':
      return 0
    case 'array':
      return []
    case 'group':
      return Object.fromEntries(field.fields.map((item) => [item.key, getEmptyValue(item)]))
    default:
      return ''
  }
}

function InputField({
  field,
  path,
  value,
  onChange,
}: {
  field: SiteContentField
  path: Array<string | number>
  value: any
  onChange: (path: Array<string | number>, value: unknown) => void
}) {
  if (field.type === 'group') {
    return (
      <section className="rounded-[24px] border border-white/10 bg-black/20 p-6">
        <div className="mb-5">
          <Heading as="h4" color="white" className="text-[24px]">
            {field.label}
          </Heading>
          {field.description && (
            <p className="mt-2 text-sm text-white/55">{field.description}</p>
          )}
        </div>

        <div className="space-y-5">
          {field.fields.map((child) => (
            <InputField
              key={child.key}
              field={child}
              path={[...path, child.key]}
              value={value?.[child.key]}
              onChange={onChange}
            />
          ))}
        </div>
      </section>
    )
  }

  if (field.type === 'array') {
    const arrayValue = Array.isArray(value) ? value : []

    return (
      <section className="rounded-[24px] border border-white/10 bg-black/20 p-6">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Heading as="h4" color="white" className="text-[24px]">
              {field.label}
            </Heading>
            {field.description && (
              <p className="mt-2 text-sm text-white/55">{field.description}</p>
            )}
          </div>
          <Button
            onClick={() =>
              onChange(path, [
                ...arrayValue,
                Object.fromEntries(field.fields.map((item) => [item.key, getEmptyValue(item)])),
              ])
            }
            type="button"
            size="sm"
          >
            Voeg {field.itemLabel ?? 'item'} toe
          </Button>
        </div>

        <div className="space-y-4">
          {arrayValue.length === 0 && (
            <div className="rounded-[18px] border border-dashed border-white/10 px-4 py-5 text-sm text-white/45">
              Nog geen items toegevoegd.
            </div>
          )}

          {arrayValue.map((item, index) => (
            <div key={index} className="rounded-[18px] border border-white/8 bg-white/[0.02] p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="text-sm uppercase tracking-[0.2em] text-white/40">
                  {field.itemLabel ?? 'Item'} {index + 1}
                </div>
                <button
                  type="button"
                  onClick={() => onChange(path, arrayValue.filter((_, itemIndex) => itemIndex !== index))}
                  className="text-sm text-red-300 transition-colors hover:text-red-200"
                >
                  Verwijderen
                </button>
              </div>
              <div className="space-y-4">
                {field.fields.map((child) => (
                  <InputField
                    key={child.key}
                    field={child}
                    path={[...path, index, child.key]}
                    value={item?.[child.key]}
                    onChange={onChange}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const inputType = field.type === 'url' ? 'url' : field.type === 'number' ? 'number' : 'text'

  return (
    <div>
      <label className="mb-2 block text-sm text-white/70">{field.label}</label>
      {field.type === 'textarea' || field.type === 'html' ? (
        <textarea
          rows={field.rows ?? 4}
          value={value ?? ''}
          onChange={(event) => onChange(path, event.target.value)}
          className="w-full rounded-[16px] border border-white/15 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/25"
        />
      ) : (
        <input
          type={inputType}
          value={value ?? ''}
          onChange={(event) =>
            onChange(path, field.type === 'number' ? Number(event.target.value) : event.target.value)
          }
          className="w-full rounded-[16px] border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25"
        />
      )}
      {field.description && <p className="mt-2 text-xs text-white/45">{field.description}</p>}
    </div>
  )
}

export default function ContentEditor({
  contentKey,
  title,
  description,
  fields,
  initialData,
}: {
  contentKey: string
  title: string
  description: string
  fields: SiteContentField[]
  initialData: unknown
}) {
  const [formData, setFormData] = useState(() => cloneValue(initialData))
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (path: Array<string | number>, value: unknown) => {
    setFormData((prev: unknown) => setNestedValue(prev, path, value))
  }

  const handleReset = () => {
    setFormData(cloneValue(initialData))
    setMessage(null)
    setError(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/site-content/${contentKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Opslaan mislukt')
      }

      setMessage('Content opgeslagen en site opnieuw gevalideerd.')
    } catch (submitError) {
      console.error(submitError)
      setError('Opslaan mislukt. Controleer de velden en probeer opnieuw.')
    } finally {
      setSaving(false)
    }
  }

  const completion = fields.reduce((count, field) => {
    const value = getNestedValue(formData, [field.key])
    if (value === null || value === undefined) return count
    if (typeof value === 'string' && value.trim() === '') return count
    if (Array.isArray(value) && value.length === 0) return count
    return count + 1
  }, 0)

  return (
    <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="h-fit rounded-[28px] border border-white/10 bg-white/[0.03] p-6 xl:sticky xl:top-28">
        <p className="text-xs uppercase tracking-[0.25em] text-white/45">{contentKey}</p>
        <Heading as="h2" color="white" className="mt-4 text-[36px] mobile:text-[28px]">
          {title}
        </Heading>
        <p className="mt-4 text-sm leading-6 text-white/65">{description}</p>

        <div className="mt-6 rounded-[20px] border border-white/10 bg-black/20 p-4">
          <div className="text-sm text-white/50">Ingevulde hoofdsecties</div>
          <div className="mt-2 font-anegra text-[34px] text-white">
            {completion}/{fields.length}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {fields.map((field) => (
            <a
              key={field.key}
              href={`#${field.key}`}
              className="block rounded-[16px] border border-white/8 bg-black/15 px-4 py-3 text-sm text-white/65 transition-colors hover:text-white"
            >
              {field.label}
            </a>
          ))}
        </div>
      </aside>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Heading as="h3" color="white" className="text-[28px]">
              Bewerk content
            </Heading>
            <p className="mt-2 text-sm text-white/55">
              Velden zijn vooraf gestructureerd zodat de live site netjes blijft.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/admin/content" variant="dark">
              Terug naar overzicht
            </Button>
            <Button type="button" onClick={handleReset} variant="dark">
              Reset wijzigingen
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Opslaan...' : 'Opslaan'}
            </Button>
          </div>
        </div>

        {message && (
          <div className="rounded-[20px] border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-100">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-[20px] border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-100">
            {error}
          </div>
        )}

        {fields.map((field) => (
          <div key={field.key} id={field.key}>
            <InputField
              field={field}
              path={[field.key]}
              value={getNestedValue(formData, [field.key])}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>
    </div>
  )
}
