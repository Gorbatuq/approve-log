import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../api/api'
import { toast } from 'react-toastify'

export function useApproveDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.put(`/documents/${id}/approve`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast.success('Approved')
    },
    onError: () => toast.error('Approve failed'),
  })
}
