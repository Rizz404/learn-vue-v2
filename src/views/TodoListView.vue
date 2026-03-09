<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '@/stores/todoStore'
import TodoItemCard from '@/components/TodoItem.vue' // Kita namakan TodoItemCard agar tidak konflik

const router = useRouter()
const todoStore = useTodoStore() // Ambil instance Pinia

// Local state untuk form input
const newTitle = ref('')
const newDesc = ref('')
const isError = ref(false)

const handleAdd = () => {
  if (!newTitle.value.trim()) {
    isError.value = true
    return
  }

  // Panggil action dari Pinia!
  todoStore.addTodo(newTitle.value, newDesc.value)

  // Reset form
  newTitle.value = ''
  newDesc.value = ''
  isError.value = false
}

// Navigasi ke halaman detail
const goToDetail = (id: string) => {
  router.push({ name: 'todo-detail', params: { id } })
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Bagian Form -->
    <section class="p-6 bg-surface border border-border rounded-xl shadow-sm">
      <h2 class="font-bold text-lg mb-4">Tambah Tugas Baru</h2>

      <div class="flex flex-col gap-3">
        <div>
          <input
            v-model="newTitle"
            type="text"
            placeholder="Mau ngerjain apa hari ini?"
            class="w-full px-4 py-2.5 rounded-lg border bg-background text-content placeholder:text-content-muted focus:ring-2 focus:ring-primary outline-none transition-all"
            :class="isError ? 'border-danger' : 'border-border'"
            @keyup.enter="handleAdd"
          />
          <p v-if="isError" class="text-xs text-danger mt-1">Judul tugas tidak boleh kosong!</p>
        </div>

        <input
          v-model="newDesc"
          type="text"
          placeholder="Catatan kecil (opsional)..."
          class="w-full px-4 py-2 rounded-lg border border-border bg-background text-sm text-content-secondary placeholder:text-content-muted focus:ring-2 focus:ring-primary outline-none transition-all"
          @keyup.enter="handleAdd"
        />

        <button
          @click="handleAdd"
          class="mt-2 w-full sm:w-auto self-end px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          Tambahkan Tugas
        </button>
      </div>
    </section>

    <!-- Bagian Statistik -->
    <div class="flex justify-between items-end border-b border-border pb-2">
      <h2 class="font-bold text-xl">Daftar Tugasmu</h2>
      <span class="text-sm font-medium text-content-muted">
        Selesai: {{ todoStore.completedTodosCount }} / {{ todoStore.totalTodos }}
      </span>
    </div>

    <!-- Bagian List dengan ANIMASI! -->
    <!-- TransitionGroup wajib pakai "name" untuk nyambungin ke CSS -->
    <!-- tag="div" artinya grup ini akan dirender sebagai <div class="flex flex-col gap-3"> -->
    <TransitionGroup name="list-anim" tag="div" class="flex flex-col gap-3 relative">
      <TodoItemCard
        v-for="todo in todoStore.todos"
        :key="todo.id"
        :todo="todo"
        @toggle="todoStore.toggleTodo($event)"
        @delete="todoStore.deleteTodo($event)"
        @view="goToDetail($event)"
      />
    </TransitionGroup>

    <!-- State Kosong -->
    <div
      v-if="todoStore.todos.length === 0"
      class="py-12 text-center text-content-muted flex flex-col items-center gap-2"
    >
      <span class="text-4xl opacity-50">🏖️</span>
      <p>Wah, santai nih! Belum ada tugas.</p>
    </div>
  </div>
</template>

<style scoped>
/*
   CSS khusus untuk Animasi TransitionGroup Vue
   Ditaruh di <style scoped> agar tidak bocor ke halaman lain
*/

/* Kondisi saat masuk dan keluar: aktifkan transisi */
.list-anim-enter-active,
.list-anim-leave-active {
  transition: all 0.4s ease;
}

/* Kondisi awal saat masuk, dan kondisi akhir saat keluar */
.list-anim-enter-from,
.list-anim-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/*
   Sihir Vue: Kelas v-move akan aktif saat item bertukar posisi!
   (Misal saat ada item di atasnya yang dihapus, item di bawahnya akan meluncur mulus naik)
*/
.list-anim-move {
  transition: transform 0.4s ease;
}

/* Supaya item yang dihapus keluar dari alur dokumen saat animasi menghilang,
   sehingga item di bawahnya bisa langsung meluncur naik. */
.list-anim-leave-active {
  position: absolute;
  width: 100%;
}
</style>
