"use client"

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import {
    clearNotifications,
    removeNotification,
    markNotificationRead,
    markAllNotificationsRead,
} from '@/features/ui/slices/uiSlice'
import {
    Bell,
    CheckCheck,
    Info,
    AlertTriangle,
    XCircle,
    Inbox,
    X,
    Check,
} from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover"
import { Button } from '@/shared/components/ui/button'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import { enUS, vi } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
import { useSelector as useTypedSelector } from 'react-redux'
import clsx from 'clsx'

const TYPE_CONFIG = {
    success: {
        icon: CheckCheck,
        color: 'text-emerald-500',
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        border: 'border-emerald-200/60 dark:border-emerald-500/20',
        dot: 'bg-emerald-500',
    },
    error: {
        icon: XCircle,
        color: 'text-red-500',
        bg: 'bg-red-50 dark:bg-red-500/10',
        border: 'border-red-200/60 dark:border-red-500/20',
        dot: 'bg-red-500',
    },
    warning: {
        icon: AlertTriangle,
        color: 'text-amber-500',
        bg: 'bg-amber-50 dark:bg-amber-500/10',
        border: 'border-amber-200/60 dark:border-amber-500/20',
        dot: 'bg-amber-500',
    },
    info: {
        icon: Info,
        color: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-500/10',
        border: 'border-blue-200/60 dark:border-blue-500/20',
        dot: 'bg-blue-500',
    },
}

export function NotificationPopover() {
    const notifications = useSelector((state: RootState) => state.ui.notifications)
    const language = useTypedSelector((state: RootState) => state.ui.language)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)

    const unreadCount = notifications.filter(n => !n.read).length
    const sorted = [...notifications].reverse()

    const dateFnsLocale = language === 'vi' ? vi : enUS

    const handleOpen = (isOpen: boolean) => {
        setOpen(isOpen)
        // Auto-mark all as read when opening
        if (isOpen && unreadCount > 0) {
            setTimeout(() => dispatch(markAllNotificationsRead()), 800)
        }
    }

    return (
        <Popover open={open} onOpenChange={handleOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
                >
                    <Bell size={17} className={clsx(
                        'transition-transform duration-300',
                        open && 'rotate-12'
                    )} />

                    {/* Unread badge */}
                    {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center bg-red-500 text-white text-[9px] font-black rounded-full leading-none animate-in zoom-in duration-200">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                sideOffset={8}
                className="p-0 w-[360px] bg-white dark:bg-[#111] border border-slate-200/80 dark:border-white/[0.08] shadow-xl shadow-black/10 dark:shadow-black/40 overflow-hidden rounded-2xl"
            >
                {/* ── Header ── */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/[0.06]">
                    <div className="flex items-center gap-2">
                        <Bell size={14} className="text-slate-400" />
                        <span className="text-[12px] font-black text-slate-900 dark:text-white tracking-tight">
                            {t('common.notifications')}
                        </span>
                        {unreadCount > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-black leading-none">
                                {unreadCount}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1">
                        {unreadCount > 0 && (
                            <button
                                onClick={() => dispatch(markAllNotificationsRead())}
                                className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-2 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                            >
                                <Check size={10} />
                                {t('common.markAllRead', 'Mark all read')}
                            </button>
                        )}
                        {notifications.length > 0 && (
                            <button
                                onClick={() => dispatch(clearNotifications())}
                                className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                                <X size={10} />
                                {t('common.clearAll')}
                            </button>
                        )}
                    </div>
                </div>

                {/* ── List ── */}
                <ScrollArea className="max-h-[400px]">
                    {sorted.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] mb-4">
                                <Inbox size={26} className="text-slate-300 dark:text-slate-600" />
                            </div>
                            <p className="text-[12px] font-bold text-slate-500 dark:text-slate-400">
                                {t('common.noNotifications')}
                            </p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-1">
                                {t('common.allCaughtUp')}
                            </p>
                        </div>
                    ) : (
                        <div>
                            {sorted.map((n) => {
                                const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.info
                                const Icon = cfg.icon
                                const timeAgo = n.id
                                    ? formatDistanceToNow(parseInt(n.id), {
                                        addSuffix: true,
                                        locale: dateFnsLocale,
                                    })
                                    : t('common.justNow')

                                return (
                                    <div
                                        key={n.id}
                                        onClick={() => dispatch(markNotificationRead(n.id))}
                                        className={clsx(
                                            'group relative flex gap-3 px-4 py-3.5 cursor-pointer transition-colors border-b border-slate-50 dark:border-white/[0.04] last:border-0',
                                            n.read
                                                ? 'hover:bg-slate-50/80 dark:hover:bg-white/[0.03]'
                                                : 'bg-blue-50/30 dark:bg-blue-500/[0.04] hover:bg-blue-50/60 dark:hover:bg-blue-500/[0.07]'
                                        )}
                                    >
                                        {/* Unread dot */}
                                        {!n.read && (
                                            <div className={clsx(
                                                'absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full',
                                                cfg.dot
                                            )} />
                                        )}

                                        {/* Icon */}
                                        <div className={clsx(
                                            'shrink-0 mt-0.5 p-2 rounded-xl border',
                                            cfg.bg, cfg.border
                                        )}>
                                            <Icon size={13} className={cfg.color} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0 pr-6">
                                            <p className={clsx(
                                                'text-[12px] leading-snug mb-0.5 truncate',
                                                n.read
                                                    ? 'font-semibold text-slate-600 dark:text-slate-300'
                                                    : 'font-black text-slate-900 dark:text-white'
                                            )}>
                                                {n.title}
                                            </p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-1.5">
                                                {n.message}
                                            </p>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-600 font-medium">
                                                {timeAgo}
                                            </span>
                                        </div>

                                        {/* Dismiss */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                dispatch(removeNotification(n.id))
                                            }}
                                            className="absolute right-3 top-3.5 p-1 rounded-lg text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-100 dark:hover:bg-white/[0.08]"
                                        >
                                            <X size={11} />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </ScrollArea>

                {/* ── Footer ── */}
                {notifications.length > 0 && (
                    <div className="px-3 py-2 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02]">
                        <p className="text-center text-[10px] text-slate-400 font-medium">
                            {notifications.length} {t('common.notifications').toLowerCase()}
                            {unreadCount > 0 && ` · ${unreadCount} ${t('common.unread', 'chưa đọc')}`}
                        </p>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
