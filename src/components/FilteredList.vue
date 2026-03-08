<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  price: number
  category: 'electronics' | 'food' | 'clothing'
  inStock: boolean
}

// Raw data
const products = ref<Product[]>([
  { id: 1, name: 'Laptop Pro', price: 15000000, category: 'electronics', inStock: true },
  { id: 2, name: 'T-Shirt', price: 150000, category: 'clothing', inStock: true },
  { id: 3, name: 'Headphones', price: 500000, category: 'electronics', inStock: false },
  { id: 4, name: 'Jeans', price: 350000, category: 'clothing', inStock: true },
  { id: 5, name: 'Rice 5kg', price: 75000, category: 'food', inStock: true },
  { id: 6, name: 'Smartphone', price: 8000000, category: 'electronics', inStock: true },
  { id: 7, name: 'Jacket', price: 600000, category: 'clothing', inStock: false },
  { id: 8, name: 'Instant Noodles', price: 5000, category: 'food', inStock: true },
])

// * State untuk filter
const searchQuery = ref('')
const selectedCategory = ref('all')
const showInStockOnly = ref(true)
const sortBy = ref<'name' | 'price-asc' | 'price-desc'>('name')

// ============================================
// COMPUTED: Filtered & sorted products
// Hanya re-run kalau searchQuery/selectedCategory/
// showInStockOnly/sortBy/products berubah!
// ============================================

const filteredProducts = computed<Product[]>(() => {
  let result = products.value

  if (searchQuery.value.trim()) {
    result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }

  if (selectedCategory.value !== 'all') {
    result = result.filter((p) => {
      return p.category === selectedCategory.value
    })
  }

  if (showInStockOnly.value) {
    result = result.filter((p) => p.inStock)
  }

  return [...result].sort((a, b) => {
    if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name)
    }

    if (sortBy.value === 'price-asc') {
      return a.price - b.price
    }

    return b.price - a.price
  })
})

// COMPUTED: Summary stats — auto update kalau filteredProducts berubah
const stats = computed(() => ({
  total: filteredProducts.value.length,
  inStock: filteredProducts.value.filter((p) => p.inStock).length,
  avgPrice: filteredProducts.value.length
    ? Math.round(
        filteredProducts.value.reduce((sum, p) => sum + p.price, 0) / filteredProducts.value.length,
      )
    : 0,
}))

// COMPUTED: Writable — search label
const searchLabel = computed<string>({
  get: () => (searchQuery.value ? `Searching: "${searchQuery.value}"` : 'Search products...'),
  set: (newVal: string) => {
    const match = newVal.match(/Searching: "(.+)"/)
    searchQuery.value = match?.[1] ?? newVal
  },
})

// DEMO: computed vs method caching
// State yang tidak berhubungan dengan filter
const unrelatedCount = ref<number>(0)

let computedRunCount = 0
let methodRunCount = 0

// computed — cuma re-run kalau dependency berubah
const expensiveComputed = computed<number>(() => {
  computedRunCount++
  console.log(`computed() ran: ${computedRunCount} times`)
  return filteredProducts.value.length * 100
})

// method — SELALU re-run setiap render
const expensiveMethod = (): number => {
  methodRunCount++
  console.log(`method() ran: ${methodRunCount} times`)
  return filteredProducts.value.length * 100
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

const clearSearch = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  showInStockOnly.value = false
  sortBy.value = 'name'
}
</script>

