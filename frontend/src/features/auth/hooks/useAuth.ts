import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { loginApi } from '../api/auth.api'

import { loginSuccess } from '../slices/authSlice'
import { LoginRequest, LoginResponse } from '@/shared/types/api'

export const useAuth = () => {
  const dispatch = useDispatch()

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginApi,

    onSuccess: (data) => {
      dispatch(
        loginSuccess({
          admin: data.admin,
          token: data.token,
          refreshToken: data.refreshToken,
        })
      )
    },
  })
}
