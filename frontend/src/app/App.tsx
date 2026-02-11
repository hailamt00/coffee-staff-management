import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GlobalLoadingSpinner } from '@/shared/components/ui/global-loading-spinner'
import { NotificationContainer } from '@/shared/components/ui/notification-container'
import type { RootState } from '@/app/store'

function App() {
  const globalLoading = useSelector(
    (state: RootState) => state.ui.globalLoading
  )

  return (
    <>
      <Outlet />
      {globalLoading && <GlobalLoadingSpinner />}
      <NotificationContainer />
    </>
  )
}

export default App
