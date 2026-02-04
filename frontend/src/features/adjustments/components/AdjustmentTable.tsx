import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'

const mockData = [
  {
    id: 1,
    employee: 'Nguyen Van A',
    type: 'Bonus',
    amount: '+500,000',
    reason: 'Performance reward',
    status: 'Approved',
  },
  {
    id: 2,
    employee: 'Tran Thi B',
    type: 'Penalty',
    amount: '-200,000',
    reason: 'Late attendance',
    status: 'Pending',
  },
]

export default function AdjustmentTable() {
  return (
    <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-black dark:text-white">
          Recent Adjustments
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-neutral-800 text-slate-500 dark:text-slate-400">
                <th className="py-2 text-left">Employee</th>
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Reason</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {mockData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 dark:border-neutral-900"
                >
                  <td className="py-3 text-black dark:text-white">
                    {item.employee}
                  </td>
                  <td className="py-3">{item.type}</td>
                  <td className="py-3">{item.amount}</td>
                  <td className="py-3">{item.reason}</td>
                  <td className="py-3">
                    <Badge
                      variant={
                        item.status === 'Approved'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
