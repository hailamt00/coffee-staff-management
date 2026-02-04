import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'

export default function ReportFilters() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="space-y-1">
        <Label>From date</Label>
        <Input type="date" />
      </div>

      <div className="space-y-1">
        <Label>To date</Label>
        <Input type="date" />
      </div>

      <div className="space-y-1">
        <Label>Report type</Label>
        <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900">
          <option>Attendance</option>
          <option>Payroll</option>
          <option>Leave</option>
        </select>
      </div>

      <div className="flex items-end">
        <Button className="w-full">Generate</Button>
      </div>
    </div>
  )
}
