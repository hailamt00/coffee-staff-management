import { useState } from 'react'
import { AxiosError } from 'axios'
import axios from '@/shared/api/axios'
import { Card, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import type { ApiErrorResponse } from '@/shared/types/api'

type Role = 'bar' | 'service' | 'manager' | ''

export default function AttendanceQrPage() {
  // ===== FORM STATE =====
  const [phone, setPhone] = useState<string>('')
  const [role, setRole] = useState<Role>('')
  const [name, setName] = useState<string>('')

  // ===== UI STATE =====
  const [needCreate, setNeedCreate] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  // ===== SUBMIT HANDLER =====
  const submit = async (): Promise<void> => {
    if (!phone || !role) {
      setMessage('Vui lòng nhập đầy đủ thông tin')
      return
    }

    try {
      setLoading(true)
      setMessage('')

      await axios.post('/attendance/qr', {
        phone,
        role,
        employeeName: needCreate ? name : null,
      })

      setMessage('✅ Thành công')
      setNeedCreate(false)
      setName('')
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>
      const code = err.response?.data?.message

      if (code === 'EMPLOYEE_NOT_FOUND') {
        setNeedCreate(true)
        setMessage('Nhân viên chưa tồn tại, vui lòng nhập họ tên')
      } else if (code === 'LIMIT_REACHED') {
        setMessage('❌ Bạn đã đạt giới hạn 6 lần hôm nay')
      } else {
        setMessage('❌ Có lỗi xảy ra')
      }
    } finally {
      setLoading(false)
    }
  }

  // ===== UI =====
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-xl font-semibold text-center">
            Attendance QR
          </h1>

          {/* ROLE */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">-- Chọn chức vụ --</option>
            <option value="bar">Bar</option>
            <option value="service">Service</option>
            <option value="manager">Manager</option>
          </select>

          {/* PHONE */}
          <Input
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* NAME (ONLY WHEN CREATE) */}
          {needCreate && (
            <Input
              placeholder="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {/* MESSAGE */}
          {message && (
            <p className="text-center text-sm text-slate-600">
              {message}
            </p>
          )}

          {/* BUTTON */}
          <Button
            className="w-full"
            onClick={submit}
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Xác nhận'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
