<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Product {
  id: number
  name: string
  price: string
}

const products: Product[] = [
  { id: 1, name: 'Sepatu Lari', price: 'Rp 450.000' },
  { id: 2, name: 'Tas Ransel', price: 'Rp 250.000' },
  { id: 3, name: 'Jam Tangan', price: 'Rp 800.000' },
]

const router = useRouter()

const goToDetail = (id: number) => {
  router.push({ name: 'product-detail', params: { id } })
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-content">Daftar Produk</h1>
    <div class="grid gap-4">
      <div
        v-for="product in products"
        class="p-4 border border-border rounded-lg bg-surface flex justify-between items-center hover:shadow-sm transition-shadow"
      >
        <div>
          <h2 class="font-semibold">{{ product.name }}</h2>
          <p class="text-sm text-content-secondary">{{ product.price }}</p>
        </div>

        <!-- * Tombol untuk trigger navigasi programmatic -->
        <button
          type="button"
          @click="goToDetail(product.id)"
          class="px-4 py-2 bg-primary text-primary-fg text-sm hover:bg-primary-hover transition-colors"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  </div>
</template>
