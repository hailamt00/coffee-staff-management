import { Button } from '@/shared/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import {
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { useDispatch } from 'react-redux'
import { logout } from '@/features/auth/slices/authSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { getRoutesBySection } from '@/shared/config/routes'

interface SidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  onClose?: () => void
}

export default function Sidebar({
  collapsed = false,
  onToggleCollapse,
  onClose,
}: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const sections = getRoutesBySection()

  return (
    <aside className="flex h-full flex-col bg-white dark:bg-neutral-900 text-slate-900 dark:text-white transition-all duration-300 border-none">
      {/* ===== Header / Branding ===== */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-black/20">
        {!collapsed && (
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">CSM Elite</span>
            <span className="text-[11px] font-bold text-slate-500 tracking-wide mt-0.5">V.2.0 Pro</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <span className="text-xs font-black text-slate-900 dark:text-white">CSM</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden rounded-md p-1 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 md:flex"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-white/10 md:hidden"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* ===== Menu ===== */}
      <TooltipProvider delayDuration={0}>
        <ScrollArea className="flex-1 px-3">
          <nav className="py-4 space-y-4">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                {/* Section label */}
                {section.label && !collapsed && (
                  <div className="px-3 mb-2">
                    <span className="text-[11px] font-bold tracking-wide text-slate-400">
                      {section.label}
                    </span>
                  </div>
                )}

                {/* Items */}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname.startsWith(item.path) || (item.path === '/' && location.pathname === '/')

                    const button = (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          navigate(item.path)
                          onClose?.()
                        }}
                        className={clsx(
                          'relative h-10 w-full rounded-lg group font-bold overflow-hidden transition-all duration-200',
                          collapsed
                            ? 'justify-center px-0'
                            : 'justify-start gap-3 px-3',
                          isActive
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/5'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                        )}
                      >
                        <Icon
                          size={18}
                          className={clsx(
                            'relative z-10 shrink-0 transition-transform duration-300 group-hover:scale-110',
                            isActive ? '' : 'text-slate-400 group-hover:text-current'
                          )}
                        />

                        {!collapsed && (
                          <span className="relative z-10 truncate text-[11px] uppercase tracking-tight">
                            {item.label}
                          </span>
                        )}
                      </Button>
                    )

                    return collapsed ? (
                      <Tooltip key={item.path}>
                        <TooltipTrigger asChild>{button}</TooltipTrigger>
                        <TooltipContent side="right" className="bg-slate-900 text-white border-slate-800 text-[11px] font-bold tracking-wide">
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
        </ScrollArea>
      </TooltipProvider>

      {/* ===== Account Section ===== */}
      <div className="p-6 mt-auto">
        <div className={clsx(
          "flex items-center gap-3 rounded-[1.5rem] bg-white/[0.03] p-3 border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 group",
          collapsed ? "justify-center p-2" : "px-4"
        )}>
          <Avatar className="h-10 w-10 rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-colors">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback className="bg-white text-black font-black text-xs">AD</AvatarFallback>
          </Avatar>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white truncate tracking-tight">Administrator</p>
              <p className="text-[11px] font-bold text-slate-400 truncate tracking-wide mt-0.5">System Root</p>
            </div>
          )}

          {!collapsed && (
            <button
              onClick={() => dispatch(logout())}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500 hover:text-white text-slate-400 transition-all active:scale-95"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
