import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import {
  Clock,
  Plus,
  Search,
  MoreHorizontal,
} from 'lucide-react'

/* ================= TYPES ================= */

type Shift = {
  id: string
  name: string
  startTime: string
  endTime: string
  employeeCount: number
}

/* ================= MOCK DATA ================= */

const MOCK_SHIFTS: Shift[] = [
  {
    id: '1',
    name: 'Morning Shift',
    startTime: '07:00',
    endTime: '12:00',
    employeeCount: 6,
  },
  {
    id: '2',
    name: 'Afternoon Shift',
    startTime: '12:00',
    endTime: '17:00',
    employeeCount: 5,
  },
  {
    id: '3',
    name: 'Evening Shift',
    startTime: '17:00',
    endTime: '22:00',
    employeeCount: 4,
  },
]

/* ================= PAGE ================= */

export default function ShiftsPage() {
  const [search, setSearch] = useState('')

  const shifts = MOCK_SHIFTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Shifts
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage working shifts and schedules
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add shift
        </Button>
      </div>

      {/* ===== Search ===== */}
      <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black">
        <CardContent className="p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search shift..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      {/* ===== List ===== */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Shift list
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {shifts.map((shift) => (
              <div
                key={shift.id}
                className="
                  flex items-center justify-between
                  rounded-lg border border-slate-100 dark:border-neutral-900
                  p-4 transition
                  hover:bg-slate-50 dark:hover:bg-neutral-900
                "
              >
                {/* LEFT */}
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-primary/10 p-2 text-primary">
                    <Clock className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="font-medium text-black dark:text-white">
                      {shift.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {shift.startTime} – {shift.endTime}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {shift.employeeCount} employees
                  </span>

                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {shifts.length === 0 && (
              <div className="py-8 text-center text-slate-400">
                No shifts found
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
