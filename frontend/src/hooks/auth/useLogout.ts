import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/api'

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout', {}, { withCredentials: true })
    },
  })
}
