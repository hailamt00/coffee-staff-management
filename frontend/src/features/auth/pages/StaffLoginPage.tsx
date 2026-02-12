import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Phone, ArrowRight, Coffee, ShieldCheck } from 'lucide-react'
import axios from '@/shared/api/axios'

export default function StaffLoginPage() {
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!phone) return

        setLoading(true)
        setError('')

        try {
            // We search for employee by phone
            const response = await axios.get(`/employees?search=${phone}`)
            const employees = response.data

            // Simple verification: find exact match for phone
            const match = employees.find((e: any) => e.phone === phone)

            if (match) {
                localStorage.setItem('staffInfo', JSON.stringify({
                    id: match.id,
                    name: match.name,
                    phone: match.phone,
                    code: match.code
                }))
                navigate('/staff/menu')
            } else {
                setError('Phone number not found in our records.')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-black dark:via-neutral-950 dark:to-neutral-900 relative overflow-hidden px-4 py-12">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 -left-24 w-80 h-80 bg-slate-900/5 dark:bg-white/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 -right-24 w-80 h-80 bg-slate-900/5 dark:bg-white/5 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            {/* Main container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-md relative z-10"
            >
                {/* Glass card */}
                <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition duration-1000" />

                    {/* Card */}
                    <div className="relative bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-slate-200/50 dark:border-neutral-800/50 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="relative p-8 pb-6 text-center border-b border-slate-200/50 dark:border-neutral-800/50 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-neutral-900/50">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 dark:bg-white mb-4 shadow-lg"
                            >
                                <Coffee className="w-8 h-8 text-white dark:text-black" />
                            </motion.div>

                            <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                                Staff Portal
                            </h1>
                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                                Employee Access
                            </p>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            <form onSubmit={handleLogin} className="space-y-6">
                                {/* Instructions */}
                                <div className="flex items-start gap-3 p-4 bg-slate-50/50 dark:bg-neutral-900/50 rounded-xl border border-slate-200/50 dark:border-neutral-800/50">
                                    <ShieldCheck className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Enter your registered phone number to access your staff portal
                                    </p>
                                </div>

                                {/* Phone field */}
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                        Phone Number
                                    </label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors" />
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="0xxx xxx xxx"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-12 pl-12 bg-slate-50 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Error message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl"
                                    >
                                        <p className="text-sm font-medium text-red-600 dark:text-red-400 text-center">
                                            {error}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Submit button */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 group"
                                    disabled={loading || !phone}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin" />
                                            Verifying...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Verify & Continue
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Admin link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 text-center"
                >
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Not a staff member?{' '}
                        <Button
                            variant="link"
                            className="p-0 h-auto text-slate-900 dark:text-white font-bold hover:underline"
                            onClick={() => navigate('/login')}
                        >
                            Admin Login →
                        </Button>
                    </p>
                </motion.div>

                {/* Version badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-4 text-center"
                >
                    <p className="text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                        Coffee Staff Management v2.0 Pro
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}
