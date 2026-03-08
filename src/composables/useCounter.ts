import { computed, ref, type ComputedRef, type Ref } from 'vue'

interface UseCounterOptions {
  min?: number
  max?: number
  step?: number
}

interface UseCounterReturn {
  count: Ref<number>
  isAtMin: ComputedRef<boolean>
  isAtMax: ComputedRef<boolean>
  increment: () => void
  decrement: () => void
  reset: () => void
  set: (value: number) => void
}

export function useCounter(
  initialValue: number = 0,
  options: UseCounterOptions = {},
): UseCounterReturn {
  // ? baru tau ada infinity
  const { min = -Infinity, max = Infinity, step = 1 } = options

  const count = ref(initialValue)

  const isAtMin = computed(() => count.value <= min)
  const isAtMax = computed(() => count.value >= max)

  const increment = () => {
    if (!isAtMax.value) {
      count.value = Math.min(count.value + step, max)
    }
  }

  const decrement = () => {
    if (!isAtMin.value) {
      count.value = Math.max(count.value - step, min)
    }
  }

  const reset = () => {
    count.value = initialValue
  }

  const set = (value: number) => {
    count.value = Math.min(Math.max(value, min), max)
  }

  return { count, isAtMin, isAtMax, increment, decrement, reset, set }
}
