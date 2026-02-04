import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'

const logs = [
  {
    time: '2026-01-26 09:12',
    user: 'admin',
    action: 'LOGIN',
    resource: 'Auth',
    description: 'Admin logged in',
    status: 'SUCCESS',
  },
  {
    time: '2026-01-26 09:20',
    user: 'admin',
    action: 'UPDATE',
    resource: 'Staff',
    description: 'Updated staff salary',
    status: 'SUCCESS',
  },
  {
    time: '2026-01-26 09:25',
    user: 'admin',
    action: 'DELETE',
    resource: 'Attendance',
    description: 'Deleted attendance record',
    status: 'FAILED',
  },
]

export default function ActivityLogPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Activity Log
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track all system activities and admin actions
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <div>
              <Label>From</Label>
              <Input type="date" />
            </div>

            <div>
              <Label>To</Label>
              <Input type="date" />
            </div>

            <div>
              <Label>User</Label>
              <Input placeholder="admin" />
            </div>

            <div>
              <Label>Action</Label>
              <select className="w-full rounded-md border px-3 py-2 text-sm">
                <option value="">All</option>
                <option>LOGIN</option>
                <option>CREATE</option>
                <option>UPDATE</option>
                <option>DELETE</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {logs.map((log, i) => (
                <TableRow key={i}>
                  <TableCell>{log.time}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell className="font-medium">
                    {log.action}
                  </TableCell>
                  <TableCell>{log.resource}</TableCell>
                  <TableCell>{log.description}</TableCell>
                  <TableCell>
                    <span
                      className={
                        log.status === 'SUCCESS'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {log.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
