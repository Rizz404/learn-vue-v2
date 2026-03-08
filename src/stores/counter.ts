import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // * Statenya
  const count = ref(0)

  // * Getters
  const doubleCount = computed(() => {
    return count.value * 2
  })

  // * Actions
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  // * Wajib mereturn apapun yang mau diekspos ke komponen
  return { count, doubleCount, increment, decrement, reset }
})
