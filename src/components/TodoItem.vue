<script setup lang="ts">
import type { TodoItem } from '@/types'

// * Terima data task dari parent
const props = defineProps<{ todo: TodoItem }>()

// * Definisikan yang bisa diemit ke parent
const emit = defineEmits<{ toggle: [id: string]; delete: [id: string]; view: [id: string] }>()

// * Helper format tanggal sederhana
const formatDate = (timestamp: number) => {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
  }).format(new Date(timestamp))
}
</script>

<template>
  <div
    class="flex items-center gap-4 p-4 bg-surface border-border rounded-lg shadow-sm hover:shadow-md transition-all group"
    :class="{ 'opacity-60 bg-surface-raised': todo.isCompleted }"
  >
    <!-- * Checkbox buatan sendiri (Custom UI) -->
    <button
      @click="emit('toggle', todo.id)"
      class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0"
      :class="
        todo.isCompleted
          ? 'bg-success border-success text-white'
          : 'border-content-muted hover:border-primary'
      "
    >
      <span v-if="todo.isCompleted" class="text-xs font-bold">✓</span>
    </button>

    <!-- * Info Text (Bisa diklik untuk lihat detail) -->
    <div class="flex-1 cursor-pointer truncate" @click="emit('view', todo.id)">
      <h3
        class="font-semibold text-content transition-all"
        :class="{ 'line-through text-content-muted': todo.isCompleted }"
      >
        {{ todo.title }}
      </h3>
      <p class="text-xs text-content-secondary mt-0.5">
        Ditambahkan: {{ formatDate(todo.createdAt) }}
      </p>
    </div>

    <!-- * Tombol Delete -->
    <button
      @click="emit('delete', todo.id)"
      class="w-8 h-8 rounded text-danger opacity-0 group-hover:opacity-100 hover:bg-danger/10 transition-all shrink-0 flex items-center justify-center font-bold"
      title="Hapus Tugas"
    >
      ×
    </button>
  </div>
</template>
