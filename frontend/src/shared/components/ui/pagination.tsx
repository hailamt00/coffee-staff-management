import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'

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
    <div className="flex justify-center gap-1.5 mt-6">
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1
        const isActive = page === pageNumber

        return (
          <Button
            key={pageNumber}
            variant={isActive ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(pageNumber)}
            disabled={isActive}
            className={cn(
              "h-9 w-9 rounded-lg font-black text-[11px] transition-all duration-200",
              isActive
                ? "bg-slate-900 text-white dark:bg-white dark:text-black border-slate-900 dark:border-white shadow-lg shadow-black/10 dark:shadow-white/5"
                : "border-slate-200 dark:border-neutral-800 text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            {pageNumber}
          </Button>
        )
      })}
    </div>
  )
}
