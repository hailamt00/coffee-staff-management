import { Card, CardContent } from '@/shared/ui/card'

export default function ReportStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-slate-500">Total staff</p>
          <p className="text-2xl font-semibold">42</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-slate-500">Working days</p>
          <p className="text-2xl font-semibold">1,120</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-slate-500">Late check-ins</p>
          <p className="text-2xl font-semibold text-yellow-600">
            87
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-slate-500">Total payroll</p>
          <p className="text-2xl font-semibold text-green-600">
            320,000,000 ₫
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
