import React from 'react'
import { Loader2 } from 'lucide-react'

export const GlobalLoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-[2px]">
      <div className="flex flex-col items-center space-y-4 rounded-2xl bg-white dark:bg-neutral-900 p-10 border border-slate-200 dark:border-neutral-800 shadow-2xl shadow-black/10 dark:shadow-white/5">
        <Loader2 className="h-10 w-10 animate-spin text-slate-900 dark:text-white stroke-[3]" />
        <div className="flex flex-col items-center leading-none">
          <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Loading</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">System Pulse</p>
        </div>
      </div>
    </div>
  )
}
