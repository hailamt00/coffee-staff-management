import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'

export default function GeneralSettings() {
  return (
    <div className="space-y-6 max-w-xl">
      <div className="space-y-2">
        <Label>Application name</Label>
        <Input defaultValue="Coffee Staff Management" />
      </div>

      <div className="space-y-2">
        <Label>Timezone</Label>
        <Input defaultValue="Asia/Ho_Chi_Minh" />
      </div>

      <div className="space-y-2">
        <Label>Currency</Label>
        <Input defaultValue="VND" />
      </div>

      <Button>Save changes</Button>
    </div>
  )
}
