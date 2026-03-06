import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { X, ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { useDispatch } from 'react-redux'
import { logout } from '@/features/auth/slices/authSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { getRoutesBySection } from '@/shared/config/routes'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  const getSectionKey = (label: string) =>
    `sidebar.${label.charAt(0).toLowerCase() + label.slice(1).replace(/\s+/g, '')}`

  const getItemKey = (label: string) =>
    `sidebar.${label.charAt(0).toLowerCase() + label.slice(1).replace(/\s+/g, '')}`

  return (
    <aside className="relative flex h-full w-full flex-col bg-white dark:bg-[#0d0d0d] text-slate-900 dark:text-white border-r border-slate-100 dark:border-white/[0.06]">

      {/* ===== Header ===== */}
      <div className={clsx(
        'flex h-16 shrink-0 items-center border-b border-slate-100 dark:border-white/[0.06] transition-all duration-300',
        collapsed ? 'justify-center px-0' : 'px-5 justify-between'
      )}>
        {/* Brand — hidden via overflow clip when collapsed */}
        <div className={clsx(
          'flex flex-col leading-none overflow-hidden transition-all duration-300',
          collapsed ? 'w-0 opacity-0' : 'w-full opacity-100 delay-150'
        )}>
          <span className="text-[15px] font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            CSM Elite
          </span>
          <span className="text-[9px] font-bold text-slate-400 tracking-[0.3em] mt-0.5 uppercase whitespace-nowrap">
            Staff Portal
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center shrink-0">
          {onToggleCollapse && !onClose && (
            <button
              onClick={onToggleCollapse}
              className={clsx(
                'hidden md:flex items-center justify-center rounded-xl transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/8 text-slate-400 hover:text-slate-800 dark:hover:text-white active:scale-90',
                collapsed ? 'h-10 w-10 flex-col gap-0.5' : 'h-8 w-8'
              )}
            >
              {collapsed ? (
                <>
                  <span className="text-[8px] font-black text-slate-500">CSM</span>
                  <ChevronRight size={12} className="text-slate-400" />
                </>
              ) : (
                <ChevronLeft size={16} />
              )}
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-white/8 md:hidden text-slate-400"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* ===== Navigation ===== */}
      <TooltipProvider delayDuration={400}>
        <ScrollArea className="flex-1">
          <nav className={clsx('py-3', collapsed ? 'px-2' : 'px-3')}>
            {sections.map((section, idx) => (
              <div key={idx} className={idx > 0 ? 'mt-2' : ''}>

                {/* Section divider / label */}
                {collapsed ? (
                  /* Collapsed: thin separator */
                  idx > 0 && (
                    <div className="h-px bg-slate-100 dark:bg-white/[0.06] mx-1 mb-2 mt-1" />
                  )
                ) : (
                  /* Expanded: label */
                  section.label && (
                    <div className={clsx(
                      'px-2 mb-1 overflow-hidden transition-all duration-200',
                      idx === 0 ? '' : 'mt-3'
                    )}>
                      <span className={clsx(
                        'text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-600 uppercase whitespace-nowrap block transition-all duration-200',
                        collapsed ? 'opacity-0' : 'opacity-100 delay-[200ms]'
                      )}>
                        {t(getSectionKey(section.label))}
                      </span>
                    </div>
                  )
                )}

                {/* Menu items */}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.path

                    return (
                      <Tooltip key={item.path}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => {
                              navigate(item.path)
                              onClose?.()
                            }}
                            className={clsx(
                              'relative w-full flex items-center rounded-xl transition-all duration-200 group',
                              collapsed
                                ? 'justify-center h-10 w-10 mx-auto'
                                : 'px-3 h-10',
                              isActive
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                            )}
                          >
                            {/* Icon */}
                            <item.icon
                              size={17}
                              className={clsx(
                                'shrink-0 transition-all duration-200',
                                !collapsed && 'mr-2.5',
                                isActive
                                  ? ''
                                  : 'group-hover:scale-110'
                              )}
                            />

                            {/* Label — always in DOM, hidden via CSS when collapsed */}
                            <span className={clsx(
                              'text-[13px] font-semibold whitespace-nowrap overflow-hidden transition-all duration-200',
                              collapsed
                                ? 'w-0 opacity-0 pointer-events-none'
                                : 'w-auto opacity-100 delay-[200ms]'
                            )}>
                              {t(getItemKey(item.label))}
                            </span>

                            {/* Active dot */}
                            {isActive && !collapsed && (
                              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white dark:bg-slate-900 opacity-60 shrink-0" />
                            )}
                          </button>
                        </TooltipTrigger>

                        {collapsed && (
                          <TooltipContent
                            side="right"
                            sideOffset={8}
                            className="text-[12px] font-semibold px-3 py-1.5 rounded-xl"
                          >
                            {t(getItemKey(item.label))}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </TooltipProvider>

      {/* ===== Account Section ===== */}
      <div className={clsx(
        'shrink-0 border-t border-slate-100 dark:border-white/[0.06] transition-all duration-300',
        collapsed ? 'p-2' : 'p-3'
      )}>
        <div className={clsx(
          'flex items-center rounded-xl transition-all duration-200 hover:bg-slate-50 dark:hover:bg-white/[0.05] group cursor-pointer',
          collapsed ? 'justify-center p-2' : 'px-3 py-2.5 gap-3'
        )}>
          <Avatar className="h-8 w-8 shrink-0 rounded-lg">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback className="bg-slate-900 text-white dark:bg-white dark:text-black font-black text-[10px] rounded-lg">AD</AvatarFallback>
          </Avatar>

          {/* User info */}
          <div className={clsx(
            'flex-1 min-w-0 overflow-hidden transition-all duration-200',
            collapsed ? 'w-0 opacity-0' : 'opacity-100 delay-[200ms]'
          )}>
            <p className="text-[12px] font-bold text-slate-900 dark:text-white truncate whitespace-nowrap">
              {t('sidebar.administrator')}
            </p>
            <p className="text-[10px] text-slate-400 truncate tracking-widest mt-0.5 uppercase whitespace-nowrap">
              {t('sidebar.systemRoot')}
            </p>
          </div>

          {/* Logout */}
          {!collapsed && (
            <button
              onClick={(e) => { e.stopPropagation(); dispatch(logout()) }}
              className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all active:scale-90"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
