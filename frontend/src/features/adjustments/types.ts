
export interface Adjustment {
    id: number
    employeeId: number
    employeeName: string
    typeId: number
    typeName: string // "Bonus" or "Penalty" usually
    amount: number
    createdAt: string
}
