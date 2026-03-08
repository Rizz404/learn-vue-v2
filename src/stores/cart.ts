import { useLocalStorage } from '@/composables/useLocalStorage'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useUserStore } from './user'

interface CartItem {
  id: number
  name: string
  price: number
}

export const useCartStore = defineStore('cart', () => {
  // * State dengan persistance via composable
  const items = useLocalStorage<CartItem[]>('my-cart', [])

  // * Getters nya
  const totalItems = computed(() => items.value.length)
  const totalPrice = computed(() => items.value.reduce((total, item) => total + item.price, 0))

  // * Getter yang membaca dari store lain
  const canCheckout = computed(() => {
    const userStore = useUserStore()
    return items.value.length > 0 && userStore.isLoggedIn
  })

  // * Actions
  function addItem(item: CartItem) {
    items.value.push(item)
  }

  function clearCart() {
    items.value = []
  }

  function checkout() {
    const userStore = useUserStore()

    if (!canCheckout.value) {
      alert('Gagal checkout! Silakan login dan tambahkan barang.')
      return
    }

    alert(
      `Checkout berhasil! Terima kasih ${userStore.profile?.name}. Total: Rp ${totalPrice.value}`,
    )
    clearCart()
  }

  return { items, totalItems, totalPrice, canCheckout, addItem, clearCart, checkout }
})
