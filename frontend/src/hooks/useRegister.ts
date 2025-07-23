import { useMutation } from '@tanstack/react-query'
import { api } from '../api/api'

type RegisterInput = {
  username: string
  password: string
}

type RegisterResponse = {
  message: string
}

const register = async (input: RegisterInput): Promise<RegisterResponse> => {
  const { data } = await api.post('/auth/register', input)
  console.log(data)
  return data
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterInput>({
    mutationFn: register
  })
}
