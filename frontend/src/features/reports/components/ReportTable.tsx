import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'

const data = [
  {
    staff: 'Nguyen Van A',
    days: 26,
    late: 2,
    salary: '8,500,000 ₫',
  },
  {
    staff: 'Tran Thi B',
    days: 24,
    late: 0,
    salary: '7,200,000 ₫',
  },
]

export default function ReportTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Staff</TableHead>
          <TableHead>Working days</TableHead>
          <TableHead>Late</TableHead>
          <TableHead className="text-right">Salary</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell>{row.staff}</TableCell>
            <TableCell>{row.days}</TableCell>
            <TableCell>{row.late}</TableCell>
            <TableCell className="text-right">
              {row.salary}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
