import React, { useState, useRef, useEffect } from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'

export interface MultiSelectOption {
    label: string
    value: string
}

interface MultiSelectProps {
    options: MultiSelectOption[]
    selectedValues: string[]
    onChange: (values: string[]) => void
    placeholder?: string
    className?: string
}

export function MultiSelect({
    options,
    selectedValues,
    onChange,
    placeholder = 'Select...',
    className = '',
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleToggle = (value: string) => {
        const newValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value]
        onChange(newValues)
    }

    const handleRemove = (e: React.MouseEvent, value: string) => {
        e.stopPropagation()
        onChange(selectedValues.filter((v) => v !== value))
    }

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const selectedLabels = selectedValues.map(
        (val) => options.find((o) => o.value === val)?.label || val
    )

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <div
                className="flex min-h-[36px] w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:focus-within:ring-slate-300 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-wrap gap-1 max-w-[calc(100%-24px)] shrink-0">
                    {selectedLabels.length === 0 ? (
                        <span className="text-slate-500 whitespace-nowrap truncate py-0.5">{placeholder}</span>
                    ) : (
                        selectedLabels.map((label, index) => (
                            <Badge
                                key={`${selectedValues[index]}-${index}`}
                                variant="secondary"
                                className="hover:bg-secondary truncate max-w-[120px] font-normal"
                            >
                                <span className="truncate">{label}</span>
                                <button
                                    type="button"
                                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onClick={(e) => handleRemove(e, selectedValues[index])}
                                >
                                    <X className="h-3 w-3 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100" />
                                </button>
                            </Badge>
                        ))
                    )}
                </div>
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>

            {isOpen && (
                <div className="absolute top-[calc(100%+4px)] z-50 w-full min-w-[200px] rounded-md border border-slate-200 bg-white text-slate-950 shadow-md outline-none animate-in fade-in-80 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
                    <div className="p-2 border-b border-slate-200 dark:border-slate-800">
                        <input
                            type="text"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className="max-h-[200px] overflow-auto p-1">
                        {filteredOptions.length === 0 && (
                            <div className="py-2 px-2 text-sm text-slate-500 text-center">No options found.</div>
                        )}
                        {filteredOptions.map((option) => {
                            const isSelected = selectedValues.includes(option.value)
                            return (
                                <div
                                    key={option.value}
                                    className={`relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 cursor-pointer ${isSelected ? 'font-medium' : ''
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleToggle(option.value)
                                    }}
                                >
                                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                        {isSelected && <Check className="h-4 w-4" />}
                                    </span>
                                    <span className="truncate">{option.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
