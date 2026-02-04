import axios from '@/shared/api/axios'
import { LoginRequest, LoginResponse }  from '@/shared/types/api' 

export const loginApi = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(
    '/auth/login',
    data
  )
  return res.data
}
