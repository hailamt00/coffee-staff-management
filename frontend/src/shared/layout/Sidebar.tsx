import { Button } from '@/shared/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarDays,
  Fingerprint,
  DollarSign,
  SlidersHorizontal,
  UserCog,
  ShieldCheck,
  Settings,
  FileText,
  Activity,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

interface SidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  onClose?: () => void
}

const sections = [
  {
    title: null,
    items: [{ label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' }],
  },
  {
    title: 'HR',
    items: [
      { label: 'Employees', icon: Users, path: '/employees' },
      { label: 'Positions', icon: Briefcase, path: '/positions' },
      { label: 'Schedule', icon: CalendarDays, path: '/schedule' },
    ],
  },
  {
    title: 'Time Management',
    items: [
      { label: 'Attendance', icon: Fingerprint, path: '/attendance' },
    ],
  },
  {
    title: 'Payroll',
    items: [
      { label: 'Payroll', icon: DollarSign, path: '/payroll' },
      { label: 'Adjustments', icon: SlidersHorizontal, path: '/adjustments' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Users', icon: UserCog, path: '/users' },
      { label: 'Roles & Permissions', icon: ShieldCheck, path: '/roles' },
      { label: 'Settings', icon: Settings, path: '/settings' },
    ],
  },
  {
    title: 'Reports',
    items: [
      { label: 'Reports', icon: FileText, path: '/reports' },
      { label: 'Activity Logs', icon: Activity, path: '/activity-logs' },
    ],
  },
]

export default function Sidebar({
  collapsed = false,
  onToggleCollapse,
  onClose,
}: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="flex h-full flex-col bg-white text-slate-900 dark:bg-black dark:text-white">
      {/* ===== Header ===== */}
      <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4 dark:border-white/10">
        {!collapsed && (
          <span className="text-sm font-bold tracking-wide">ADMIN</span>
        )}

        <div className="flex items-center gap-1">
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden rounded-md p-2 hover:bg-slate-100 dark:hover:bg-neutral-900 md:flex"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-neutral-800 md:hidden"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* ===== Menu ===== */}
      <TooltipProvider delayDuration={0}>
        <nav className="flex-1 overflow-y-auto no-scrollbar py-4">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-4">
              {/* Section title */}
              {section.title && !collapsed && (
                <div className="px-4 mb-2 flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {section.title}
                  </span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-neutral-800" />
                </div>
              )}

              {/* Items */}
              <div className="flex flex-col gap-1 px-2">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname.startsWith(item.path)

                  const button = (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        navigate(item.path)
                        onClose?.()
                      }}
                      className={clsx(
                        'relative h-10 w-full rounded-md group',
                        'transition-all duration-200 ease-out',
                        'hover:translate-x-[2px]',
                        collapsed
                          ? 'justify-center px-0'
                          : 'justify-start gap-3 px-3',
                        isActive
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'hover:bg-slate-100 dark:hover:bg-neutral-900'
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r bg-black/80 dark:bg-white/90" />
                      )}

                      <Icon
                        size={18}
                        className={clsx(
                          'shrink-0 transition-transform',
                          'group-hover:scale-110'
                        )}
                      />

                      {!collapsed && (
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </Button>
                  )

                  return collapsed ? (
                    <Tooltip key={item.path}>
                      <TooltipTrigger asChild>{button}</TooltipTrigger>
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <div key={item.path}>{button}</div>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </TooltipProvider>
    </aside>
  )
}
