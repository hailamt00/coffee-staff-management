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
            <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-8 rounded-2xl border border-slate-200/60 dark:border-neutral-800/60 shadow-sm overflow-hidden relative group transition-all hover:shadow-md">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] relative z-10 mb-1">CSM_ELITE Staff_</p>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase relative z-10 leading-none">{staff.name}</h2>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest relative z-10 bg-slate-50 dark:bg-neutral-800 w-fit px-3 py-1 rounded-full border border-slate-100 dark:border-neutral-700">
                    <Clock size={12} className="text-slate-400" />
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
            </div>

            <div className="grid gap-3">
                {menuItems.map((item) => (
                    <Card
                        key={item.path}
                        className="overflow-hidden border border-slate-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-sm active:scale-[0.98] transition-all cursor-pointer group hover:border-slate-300 dark:hover:border-neutral-700 hover:shadow-md rounded-xl"
                        onClick={() => navigate(item.path)}
                    >
                        <CardContent className="p-0">
                            <div className="flex items-center p-5 gap-5">
                                <div className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-neutral-800 flex items-center justify-center text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:bg-white dark:group-hover:bg-neutral-800 transition-all duration-300">
                                    <item.icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{item.title}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">{item.description}</p>
                                </div>
                                <div className="h-8 w-8 rounded-full flex items-center justify-center transition-all group-hover:bg-slate-50 dark:group-hover:bg-white/5">
                                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
