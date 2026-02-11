import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/shared/components/ui/card'
import {
    UserCheck,
    Calendar,
    DollarSign,
    ChevronRight,
    Clock
} from 'lucide-react'

export default function StaffMenuPage() {
    const navigate = useNavigate()
    const staffJson = localStorage.getItem('staffInfo')
    const staff = staffJson ? JSON.parse(staffJson) : null

    if (!staff) {
        navigate('/staff/login')
        return null
    }

    const menuItems = [
        {
            title: 'Attendance',
            description: 'Check-in or Check-out',
            icon: UserCheck,
            path: '/staff/attendance',
            color: 'bg-black'
        },
        {
            title: 'My Schedule',
            description: 'View & request shifts',
            icon: Calendar,
            path: '/staff/schedule',
            color: 'bg-slate-700'
        },
        {
            title: 'End Shift Report',
            description: 'Report shift revenue',
            icon: DollarSign,
            path: '/staff/revenue',
            color: 'bg-slate-500'
        }
    ]

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-950 p-6 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Employee Pulse_</p>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase relative z-10">{staff.name}</h2>
                <div className="mt-3 flex items-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tighter relative z-10">
                    <Clock size={12} />
                    {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
            </div>

            <div className="grid gap-3">
                {menuItems.map((item) => (
                    <Card
                        key={item.path}
                        className="overflow-hidden border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm active:scale-[0.98] transition-all cursor-pointer group"
                        onClick={() => navigate(item.path)}
                    >
                        <CardContent className="p-0">
                            <div className="flex items-center p-4 gap-4">
                                <div className="h-10 w-10 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-neutral-800 flex items-center justify-center text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                    <item.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.title}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.description}</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
