import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { motion } from 'framer-motion'
import { useCountUp } from '@/shared/hooks/useCountUp'

type Props = {
  title: string
  value: number
  note: string
  icon: React.ElementType
}

export default function AdjustmentStatCard({
  title,
  value,
  note,
  icon: Icon,
}: Props) {
  const animatedValue = useCountUp(value)

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.25 }}>
      <Card
        className="
          border border-slate-200 dark:border-neutral-800
          bg-white dark:bg-black
          transition-all
          hover:shadow-md
          dark:hover:shadow-[0_0_0_1px_var(--accent-glow),0_12px_32px_-12px_var(--accent-glow)]
        "
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-semibold text-black dark:text-white">
            {animatedValue}
          </div>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            {note}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
