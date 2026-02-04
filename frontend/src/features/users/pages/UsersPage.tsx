import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import UsersToolbar from '../components/UsersToolbar'
import UsersTable from '../components/UsersTable'

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Users
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage system users and access roles
        </p>
      </div>

      {/* Content */}
      <Card className="border-slate-200 dark:border-neutral-800">
        <CardHeader>
          <CardTitle>User list</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <UsersToolbar />
          <UsersTable />
        </CardContent>
      </Card>
    </div>
  )
}