import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { logout } from '@/features/auth/slices/authSlice'
import { setLanguage } from '@/features/ui/slices/uiSlice'

import { Button } from '@/shared/components/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Breadcrumbs } from '@/shared/components/ui/breadcrumbs'

import {
  Sun,
  Menu,
  User,
  LogOut,
  Languages,
  Check,
  Moon,
} from 'lucide-react'

import { useTheme } from '@/shared/theme/ThemeContext'
import clsx from 'clsx'
import { SearchPalette } from './components/SearchPalette'
import { NotificationPopover } from './components/NotificationPopover'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

interface Props {
  onToggleSidebar: () => void
}

export default function Header({ onToggleSidebar }: Props) {
  const dispatch = useDispatch()
  const { i18n, t } = useTranslation()
  const language = useSelector((state: RootState) => state.ui.language)
  const admin = useSelector((state: RootState) => state.auth.admin)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  const adminName = admin?.username || 'System Admin'
  const adminEmail = 'admin@csm-elite.com' // Static for now as it's not in the type
  const adminInitials = adminName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()

  return (
    <header
      className={clsx(
        'sticky top-0 z-30 h-16',
        'flex items-center justify-between',
        'px-8',
        'border-b border-slate-200/60 dark:border-neutral-800/60',
        'bg-white/70 dark:bg-black/70 backdrop-blur-xl',
        'text-slate-900 dark:text-white',
        'transition-all duration-300'
      )}
    >
      {/* ===== LEFT ===== */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            onClick={onToggleSidebar}
          >
            <Menu size={20} />
          </Button>

          {/* Page Context (Breadcrumbs) */}
          <div className="hidden lg:flex items-center h-8 px-4 bg-slate-50 dark:bg-white/[0.03] rounded-full border border-slate-200/50 dark:border-white/5 shadow-sm">
            <Breadcrumbs />
          </div>
        </div>
      </div>

      {/* ===== CENTER SEARCH ===== */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <SearchPalette />
      </div>

      {/* ===== RIGHT ===== */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* 🌗 Theme */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="transition hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-full"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        {/* 🌐 Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-full"
            >
              <Languages size={18} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="p-1 w-32 bg-white dark:bg-[#0C0C0C] backdrop-blur-xl border-slate-200 dark:border-white/5 shadow-2xl rounded-xl"
          >
            <DropdownMenuItem
              onClick={() => dispatch(setLanguage('en'))}
              className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg text-xs font-bold uppercase tracking-widest"
            >
              English
              {language === 'en' && <Check className="h-3.5 w-3.5" />}
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => dispatch(setLanguage('vi'))}
              className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg text-xs font-bold uppercase tracking-widest"
            >
              Tiếng Việt
              {language === 'vi' && <Check className="h-3.5 w-3.5" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 🔔 Notifications */}
        <NotificationPopover />

        {/* 👤 Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="
                ml-1 flex items-center gap-2 rounded-full p-0.5
                hover:opacity-80 transition-opacity
              "
            >
              <Avatar className="h-8 w-8 ring-1 ring-slate-200 dark:ring-white/10 ring-offset-2 ring-offset-white dark:ring-offset-black">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className="bg-slate-900 text-white dark:bg-white dark:text-black font-black text-[10px]">
                  {adminInitials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-60 bg-white dark:bg-[#0C0C0C] backdrop-blur-xl border-slate-200 dark:border-white/5 shadow-2xl rounded-2xl p-1"
          >
            <div className="px-3 py-3">
              <p className="text-[12px] font-black uppercase tracking-tight text-slate-900 dark:text-white truncate">
                {adminName}
              </p>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 truncate tracking-wide">
                {adminEmail}
              </p>
            </div>

            <DropdownMenuSeparator className="bg-slate-200 dark:bg-white/5" />

            <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <User className="h-4 w-4 opacity-70" />
              {t('common.myProfile')}
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-200 dark:bg-white/5" />

            <DropdownMenuItem
              className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-500 focus:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              onClick={() => dispatch(logout())}
            >
              <LogOut className="h-4 w-4" />
              {t('common.signOut')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
