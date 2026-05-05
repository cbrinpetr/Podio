import Link from 'next/link'
import { Compass } from 'lucide-react'
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants/config'

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Compass className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold">ACT Navigator</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {APP_DESCRIPTION}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/directory" className="hover:text-foreground transition-colors">Directory</Link></li>
              <li><Link href="/directory?type=program" className="hover:text-foreground transition-colors">Programs</Link></li>
              <li><Link href="/directory?type=grant" className="hover:text-foreground transition-colors">Grants</Link></li>
              <li><Link href="/directory?type=investor" className="hover:text-foreground transition-colors">Investors</Link></li>
              <li><Link href="/map" className="hover:text-foreground transition-colors">Map View</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/advisor" className="hover:text-foreground transition-colors">AI Advisor</Link></li>
            </ul>
            <div className="mt-6 text-xs text-muted-foreground">
              <p>Data is community-curated. If you spot an error or want to add an entity, contact us.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ACT Innovation Ecosystem Navigator. Not affiliated with the ACT Government.</p>
          <p>Powered by <a href="https://cbrin.com.au" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">CBRIN</a> data</p>
        </div>
      </div>
    </footer>
  )
}
