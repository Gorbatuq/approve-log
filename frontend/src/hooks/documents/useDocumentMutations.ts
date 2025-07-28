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
      toast.success('Document created')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? `Error ${error.name}: ${error.message}` : 'Unknown error')
    },
  })
}

export function useApproveDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/documents/${id}/approve`)
    },
    onSuccess: () => {
      toast.success('Approved')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
    onError: () => toast.error('Failed to approve')
  })
}

export function useRejectDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/documents/${id}/reject`)
    },
    onSuccess: () => {
      toast.success('Rejected')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
    onError: () => toast.error('Failed to reject')
  })
}