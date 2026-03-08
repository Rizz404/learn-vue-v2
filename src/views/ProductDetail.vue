<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Product {
  id: number
  name: string
  desc: string
}

const products: Product[] = [
  { id: 1, name: 'Sepatu Lari', desc: 'Sepatu lari yang sangat ringan.' },
  { id: 2, name: 'Tas Ransel', desc: 'Tas ransel anti air.' },
  { id: 3, name: 'Jam Tangan', desc: 'Jam tangan dengan kulit asli.' },
]

const route = useRoute()
const router = useRouter()

const productId = computed(() => {
  const idParam = route.params.id
  const idString = Array.isArray(idParam) ? idParam[0] : idParam
  return parseInt(idString!, 10)
})

// Cari produk sesuai ID
const product = computed(() => {
  return products.find((p) => p.id === productId.value)
})

const goBack = () => {
  // Kembali ke halaman sebelumnya di history browser
  router.back()
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <button
      @click="goBack"
      class="w-fit text-sm text-content-muted hover:text-content transition-colors flex items-center gap-1"
    >
      &larr; Kembali
    </button>

    <div v-if="product" class="p-6 bg-surface border border-border rounded-lg">
      <h1 class="text-3xl font-bold text-content mb-2">{{ product.name }}</h1>
      <p class="text-content-secondary">Product ID: {{ productId }}</p>
      <div class="my-6 p-4 bg-surface-raised rounded text-sm">{{ product.desc }}</div>
    </div>

    <div v-else class="p-8 text-center bg-danger/10 text-danger rounded-lg">
      <h1 class="font-bold">Produk Tidak Ditemukan</h1>
      <p class="text-sm">Tidak ada produk dengan ID {{ productId }}</p>
    </div>
  </div>
</template>
