'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils/cn'
import { slugify } from '@/lib/utils/format'
import {
  ENTITY_TYPES, SECTORS, AUDIENCES, STAGES,
  DELIVERY_MODES, GEOGRAPHIC_COVERAGES, COST_TYPES, ORGANISATION_TYPES,
} from '@/lib/constants/taxonomy'
import { X, Plus, Loader2 } from 'lucide-react'

interface EntityFormProps {
  initial?: any
  mode: 'create' | 'edit'
  entityId?: string
  token?: string // for editor (claimed) mode
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  )
}

function MultiSelect({
  options, selected, onChange,
}: { options: { value: string; label: string; colour?: string }[]; selected: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = selected.includes(opt.value)
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(active ? selected.filter((s) => s !== opt.value) : [...selected, opt.value])}
            className={cn(
              'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
              active ? 'border-transparent bg-primary text-primary-foreground' : 'border-border hover:bg-muted'
            )}
            style={active && opt.colour ? { backgroundColor: opt.colour, borderColor: opt.colour } : undefined}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function TagInput({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
  const [input, setInput] = useState('')
  function add() {
    const val = input.trim().toLowerCase()
    if (val && !tags.includes(val)) onChange([...tags, val])
    setInput('')
  }
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add tag…" className="h-8 text-sm"
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add() } }} />
        <Button type="button" size="sm" variant="outline" onClick={add}><Plus className="h-3.5 w-3.5" /></Button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <Badge key={t} variant="secondary" className="gap-1 text-xs">
            {t}
            <button type="button" onClick={() => onChange(tags.filter((x) => x !== t))}><X className="h-3 w-3" /></button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export function EntityForm({ initial, mode, entityId, token }: EntityFormProps) {
  const router = useRouter()
  const isEditor = !!token
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [f, setF] = useState({
    name: initial?.name ?? '',
    slug: initial?.slug ?? '',
    shortDescription: initial?.shortDescription ?? '',
    description: initial?.description ?? '',
    entityType: initial?.entityType ?? 'organisation',
    organisationType: initial?.organisationType ?? '',
    deliveryMode: initial?.deliveryMode ?? '',
    geographicCoverage: initial?.geographicCoverage ?? '',
    costType: initial?.costType ?? '',
    costDescription: initial?.costDescription ?? '',
    status: initial?.status ?? 'draft',
    verificationStatus: initial?.verificationStatus ?? 'unverified',
    isFeatured: initial?.isFeatured ?? false,
    website: initial?.website ?? '',
    email: initial?.email ?? '',
    phone: initial?.phone ?? '',
    sectors: (initial?.sectors ?? []) as string[],
    audiences: (initial?.audiences ?? []) as string[],
    stages: (initial?.stages ?? []) as string[],
    tags: (initial?.tags ?? []) as string[],
    locationAddressLine1: initial?.locationAddressLine1 ?? '',
    locationSuburb: initial?.locationSuburb ?? '',
    locationState: initial?.locationState ?? '',
    locationPostcode: initial?.locationPostcode ?? '',
    locationLatitude: initial?.locationLatitude ?? '',
    locationLongitude: initial?.locationLongitude ?? '',
    locationPrecinct: initial?.locationPrecinct ?? '',
    locationIsVirtual: initial?.locationIsVirtual ?? false,
    locationNotes: initial?.locationNotes ?? '',
    fundingAmount: initial?.fundingAmount ?? '',
    foundedYear: initial?.foundedYear ?? '',
    applicationDeadline: initial?.applicationDeadline ? initial.applicationDeadline.slice(0, 10) : '',
    programStartDate: initial?.programStartDate ? initial.programStartDate.slice(0, 10) : '',
    programEndDate: initial?.programEndDate ? initial.programEndDate.slice(0, 10) : '',
  })

  function set(key: string, value: any) {
    setF((prev) => ({ ...prev, [key]: value }))
  }

  function inp(key: string) {
    return {
      value: (f as any)[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        set(key, e.target.value),
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...f,
      slug: f.slug || slugify(f.name),
      locationLatitude: f.locationLatitude || null,
      locationLongitude: f.locationLongitude || null,
      fundingAmount: f.fundingAmount || null,
      foundedYear: f.foundedYear || null,
      applicationDeadline: f.applicationDeadline || null,
      programStartDate: f.programStartDate || null,
      programEndDate: f.programEndDate || null,
    }

    let url: string
    let method: string

    if (token) {
      url = `/api/editor/${token}`
      method = 'PUT'
    } else if (mode === 'create') {
      url = '/api/admin/entities'
      method = 'POST'
    } else {
      url = `/api/admin/entities/${entityId}`
      method = 'PUT'
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Something went wrong'); setSaving(false); return }

      if (token) {
        alert('Changes saved successfully!')
      } else {
        router.push('/admin/dashboard')
        router.refresh()
      }
    } catch {
      setError('Network error')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">{error}</div>}

      <Section title="Basic Information">
        <Field label="Name" required>
          <Input {...inp('name')} onBlur={() => { if (!initial?.slug && !f.slug) set('slug', slugify(f.name)) }} required />
        </Field>
        <Field label="Slug" required>
          <Input {...inp('slug')} placeholder="auto-generated-from-name" />
        </Field>
        <Field label="Short Description" required>
          <Input {...inp('shortDescription')} required />
          <p className="mt-1 text-xs text-muted-foreground">1–2 sentences shown on cards. Keep under 160 chars.</p>
        </Field>
        <Field label="Full Description">
          <textarea {...inp('description')} rows={6}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          <p className="mt-1 text-xs text-muted-foreground">Supports markdown.</p>
        </Field>
      </Section>

      <Separator />

      {!isEditor && (
        <>
          <Section title="Classification">
            <Field label="Entity Type" required>
              <select {...inp('entityType')} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {ENTITY_TYPES.map((t) => <option key={t.slug} value={t.slug}>{t.label}</option>)}
              </select>
            </Field>
            <Field label="Organisation Type">
              <select {...inp('organisationType')} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">— Select —</option>
                {ORGANISATION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select {...inp('status')} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
                <option value="pending-review">Pending Review</option>
              </select>
            </Field>
            <Field label="Verification">
              <select {...inp('verificationStatus')} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="unverified">Unverified</option>
                <option value="self-reported">Self-Reported</option>
                <option value="verified">Verified</option>
                <option value="community-verified">Community Verified</option>
              </select>
            </Field>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={f.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} className="rounded" />
              Featured (shown on homepage)
            </label>
          </Section>

          <Separator />
        </>
      )}

      <Section title="Sectors, Audiences & Stages">
        <Field label="Sectors">
          <MultiSelect
            options={SECTORS.map((s) => ({ value: s.slug, label: s.label, colour: s.colour }))}
            selected={f.sectors}
            onChange={(v) => set('sectors', v)}
          />
        </Field>
        <Field label="Target Audiences">
          <MultiSelect
            options={AUDIENCES.map((a) => ({ value: a.slug, label: a.label }))}
            selected={f.audiences}
            onChange={(v) => set('audiences', v)}
          />
        </Field>
        <Field label="Startup Stages">
          <MultiSelect
            options={STAGES.map((s) => ({ value: s.slug, label: s.label }))}
            selected={f.stages}
            onChange={(v) => set('stages', v)}
          />
        </Field>
        <Field label="Tags">
          <TagInput tags={f.tags} onChange={(v) => set('tags', v)} />
        </Field>
      </Section>

      <Separator />

      <Section title="Contact & Links">
        <Field label="Website">
          <Input {...inp('website')} type="url" placeholder="https://" />
        </Field>
        <Field label="Email">
          <Input {...inp('email')} type="email" />
        </Field>
        <Field label="Phone">
          <Input {...inp('phone')} type="tel" />
        </Field>
      </Section>

      <Separator />

      <Section title="Location & Map">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={f.locationIsVirtual} onChange={(e) => set('locationIsVirtual', e.target.checked)} className="rounded" />
          Online / Virtual only (no physical address)
        </label>
        {!f.locationIsVirtual && (
          <>
            <Field label="Address Line 1">
              <Input {...inp('locationAddressLine1')} placeholder="123 Example St" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Suburb">
                <Input {...inp('locationSuburb')} />
              </Field>
              <Field label="State">
                <Input {...inp('locationState')} placeholder="ACT" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Postcode">
                <Input {...inp('locationPostcode')} />
              </Field>
              <Field label="Precinct">
                <Input {...inp('locationPrecinct')} placeholder="City / Civic" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Latitude (for map)">
                <Input {...inp('locationLatitude')} type="number" step="0.0001" placeholder="-35.2809" />
              </Field>
              <Field label="Longitude (for map)">
                <Input {...inp('locationLongitude')} type="number" step="0.0001" placeholder="149.1300" />
              </Field>
            </div>
            <p className="text-xs text-muted-foreground">
              Find coordinates at{' '}
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="underline">Google Maps</a>
              {' '}— right-click a location and click the coordinates.
            </p>
            <Field label="Location Notes">
              <Input {...inp('locationNotes')} placeholder="e.g. Level 3, Building B" />
            </Field>
          </>
        )}
      </Section>

      <Separator />

      {!isEditor && (
        <>
          <Section title="Delivery & Cost">
            <Field label="Delivery Mode">
              <select {...inp('deliveryMode')} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">— Select —</option>
                {DELIVERY_MODES.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </Field>
            <Field label="Geographic Coverage">
              <select {...inp('geographicCoverage')} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">— Select —</option>
                {GEOGRAPHIC_COVERAGES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Cost Type">
              <select {...inp('costType')} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">— Select —</option>
                {COST_TYPES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Cost Description">
              <Input {...inp('costDescription')} placeholder="e.g. $500/month membership" />
            </Field>
            <Field label="Funding Amount (AUD)">
              <Input {...inp('fundingAmount')} type="number" placeholder="50000" />
            </Field>
          </Section>

          <Separator />

          <Section title="Dates">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Program Start Date">
                <Input {...inp('programStartDate')} type="date" />
              </Field>
              <Field label="Program End Date">
                <Input {...inp('programEndDate')} type="date" />
              </Field>
            </div>
            <Field label="Application Deadline">
              <Input {...inp('applicationDeadline')} type="date" />
            </Field>
            <Field label="Founded Year">
              <Input {...inp('foundedYear')} type="number" placeholder="2020" />
            </Field>
          </Section>

          <Separator />
        </>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === 'create' ? 'Create entry' : 'Save changes'}
        </Button>
        {!token && (
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
