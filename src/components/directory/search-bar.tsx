'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { EntitySummary } from '@/types/entity'
import { EntityTypeBadge } from '@/components/entity/entity-type-badge'
import { cn } from '@/lib/utils/cn'

interface SearchBarProps {
  defaultValue?: string
  className?: string
  onSearch?: (q: string) => void
  autoFocus?: boolean
}

export function SearchBar({ defaultValue = '', className, onSearch, autoFocus }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(defaultValue)
  const [suggestions, setSuggestions] = useState<EntitySummary[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setSuggestions(data.results ?? [])
      setShowDropdown(true)
    } catch {
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 250)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [value, fetchSuggestions])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setShowDropdown(false)
    if (onSearch) {
      onSearch(value)
    } else {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set('q', value)
      else params.delete('q')
      params.delete('page')
      router.push(`/directory?${params.toString()}`)
    }
  }

  function handleSuggestionClick(slug: string) {
    setShowDropdown(false)
    router.push(`/directory/${slug}`)
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search programs, grants, investors..."
            className="pl-9 pr-9"
            autoFocus={autoFocus}
            onFocus={() => value.length >= 2 && setShowDropdown(true)}
          />
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
          {!loading && value && (
            <button
              type="button"
              onClick={() => { setValue(''); setSuggestions([]); setShowDropdown(false) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="submit">Search</Button>
      </form>

      {/* Suggestions dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 overflow-hidden rounded-md border bg-popover shadow-lg">
          {suggestions.map((entity) => (
            <button
              key={entity.id}
              type="button"
              onClick={() => handleSuggestionClick(entity.slug)}
              className="flex w-full items-start gap-3 px-4 py-3 text-left text-sm hover:bg-muted transition-colors"
            >
              <EntityTypeBadge type={entity.entityType} showIcon className="mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-medium truncate">{entity.name}</div>
                <div className="text-muted-foreground text-xs truncate">{entity.shortDescription}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
