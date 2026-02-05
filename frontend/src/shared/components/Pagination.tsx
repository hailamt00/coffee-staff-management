import { cn } from '@/shared/utils/cn'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center gap-1">
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1
        const isActive = page === pageNumber

        return (
          <button
            key={pageNumber}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            disabled={isActive}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              'h-8 min-w-[32px] rounded-md border text-sm transition',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isActive
                ? 'bg-primary text-primary-foreground cursor-default'
                : 'hover:bg-muted'
            )}
          >
            {pageNumber}
          </button>
        )
      })}
    </div>
  )
}