<template>
  <div class="container">
    <h1>Product Filter</h1>
    <p class="subtitle">
      Demo computed() — Coba filter/search, buka console, dan lihat log caching!
    </p>

    <!-- * Filters -->
    <div class="filter-bars">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search products..."
        class="search-input"
      />

      <select v-model="selectedCategory" class="select">
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="food">Food</option>
      </select>

      <select v-model="sortBy" class="select">
        <option value="name">Sort: Name</option>
        <option value="price-asc">Sort: Price ↑</option>
        <option value="price-desc">Sort: Price ↓</option>
      </select>

      <label class="checkbox-label">
        <input v-model="showInStockOnly" type="checkbox" />
        In Stock Only
      </label>

      <button @click="clearSearch" class="btn-clear">Clear</button>
    </div>

    <!-- Computed label demo (writable computed) -->
    <div class="computed-label">
      <span
        >Writable computed: <em>{{ searchLabel }}</em></span
      >
    </div>

    <!-- Stats — dari computed stats -->
    <div class="stats-bar">
      <div class="stat">
        <span class="stat-value">{{ stats.total }}</span>
        <span class="stat-label">Total</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ stats.inStock }}</span>
        <span class="stat-label">In Stock</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ formatPrice(stats.avgPrice) }}</span>
        <span class="stat-label">Avg Price</span>
      </div>
    </div>

    <!-- Caching demo box -->
    <div class="cache-demo">
      <h4>🧪 Caching Demo (buka Console F12)</h4>

      <!-- * Tombol yang TIDAK mempengaruhi products -->
      <div class="cache-controls">
        <button @click="unrelatedCount++" class="btn-unrelated">
          Click Me (Unrelated) — {{ unrelatedCount }}
        </button>
        <p class="hint">
          Tombol ini trigger re-render tapi tidak ubah <code>products</code>.
          <br />
          Lihat di console: <code>method()</code> terus naik, <code>computed()</code> DIAM!
        </p>
      </div>

      <p>
        computed() result: <strong>{{ expensiveComputed }}</strong
        ><br />
        method() result: <strong>{{ expensiveMethod() }}</strong>
      </p>
      <p class="hint">
        Setiap kali Vue re-render (hover button, dsb),<br />
        perhatikan: <code>computed()</code> TIDAK re-run kalau data sama,<br />
        tapi <code>method()</code> SELALU re-run!
      </p>
    </div>

    <!-- Product list -->
    <div v-if="filteredProducts.length === 0" class="empty">
      No products found. Try different filters!
    </div>

    <div v-else class="product-grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
        :class="{ 'out-of-stock': !product.inStock }"
      >
        <div class="product-category">{{ product.category }}</div>
        <h3 class="product-name">{{ product.name }}</h3>
        <div class="product-price">{{ formatPrice(product.price) }}</div>
        <div class="product-stock">
          <span v-if="product.inStock" class="badge-stock in">In Stock</span>
          <span v-else class="badge-stock out">Out of Stock</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.filters-bar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.search-input,
.select {
  padding: 0.6rem 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
}

.search-input {
  flex: 1;
  min-width: 150px;
}

.search-input:focus,
.select:focus {
  outline: none;
  border-color: #42b883;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
}

.btn-clear {
  padding: 0.6rem 1rem;
  background: #ff5252;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-clear:hover {
  background: #ff1744;
}

.computed-label {
  padding: 0.5rem 1rem;
  background: #e3f2fd;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #1565c0;
  margin-bottom: 1rem;
}

.stats-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #f4f4f4;
  border-radius: 8px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b883;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
}

.cache-demo {
  padding: 1rem 1.5rem;
  background: #fff8e1;
  border-left: 4px solid #ffc107;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.cache-demo h4 {
  margin: 0 0 0.5rem 0;
  color: #856404;
}

.cache-demo p {
  margin: 0.25rem 0;
}

.cache-demo code {
  background: white;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  color: #c7254e;
}

.cache-controls {
  margin-bottom: 1rem;
}

.btn-unrelated {
  padding: 0.6rem 1.2rem;
  background: #9c27b0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.btn-unrelated:hover {
  background: #7b1fa2;
}

.hint {
  color: #666;
  font-style: italic;
}

.empty {
  text-align: center;
  padding: 3rem;
  color: #999;
  font-style: italic;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.product-card {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s;
}

.product-card:hover {
  border-color: #42b883;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-card.out-of-stock {
  opacity: 0.5;
}

.product-category {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.25rem;
  letter-spacing: 0.05em;
}

.product-name {
  font-size: 1rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.product-price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #42b883;
  margin-bottom: 0.5rem;
}

.badge-stock {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
}

.badge-stock.in {
  background: #e8f5e9;
  color: #2e7d32;
}
.badge-stock.out {
  background: #ffebee;
  color: #c62828;
}
</style>
