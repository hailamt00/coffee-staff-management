import { Input } from '@/shared/ui/input'
import { Switch } from '@/shared/ui/switch'
import { Card } from '@/shared/ui/card'
import type { SaveShiftRequest } from '@/shared/types/api'
import { cn } from '@/lib/utils'

export function ShiftEditor({
    shifts,
    onChange,
}: {
    shifts: SaveShiftRequest[]
    onChange: (v: SaveShiftRequest[]) => void
}) {
    const update = (
        i: number,
        key: keyof SaveShiftRequest,
        value: any
    ) => {
        const clone = [...shifts]
        clone[i] = { ...clone[i], [key]: value }
        onChange(clone)
    }

    return (
        <div className="space-y-3">
            {shifts.map((s, i) => (
                <Card
                    key={i}
                    className={cn(
                        'p-4 transition',
                        !s.isEnabled && 'opacity-50 bg-muted/30'
                    )}
                >
                    {/* header */}
                    <div className="flex items-center gap-4">
                        <Input value={s.name} readOnly/>
                        <Switch
                            checked={s.isEnabled}
                            onCheckedChange={v => update(i, 'isEnabled', v)}
                        />
                    </div>

                    {/* time */}
                    <div className="flex gap-3 mt-3">
                        <Input
                            type="time"
                            value={s.startTime}
                            disabled={!s.isEnabled}
                            onChange={e => update(i, 'startTime', e.target.value)}
                        />
                        <Input
                            type="time"
                            value={s.endTime}
                            disabled={!s.isEnabled}
                            onChange={e => update(i, 'endTime', e.target.value)}
                        />
                    </div>
                </Card>
            ))}
        </div>
    )
}
