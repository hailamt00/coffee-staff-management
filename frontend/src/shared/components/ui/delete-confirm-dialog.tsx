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
            <AlertDialogContent className="max-w-md w-[95vw] rounded-[2rem] border-none shadow-2xl p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-black tracking-tighter text-red-600">{title}</AlertDialogTitle>
                    {description && (
                        <AlertDialogDescription className="text-slate-500 font-medium py-4">
                            {description}
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter className="flex sm:flex-row gap-2">
                    <AlertDialogCancel className="mt-0 flex-1 h-12 rounded-xl font-bold border-none bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest text-[10px] bg-red-600 hover:bg-red-700 text-white"
                    >
                        Confirm Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
