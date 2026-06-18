import { NextRequest, NextResponse } from 'next/server'
import { listEntitiesFromDB } from '@/lib/data/db-entities'
import type { FilterState } from '@/types/entity'

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams

  const filter: FilterState = {
    q: sp.get('q') ?? undefined,
    type: sp.getAll('type').length > 0 ? (sp.getAll('type') as any) : undefined,
    sector: sp.getAll('sector').length > 0 ? (sp.getAll('sector') as any) : undefined,
    audience: sp.getAll('audience').length > 0 ? (sp.getAll('audience') as any) : undefined,
    stage: sp.getAll('stage').length > 0 ? (sp.getAll('stage') as any) : undefined,
    delivery: (sp.get('delivery') as any) ?? undefined,
    coverage: (sp.get('coverage') as any) ?? undefined,
    cost: (sp.get('cost') as any) ?? undefined,
    featured: sp.get('featured') === 'true' ? true : undefined,
    page: sp.get('page') ? Number(sp.get('page')) : 1,
    sort: (sp.get('sort') as any) ?? undefined,
  }

  const result = await listEntitiesFromDB(filter)
  return NextResponse.json(result)
}
