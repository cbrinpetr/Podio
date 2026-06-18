import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { entityId, name, position, description, email } = body

  if (!entityId || !name || !position || !description || !email) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  const entity = await prisma.entity.findUnique({ where: { id: entityId } })
  if (!entity) return NextResponse.json({ error: 'Entity not found' }, { status: 404 })

  // Prevent duplicate pending claims from same email for same entity
  const existing = await prisma.claimRequest.findFirst({
    where: { entityId, email, status: 'pending' },
  })
  if (existing) {
    return NextResponse.json({ error: 'A claim request already exists from this email' }, { status: 409 })
  }

  const claim = await prisma.claimRequest.create({
    data: { entityId, name, position, description, email },
  })

  return NextResponse.json({ claim }, { status: 201 })
}
