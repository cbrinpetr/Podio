'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { FilterPanel } from '@/components/directory/filter-panel'
import { ScrollArea } from '@/components/ui/scroll-area'

export function FilterPanelSheet() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden flex-shrink-0">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="sr-only">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetHeader className="px-6 pt-6 pb-0">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-4rem)] px-6 pb-6">
          <FilterPanel onClose={() => setOpen(false)} className="mt-4" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
