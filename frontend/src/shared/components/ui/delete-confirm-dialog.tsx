import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'

export interface DeleteConfirmDialogProps {
    open: boolean
    title: string
    description?: string
    onOpenChange: (open: boolean) => void
    onConfirm: () => void | Promise<void>
}

export function DeleteConfirmDialog({
    open,
    title,
    description,
    onOpenChange,
    onConfirm,
}: DeleteConfirmDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="rounded-2xl border-slate-200 dark:border-neutral-800 shadow-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-[13px] font-black uppercase tracking-widest">{title}</AlertDialogTitle>
                    {description && (
                        <AlertDialogDescription className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                            {description}
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4 gap-2">
                    <AlertDialogCancel className="rounded-lg h-9 text-[10px] font-black uppercase tracking-widest border-slate-200 dark:border-neutral-800">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="rounded-lg h-9 text-[10px] font-black uppercase tracking-widest bg-slate-900 dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
