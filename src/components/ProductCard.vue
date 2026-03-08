<script setup lang="ts">
export type ProductStatus = 'available' | 'sold' | 'reserved'

export interface ProductCardProps {
  title: string
  price: number
  category?: string
  image?: string | null
  status?: ProductStatus
  tags?: string[]
  currency?: string
  featured?: boolean
}

// * Kalo pake typescript lebih simpel jadi gini doang
withDefaults(defineProps<ProductCardProps>(), {
  category: 'Uncategorized',
  image: null,
  status: 'available',
  tags: () => [], // ! array/object tetap wajib factory function!
  currency: 'IDR',
  featured: false,
})

const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

const statusMap: Record<ProductStatus, { label: string; cls: string }> = {
  available: { label: 'Tersedia', cls: 'bg-success text-success-fg' },
  sold: { label: 'Terjual', cls: 'bg-danger text-danger-fg' },
  reserved: { label: 'Dipesan', cls: 'bg-warning text-warning-fg' },
}
</script>

<template>
  <!-- * Props bisa diakes langsung variablenya -->
  <div
    class="bg-surface border border-border rounded-[--radius-card] overflow-hidden w-72 transition-shadow hover:shadow-lg"
    :class="featured ? 'ring-2 ring-primary' : ''"
  >
    <!-- Image -->
    <div class="h-48 bg-surface-raised flex items-center justify-center overflow-hidden">
      <img v-if="image" :src="image" :alt="title" class="w-full h-full object-cover" />
      <span v-else class="text-content-muted text-sm">No Image</span>
    </div>

    <!-- Body -->
    <div class="p-4 flex flex-col gap-3">
      <!-- Category dan Status -->
      <div class="flex items-center justify-between">
        <span class="text-xs text-content-muted uppercase tracking-widest">{{ category }}</span>
        <span class="text-xs font-medium px-2 py-0.5 rounded-full" :class="statusMap[status].cls">
          {{ statusMap[status].label }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-base font-semibold text-content leading-snug line-clamp-2">{{ title }}</h3>

      <!-- Price -->
      <p class="text-xl font-bold text-primary">{{ formatPrice(price, currency) }}</p>

      <!-- Tags -->
      <div v-if="tags.length > 0" class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in tags"
          :key="tag"
          class="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-fg"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
