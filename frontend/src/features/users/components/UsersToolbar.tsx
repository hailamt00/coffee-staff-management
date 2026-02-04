import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Plus } from 'lucide-react'

export default function UsersToolbar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <Input
        placeholder="Search users..."
        className="max-w-xs"
      />

      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add user
      </Button>
    </div>
  )
}
