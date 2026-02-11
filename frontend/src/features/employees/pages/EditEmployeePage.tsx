import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

import { useEmployee } from '../hooks/useEmployee'
import type { Gender } from '@/shared/types/api'

/* ===== ENUMS ===== */
const GENDERS: { value: Exclude<Gender, null>; label: string }[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
]

/* ================= PAGE ================= */

export default function EditEmployeePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    fetchEmployeeById,
    updateEmployee,
    loading,
  } = useEmployee()

  /* ===== FORM STATE (UI-friendly) ===== */
  const [form, setForm] = useState({
    name: '',
    phone: '',
    cid: '',
    gender: '' as '' | Exclude<Gender, null>,
    serviceSalary: '',
    baristaSalary: '',
    dob: '',
    hireDate: '',
  })

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    if (!id) return

    fetchEmployeeById(Number(id)).then(emp => {
      if (!emp) return

      setForm({
        name: emp.name ?? '',
        phone: emp.phone ?? '',
        cid: emp.cid ?? '',
        gender: emp.gender ?? '',
        serviceSalary:
          emp.serviceSalary != null
            ? String(emp.serviceSalary)
            : '',
        baristaSalary:
          emp.baristaSalary != null
            ? String(emp.baristaSalary)
            : '',
        dob: emp.dob ? emp.dob.slice(0, 10) : '',
        hireDate: emp.hireDate
          ? emp.hireDate.slice(0, 10)
          : '',
      })
    })
  }, [id, fetchEmployeeById])

  /* ===== HANDLERS ===== */
  const handleChange =
    (key: keyof typeof form) =>
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement
        >
      ) => {
        setForm(prev => ({
          ...prev,
          [key]: e.target.value,
        }))
      }

  const handleSubmit = async () => {
    if (!id) return

    if (!form.name.trim()) {
      alert('Employee Name is required')
      return
    }

    if (!form.phone.trim()) {
      alert('Phone number is required')
      return
    }

    await updateEmployee(Number(id), {
      name: form.name.trim(),
      phone: form.phone.trim(),
      cid: form.cid || null,
      gender: form.gender || null,
      dob: form.dob || null,
      hireDate: form.hireDate
        ? new Date(form.hireDate).toISOString()
        : null,
      serviceSalary: Number(form.serviceSalary) || 0,
      baristaSalary: Number(form.baristaSalary) || 0,
    })

    navigate('/employees')
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <Card className="mx-auto max-w-4xl border-t-4 border-black dark:border-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 border-l-4 border-black dark:border-white pl-3">
            Edit Employee
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update employee information
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* ===== BASIC INFO ===== */}
          <Section title="Basic Information">
            <Grid>
              <Field label="Employee Name" required>
                <Input
                  value={form.name}
                  onChange={handleChange('name')}
                />
              </Field>

              <Field label="Phone Number" required>
                <Input
                  value={form.phone}
                  onChange={handleChange('phone')}
                />
              </Field>

              <Field label="Citizen ID (CID)">
                <Input
                  value={form.cid}
                  onChange={handleChange('cid')}
                />
              </Field>

              <Field label="Gender">
                <select
                  value={form.gender}
                  onChange={handleChange('gender')}
                  className="
                  h-9 w-full rounded-md
                  border border-black/20 dark:border-white/20
                  bg-transparent px-3 text-sm
                  focus:outline-none focus:ring-1
                  focus:ring-black/30 dark:focus:ring-white/30
                "
                >
                  <option value="">Select</option>
                  {GENDERS.map(g => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </Field>
            </Grid>
          </Section>

          {/* ===== SALARY ===== */}
          <Section title="Salary Information">
            <Grid>
              <Field label="Salary Service">
                <Input
                  type="number"
                  value={form.serviceSalary}
                  onChange={handleChange('serviceSalary')}
                />
              </Field>

              <Field label="Salary Bar">
                <Input
                  type="number"
                  value={form.baristaSalary}
                  onChange={handleChange('baristaSalary')}
                />
              </Field>
            </Grid>
          </Section>

          {/* ===== DATE ===== */}
          <Section title="Date Information">
            <Grid>
              <Field label="Date of Birth">
                <Input
                  type="date"
                  value={form.dob}
                  onChange={handleChange('dob')}
                />
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
          <div className="flex justify-end gap-3 border-t border-black/10 dark:border-white/10 pt-6">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : 'Update Employee'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ================= UI HELPERS ================= */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
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
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </Label>
      {children}
    </div>
  )
}
