import React from 'react'
import { Loader2 } from 'lucide-react'

export const GlobalLoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
