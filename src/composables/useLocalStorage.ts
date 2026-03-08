import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  // Coba baca nilai yang sudah ada di localStorage
  const readFromStorage = (): T => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? (JSON.parse(raw) as T) : defaultValue
    } catch {
      return defaultValue
    }
  }

  const storedValue = ref<T>(readFromStorage()) as Ref<T>

  watch(
    storedValue,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch {
        console.warn(`[useLocalStorage] Gagal menyimpan key "${key}"`)
      }
    },
    { deep: true },
  )

  return storedValue
}
