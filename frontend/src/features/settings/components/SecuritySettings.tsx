import { Switch } from '@/shared/ui/switch'
import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'

export default function SecuritySettings() {
  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center justify-between">
        <div>
          <Label>Require strong passwords</Label>
          <p className="text-sm text-slate-500">
            Enforce password complexity rules
          </p>
        </div>
        <Switch defaultChecked />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label>Enable login audit log</Label>
          <p className="text-sm text-slate-500">
            Track login attempts
          </p>
        </div>
        <Switch defaultChecked />
      </div>

      <Button>Update security</Button>
    </div>
  )
}
