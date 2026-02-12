import { Input } from '@/shared/components/ui/input'
import { Switch } from '@/shared/components/ui/switch'
import { Card } from '@/shared/components/ui/card'
import type { SaveShiftRequest } from '@/shared/types/api'
import { cn } from '@/shared/lib/utils'

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
                        <Input
                            id={`shift-name-${i}`}
                            aria-label={`Shift name ${i + 1}`}
                            value={s.name}
                            readOnly
                        />
                        <Switch
                            id={`shift-toggle-${i}`}
                            aria-label={`Enable shift ${i + 1}`}
                            checked={s.isEnabled}
                            onCheckedChange={v => update(i, 'isEnabled', v)}
                        />
                    </div>

                    {/* time */}
                    <div className="flex gap-3 mt-3">
                        <Input
                            id={`shift-start-${i}`}
                            aria-label={`Start time for ${s.name}`}
                            type="time"
                            value={s.startTime}
                            disabled={!s.isEnabled}
                            onChange={e => update(i, 'startTime', e.target.value)}
                        />
                        <Input
                            id={`shift-end-${i}`}
                            aria-label={`End time for ${s.name}`}
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
