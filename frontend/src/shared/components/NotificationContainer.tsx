import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { removeNotification } from '@/features/ui/slices/uiSlice'
import * as Toast from '@radix-ui/react-toast'
import { useEffect } from 'react'

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
          className={`mb-2 rounded-lg border-l-4 bg-white p-4 shadow-lg ${
            n.type === 'error'
              ? 'border-red-500'
              : n.type === 'success'
                ? 'border-green-500'
                : n.type === 'warning'
                  ? 'border-yellow-500'
                  : 'border-blue-500'
          }`}
          onOpenChange={(open) => {
            if (!open) dispatch(removeNotification(n.id))
          }}
        >
          <Toast.Title className="font-bold">{n.title}</Toast.Title>
          <Toast.Description className="text-sm">
            {n.message.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </Toast.Description>
        </Toast.Root>
      ))}

      <Toast.Viewport className="fixed bottom-4 right-4 z-[9999] flex w-[320px] max-w-[100vw] flex-col gap-2" />
    </Toast.Provider>
  )
}
