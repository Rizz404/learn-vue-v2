import { ref, watch } from 'vue'

// Singleton state — shared across all useDarkMode() calls
const isDark = ref<boolean>(false)
let initialized = false

const applyClass = (dark: boolean): void => {
  document.documentElement.classList.toggle('dark', dark)
}

export function useDarkMode() {
  const initDarkMode = (): void => {
    if (initialized) return
    initialized = true

    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Priority: stored preference > system preference
    isDark.value = stored === 'dark' || (!stored && prefersDark)

    // Apply class immediately (before Vue mounts)
    applyClass(isDark.value)

    // Watch for FUTURE changes only (bukan initial run)
    // Pakai watch() bukan watchEffect() supaya tidak jalan saat init
    watch(isDark, (val: boolean) => {
      applyClass(val)
      localStorage.setItem('theme', val ? 'dark' : 'light')
    })
  }

  const toggleDarkMode = (): void => {
    isDark.value = !isDark.value
  }

  const setDarkMode = (val: boolean): void => {
    isDark.value = val
  }

  return {
    isDark,
    toggleDarkMode,
    setDarkMode,
    initDarkMode,
  }
}
