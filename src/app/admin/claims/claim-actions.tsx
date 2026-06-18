'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2, Send, X, Check } from 'lucide-react'

export function ClaimActions({ claimId, status }: { claimId: string; status: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [inviteUrl, setInviteUrl] = useState('')

  async function sendInvite() {
    setLoading('invite')
    const res = await fetch(`/api/admin/claims/${claimId}/invite`, { method: 'POST' })
    const data = await res.json()
    if (res.ok) {
      setInviteUrl(data.editUrl)
      router.refresh()
    }
    setLoading(null)
  }

  async function reject() {
    if (!confirm('Reject this claim request?')) return
    setLoading('reject')
    await fetch(`/api/admin/claims/${claimId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected' }),
    })
    router.refresh()
    setLoading(null)
  }

  async function remove() {
    if (!confirm('Delete this claim request?')) return
    setLoading('delete')
    await fetch(`/api/admin/claims/${claimId}`, { method: 'DELETE' })
    router.refresh()
    setLoading(null)
  }

  return (
    <div className="space-y-3">
      {inviteUrl && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-xs">
          <p className="font-medium text-green-800 mb-1">✓ Invite link generated — copy and send to claimant:</p>
          <p className="font-mono break-all text-green-700">{inviteUrl}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {status === 'pending' && (
          <>
            <Button size="sm" onClick={sendInvite} disabled={!!loading}>
              {loading === 'invite' ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Send className="mr-1.5 h-3.5 w-3.5" />}
              Approve & send invite
            </Button>
            <Button size="sm" variant="outline" onClick={reject} disabled={!!loading}>
              {loading === 'reject' ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <X className="mr-1.5 h-3.5 w-3.5" />}
              Reject
            </Button>
          </>
        )}
        {status === 'approved' && (
          <Button size="sm" onClick={sendInvite} disabled={!!loading} variant="outline">
            {loading === 'invite' ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Send className="mr-1.5 h-3.5 w-3.5" />}
            Regenerate invite link
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={remove} disabled={!!loading}
          className="text-muted-foreground hover:text-destructive">
          Delete
        </Button>
      </div>
    </div>
  )
}
