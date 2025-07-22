import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api/api'
import { toast } from "react-toastify";

export function useApproveDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/documents/${id}/approve`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success("Approve!");
    },
    onError: () => toast.error("Failed to approve")
  })
}

export function useRejectDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/documents/${id}/reject`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success("Rejected!")
    },
    onError: () => toast.error("Failed to reject")
  })
}
