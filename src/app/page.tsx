import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, LayoutGrid, Map, MessageSquare, Rocket, DollarSign, Users, TrendingUp, Building2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { EntityCard } from '@/components/entity/entity-card'
import { SearchBar } from '@/components/directory/search-bar'
import { getFeaturedEntitiesFromDB, getEntityStatsFromDB } from '@/lib/data/db-entities'
import { ENTITY_TYPES } from '@/lib/constants/taxonomy'
import { EntityTypeIcon } from '@/components/entity/entity-type-icon'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [featured, stats] = await Promise.all([
    getFeaturedEntitiesFromDB(6),
    getEntityStatsFromDB(),
  ])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-28">
        {/* Dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(214 100% 27% / 0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Canberra&apos;s innovation ecosystem — all in one place
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Navigate the ACT{' '}
              <span className="text-primary">Innovation Ecosystem</span>
            </h1>

            <p className="mb-8 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Discover programs, grants, investors, co-working spaces, and networks supporting innovation in the Australian Capital Territory.
            </p>

            <div className="mx-auto mb-8 max-w-xl">
              <Suspense>
                <SearchBar />
              </Suspense>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/directory">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Browse directory
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/advisor">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Get AI recommendations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="border-b bg-muted/30 py-8">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Resources listed', value: stats.total },
              { label: 'Programs & accelerators', value: (stats.byType.program ?? 0) + (stats.byType['event-series'] ?? 0) },
              { label: 'Grants & investors', value: (stats.byType.grant ?? 0) + (stats.byType.investor ?? 0) },
              { label: 'Spaces & networks', value: (stats.byType.space ?? 0) + (stats.byType.network ?? 0) },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by type ───────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Browse by type</h2>
              <p className="mt-1 text-muted-foreground">Find exactly what you&apos;re looking for</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {ENTITY_TYPES.map((type) => (
              <Link
                key={type.slug}
                href={`/directory?type=${type.slug}`}
                className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center card-hover"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: type.colour }}
                >
                  <EntityTypeIcon type={type.slug} size="md" />
                </div>
                <span className="text-xs font-medium leading-tight group-hover:text-primary transition-colors">
                  {type.label}
                </span>
                {stats.byType[type.slug] !== undefined && (
                  <span className="text-[10px] text-muted-foreground">
                    {stats.byType[type.slug]}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured entities ─────────────────────────────────────────────── */}
      <section className="py-16 bg-muted/20">
        <div className="container">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Featured resources</h2>
              <p className="mt-1 text-muted-foreground">Key organisations and programs in the ACT ecosystem</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
              <Link href="/directory?featured=true">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((entity) => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link href="/directory?featured=true">View all featured</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Features / CTA ───────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LayoutGrid className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold">Browse the directory</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Filter by sector, stage, funding type, and delivery mode to find exactly what you need.
                </p>
                <Link href="/directory" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                  Explore directory <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Map className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold">Interactive map</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See where innovation is happening across the ACT on an interactive map.
                </p>
                <Link href="/map" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                  Open map <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold">AI Advisor</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our AI advisor to get personalised recommendations based on your stage, sector, and goals.
                </p>
                <Link href="/advisor" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                  Get recommendations <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
