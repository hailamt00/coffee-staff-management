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
      phone: form.phone.replace(/\D/g, ''),
      cid: form.cid || null,
      gender: form.gender || null,
      dob: form.dob || null,
      hireDate: form.hireDate || null,
      serviceSalary: Number(form.serviceSalary) || 0,
      baristaSalary: Number(form.baristaSalary) || 0,
    })

    navigate('/employees')
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg h-10 px-4 font-bold uppercase tracking-widest text-[10px]">
          &larr; Back
        </Button>
      </div>

      <Card className="mx-auto max-w-4xl border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-neutral-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                Edit_Employee
              </CardTitle>
              <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Update_Information
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* ===== BASIC INFO ===== */}
          <Section title="Basic Information">
            <Grid>
              <Field id="editEmpName" label="Employee Name" required>
                <Input
                  id="editEmpName"
                  value={form.name}
                  onChange={handleChange('name')}
                />
              </Field>

              <Field id="editEmpPhone" label="Phone Number" required>
                <Input
                  id="editEmpPhone"
                  value={form.phone}
                  onChange={handleChange('phone')}
                />
              </Field>

              <Field id="editEmpCid" label="Citizen ID (CID)">
                <Input
                  id="editEmpCid"
                  value={form.cid}
                  onChange={handleChange('cid')}
                />
              </Field>

              <Field id="editEmpGender" label="Gender">
                <select
                  id="editEmpGender"
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
              <Field id="editEmpServiceSalary" label="Salary Service">
                <Input
                  id="editEmpServiceSalary"
                  type="number"
                  value={form.serviceSalary}
                  onChange={handleChange('serviceSalary')}
                />
              </Field>

              <Field id="editEmpBaristaSalary" label="Salary Bar">
                <Input
                  id="editEmpBaristaSalary"
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
              <Field id="editEmpDob" label="Date of Birth">
                <Input
                  id="editEmpDob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange('dob')}
                />
              </Field>

              <Field id="editEmpHireDate" label="Hire Date">
                <Input
                  id="editEmpHireDate"
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
    <section className="space-y-4">
      <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] border-l-2 border-slate-200 dark:border-neutral-700 pl-3">
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
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm cursor-pointer">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </Label>
      {children}
    </div>
  )
}
