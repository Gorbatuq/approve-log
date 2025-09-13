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

export const useDeleteDocument = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      console.log("Deleting ID:", id)
      await api.delete(`/documents/${id}`)

    },
    onSuccess: () => {
      toast.success('Document deleted')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
    onError: () => console.error('Failed to del'),
  })
}

export const useUpdateDocument = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { title: string; content: string } }) => {
      const res = await api.put(`/documents/${id}`, data)
      return res.data
    },
    onSuccess: () => {
      toast.success('Document updated')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}

export function useApproveDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await api.put(`/documents/${id}/approve`)
    },
    onSuccess: () => {
      toast.success('Approved')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
    onError: () => toast.error('Failed to approve'),
  })
}

export function useRejectDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await api.put(`/documents/${id}/reject`)
    },
    onSuccess: () => {
      toast.success('Rejected')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
    onError: () => toast.error('Failed to reject'),
  })
}
