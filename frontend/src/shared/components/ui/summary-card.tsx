import { Card, CardContent } from "@/shared/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

const summaryCardVariants = cva(
    "h-full overflow-hidden border bg-white dark:bg-neutral-900 shadow-sm transition-all duration-300 group",
    {
        variants: {
            color: {
                cyan: "border-slate-200 dark:border-neutral-800",
                blue: "border-slate-200 dark:border-neutral-800",
                red: "border-slate-200 dark:border-neutral-800",
                orange: "border-slate-200 dark:border-neutral-800",
                green: "border-slate-200 dark:border-neutral-800",
            },
        },
        defaultVariants: {
            color: "cyan",
        },
    }
)

interface SummaryCardProps extends VariantProps<typeof summaryCardVariants> {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    trend?: string
    className?: string
}

export function SummaryCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    className,
    color
}: SummaryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
        >
            <Card className={cn(summaryCardVariants({ color }), className)}>
                <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {title}
                            </p>
                            <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                                {value}
                            </h3>
                            {description && (
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                    {description}
                                </p>
                            )}
                            {trend && (
                                <p className="mt-2 text-[10px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-tighter">
                                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                                    {trend}
                                </p>
                            )}
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-neutral-800 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            <Icon size={18} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
