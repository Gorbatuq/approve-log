import { useQuery } from '@tanstack/react-query'
import { api } from '../api/api'

type Profile = {
  user: {
    id: string
    username: string
    role: "USER" | "MANAGER"
  }
  documents: {
    id: string
    title: string
    status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED"
  }[]
}

const fetchProfile = async (): Promise<Profile> => {
  const { data } = await api.get('/profile')
  return data
}

export function useProfile() {
  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: 1,
    staleTime: 30000,
  })
}
