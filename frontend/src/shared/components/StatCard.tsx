import { Card } from '@/shared/components/ui/card'
import { ArrowUp, ArrowDown, Minus, LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface StatCardProps {
    title: string
    value: string | number
    description?: string
    trend?: 'up' | 'down' | 'neutral'
    trendValue?: string
    icon?: LucideIcon
    iconColor?: string
    className?: string
}

export function StatCard({
    title,
    value,
    description,
    trend,
    trendValue,
    icon: Icon,
    iconColor = 'text-slate-600 dark:text-slate-400',
    className
}: StatCardProps) {
    const getTrendIcon = () => {
        switch (trend) {
            case 'up':
                return <ArrowUp className="w-4 h-4" />
            case 'down':
                return <ArrowDown className="w-4 h-4" />
            case 'neutral':
                return <Minus className="w-4 h-4" />
            default:
                return null
        }
    }

    const getTrendColor = () => {
        switch (trend) {
            case 'up':
                return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30'
            case 'down':
                return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30'
            case 'neutral':
                return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/30'
            default:
                return ''
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                type: 'spring',
                stiffness: 100,
                damping: 15
            }}
        >
            <Card className={clsx(
                'relative overflow-hidden border-slate-200 dark:border-neutral-800 bg-white dark:bg-black/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300',
                className
            )}>
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                                {title}
                            </p>
                        </div>
                        {Icon && (
                            <div className={clsx(
                                'p-2 rounded-lg bg-slate-50 dark:bg-neutral-900',
                                iconColor
                            )}>
                                <Icon className="w-5 h-5" />
                            </div>
                        )}
                    </div>

                    {/* Value */}
                    <div className="mb-2">
                        <motion.p
                            className="text-3xl font-black text-slate-900 dark:text-white tracking-tight"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.6,
                                type: 'spring',
                                stiffness: 120,
                                damping: 12,
                                delay: 0.1
                            }}
                        >
                            {value}
                        </motion.p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {trend && trendValue && (
                            <span className={clsx(
                                'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold',
                                getTrendColor()
                            )}>
                                {getTrendIcon()}
                                {trendValue}
                            </span>
                        )}
                        {description && (
                            <p className="text-xs text-slate-500 dark:text-slate-500">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Subtle accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 dark:from-white dark:via-slate-400 dark:to-white opacity-10" />
            </Card>
        </motion.div>
    )
}
