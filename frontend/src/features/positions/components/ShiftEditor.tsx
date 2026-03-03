import { useState, useEffect } from 'react'
import { Input } from '@/shared/components/ui/input'
import { Switch } from '@/shared/components/ui/switch'
import { Card } from '@/shared/components/ui/card'
import type { SaveShiftRequest } from '@/shared/types/api'
import { cn } from '@/shared/lib/utils'

function TimeInput({
    id,
    'aria-label': ariaLabel,
    value,
    disabled,
    onChange
}: {
    id?: string
    'aria-label'?: string
    value?: string
    disabled?: boolean
    onChange: (val: string) => void
}) {
    const [local, setLocal] = useState(value?.substring(0, 5) || '')

    useEffect(() => {
        setLocal(value?.substring(0, 5) || '')
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value

        // Allow free deletion (Backspace) without auto-reformatting the colon immediately
        if (inputVal.length < local.length) {
            setLocal(inputVal)
            return
        }

        let val = inputVal.replace(/[^0-9:]/g, '')

        // Auto-insert colon after 2 digits
        if (val.length === 2 && !val.includes(':')) {
            val += ':'
        } else if (val.length >= 3 && !val.includes(':')) {
            val = val.substring(0, 2) + ':' + val.substring(2)
        }

        setLocal(val.substring(0, 5))
    }

    const handleBlur = () => {
        let val = local.trim()
        if (!val) {
            setLocal('00:00')
            onChange('00:00:00')
            return
        }

        let h = 0
        let m = 0

        if (val.includes(':')) {
            const [hs, ms] = val.split(':')
            h = parseInt(hs || '0', 10)
            m = parseInt(ms || '0', 10)
        } else {
            if (val.length <= 2) {
                h = parseInt(val, 10)
            } else if (val.length === 3) {
                h = parseInt(val.substring(0, 1), 10)
                m = parseInt(val.substring(1, 3), 10)
            } else {
                h = parseInt(val.substring(0, 2), 10)
                m = parseInt(val.substring(2, 4), 10)
            }
        }

        if (isNaN(h)) h = 0
        if (isNaN(m)) m = 0

        h = Math.min(23, Math.max(0, h))
        m = Math.min(59, Math.max(0, m))

        const finalStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
        setLocal(finalStr)
        onChange(finalStr + ':00')
    }

    return (
        <Input
            id={id}
            aria-label={ariaLabel}
            type="text"
            placeholder="00:00"
            value={local}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className="w-full text-center tabular-nums font-medium tracking-wide bg-transparent"
            maxLength={5}
        />
    )
}

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
                            disabled={!s.isEnabled}
                            onChange={e => update(i, 'name', e.target.value)}
                            className="font-semibold"
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
                        <TimeInput
                            id={`shift-start-${i}`}
                            aria-label={`Start time for ${s.name}`}
                            value={s.startTime}
                            disabled={!s.isEnabled}
                            onChange={v => update(i, 'startTime', v)}
                        />
                        <TimeInput
                            id={`shift-end-${i}`}
                            aria-label={`End time for ${s.name}`}
                            value={s.endTime}
                            disabled={!s.isEnabled}
                            onChange={v => update(i, 'endTime', v)}
                        />
                    </div>
                </Card>
            ))}
        </div>
    )
}
