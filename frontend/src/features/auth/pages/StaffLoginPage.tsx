import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Phone, ArrowRight, Coffee, ShieldCheck, Globe, Check } from 'lucide-react'
import axios from '@/shared/api/axios'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '@/features/ui/slices/uiSlice'
import { RootState } from '@/app/store'
import clsx from 'clsx'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

export default function StaffLoginPage() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const currentLang = useSelector((state: RootState) => state.ui.language)
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
                setError(t('auth.errors.phoneNotFound') || 'Phone number not found in our records.')
            }
        } catch (err) {
            setError(t('auth.errors.generic') || 'An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-black dark:via-neutral-950 dark:to-neutral-900 relative overflow-hidden px-4 py-12">
            {/* Language Switcher Overlay */}
            <div className="absolute top-6 right-6 z-50">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-10 w-10 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-md border border-slate-200/50 dark:border-neutral-800/50 p-0 shadow-sm transition-all hover:bg-white dark:hover:bg-neutral-900">
                            <Globe size={18} className="text-slate-600 dark:text-slate-400" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-2xl p-1 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-neutral-800/50 shadow-2xl">
                        {[
                            { code: 'en', label: 'English', flag: '🇺🇸' },
                            { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' }
                        ].map((lang) => (
                            <DropdownMenuItem
                                key={lang.code}
                                onClick={() => {
                                    i18n.changeLanguage(lang.code)
                                    dispatch(setLanguage(lang.code as 'en' | 'vi'))
                                }}
                                className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer focus:bg-slate-100 dark:focus:bg-white/10 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">{lang.flag}</span>
                                    <span className={clsx("text-xs font-bold", currentLang === lang.code ? "text-slate-900 dark:text-white" : "text-slate-500")}>
                                        {lang.label}
                                    </span>
                                </div>
                                {currentLang === lang.code && <Check size={14} className="text-slate-900 dark:text-white" />}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

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

                            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                {t('auth.staffPortal')}
                            </h1>
                            <p className="text-[11px] font-bold text-slate-500 tracking-wide mt-1">
                                {t('auth.employeeAccess')}
                            </p>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            <form onSubmit={handleLogin} className="space-y-6">
                                {/* Instructions */}
                                <div className="flex items-start gap-3 p-4 bg-slate-50/50 dark:bg-neutral-900/50 rounded-xl border border-slate-200/50 dark:border-neutral-800/50">
                                    <ShieldCheck className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {t('auth.staffInstruction')}
                                    </p>
                                </div>

                                {/* Phone field */}
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-[11px] font-bold text-slate-700 dark:text-slate-300 tracking-wide">
                                        {t('auth.phoneNumber')}
                                    </label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors" />
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder={t('auth.phonePlaceholder') || "0xxx xxx xxx"}
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
                                    className="w-full h-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 group"
                                    disabled={loading || !phone}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin" />
                                            {t('auth.verifying')}
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            {t('auth.verify')}
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
                        {t('auth.notStaff')}{' '}
                        <Button
                            variant="link"
                            className="p-0 h-auto text-slate-900 dark:text-white font-bold hover:underline"
                            onClick={() => navigate('/login')}
                        >
                            {t('auth.adminLogin')} →
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
                    <p className="text-[11px] font-bold text-slate-500 tracking-wide">
                        Coffee Staff Management v2.0 Pro
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}
