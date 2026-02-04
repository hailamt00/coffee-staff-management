import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { logout } from '@/features/auth/slices/authSlice'
import { setLanguage } from '@/features/ui/slices/uiSlice'

import { Button } from '@/shared/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import {
  Menu,
  Bell,
  User,
  LogOut,
  Languages,
  Check,
  Moon,
  Sun,
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
        'px-4 sm:px-6',
        'border-b border-slate-200 dark:border-neutral-800',
        'bg-white/80 dark:bg-black/70 backdrop-blur',
        'text-slate-900 dark:text-white',
        'transition-colors'
      )}
    >
      {/* ===== LEFT ===== */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </Button>

        {/* App title */}
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-wide">
            Coffee Staff Management
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
            Chill Coffee & Tea
          </span>
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
          <Badge
            className="
      absolute -top-1 -right-1
      h-4 w-4 p-0
      flex items-center justify-center
      text-[10px] leading-none
      rounded-full
    "
          >
            3
          </Badge>
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
