import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'

import ReportFilters from '../components/ReportFilters'
import ReportStats from '../components/ReportStats'
import ReportTable from '../components/ReportTable'

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Reports
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Attendance, payroll, and staff performance overview
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <ReportFilters />
        </CardContent>
      </Card>

      {/* Stats */}
      <ReportStats />

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Report details</CardTitle>
        </CardHeader>
        <CardContent>
          <ReportTable />
        </CardContent>
      </Card>
    </div>
  )
}
