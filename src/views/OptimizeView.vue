<script setup lang="ts">
import { defineAsyncComponent, ref, shallowRef } from 'vue'

// * Lazy loading component
// * Modal.vue baru akan di-download JS-nya saat isModalOpen = true
const AsyncModal = defineAsyncComponent(() => import('@/components/Modal.vue'))
const isModalOpen = ref(false)

// * Shallow ref untuk big data
interface BigData {
  id: number
  name: string
}
const hugeList = shallowRef<BigData[]>([])
const renderTime = ref(0)

const loadHeavyData = () => {
  const start = performance.now()

  // * Bikin 50,000 data dummy
  const arr: BigData[] = []
  for (let i = 0; i < 50000; i++) {
    arr.push({ id: i, name: `Item Data ke ${i}` })
  }

  // * Karena shallowRef, Vue nggak akan melooping 50rb item ini
  // * untuk dibikin reaktif satu-satu. Jauh lebih cepat!
  hugeList.value = arr

  const end = performance.now()
  renderTime.value = Math.round(end - start)
}

const clearData = () => {
  hugeList.value = []
  renderTime.value = 0
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-content">Optimasi Performa</h1>

    <!-- Demo Lazy Component -->
    <div class="p-6 border border-border rounded-lg bg-surface">
      <h2 class="font-bold mb-2">1. Lazy Load Modal</h2>
      <p class="text-sm text-content-secondary mb-4">
        Cek tab Network di DevTools. File JS Modal baru didownload pas tombol ini diklik!
      </p>
      <button
        @click="isModalOpen = true"
        class="px-4 py-2 bg-primary text-primary-fg rounded hover:bg-primary-hover transition-colors"
      >
        Buka Async Modal
      </button>

      <!-- Modal baru dipanggil di sini -->
      <AsyncModal
        v-if="isModalOpen"
        :is-open="isModalOpen"
        title="Aku di-load malas lho!"
        @close="isModalOpen = false"
      >
        <p>Halo! JS-ku baru aja didownload secara terpisah (chunk).</p>
      </AsyncModal>
    </div>

    <!-- Demo shallowRef -->
    <div class="p-6 border border-border rounded-lg bg-surface">
      <h2 class="font-bold mb-2">2. shallowRef (50.000 Items)</h2>
      <p class="text-sm text-content-secondary mb-4">
        Render 50 ribu data tanpa bikin browser nangis. Waktu eksekusi JS:
        <span class="font-bold text-primary">{{ renderTime }}ms</span>
      </p>

      <div class="flex gap-2 mb-4">
        <button
          @click="loadHeavyData"
          class="px-4 py-2 bg-secondary text-secondary-fg rounded hover:bg-secondary-hover transition-colors"
        >
          Load Data
        </button>
        <button
          @click="clearData"
          class="px-4 py-2 border border-border text-content rounded transition-colors hover:bg-surface-raised"
        >
          Clear
        </button>
      </div>

      <!-- Tampilkan 10 saja sebagai bukti -->
      <ul class="list-disc pl-5 text-sm space-y-1 text-content-muted">
        <li v-for="item in hugeList.slice(0, 10)" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
      <p v-if="hugeList.length > 0" class="text-xs text-primary mt-2">
        ... dan {{ hugeList.length - 10 }} item lainnya tersembunyi.
      </p>
    </div>
  </div>
</template>
