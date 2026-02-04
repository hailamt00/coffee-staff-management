import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { MoreHorizontal } from 'lucide-react'
import type { Role } from '../types/role'

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    usersCount: 1,
    createdAt: '2026-01-01',
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Manage staff and shifts',
    usersCount: 3,
    createdAt: '2026-01-05',
  },
  {
    id: '3',
    name: 'Staff',
    description: 'Basic operational access',
    usersCount: 12,
    createdAt: '2026-01-10',
  },
]

export default function RolesTable() {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-neutral-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Users</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {mockRoles.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="font-medium">
                <Badge variant="secondary">
                  {role.name}
                </Badge>
              </TableCell>

              <TableCell className="text-slate-600 dark:text-slate-400">
                {role.description}
              </TableCell>

              <TableCell>{role.usersCount}</TableCell>

              <TableCell>{role.createdAt}</TableCell>

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
