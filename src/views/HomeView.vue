<script setup lang="ts">
// Import store yang mau dipakai
import { useCounterStore } from '@/stores/counter'
import { useUserStore } from '@/stores/user'

// Inisialisasi store di top-level setup
const counterStore = useCounterStore()
const userStore = useUserStore()
</script>

<template>
  <div class="flex flex-col gap-8">
    <h1 class="text-2xl font-bold text-content">Pinia Store Demo</h1>

    <!-- Demo User Store -->
    <div class="p-6 border border-border rounded-lg bg-surface flex flex-col gap-4">
      <h2 class="font-bold text-lg">User Store</h2>

      <div v-if="userStore.isLoggedIn" class="flex flex-col gap-2">
        <p>
          Selamat datang, <span class="font-bold text-primary">{{ userStore.profile?.name }}</span
          >!
        </p>
        <p class="text-sm">
          Status:
          <span
            v-if="userStore.isAdmin"
            class="px-2 py-1 bg-danger/10 text-danger rounded text-xs font-bold"
            >ADMIN</span
          >
          <span v-else class="px-2 py-1 bg-secondary text-secondary-fg rounded text-xs font-bold"
            >GUEST</span
          >
        </p>
        <button
          @click="userStore.logout()"
          class="w-fit mt-2 px-4 py-2 bg-secondary text-secondary-fg rounded hover:bg-secondary-hover text-sm"
        >
          Logout
        </button>
      </div>

      <div v-else class="flex gap-2">
        <button
          @click="userStore.login('Budi', 'guest')"
          class="px-4 py-2 bg-primary text-primary-fg rounded hover:bg-primary-hover text-sm"
        >
          Login as Guest
        </button>
        <button
          @click="userStore.login('SuperAdmin', 'admin')"
          class="px-4 py-2 bg-danger text-danger-fg rounded hover:opacity-90 text-sm"
        >
          Login as Admin
        </button>
      </div>
    </div>

    <!-- Demo Counter Store -->
    <div class="p-6 border border-border rounded-lg bg-surface flex flex-col gap-4">
      <h2 class="font-bold text-lg">Counter Store</h2>

      <p class="text-3xl font-bold">{{ counterStore.count }}</p>
      <p class="text-sm text-content-secondary">Double: {{ counterStore.doubleCount }}</p>

      <div class="flex gap-2">
        <button @click="counterStore.decrement()" class="px-3 py-1 bg-secondary rounded">-</button>
        <button @click="counterStore.increment()" class="px-3 py-1 bg-primary text-white rounded">
          +
        </button>
        <button @click="counterStore.reset()" class="px-3 py-1 border border-border rounded">
          Reset
        </button>
      </div>

      <!-- Demo reaktivitas antar halaman! -->
      <p class="text-xs text-content-muted mt-4">
        Coba ubah angkanya, lalu navigasi ke halaman 'Tentang', lalu balik ke 'Beranda' lagi.
        Angkanya gak akan keriset!
      </p>
    </div>
  </div>
</template>
