// export interface Column<T> {
//     key: keyof T | string
//     title: string
//     render?: (row: T, index: number) => React.ReactNode
//     align?: 'left' | 'right' | 'center'
// }

// export function BaseTable<T>({
//     data,
//     columns,
//     loading,
// }: {
//     data: T[]
//     columns: Column<T>[]
//     loading?: boolean
// }) {
//     if (loading) {
//         return (
//             <div className="py-20 text-center text-muted-foreground animate-pulse">
//                 Loading...
//             </div>
//         )
//     }

//     if (data.length === 0) {
//         return (
//             <div className="py-20 text-center text-muted-foreground">
//                 No data
//             </div>
//         )
//     }

//     return (
//         <div className="border rounded-lg overflow-x-auto">
//             <div className="min-w-full">
//                 {/* HEADER */}
//                 <div
//                     className="grid border-b bg-muted/40"
//                     style={{
//                         gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
//                     }}
//                 >
//                     {columns.map(col => (
//                         <div
//                             key={col.key}
//                             className={`px-3 py-3 text-sm font-semibold
//                 ${alignClass(col.align)}`}
//                         >
//                             {col.title}
//                         </div>
//                     ))}
//                 </div>

//                 {/* ROWS */}
//                 {data.map((row, i) => (
//                     <div
//                         key={i}
//                         className="grid border-b hover:bg-muted/30 transition"
//                         style={{
//                             gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
//                         }}
//                     >
//                         {columns.map(col => (
//                             <div
//                                 key={String(col.key)}
//                                 className={`px-3 py-2 text-sm ${alignClass(col.align)}`}
//                             >
//                                 {col.render
//                                     ? col.render(row, i)
//                                     : (row as any)[col.key]}
//                             </div>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// function alignClass(align?: string) {
//     if (align === 'right') return 'text-right'
//     if (align === 'center') return 'text-center'
//     return ''
// }
