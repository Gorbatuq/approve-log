import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/api'

type LoginInput = {
  username: string
  password: string
}

type LoginResponse = {
  username: string
  role: 'USER' | 'MANAGER'
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async (input) => {
      const { data } = await api.post('/auth/login', input, {
        withCredentials: true,
      })
      return data
    },
  })
}
