import type { UserProfile } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // * Statenya
  const profile = ref<UserProfile | null>(null)

  // GETTER
  const isLoggedIn = computed<boolean>(() => profile.value !== null)
  const isAdmin = computed<boolean>(() => profile.value?.role === 'admin')

  // ACTIONS
  function login(name: string, role: 'admin' | 'guest'): void {
    profile.value = { name, role }
  }

  function logout(): void {
    profile.value = null
  }

  return { profile, isLoggedIn, isAdmin, login, logout }
})
