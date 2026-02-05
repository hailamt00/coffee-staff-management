export function StatusBadge({ active }: { active: boolean }) {
    return (
        <span
            className={`
        inline-flex items-center whitespace-nowrap w-fit
        rounded-md px-2 py-0.5 text-xs font-medium
        ${active
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-zinc-100 text-zinc-500'}
      `}
        >
            {active ? 'Active' : 'Inactive'}
        </span>
    )
}
