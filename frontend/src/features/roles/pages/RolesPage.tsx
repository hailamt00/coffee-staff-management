import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import RolesToolbar from '../components/RolesToolbar'
import RolesTable from '../components/RolesTable'

export default function RolesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Roles
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Define roles and manage permissions
        </p>
      </div>

      {/* Content */}
      <Card className="border-slate-200 dark:border-neutral-800">
        <CardHeader>
          <CardTitle>Role list</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <RolesToolbar />
          <RolesTable />
        </CardContent>
      </Card>
    </div>
  )
}
