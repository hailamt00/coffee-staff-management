import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import Header from './Header'
import Sidebar from './Sidebar'
import clsx from 'clsx'
import { useNotificationHub } from '@/shared/hooks/useNotificationHub'

const COLLAPSE_KEY = 'sidebar-collapsed'

export default function AppLayout() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Live SignalR connection — receives push notifications from backend
  useNotificationHub()

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem(COLLAPSE_KEY) === 'true'
  })

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, String(collapsed))
  }, [collapsed])

  return (
    <div className="h-screen w-full bg-slate-50 dark:bg-black overflow-hidden relative">
      <div className="flex h-full">
        {/* ================= Desktop Sidebar ================= */}
        <aside
          className={clsx(
            'hidden md:flex flex-col shrink-0 z-30 overflow-hidden',
            'transition-[width] duration-300 ease-in-out',
            collapsed ? 'w-[64px]' : 'w-[240px]'
          )}
        >
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(v => !v)}
          />
        </aside>

        {/* ================= Mobile Sidebar ================= */}
        <div
          className={clsx(
            'fixed inset-0 z-40 md:hidden',
            sidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'
          )}
        >
          {/* Backdrop */}
          <div
            className={clsx(
              'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
              sidebarOpen ? 'opacity-100' : 'opacity-0'
            )}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer */}
          <div
            className={clsx(
              'absolute left-0 top-0 h-full w-64',
              'transition-transform duration-300 ease-out',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            )}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* ================= Main ================= */}
        <div className="flex flex-1 flex-col overflow-hidden bg-slate-50/30 dark:bg-[#080808]">
          {/* Header */}
          <div className="h-16 shrink-0">
            <Header onToggleSidebar={() => setSidebarOpen(true)} />
          </div>

          {/* Content */}
          <ScrollArea className="flex-1">
            <main className="px-5 py-5 md:px-8 md:py-8 lg:px-10">
              <div className="mx-auto w-full max-w-7xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="min-h-full pb-10"
                  >
                    <Outlet />
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
