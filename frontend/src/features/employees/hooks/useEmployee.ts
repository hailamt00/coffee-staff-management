import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Employee,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
} from '@/shared/types/api'
import { employeeApi } from '../api/employee.api'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function useEmployee() {
  const dispatch = useDispatch()

  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null)
  const [loading, setLoading] = useState(false)

  /* ================= QUERY ================= */

  const fetchEmployees = useCallback(async () => {
    setLoading(true)
    try {
      const data = await employeeApi.getAll()
      setEmployees(data)
    } catch {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Load Failed',
          message: 'Failed to Load Employees',
        })
      )
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  const fetchEmployeeById = useCallback(
    async (id: number) => {
      setLoading(true)
      try {
        const data = await employeeApi.getById(id)
        setSelectedEmployee(data)
        return data
      } catch {
        dispatch(
          addNotification({
            type: 'error',
            title: 'Not Found',
            message: 'Employee Not Found',
          })
        )
        return null
      } finally {
        setLoading(false)
      }
    },
    [dispatch]
  )

  /* ================= COMMAND ================= */

  const createEmployee = async (
    payload: CreateEmployeeRequest
  ) => {
    setLoading(true)
    try {
      const created = await employeeApi.create(payload)
      setEmployees(prev => [...prev, created])

      dispatch(
        addNotification({
          type: 'success',
          title: 'Created',
          message: 'Employee Created Successfully',
        })
      )
    } catch {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Create Failed',
          message: 'Failed to Create Employee',
        })
      )
      throw new Error('Create employee failed')
    } finally {
      setLoading(false)
    }
  }

  const updateEmployee = async (
    id: number,
    payload: UpdateEmployeeRequest
  ) => {
    setLoading(true)
    try {
      const updated = await employeeApi.update(id, payload)

      setEmployees(prev =>
        prev.map(e => (e.id === id ? updated : e))
      )

      if (selectedEmployee?.id === id) {
        setSelectedEmployee(updated)
      }

      dispatch(
        addNotification({
          type: 'success',
          title: 'Updated',
          message: 'Employee Updated Successfully',
        })
      )
    } catch {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Update Failed',
          message: 'Failed to Update Employee',
        })
      )
      throw new Error('Update employee failed')
    } finally {
      setLoading(false)
    }
  }

  const deleteEmployee = async (id: number) => {
    setLoading(true)
    try {
      await employeeApi.delete(id)

      setEmployees(prev => prev.filter(e => e.id !== id))

      if (selectedEmployee?.id === id) {
        setSelectedEmployee(null)
      }

      dispatch(
        addNotification({
          type: 'success',
          title: 'Deleted',
          message: 'Employee Deleted Successfully',
        })
      )
    } catch {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Delete Failed',
          message: 'Failed to Delete Employee',
        })
      )
      throw new Error('Delete employee failed')
    } finally {
      setLoading(false)
    }
  }

  /* ================= INIT ================= */

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  return {
    employees,
    selectedEmployee,
    loading,

    fetchEmployees,
    fetchEmployeeById,

    createEmployee,
    updateEmployee,
    deleteEmployee,
  }
}
