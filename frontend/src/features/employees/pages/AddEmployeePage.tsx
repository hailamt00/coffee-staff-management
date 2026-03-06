import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useEmployee } from '../hooks/useEmployee'
import { useNavigate } from 'react-router-dom'
import type { Gender } from '@/shared/types/api'
import { useTranslation } from 'react-i18next'

/* ===== ENUMS ===== */
export default function AddEmployeePage() {
  const { createEmployee } = useEmployee()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  /* ===== ENUMS ===== */
  const GENDERS: { value: Gender; label: string }[] = [
    { value: 'Male', label: t('employees.genders.male') },
    { value: 'Female', label: t('employees.genders.female') },
    { value: 'Other', label: t('employees.genders.other') },
  ]

  const [form, setForm] = useState({
    name: '',
    phone: '',
    cid: '',
    gender: '' as Gender | '',
    serviceSalary: '',
    baristaSalary: '',
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
      alert(t('employees.form.validation.nameRequired'))
      return
    }

    if (!form.phone.trim()) {
      alert(t('employees.form.validation.phoneRequired'))
      return
    }

    setLoading(true)
    try {
      await createEmployee({
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg h-10 px-4 font-bold uppercase tracking-widest text-[10px]">
          &larr; {t('employees.back')}
        </Button>
      </div>

      <Card className="mx-auto max-w-4xl border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-neutral-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                {t('employees.addProfile')}
              </CardTitle>
              <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {t('employees.entryInfo')}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* ===== BASIC INFO ===== */}
          <Section title={t('employees.form.basicInfo')}>
            <Grid>
              <Field id="empName" label={t('employees.form.fullName')} required>
                <Input
                  id="empName"
                  placeholder={t('employees.form.placeholder.name')}
                  value={form.name}
                  onChange={handleChange('name')}
                />
              </Field>

              <Field id="empPhone" label={t('employees.form.phone')} required>
                <Input
                  id="empPhone"
                  placeholder={t('employees.form.placeholder.phone')}
                  value={form.phone}
                  onChange={handleChange('phone')}
                />
              </Field>

              <Field id="empCid" label={t('employees.form.idCard')}>
                <Input
                  id="empCid"
                  placeholder={t('employees.form.placeholder.cid')}
                  value={form.cid}
                  onChange={handleChange('cid')}
                />
              </Field>

              <Field id="empGender" label={t('employees.form.gender')}>
                <Select
                  id="empGender"
                  value={form.gender}
                  onChange={handleChange('gender')}
                  options={GENDERS}
                  placeholder={t('employees.form.placeholder.select')}
                />
              </Field>
            </Grid>
          </Section>

          {/* ===== SALARY ===== */}
          <Section title={t('employees.form.salaryInfo')}>
            <Grid>
              <Field id="empServiceSalary" label={t('employees.form.serviceSalary')}>
                <Input
                  id="empServiceSalary"
                  type="number"
                  placeholder={t('employees.form.placeholder.salary')}
                  value={form.serviceSalary}
                  onChange={handleChange('serviceSalary')}
                />
              </Field>

              <Field id="empBaristaSalary" label={t('employees.form.baristaSalary')}>
                <Input
                  id="empBaristaSalary"
                  type="number"
                  placeholder={t('employees.form.placeholder.salary')}
                  value={form.baristaSalary}
                  onChange={handleChange('baristaSalary')}
                />
              </Field>
            </Grid>
          </Section>

          {/* ===== DATE ===== */}
          <Section title={t('employees.form.dateInfo')}>
            <Grid>
              <Field id="empDob" label={t('employees.form.dob')}>
                <Input id="empDob" type="date" value={form.dob} onChange={handleChange('dob')} />
              </Field>

              <Field id="empHireDate" label={t('employees.form.hireDate')}>
                <Input
                  id="empHireDate"
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
              {t('employees.form.cancel')}
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? t('employees.form.saving') : t('employees.form.save')}
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
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      {children}
    </div>
  )
}

function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
}: {
  id?: string
  value: any
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  options: { value: any; label: string }[]
  placeholder?: string
}) {
  return (
    <select
      id={id}
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
