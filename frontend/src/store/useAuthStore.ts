import { create } from 'zustand'

type Role = "USER" | "MANAGER" | null

type AuthState = {
  isLoggedIn: boolean
  userRole: Role
  login: (role: "USER" | "MANAGER") => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem('token'),
  userRole: null,
  login: (role) => {
    set({ isLoggedIn: true, userRole: role })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ isLoggedIn: false, userRole: null })
  }
}))
