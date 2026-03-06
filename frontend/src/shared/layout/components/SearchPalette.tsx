"use client"

import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
    Calculator,
    CreditCard,
    Search,
    Settings,
    Smile,
    User,
    Users,
    LayoutDashboard,
    Clock,
    History,
    Languages,
} from "lucide-react"

import {
    Dialog,
    DialogContent,
} from "@/shared/components/ui/dialog"
import { ScrollArea } from "@/shared/components/ui/scroll-area"

import { useTranslation } from "react-i18next"

const routes = [
    {
        group: "general", items: [
            { icon: LayoutDashboard, label: "dashboard", path: "/dashboard", shortcut: "G D" },
            { icon: Settings, label: "adjustments", path: "/adjustments", shortcut: "G J" },
        ]
    },
    {
        group: "staffManagement", items: [
            { icon: Users, label: "employees", path: "/employees", shortcut: "G E" },
            { icon: User, label: "positions", path: "/positions", shortcut: "G P" },
            { icon: Clock, label: "schedule", path: "/schedule", shortcut: "G S" },
            { icon: Smile, label: "attendance", path: "/attendance", shortcut: "G A" },
        ]
    },
    {
        group: "financials", items: [
            { icon: CreditCard, label: "payroll", path: "/payroll", shortcut: "G R" },
            { icon: History, label: "payrollExport", path: "/payroll/export", shortcut: "G X" },
            { icon: Calculator, label: "revenue", path: "/revenue", shortcut: "G V" },
        ]
    },
    {
        group: "system", items: [
            { icon: History, label: "activityLogs", path: "/activity-logs", shortcut: "G L" },
        ]
    }
]

export function SearchPalette() {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const navigate = useNavigate()
    const { t } = useTranslation()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const filteredRoutes = routes.map(group => ({
        ...group,
        items: group.items.filter(item =>
            t(`sidebar.${item.label}`).toLowerCase().includes(query.toLowerCase())
        )
    })).filter(group => group.items.length > 0)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="relative group w-full flex items-center"
            >
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors" />
                </div>
                <div className="w-full h-9 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg pl-9 pr-12 text-xs font-medium text-slate-400 flex items-center transition-all shadow-sm hover:border-slate-300 dark:hover:border-neutral-700">
                    {t('common.search')}
                </div>
                <div className="absolute inset-y-0 right-3 flex items-center gap-0.5 pointer-events-none">
                    <kbd className="h-5 px-1.5 rounded bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-[9px] font-bold text-slate-400 flex items-center gap-0.5 shadow-sm">
                        <span className="text-[10px]">⌘</span> K
                    </kbd>
                </div>
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="p-0 overflow-hidden border-none shadow-2xl max-w-2xl bg-white dark:bg-[#0C0C0C] backdrop-blur-xl">
                    <div className="flex flex-col h-[450px]">
                        <div className="flex items-center px-4 border-b border-slate-200 dark:border-white/5 h-14 shrink-0">
                            <Search className="mr-3 h-4 w-4 shrink-0 opacity-50" />
                            <input
                                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder={t('common.search')}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <ScrollArea className="flex-1 p-2">
                            <div className="space-y-4">
                                {filteredRoutes.length === 0 && (
                                    <div className="py-14 text-center text-sm text-slate-500">
                                        No results found.
                                    </div>
                                )}

                                {filteredRoutes.map((group) => (
                                    <div key={group.group} className="space-y-1">
                                        <p className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
                                            {t(`sidebar.${group.group}`)}
                                        </p>
                                        <div className="space-y-0.5">
                                            {group.items.map((item) => (
                                                <button
                                                    key={item.path}
                                                    onClick={() => {
                                                        navigate(item.path)
                                                        setOpen(false)
                                                    }}
                                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-left group/item"
                                                >
                                                    <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] group-hover/item:bg-white dark:group-hover/item:bg-white/10 shadow-sm border border-slate-200/50 dark:border-white/5">
                                                        <item.icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="flex-1">{t(`sidebar.${item.label}`)}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">{item.shortcut}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="h-10 border-t border-slate-200 dark:border-white/5 px-4 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.01]">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <kbd className="h-5 px-1.5 rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 text-[9px] font-bold text-slate-500 flex items-center shadow-sm">Enter</kbd>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">to select</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <kbd className="h-5 px-1.5 rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 text-[9px] font-bold text-slate-500 flex items-center shadow-sm">↑↓</kbd>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">to navigate</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Languages className="h-3 w-3 text-slate-400" />
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">CSM Elite Search</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
