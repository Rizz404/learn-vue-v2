<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '@/stores/todoStore'

const route = useRoute()
const router = useRouter()
const todoStore = useTodoStore()

// 1. Ambil ID dari URL Params
const todoId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})

// 2. Gunakan Getter Pinia (yang mereturn fungsi tadi) untuk mencari Todo
const todo = computed(() => {
  return todoStore.getTodoById(todoId.value!)
})

// 3. Helper untuk formatting tanggal panjang
const formatLongDate = (timestamp: number) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

const goBack = () => {
  router.push('/')
}

const handleDelete = () => {
  if (confirm('Yakin ingin menghapus tugas ini?')) {
    todoStore.deleteTodo(todoId.value!)
    router.push('/') // Kembali ke home setelah dihapus
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 max-w-2xl mx-auto">
    <!-- Tombol Back -->
    <button
      @click="goBack"
      class="w-fit text-sm font-medium text-content-secondary hover:text-content transition-colors flex items-center gap-2"
    >
      <span class="text-lg leading-none">&larr;</span> Kembali ke Daftar
    </button>

    <!-- KONDISI 1: JIKA TODO DITEMUKAN -->
    <article
      v-if="todo"
      class="bg-surface border border-border rounded-xl p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden"
    >
      <!-- Dekorasi background jika selesai -->
      <div v-if="todo.isCompleted" class="absolute top-0 left-0 w-full h-2 bg-success"></div>

      <header class="flex justify-between items-start gap-4">
        <div>
          <span
            class="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded mb-3 inline-block"
            :class="todo.isCompleted ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'"
          >
            {{ todo.isCompleted ? 'SELESAI' : 'PENDING' }}
          </span>
          <h1 class="text-3xl font-bold text-content leading-tight">
            {{ todo.title }}
          </h1>
          <p class="text-sm text-content-muted mt-2">
            Dibuat pada: {{ formatLongDate(todo.createdAt) }}
          </p>
        </div>
      </header>

      <div class="py-6 border-y border-border-subtle">
        <h3 class="text-sm font-bold text-content-secondary mb-2">Deskripsi / Catatan:</h3>
        <p class="text-content whitespace-pre-wrap">
          {{ todo.description || 'Tidak ada catatan tambahan untuk tugas ini.' }}
        </p>
      </div>

      <!-- Action Buttons -->
      <footer class="flex gap-3 justify-end mt-2">
        <button
          @click="todoStore.toggleTodo(todo.id)"
          class="px-5 py-2 rounded-lg font-medium transition-colors border"
          :class="
            todo.isCompleted
              ? 'bg-surface-raised border-border text-content hover:bg-surface'
              : 'bg-primary border-primary text-white hover:bg-primary-hover'
          "
        >
          {{ todo.isCompleted ? 'Tandai Belum Selesai' : 'Tandai Selesai ✓' }}
        </button>

        <button
          @click="handleDelete"
          class="px-5 py-2 rounded-lg font-medium border border-danger text-danger hover:bg-danger/10 transition-colors"
        >
          Hapus Tugas
        </button>
      </footer>
    </article>

    <!-- KONDISI 2: JIKA TODO TIDAK ADA / URL NGASAL -->
    <div v-else class="text-center py-20 bg-surface border border-border rounded-xl">
      <span class="text-6xl mb-4 inline-block">🕵️‍♂️</span>
      <h2 class="text-2xl font-bold text-content mb-2">Tugas Tidak Ditemukan</h2>
      <p class="text-content-secondary mb-6">
        Sepertinya tugas yang kamu cari sudah dihapus atau URL-nya salah.
      </p>
      <button
        @click="goBack"
        class="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium transition-colors"
      >
        Kembali ke Beranda
      </button>
    </div>
  </div>
</template>
