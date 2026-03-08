<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart' // Tambahkan ini

const userStore = useUserStore()
const cartStore = useCartStore() // Inisialisasi

// Dummy function untuk nambah barang
const buyRandomItem = () => {
  const dummyItems = [
    { id: 1, name: 'Baju Vue', price: 150000 },
    { id: 2, name: 'Topi TypeScript', price: 80000 },
    { id: 3, name: 'Mug Pinia', price: 50000 },
  ]
  const randomItem = dummyItems[Math.floor(Math.random() * dummyItems.length)]
  cartStore.addItem(randomItem!)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold">Toko Online Mini</h1>

    <!-- Blok User -->
    <div class="p-4 bg-surface border border-border rounded-lg flex justify-between items-center">
      <div>
        <p v-if="userStore.isLoggedIn">
          Halo, <b>{{ userStore.profile?.name }}</b>
        </p>
        <p v-else class="text-danger">Anda belum login.</p>
      </div>
      <button
        v-if="!userStore.isLoggedIn"
        @click="userStore.login('Tamu Rahasia', 'guest')"
        class="px-4 py-2 bg-secondary rounded"
      >
        Login Cepat
      </button>
      <button v-else @click="userStore.logout()" class="px-4 py-2 bg-secondary rounded">
        Logout
      </button>
    </div>

    <!-- Blok Keranjang -->
    <div class="p-4 bg-surface border border-border rounded-lg flex flex-col gap-4">
      <h2 class="font-bold">Keranjang Belanja ({{ cartStore.totalItems }} items)</h2>

      <ul class="list-disc pl-5 text-sm space-y-1">
        <li v-for="(item, index) in cartStore.items" :key="index">
          {{ item.name }} - Rp {{ item.price.toLocaleString() }}
        </li>
      </ul>
      <p v-if="cartStore.items.length === 0" class="text-sm text-content-muted">
        Keranjang masih kosong.
      </p>

      <div class="pt-4 border-t border-border mt-2 font-bold">
        Total: Rp {{ cartStore.totalPrice.toLocaleString() }}
      </div>

      <div class="flex gap-2 mt-2">
        <button @click="buyRandomItem" class="px-4 py-2 bg-primary text-white rounded text-sm">
          + Tambah Barang Acak
        </button>
        <button
          @click="cartStore.clearCart()"
          class="px-4 py-2 border border-border rounded text-sm"
        >
          Kosongkan
        </button>
      </div>

      <!-- Tombol Checkout (State bergabung dengan User Store!) -->
      <button
        @click="cartStore.checkout()"
        :disabled="!cartStore.canCheckout"
        class="mt-4 px-4 py-3 bg-success text-white rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Proses Checkout
      </button>
      <p v-if="!cartStore.canCheckout" class="text-xs text-danger text-center">
        * Anda harus login dan memiliki barang di keranjang untuk checkout.
      </p>
    </div>
  </div>
</template>
