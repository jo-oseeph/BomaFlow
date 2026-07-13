import type { ReactNode } from 'react'

export default function ListingGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="h-48 animate-pulse bg-gray-200" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
            <div className="flex gap-3">
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ListingStateMessage({
  title,
  message,
  action,
}: {
  title: string
  message: string
  action?: ReactNode
}) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-light px-6 py-12 text-center">
      <h3 className="mb-2 text-lg font-semibold text-navy">{title}</h3>
      <p className="mx-auto mb-6 max-w-md text-sm text-gray-text">{message}</p>
      {action}
    </div>
  )
}
