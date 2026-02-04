import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useEmployee } from '../hooks/useEmployee'
import { useNavigate } from 'react-router-dom'
import type { Gender } from '@/shared/types/api'

/* ===== ENUMS ===== */
const GENDERS: { value: Gender; label: string }[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
]

export default function AddEmployeePage() {
  const { createEmployee } = useEmployee()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    cid: '',
    gender: '' as Gender | '',
    salaryService: '',
    salaryBar: '',
    dob: '',
    hireDate: '',
  })

  const handleChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(prev => ({ ...prev, [key]: e.target.value }))
    }

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert('Employee Name is required')
      return
    }

    if (!form.phone.trim()) {
      alert('Phone number is required')
      return
    }

    setLoading(true)
    try {
      await createEmployee({
        name: form.name.trim(),
        phone: form.phone.trim(),
        cid: form.cid || null,
        gender: form.gender || null,
        dob: form.dob || null,
        hireDate: form.hireDate
          ? new Date(form.hireDate).toISOString()
          : null,
        salaryService: Number(form.salaryService) || 0,
        salaryBar: Number(form.salaryBar) || 0,
      })

      navigate('/employees')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-4xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Add New Employee</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter employee master information
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* ===== BASIC INFO ===== */}
        <Section title="Basic Information">
          <Grid>
            <Field label="Employee Name" required>
              <Input
                placeholder="Name"
                value={form.name}
                onChange={handleChange('name')}
              />
            </Field>

            <Field label="Phone Number" required>
              <Input
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange('phone')}
              />
            </Field>

            <Field label="Citizen ID (CID)">
              <Input
                placeholder="Optional"
                value={form.cid}
                onChange={handleChange('cid')}
              />
            </Field>

            <Field label="Gender">
              <Select
                value={form.gender}
                onChange={handleChange('gender')}
                options={GENDERS}
                placeholder="Select"
              />
            </Field>
          </Grid>
        </Section>

        {/* ===== SALARY ===== */}
        <Section title="Salary Information">
          <Grid>
            <Field label="Salary Service">
              <Input
                type="number"
                placeholder="0"
                value={form.salaryService}
                onChange={handleChange('salaryService')}
              />
            </Field>

            <Field label="Salary Bar">
              <Input
                type="number"
                placeholder="0"
                value={form.salaryBar}
                onChange={handleChange('salaryBar')}
              />
            </Field>
          </Grid>
        </Section>

        {/* ===== DATE ===== */}
        <Section title="Date Information">
          <Grid>
            <Field label="Date of Birth">
              <Input type="date" value={form.dob} onChange={handleChange('dob')} />
            </Field>

            <Field label="Hire Date">
              <Input
                type="date"
                value={form.hireDate}
                onChange={handleChange('hireDate')}
              />
            </Field>
          </Grid>
        </Section>

        {/* ===== ACTIONS ===== */}
        <div className="flex justify-end gap-3 border-t pt-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save Employee'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

/* ===== UI HELPERS (GIỮ NGUYÊN) ===== */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
        {title}
      </h3>
      {children}
    </section>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {children}
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      {children}
    </div>
  )
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: any
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  options: { value: any; label: string }[]
  placeholder?: string
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
