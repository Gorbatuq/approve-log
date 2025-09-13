import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/api'

type UserResponse = {
  id: number;
  username: string
  role: 'USER' | 'MANAGER'
}

export function useProfile() {
  return useQuery<UserResponse>({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/auth/profile', { withCredentials: true })
      return data
    },
    staleTime: 30_000,
    retry: 1,
  })
}
