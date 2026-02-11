
export interface Adjustment {
    id: number
    employeeId: number
    employeeName: string
    typeId: number
    typeName: string // "Thưởng" or "Phạt" usually
    amount: number
    createdAt: string
}
