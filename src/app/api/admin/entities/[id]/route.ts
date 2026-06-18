import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

function requireAdmin(session: any) {
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const err = requireAdmin(session)
  if (err) return err

  const entity = await prisma.entity.findUnique({ where: { id: params.id } })
  if (!entity) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ entity })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const err = requireAdmin(session)
  if (err) return err

  const body = await req.json()

  const wasPublished = body.status === 'published'
  const current = await prisma.entity.findUnique({ where: { id: params.id }, select: { publishedAt: true, status: true } })

  const entity = await prisma.entity.update({
    where: { id: params.id },
    data: {
      name: body.name,
      slug: body.slug,
      shortDescription: body.shortDescription,
      description: body.description,
      entityType: body.entityType,
      organisationType: body.organisationType,
      deliveryMode: body.deliveryMode,
      geographicCoverage: body.geographicCoverage,
      costType: body.costType,
      costDescription: body.costDescription,
      status: body.status,
      verificationStatus: body.verificationStatus,
      isFeatured: body.isFeatured,
      website: body.website,
      email: body.email,
      phone: body.phone,
      sectors: body.sectors ?? [],
      audiences: body.audiences ?? [],
      stages: body.stages ?? [],
      tags: body.tags ?? [],
      contacts: body.contacts ?? [],
      socialLinks: body.socialLinks,
      locationAddressLine1: body.locationAddressLine1,
      locationSuburb: body.locationSuburb,
      locationState: body.locationState,
      locationPostcode: body.locationPostcode,
      locationLatitude: body.locationLatitude ? parseFloat(body.locationLatitude) : null,
      locationLongitude: body.locationLongitude ? parseFloat(body.locationLongitude) : null,
      locationPrecinct: body.locationPrecinct,
      locationIsVirtual: body.locationIsVirtual ?? false,
      locationNotes: body.locationNotes,
      fundingAmount: body.fundingAmount ? parseFloat(body.fundingAmount) : null,
      foundedYear: body.foundedYear ? parseInt(body.foundedYear) : null,
      programStartDate: body.programStartDate ? new Date(body.programStartDate) : null,
      programEndDate: body.programEndDate ? new Date(body.programEndDate) : null,
      applicationDeadline: body.applicationDeadline ? new Date(body.applicationDeadline) : null,
      sourceUrl: body.sourceUrl,
      publishedAt: wasPublished && !current?.publishedAt ? new Date() : current?.publishedAt,
    },
  })

  return NextResponse.json({ entity })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const err = requireAdmin(session)
  if (err) return err

  await prisma.entity.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
