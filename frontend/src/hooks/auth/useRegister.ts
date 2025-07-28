import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/api'

type RegisterInput = {
  username: string
  password: string
}

type RegisterResponse = {
  message: string
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterInput>({
    mutationFn: async (input) => {
      const { data } = await api.post('/auth/register', input, {
        withCredentials: true,
      })
      return data
    },
  })
}
