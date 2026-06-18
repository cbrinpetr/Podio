'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Flag, X, Loader2, CheckCircle } from 'lucide-react'

interface ClaimButtonProps {
  entityId: string
  entityName: string
}

export function ClaimButton({ entityId, entityName }: ClaimButtonProps) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', position: '', description: '', email: '' })

  function set(k: string, v: string) { setForm((p) => ({ ...p, [k]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityId, ...form }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Something went wrong'); setSubmitting(false); return }
      setDone(true)
    } catch {
      setError('Network error. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <Flag className="h-3.5 w-3.5" />
        Claim this profile
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border bg-background shadow-xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="font-semibold">Claim profile: {entityName}</h2>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            {done ? (
              <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
                <p className="font-medium">Request submitted!</p>
                <p className="text-sm text-muted-foreground">
                  Our admin team will review your request and send you an invite link to edit this profile.
                </p>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
                <p className="text-sm text-muted-foreground">
                  Tell us about your relationship to this organisation. Our admin team will review and invite you to edit the profile.
                </p>

                {error && <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">{error}</div>}

                <div>
                  <label className="mb-1 block text-sm font-medium">Your name <span className="text-destructive">*</span></label>
                  <Input value={form.name} onChange={(e) => set('name', e.target.value)} required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Your position / title <span className="text-destructive">*</span></label>
                  <Input value={form.position} onChange={(e) => set('position', e.target.value)} placeholder="e.g. CEO, Program Manager" required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Your relationship to this organisation <span className="text-destructive">*</span></label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="e.g. I am the founder and run this program day-to-day."
                    rows={3}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email address <span className="text-destructive">*</span></label>
                  <Input value={form.email} onChange={(e) => set('email', e.target.value)} type="email" required />
                </div>

                <div className="flex gap-3 pt-1">
                  <Button type="submit" disabled={submitting} className="flex-1">
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit claim
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
