import type { Metadata } from 'next'
import { AdvisorChat } from '@/components/advisor/advisor-chat'

export const metadata: Metadata = {
  title: 'AI Advisor',
  description: 'Get personalised recommendations for programs, grants, and support in the ACT innovation ecosystem.',
}

export default function AdvisorPage() {
  return (
    <div className="container py-8" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="mx-auto flex h-full max-w-3xl flex-col">
        <div className="mb-4 flex-shrink-0">
          <h1 className="text-2xl font-bold">AI Advisor</h1>
          <p className="text-muted-foreground text-sm">
            Get personalised recommendations for your innovation journey in the ACT
          </p>
        </div>
        <div className="flex-1 overflow-hidden rounded-xl border bg-card shadow-sm min-h-0">
          <AdvisorChat />
        </div>
      </div>
    </div>
  )
}
