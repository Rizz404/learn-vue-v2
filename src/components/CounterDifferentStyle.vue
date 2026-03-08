<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  initialValue?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: 0,
  step: 1,
})

const emit = defineEmits<{
  change: [value: number]
}>()

const count = ref(props.initialValue)

const isZero = computed(() => count.value === props.initialValue)

const increment = () => {
  count.value += props.step
  emit('change', count.value)
}

const decrement = () => {
  count.value -= props.step
  emit('change', count.value)
}

const reset = () => {
  count.value = props.initialValue
  emit('change', count.value)
}
</script>

<template>
  <div
    class="flex flex-col items-center gap-6 p-8 bg-surface rounded-2xl shadow-sm border border-border w-fit mx-auto"
  >
    <h2 class="text-sm font-medium tracking-widest uppercase text-content-muted">Counter</h2>

    <span class="text-6xl font-bold tabular-nums text-content">
      {{ count }}
    </span>

    <div class="flex items-center gap-3">
      <button
        @click="decrement"
        class="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-secondary-fg hover:bg-secondary-hover transition-colors font-bold text-lg"
      >
        -
      </button>

      <button
        @click="increment"
        class="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-fg hover:bg-primary-hover transition-colors font-bold text-lg"
      >
        +
      </button>
    </div>

    <button
      @click="reset"
      :disabled="isZero"
      class="text-xs text-content-muted hover:text-content-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
    >
      Reset
    </button>
  </div>
</template>
