import { ReactNode } from 'react'
import { Card, CardHeader, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface ChartCardProps {
    title: string
    subtitle?: string
    action?: ReactNode
    children: ReactNode
    className?: string
}

export function ChartCard({
    title,
    subtitle,
    action,
    children,
    className
}: ChartCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className={clsx(
                'border-slate-200 dark:border-neutral-800 bg-white dark:bg-black/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300',
                className
            )}>
                <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                                {title}
                            </h3>
                            {subtitle && (
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                        {action && (
                            <div>
                                {action}
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </motion.div>
    )
}
