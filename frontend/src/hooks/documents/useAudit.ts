import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/api'
import type { AuditLog } from '../../types/AuditLog'

export function useAudit(documentId: number) {
  return useQuery<AuditLog[]>({
    queryKey: ['audit', documentId],
    queryFn: async () => {
      const { data } = await api.get(`/documents/${documentId}/audit`)
      return data
    },
  })
}
