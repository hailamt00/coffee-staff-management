import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GlobalLoadingSpinner } from '@/shared/components/GlobalLoadingSpinner'
import { NotificationContainer } from '@/shared/components/NotificationContainer'
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
