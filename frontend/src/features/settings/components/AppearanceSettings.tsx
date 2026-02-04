import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'

export default function AppearanceSettings() {
  return (
    <div className="space-y-6 max-w-xl">
      <div className="space-y-2">
        <Label>Theme</Label>

        <RadioGroup defaultValue="system">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" />
            <Label>Light</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" />
            <Label>Dark</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" />
            <Label>System</Label>
          </div>
        </RadioGroup>
      </div>

      <Button>Apply appearance</Button>
    </div>
  )
}
