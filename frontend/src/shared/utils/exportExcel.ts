import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export function exportToExcel<T>(
  data: T[],
  columns: {
    key: keyof T
    title: string
    render?: (value: any, row: T) => React.ReactNode
  }[],
  fileName: string
) {
  const rows = data.map(row => {
    const obj: Record<string, any> = {}

    columns.forEach(col => {
      const value = row[col.key]

      if (typeof value === 'number' || typeof value === 'string') {
        obj[col.title] = value
      } else if (value instanceof Date) {
        obj[col.title] = value.toISOString()
      } else {
        obj[col.title] = value ?? ''
      }
    })

    return obj
  })

  const worksheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  const buffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })

  saveAs(
    new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
    `${fileName}.xlsx`
  )
}
