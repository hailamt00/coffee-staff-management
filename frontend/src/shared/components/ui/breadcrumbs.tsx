import { ChevronRight, Home } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/shared/lib/utils"
import { useTranslation } from "react-i18next"

const categoryMap: Record<string, string> = {
    "employees": "hR",
    "positions": "hR",
    "schedules": "time",
    "attendance": "time",
    "payroll": "financials",
    "adjustments": "financials",
    "revenue": "financials",
    "activity-logs": "systemLogs",
}

export function Breadcrumbs() {
    const { t } = useTranslation()
    const location = useLocation()
    const pathnames = location.pathname.split("/").filter((x) => x)

    return (
        <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
            <Link to="/" className="flex items-center hover:text-slate-900 dark:hover:text-white transition-colors group">
                <Home size={12} className="mr-1.5 transition-transform group-hover:scale-110" />
                {t('common.home')}
            </Link>
            {pathnames.length > 0 && <ChevronRight size={10} className="text-slate-300" />}
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1
                const to = `/${pathnames.slice(0, index + 1).join("/")}`

                // Get category and page name from sidebar translations
                const categoryKey = categoryMap[value]
                const pageKey = value.replace(/-./g, x => x[1].toUpperCase()) // activity-logs -> activityLogs

                let label = value.charAt(0).toUpperCase() + value.slice(1)
                if (categoryKey) {
                    label = `${t(`sidebar.${categoryKey}`)} / ${t(`sidebar.${pageKey}`)}`
                } else {
                    label = t(`sidebar.${pageKey}`, value.charAt(0).toUpperCase() + value.slice(1))
                }

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
