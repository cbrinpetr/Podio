import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { slugify } from '@/lib/utils/format'

function requireAdmin(session: any) {
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const err = requireAdmin(session)
  if (err) return err

  const sp = req.nextUrl.searchParams
  const status = sp.get('status') ?? undefined
  const q = sp.get('q') ?? undefined

  const where: any = {}
  if (status) where.status = status
  if (q) where.OR = [
    { name: { contains: q, mode: 'insensitive' } },
    { shortDescription: { contains: q, mode: 'insensitive' } },
  ]

  const entities = await prisma.entity.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true, slug: true, name: true, entityType: true,
      status: true, isFeatured: true, updatedAt: true, viewCount: true,
      verificationStatus: true,
    },
  })

  return NextResponse.json({ entities })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const err = requireAdmin(session)
  if (err) return err

  const body = await req.json()

  const slug = body.slug || slugify(body.name)

  // Check slug uniqueness
  const existing = await prisma.entity.findUnique({ where: { slug } })
  if (existing) {
    return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
  }

  const entity = await prisma.entity.create({
    data: {
      slug,
      name: body.name,
      shortDescription: body.shortDescription,
      description: body.description,
      entityType: body.entityType,
      organisationType: body.organisationType,
      deliveryMode: body.deliveryMode,
      geographicCoverage: body.geographicCoverage,
      costType: body.costType,
      costDescription: body.costDescription,
      status: body.status ?? 'draft',
      verificationStatus: body.verificationStatus ?? 'unverified',
      isFeatured: body.isFeatured ?? false,
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
      publishedAt: body.status === 'published' ? new Date() : null,
    },
  })

  return NextResponse.json({ entity }, { status: 201 })
}
