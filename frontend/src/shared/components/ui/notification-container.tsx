import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { removeNotification } from '@/features/ui/slices/uiSlice'
import * as Toast from '@radix-ui/react-toast'
import { useEffect } from 'react'
import { cn } from '@/shared/lib/utils'

export function NotificationContainer() {
  const notifications = useSelector(
    (state: RootState) => state.ui.notifications
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notifications[0].id))
      }, notifications[0].duration || 4000)

      return () => clearTimeout(timer)
    }
  }, [notifications, dispatch])

  return (
    <Toast.Provider swipeDirection="right">
      {notifications.map((n) => (
        <Toast.Root
          key={n.id}
          duration={n.duration || 4000}
          className={cn(
            "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-4 pr-8 shadow-2xl transition-all mb-3",
            "bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800",
            "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=move]:transition-none data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full"
          )}
          onOpenChange={(open) => {
            if (!open) dispatch(removeNotification(n.id))
          }}
        >
          <div className="grid gap-1">
            <Toast.Title className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <span className={cn(
                "h-1.5 w-1.5 rounded-full shrink-0",
                n.type === 'error' ? "bg-red-500" : n.type === 'success' ? "bg-emerald-500" : "bg-slate-400"
              )} />
              {n.title}
            </Toast.Title>
            <Toast.Description className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tight">
              {n.message}
            </Toast.Description>
          </div>
          <Toast.Close className="absolute right-2 top-2 rounded-md p-1 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-slate-900 dark:hover:text-white">
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </Toast.Close>
        </Toast.Root>
      ))}

      <Toast.Viewport className="fixed bottom-4 right-4 z-[9999] flex w-[320px] max-w-[100vw] flex-col gap-2" />
    </Toast.Provider>
  )
}
