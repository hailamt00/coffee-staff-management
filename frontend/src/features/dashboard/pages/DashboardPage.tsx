import {
  Users,
  UserCheck,
  Shield,
  Clock,
  TrendingUp,
  BarChart3,
} from 'lucide-react'
import { SummaryCard } from '@/shared/components/ui/summary-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const revenueData = [
  { name: 'Mon', revenue: 4200000, target: 4000000 },
  { name: 'Tue', revenue: 3800000, target: 4000000 },
  { name: 'Wed', revenue: 5100000, target: 4000000 },
  { name: 'Thu', revenue: 4600000, target: 4000000 },
  { name: 'Fri', revenue: 6200000, target: 5500000 },
  { name: 'Sat', revenue: 8500000, target: 7000000 },
  { name: 'Sun', revenue: 7800000, target: 7000000 },
]

const attendanceData = [
  { name: '06AM', count: 4 },
  { name: '08AM', count: 12 },
  { name: '10AM', count: 15 },
  { name: '12PM', count: 18 },
  { name: '02PM', count: 14 },
  { name: '04PM', count: 10 },
  { name: '06PM', count: 16 },
  { name: '08PM', count: 8 },
]

const staffMixData = [
  { name: 'Barista', value: 12, color: '#000' },
  { name: 'Service', value: 8, color: '#333' },
  { name: 'Manager', value: 4, color: '#666' },
]

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 pb-16"
    >
      {/* Header */}
      <div className="flex items-end justify-between px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Dashboard
          </h1>
          <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Operational Overview
          </p>
        </div>
        <div className="hidden sm:flex h-10 items-center gap-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 px-4 shadow-sm">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest">Live Status</span>
        </div>
      </div>

      {/* KPI Section */}
      <section>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total Workforce"
            value={24}
            description="Active Personnel"
            icon={Users}
            color="cyan"
            trend="+4.2% Growth"
          />
          <SummaryCard
            title="Attendance"
            value="98.4%"
            description="Shift Compliance"
            icon={UserCheck}
            color="green"
            trend="Peak Perf"
          />
          <SummaryCard
            title="Live Shifts"
            value={8}
            description="Current Operations"
            icon={Clock}
            color="orange"
            trend="Stable"
          />
          <SummaryCard
            title="Security"
            value={2}
            description="System Admins"
            icon={Shield}
            color="blue"
          />
        </div>
      </section>

      {/* Analytics Insight */}
      <div className="pt-4 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Main Revenue Chart */}
        <Card className="lg:col-span-2 border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-4">
            <div>
              <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                Net Revenue Performance
              </CardTitle>
              <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">VND 40.2M</h2>
            </div>
            <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white flex items-center justify-center">
              <TrendingUp className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent className="h-[340px] w-full px-8 pb-8 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8', letterSpacing: '0.1em' }}
                />
                <YAxis hide />
                <RechartsTooltip
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', padding: '12px 16px' }}
                  itemStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#000"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                  animationDuration={2000}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#cbd5e1"
                  strokeDasharray="10 10"
                  strokeWidth={2}
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Secondary Analytics */}
        <div className="flex flex-col gap-6">
          {/* Attendance Bar Chart */}
          <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
            <CardHeader className="px-6 pt-6 pb-2">
              <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <BarChart3 size={12} className="text-slate-400" /> Peak Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[180px] w-full px-6 pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <Bar
                    dataKey="count"
                    fill="#000"
                    radius={[6, 6, 6, 6]}
                    background={{ fill: '#f8fafc', radius: 6 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Staff Mix Pie */}
          <Card className="flex-1 border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden flex flex-col items-center justify-center py-6">
            <div className="h-[140px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={staffMixData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {staffMixData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">24</span>
                <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Total</span>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              {staffMixData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Pulse Logs Table Placeholder / Recent Pulse */}
      <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        <div className="p-2 border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-black/20 flex items-center justify-between px-6">
          <span className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Real-Time Operational Pulse</span>
          <div className="flex gap-1.5">
            <div className="h-1 w-8 rounded-full bg-slate-200 dark:bg-white/20" />
            <div className="h-1 w-2 rounded-full bg-slate-300 dark:bg-white/40" />
          </div>
        </div>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x border-slate-200 dark:border-neutral-800">
            {[
              { label: "Revenue Delta", val: "+12.4%", sub: "Above Target", trend: "up" },
              { label: "Compliance", val: "99.2%", sub: "Top Tier", trend: "up" },
              { label: "Efficiency", val: "Elite", sub: "Operational", trend: "neutral" },
              { label: "Staff Load", val: "Optimal", sub: "8 Active", trend: "neutral" },
            ].map((item, i) => (
              <div key={i} className="p-6 transition-colors hover:bg-slate-50 dark:hover:bg-neutral-950 group cursor-pointer">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform">{item.val}</span>
                  <span className="text-[10px] font-bold text-slate-500 mb-1">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
