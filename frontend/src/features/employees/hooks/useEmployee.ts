import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
} from '@/shared/types/api'
import { employeeApi } from '../api/employee.api'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function useEmployee() {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  /* ================= QUERIES ================= */

  const employeesQuery = useQuery({
    queryKey: ['employees'],
    queryFn: () => employeeApi.getAll(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  /* ================= COMMANDS ================= */

  const createMutation = useMutation({
    mutationFn: (payload: CreateEmployeeRequest) => employeeApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      dispatch(
        addNotification({
          type: 'success',
          title: 'Created',
          message: 'Employee Created Successfully',
        })
      )
    },
    onError: () => {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Create Failed',
          message: 'Failed to Create Employee',
        })
      )
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateEmployeeRequest }) =>
      employeeApi.update(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      queryClient.invalidateQueries({ queryKey: ['employees', data.id] })
      dispatch(
        addNotification({
          type: 'success',
          title: 'Updated',
          message: 'Employee Updated Successfully',
        })
      )
    },
    onError: () => {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Update Failed',
          message: 'Failed to Update Employee',
        })
      )
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => employeeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      dispatch(
        addNotification({
          type: 'success',
          title: 'Deleted',
          message: 'Employee Deleted Successfully',
        })
      )
    },
    onError: () => {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Delete Failed',
          message: 'Failed to Delete Employee',
        })
      )
    }
  })

  return {
    employees: employeesQuery.data || [],
    loading: employeesQuery.isLoading || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,

    // Commands
    createEmployee: createMutation.mutateAsync,
    updateEmployee: useCallback(
      (id: number, payload: UpdateEmployeeRequest) =>
        updateMutation.mutateAsync({ id, payload }),
      [updateMutation]
    ),
    deleteEmployee: deleteMutation.mutateAsync,

    // For specific fetching if needed
    fetchEmployeeById: useCallback(async (id: number) => {
      return await queryClient.fetchQuery({
        queryKey: ['employees', id],
        queryFn: () => employeeApi.getById(id)
      })
    }, [queryClient])
  }
}
