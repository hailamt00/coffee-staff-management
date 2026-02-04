export function Pagination({
    page,
    totalPages,
    onPageChange,
}: {
    page: number
    totalPages: number
    onPageChange: (p: number) => void
}) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`h-8 min-w-[32px] rounded border
            ${page === i + 1 ? 'bg-black text-white' : 'hover:bg-slate-200'}
          `}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    )
}
