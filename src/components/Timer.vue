<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'

interface Props {
  label?: string
  autoStart: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  autoStart: false,
})

const emit = defineEmits<{
  tick: [seconds: number]
  stopped: [finalSeconds: number]
}>()

const seconds = ref(0)
const isRunning = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null

const start = () => {
  if (isRunning.value) {
    return
  }

  isRunning.value = true
  intervalId = setInterval(() => {
    seconds.value++
    emit('tick', seconds.value)
  }, 1000)
}

const stop = () => {
  if (!isRunning.value) {
    return
  }

  isRunning.value = false
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
  emit('stopped', seconds.value)
}

const reset = () => {
  stop()
  seconds.value = 0
}

const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (totalSeconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

onMounted(() => {
  console.log('[Timer] mounted — komponen sudah ada di DOM')
  if (props.autoStart) start()
})

onBeforeUnmount(() => {
  console.log('[Timer] beforeUnmount — akan segera dihapus dari DOM')
})

onUnmounted(() => {
  // Cleanup wajib: pastikan interval tidak jalan setelah komponen mati
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
  console.log('[Timer] unmounted — cleanup selesai')
})
</script>

<template>
  <div
    class="bg-surface border border-border rounded-[--radius-card] p-6 flex flex-col items-center gap-5 w-64"
  >
    <p class="text-xs font-medium tracking-widest uppercase text-content-muted">{{ label }}</p>
    <span class="text-5xl font-bold tabular-nums text-content font-mono">
      {{ formatTime(seconds) }}
    </span>
    <div class="flex gap-2">
      <button
        v-if="!isRunning"
        @click="start"
        class="px-4 py-1.5 rounded-lg bg-primary text-primary-fg text-sm font-medium hover:bg-primary-hover transition-colors"
      >
        Start
      </button>
      <button
        v-if="isRunning"
        @click="stop"
        class="px-4 py-1.5 rounded-lg bg-secondary text-secondary-fg text-sm font-medium hover:bg-secondary-hover transition-colors"
      >
        Pause
      </button>
      <button
        @click="reset"
        class="px-4 py-1.5 rounded-lg border border-border text-content-secondary text-sm hover:bg-surface-raised transition-colors"
      >
        Reset
      </button>
    </div>
  </div>
</template>
