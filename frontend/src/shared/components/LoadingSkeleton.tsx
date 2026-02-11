import clsx from 'clsx'

interface LoadingSkeletonProps {
    variant?: 'card' | 'table' | 'chart' | 'text'
    rows?: number
    className?: string
}

export function LoadingSkeleton({
    variant = 'card',
    rows = 3,
    className
}: LoadingSkeletonProps) {
    if (variant === 'text') {
        return (
            <div className={clsx('space-y-2', className)}>
                {Array.from({ length: rows }).map((_, i) => (
                    <div
                        key={i}
                        className="h-4 bg-slate-200 dark:bg-neutral-800 rounded animate-pulse"
                        style={{ width: `${90 - i * 10}%` }}
                    />
                ))}
            </div>
        )
    }

    if (variant === 'table') {
        return (
            <div className={clsx('space-y-3', className)}>
                {/* Header */}
                <div className="flex gap-4 pb-3 border-b border-slate-200 dark:border-neutral-800">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-4 bg-slate-200 dark:bg-neutral-800 rounded animate-pulse"
                            style={{ width: `${100 / 4}%` }}
                        />
                    ))}
                </div>
                {/* Rows */}
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                        {Array.from({ length: 4 }).map((_, j) => (
                            <div
                                key={j}
                                className="h-10 bg-slate-100 dark:bg-neutral-900 rounded animate-pulse"
                                style={{ width: `${100 / 4}%` }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    if (variant === 'chart') {
        return (
            <div className={clsx('p-6 bg-white dark:bg-black/50 border border-slate-200 dark:border-neutral-800 rounded-xl', className)}>
                <div className="space-y-4">
                    {/* Title */}
                    <div className="h-6 w-1/3 bg-slate-200 dark:bg-neutral-800 rounded animate-pulse" />
                    {/* Chart area */}
                    <div className="h-64 bg-slate-100 dark:bg-neutral-900 rounded-lg animate-pulse" />
                </div>
            </div>
        )
    }

    // Default: card variant
    return (
        <div className={clsx('p-6 bg-white dark:bg-black/50 border border-slate-200 dark:border-neutral-800 rounded-xl', className)}>
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                        <div className="h-4 w-1/3 bg-slate-200 dark:bg-neutral-800 rounded animate-pulse" />
                        <div className="h-8 w-2/3 bg-slate-200 dark:bg-neutral-800 rounded animate-pulse" />
                    </div>
                    <div className="w-10 h-10 bg-slate-100 dark:bg-neutral-900 rounded-lg animate-pulse" />
                </div>
                <div className="h-4 w-1/4 bg-slate-100 dark:bg-neutral-900 rounded animate-pulse" />
            </div>
        </div>
    )
}
