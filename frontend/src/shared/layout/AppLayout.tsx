import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import Sidebar from './Sidebar'
import clsx from 'clsx'

const COLLAPSE_KEY = 'sidebar-collapsed'

export default function AppLayout() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem(COLLAPSE_KEY) === 'true'
  })

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, String(collapsed))
  }, [collapsed])

  return (
    <div className="h-screen w-full bg-slate-50 dark:bg-neutral-950 overflow-hidden">
      <div className="flex h-full">
        {/* ================= Desktop Sidebar ================= */}
        <aside
          className={clsx(
            'hidden md:flex flex-col shrink-0',
            'bg-white dark:bg-black shadow-[1px_0_0_rgba(0,0,0,0.04)] dark:shadow-[1px_0_0_rgba(255,255,255,0.04)]',
            'border-r border-slate-200 dark:border-neutral-800',
            'transition-[width] duration-300 ease-in-out',
            collapsed ? 'w-16' : 'w-[220px]'
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
              'absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
              sidebarOpen ? 'opacity-100' : 'opacity-0'
            )}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer */}
          <div
            className={clsx(
              'absolute left-0 top-0 h-full w-[220px]',
              'bg-white dark:bg-black',
              'border-r border-slate-200 dark:border-neutral-800',
              'shadow-2xl',
              'transition-transform duration-300 ease-out',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            )}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* ================= Main ================= */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-30">
            <Header onToggleSidebar={() => setSidebarOpen(true)} />
          </div>

          {/* Content */}
          <main className="flex-1 overflow-y-auto no-scrollbar px-4 sm:px-6 py-4 sm:py-6">
            <div className="mx-auto w-full max-w-[1440px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="min-h-full"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
