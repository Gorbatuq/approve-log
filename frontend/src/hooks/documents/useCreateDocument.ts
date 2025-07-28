import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../api/api'
import { toast } from 'react-toastify'

export function useCreateDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: { title: string; content: string }) => {
      await api.post('/documents', input)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast.success('Created')
    },
    onError: () => toast.error('Create failed'),
  })
}
