import { NextRequest, NextResponse } from 'next/server'
import { getEntityBySlug, getRelatedEntities } from '@/lib/data/entities'

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const entity = getEntityBySlug(params.slug)
  if (!entity) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const related = getRelatedEntities(entity)
  return NextResponse.json({ entity: { ...entity, relatedEntities: related } })
}
