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
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`h-8 min-w-[32px] rounded border text-sm transition
              ${
                page === pageNumber
                  ? 'bg-black text-white'
                  : 'hover:bg-slate-200'
              }
            `}
          >
            {pageNumber}
          </button>
        )
      })}
    </div>
  )
}
