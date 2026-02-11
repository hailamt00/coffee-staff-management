import { LucideIcon } from 'lucide-react'
import clsx from 'clsx'

interface MetricBadgeProps {
    icon?: LucideIcon
    label: string
    value: string | number
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export function MetricBadge({
    icon: Icon,
    label,
    value,
    variant = 'default',
    size = 'md',
    className
}: MetricBadgeProps) {
    const getVariantClasses = () => {
        switch (variant) {
            case 'success':
                return 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
            case 'warning':
                return 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
            case 'danger':
                return 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
            case 'info':
                return 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
            default:
                return 'bg-slate-50 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-neutral-800'
        }
    }

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-2 py-1 text-xs gap-1'
            case 'lg':
                return 'px-4 py-2.5 text-base gap-2'
            default:
                return 'px-3 py-1.5 text-sm gap-1.5'
        }
    }

    return (
        <div className={clsx(
            'inline-flex items-center rounded-lg border font-bold',
            getVariantClasses(),
            getSizeClasses(),
            className
        )}>
            {Icon && <Icon className={size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />}
            <span className="flex items-baseline gap-1.5">
                <span className={size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-xs' : 'text-base'}>
                    {value}
                </span>
                <span className="opacity-75 text-xs uppercase tracking-wide">
                    {label}
                </span>
            </span>
        </div>
    )
}
