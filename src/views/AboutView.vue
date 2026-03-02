<script setup lang="ts">
import { ref } from 'vue'

const showSecret = ref(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold text-content">Tentang Kami</h1>
    <p class="text-content-secondary">Halaman ini membuktikan kalau router kita bekerja dengan baik.</p>

    <button @click="showSecret = !showSecret"
      class="w-fit px-4 py-2 bg-secondary text-secondary-fg rounded hover:bg-secondary-hover">
      Toggle Secret
    </button>
    <p v-if="showSecret" class="p-3 bg-surface-raised rounded text-sm">
      State tetap tersimpan saat navigasi kalau kita tidak refresh halaman! 🤫
    </p>
  </div>
</template>
