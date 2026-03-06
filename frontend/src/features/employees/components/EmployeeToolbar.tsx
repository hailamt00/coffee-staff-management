import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function EmployeeToolbar({
  search,
  onSearch,
  onAdd,
}: {
  search: string
  onSearch: (v: string) => void
  onAdd: () => void
}) {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-semibold">{t('employees.title')}</h2>
      <div className="flex gap-2">
        <Input
          className="w-64"
          placeholder={t('common.searchPlaceholder')}
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
        <Button onClick={onAdd}>
          <Plus size={16} />
          {t('common.add')}
        </Button>
      </div>
    </div>
  )
}
