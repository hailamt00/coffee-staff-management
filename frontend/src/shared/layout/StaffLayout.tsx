import { Outlet, useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { LogOut } from 'lucide-react'

export default function StaffLayout() {
    const navigate = useNavigate()
    const staffJson = localStorage.getItem('staffInfo')
    const staff = staffJson ? JSON.parse(staffJson) : null

    const handleLogout = () => {
        localStorage.removeItem('staffInfo')
        navigate('/staff/login')
    }

    if (!staff && window.location.pathname !== '/staff/login') {
        // Direct to login if not authenticated
        // But we handle this in a Protected wrapper usually or inside the component
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col transition-colors duration-300">
            {/* Header */}
            <header className="bg-white dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800 px-4 h-14 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="flex flex-col leading-none">
                        <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">Staff Portal</span>
                        <span className="text-[11px] font-bold text-slate-500 tracking-wide mt-0.5">V.2.0 Elite</span>
                    </div>
                </div>

                {staff && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="text-[11px] font-bold tracking-wide text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="h-4 w-4 mr-1.5" />
                        Exit
                    </Button>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 max-w-md mx-auto w-full">
                <Outlet />
            </main>

            {/* Footer / Info */}
            <footer className="p-4 text-center text-[11px] font-medium text-slate-400 tracking-wide">
                &copy; {new Date().getFullYear()} Coffee Staff Management
            </footer>
        </div>
    )
}
