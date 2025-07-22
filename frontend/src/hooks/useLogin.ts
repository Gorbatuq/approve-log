import { useMutation } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';

import { api } from '../api/api'

type LoginInput = {
  username: string
  password: string
}

type LoginResponse = {
  token: string
  user: { id: string; username: string; role: "USER" | "MANAGER" }
}

const login = async (input: LoginInput): Promise<LoginResponse> => {
  const { data } = await api.post('/auth/login', input)
  return data
}

export function useLogin(): UseMutationResult<LoginResponse, Error, LoginInput> {
  return useMutation({
    mutationFn: login
  })
}
