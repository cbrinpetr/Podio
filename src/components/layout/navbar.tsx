'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MapPin, Menu, X, Compass, MessageSquare, Map, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { APP_NAME } from '@/lib/constants/config'

const NAV_LINKS = [
  { href: '/directory', label: 'Directory', icon: LayoutGrid },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/advisor', label: 'AI Advisor', icon: MessageSquare },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Compass className="h-4 w-4" />
          </div>
          <span className="hidden font-semibold sm:inline-block">ACT Navigator</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname.startsWith(href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:flex">
            <Link href="/advisor">
              <MessageSquare className="mr-1.5 h-4 w-4" />
              Get matched
            </Link>
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-3">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  pathname.startsWith(href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <div className="mt-2 border-t pt-2">
              <Button asChild size="sm" className="w-full">
                <Link href="/advisor" onClick={() => setOpen(false)}>
                  <MessageSquare className="mr-1.5 h-4 w-4" />
                  Get matched with resources
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
