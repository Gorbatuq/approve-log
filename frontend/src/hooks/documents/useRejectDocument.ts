import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../api/api'
import { toast } from 'react-toastify'

export function useRejectDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.put(`/documents/${id}/reject`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast.warning('Rejected')
    },
    onError: () => toast.error('Reject failed'),
  })
}
