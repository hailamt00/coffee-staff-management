import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center whitespace-nowrap w-fit rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-widest transition-all duration-200",
    {
        variants: {
            variant: {
                active: "bg-slate-900 text-white dark:bg-white dark:text-black border border-slate-900 dark:border-white shadow-sm shadow-black/10 dark:shadow-white/5",
                inactive: "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500 border border-slate-200 dark:border-neutral-800",
            },
        },
        defaultVariants: {
            variant: "active",
        },
    }
)

export interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
    active: boolean
    className?: string
}

export function StatusBadge({ active, className }: StatusBadgeProps) {
    const variant = active ? "active" : "inactive"

    return (
        <span className={cn(badgeVariants({ variant }), className)}>
            {active ? "Active" : "Inactive"}
        </span>
    )
}
