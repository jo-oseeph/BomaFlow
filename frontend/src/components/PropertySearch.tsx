import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from './icons'
import {
  MAX_PRICES,
  MIN_PRICES,
  PROPERTY_TYPES,
  filtersToParams,
  type SearchFilters,
} from '../types/listing'
import { useSearchOptions } from '../hooks/useListings'

const EMPTY_FILTERS: SearchFilters = {
  type: '',
  location: '',
  minPrice: '',
  maxPrice: '',
}

interface PropertySearchProps {
  variant?: 'hero' | 'page'
  initialFilters?: SearchFilters
}

export default function PropertySearch({
  variant = 'hero',
  initialFilters = EMPTY_FILTERS,
}: PropertySearchProps) {
  const navigate = useNavigate()
  const { data: searchOptions } = useSearchOptions()
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)

  const typeOptions = [
    'All Types',
    ...(searchOptions?.types.length ? searchOptions.types : [...PROPERTY_TYPES.slice(1)]),
  ]
  const locationOptions = [
    'All Locations',
    ...(searchOptions?.locations.length
      ? searchOptions.locations
      : ['Nairobi', 'Mombasa', 'Kiambu', 'Nakuru']),
  ]

  function updateFilter(key: keyof SearchFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const params = filtersToParams(filters)
    const query = params.toString()
    navigate(query ? `/properties?${query}` : '/properties')
  }

  function handleReset() {
    setFilters(EMPTY_FILTERS)
    navigate('/properties')
  }

  const isHero = variant === 'hero'

  return (
    <form onSubmit={handleSubmit} className={isHero ? '' : 'w-full'}>
      <div
        className={`flex flex-wrap items-center bg-surface lg:flex-nowrap ${
          isHero
            ? 'mx-auto max-w-5xl rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.15)]'
            : 'rounded-xl border border-border shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
        }`}
      >
        <SearchSelect
          placeholder="Property Type"
          value={filters.type}
          options={typeOptions}
          onChange={(value) => updateFilter('type', value)}
        />
        <SearchSelect
          placeholder="Location"
          value={filters.location}
          options={locationOptions}
          onChange={(value) => updateFilter('location', value)}
        />
        <SearchSelect
          placeholder="Min Price"
          value={filters.minPrice}
          options={MIN_PRICES.map((p) => ({ label: p.label, value: p.value }))}
          onChange={(value) => updateFilter('minPrice', value)}
        />
        <SearchSelect
          placeholder="Max Price"
          value={filters.maxPrice}
          options={MAX_PRICES.map((p) => ({ label: p.label, value: p.value }))}
          onChange={(value) => updateFilter('maxPrice', value)}
          isLast
        />
        <button
          type="submit"
          className={`shrink-0 bg-navy text-[11px] font-bold tracking-wide text-white transition-colors hover:bg-navy-light ${
            isHero
              ? 'm-1 rounded px-6 py-2.5 lg:m-0 lg:rounded-l-none lg:rounded-r-lg lg:px-7 lg:py-3'
              : 'rounded-r-xl px-6 py-3'
          }`}
        >
          SEARCH PROPERTY
        </button>
      </div>

      {!isHero && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-medium text-muted transition-colors hover:text-gold"
          >
            Clear all filters
          </button>
        </div>
      )}
    </form>
  )
}

function SearchSelect({
  placeholder,
  value,
  options,
  onChange,
  isLast = false,
}: {
  placeholder: string
  value: string
  options: string[] | Array<{ label: string; value: string }>
  onChange: (value: string) => void
  isLast?: boolean
}) {
  const isStringOptions = options.length > 0 && typeof options[0] === 'string'

  return (
    <div
      className={`group flex flex-1 items-center gap-1.5 border-border px-4 py-2.5 transition-colors hover:bg-surface-alt/80 lg:py-3 ${
        isLast ? '' : 'border-b lg:border-b-0 lg:border-r'
      }`}
    >
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full cursor-pointer appearance-none bg-transparent text-xs font-medium text-navy outline-none dark:text-foreground"
      >
        <option value="">{placeholder}</option>
        {isStringOptions
          ? (options as string[])
              .filter((option) => !option.startsWith('All '))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
          : (options as Array<{ label: string; value: string }>)
              .filter((option) => option.value !== '')
              .map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
      </select>
      <ChevronDownIcon className="h-3.5 w-3.5 shrink-0 text-muted" />
    </div>
  )
}
