import type { LucideIcon } from 'lucide-react'
import {
    LayoutDashboard,
    Users,
    UserCheck as UserBadge,
    Calendar,
    Fingerprint,
    DollarSign,
    SlidersHorizontal,
    TrendingUp,
    Activity,
} from 'lucide-react'

export interface RouteConfig {
    path: string
    label: string
    icon: LucideIcon
    section: string
}

export const APP_ROUTES: RouteConfig[] = [
    // Main
    {
        path: '/',
        label: 'Dashboard',
        icon: LayoutDashboard,
        section: 'Main',
    },
    // HR
    {
        path: '/employees',
        label: 'Employees',
        icon: Users,
        section: 'HR',
    },
    {
        path: '/positions',
        label: 'Positions',
        icon: UserBadge,
        section: 'HR',
    },
    // Time
    {
        path: '/schedule',
        label: 'Schedules',
        icon: Calendar,
        section: 'Time',
    },
    {
        path: '/attendance',
        label: 'Attendance',
        icon: Fingerprint,
        section: 'Time',
    },
    // Financials
    {
        path: '/payroll',
        label: 'Payroll',
        icon: DollarSign,
        section: 'Financials',
    },
    {
        path: '/adjustments',
        label: 'Adjustments',
        icon: SlidersHorizontal,
        section: 'Financials',
    },
    {
        path: '/revenue',
        label: 'Revenue',
        icon: TrendingUp,
        section: 'Financials',
    },
    // System Logs
    {
        path: '/activity-logs',
        label: 'Activity Logs',
        icon: Activity,
        section: 'System Logs',
    },
]

// Group routes by section for sidebar rendering
export const getRoutesBySection = () => {
    const sections = new Map<string, RouteConfig[]>()

    APP_ROUTES.forEach(route => {
        const existing = sections.get(route.section) || []
        sections.set(route.section, [...existing, route])
    })

    return Array.from(sections.entries()).map(([label, items]) => ({
        label,
        items,
    }))
}
