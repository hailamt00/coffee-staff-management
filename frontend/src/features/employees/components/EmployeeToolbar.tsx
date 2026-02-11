import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Plus } from 'lucide-react'

export function EmployeeToolbar({
  search,
  onSearch,
  onAdd,
}: {
  search: string
  onSearch: (v: string) => void
  onAdd: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-semibold">Employee List</h2>
      <div className="flex gap-2">
        <Input
          className="w-64"
          placeholder="Search by name or code..."
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
        <Button onClick={onAdd}>
          <Plus size={16} />
          Add
        </Button>
      </div>
    </div>
  )
}
