export type UserRole = 'Admin' | 'Manager' | 'Staff'
export type UserStatus = 'Active' | 'Inactive'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
}
