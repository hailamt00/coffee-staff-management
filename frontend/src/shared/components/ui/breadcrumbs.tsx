import { ChevronRight, Home } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/shared/lib/utils"

const routeMap: Record<string, string> = {
    "employees": "HR / Employees",
    "positions": "HR / Positions",
    "schedules": "Time / Schedules",
    "attendance": "Time / Attendance",
    "payroll": "Financials / Payroll",
    "adjustments": "Financials / Adjustments",
    "revenue": "Financials / Revenue",
    "activity-logs": "System / Activity Logs",
}

export function Breadcrumbs() {
    const location = useLocation()
    const pathnames = location.pathname.split("/").filter((x) => x)

    return (
        <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
            <Link to="/" className="flex items-center hover:text-slate-900 dark:hover:text-white transition-colors group">
                <Home size={12} className="mr-1.5 transition-transform group-hover:scale-110" />
                DASH
            </Link>
            {pathnames.length > 0 && <ChevronRight size={10} className="text-slate-300" />}
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1
                const to = `/${pathnames.slice(0, index + 1).join("/")}`
                const label = routeMap[value] || value.charAt(0).toUpperCase() + value.slice(1)

                return (
                    <div key={to} className="flex items-center">
                        <Link
                            to={to}
                            className={cn(
                                "transition-colors",
                                last
                                    ? "text-slate-900 dark:text-white pointer-events-none"
                                    : "hover:text-slate-900 dark:hover:text-white"
                            )}
                        >
                            {label}
                        </Link>
                        {!last && <ChevronRight size={10} className="mx-2 text-slate-300" />}
                    </div>
                )
            })}
        </nav>
    )
}
