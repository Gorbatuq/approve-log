import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/api'
import type { Document } from '../../types/Document'

export function useDocuments() {
  return useQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data } = await api.get('/documents')
      console.log(data)
      return data
    },
    staleTime: 30_000,
  })
}
