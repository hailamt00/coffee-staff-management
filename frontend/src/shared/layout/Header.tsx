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
  Search,
  Command,
  Menu,
  Bell,
  User,
  LogOut,
  Languages,
  Check,
  Moon,
} from 'lucide-react'

import { useTheme } from '@/shared/theme/useTheme'
import clsx from 'clsx'

interface Props {
  onToggleSidebar: () => void
}

export default function Header({ onToggleSidebar }: Props) {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.ui.language)
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      className={clsx(
        'sticky top-0 z-30 h-14',
        'flex items-center justify-between',
        'px-6',
        'border-b border-slate-200 dark:border-neutral-800',
        'bg-white dark:bg-black',
        'text-slate-900 dark:text-white',
        'transition-colors'
      )}
    >
      {/* ===== LEFT ===== */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onToggleSidebar}
          >
            <Menu size={18} />
          </Button>

          {/* App title */}
          <div className="flex flex-col leading-tight border-r border-slate-200 dark:border-neutral-800 pr-4 mr-1">
            <span className="text-sm font-black tracking-tighter uppercase">
              CSM_Elite
            </span>
            <span className="text-[10px] font-bold text-slate-400 hidden sm:block uppercase tracking-widest">
              V.2.0 PRO
            </span>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="hidden lg:block">
          <Breadcrumbs />
        </div>
      </div>

      {/* ===== CENTER SEARCH ===== */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors" />
          </div>
          <input
            type="text"
            className="w-full h-9 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg pl-9 pr-12 text-xs font-medium focus:ring-1 focus:ring-black dark:focus:ring-white transition-all shadow-sm"
            placeholder="Search commands or staff..."
          />
          <div className="absolute inset-y-0 right-3 flex items-center gap-0.5 pointer-events-none">
            <kbd className="h-5 px-1.5 rounded bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-[9px] font-bold text-slate-400 flex items-center gap-0.5 shadow-sm">
              <Command size={8} /> K
            </kbd>
          </div>
        </div>
      </div>

      {/* ===== RIGHT ===== */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* 🌗 Theme */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="transition hover:bg-slate-100 dark:hover:bg-neutral-800"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        {/* 🌐 Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-100 dark:hover:bg-neutral-800"
            >
              <Languages size={18} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-28 bg-white dark:bg-neutral-900"
          >
            <DropdownMenuItem onClick={() => dispatch(setLanguage('en'))}>
              EN
              {language === 'en' && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => dispatch(setLanguage('vi'))}>
              VI
              {language === 'vi' && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 🔔 Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-slate-100 dark:hover:bg-neutral-800"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-black dark:bg-white rounded-full border-2 border-white dark:border-black animate-pulse" />
        </Button>

        {/* 👤 Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="
                ml-1 flex items-center gap-2 rounded-full p-1
                hover:bg-slate-100 dark:hover:bg-neutral-800
                transition
              "
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-52 bg-white dark:bg-neutral-900"
          >
            <div className="px-3 py-2">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                System Administrator
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={() => dispatch(logout())}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
