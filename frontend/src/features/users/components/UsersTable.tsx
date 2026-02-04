import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { MoreHorizontal } from 'lucide-react'
import type { User } from '../types/user'

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Root',
    email: 'admin@coffee.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2026-01-01',
  },
  {
    id: '2',
    name: 'John Manager',
    email: 'manager@coffee.com',
    role: 'Manager',
    status: 'Active',
    createdAt: '2026-01-10',
  },
  {
    id: '3',
    name: 'Jane Staff',
    email: 'staff@coffee.com',
    role: 'Staff',
    status: 'Inactive',
    createdAt: '2026-01-15',
  },
]

export default function UsersTable() {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-neutral-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {mockUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.name}
              </TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>
                <Badge variant="secondary">
                  {user.role}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    user.status === 'Active'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>

              <TableCell>{user.createdAt}</TableCell>

              <TableCell className="text-right">
                <Button
                  size="icon"
                  variant="ghost"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
