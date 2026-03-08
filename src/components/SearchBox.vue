<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

interface SearchResult {
  id: number
  title: string
}

interface Props {
  placeholder?: string
  debounceMs?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Find something',
  debounceMs: 300,
})

const emit = defineEmits<{
  search: [query: string]
}>()

const query = ref('')
const debouncedQuery = ref('')
const isLoading = ref(false)
const results = ref<SearchResult[]>([])

let debounceTimer: ReturnType<typeof setTimeout> | null = null

// * Watch dengan debounce manual
watch(query, (newVal) => {
  if (debounceTimer !== null) {
    clearTimeout(debounceTimer)
  }

  if (newVal.trim() === '') {
    debouncedQuery.value = ''
    results.value = []
    return
  }

  isLoading.value = true

  debounceTimer = setTimeout(() => {
    debouncedQuery.value = newVal.trim()
    emit('search', debouncedQuery.value)
    debounceTimer = null
  }, props.debounceMs)
})

// * Otomatis track debouncedQuery dan simulasi fetch
watchEffect(async () => {
  const currentQuery = debouncedQuery.value

  if (!currentQuery) {
    isLoading.value = false
    results.value = []
    return
  }

  // Simulasi API call dengan JSONPlaceholder
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?q=${currentQuery}&_limit=5`)
  const data: SearchResult[] = await res.json()

  // Hanya update jika query masih sama (cegah race condition)
  if (debouncedQuery.value === currentQuery) {
    results.value = data
    isLoading.value = false
  }
})
</script>

<template>
  <div class="flex flex-col gap-3 w-full max-w-md">
    <div class="relative">
      <input
        type="search"
        v-model="query"
        :placeholder="placeholder"
        class="w-full px-4 py-2.5 pr-10 rounded-lg border border-border bg-surface text-content text-sm placeholder:text-content-muted outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
      />

      <!-- Loading spinner -->
      <span
        v-if="isLoading"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted text-xs"
      >
        ...
      </span>
    </div>

    <!-- Debounced query debug info -->
    <p class="text-xs text-content-muted">
      Searching: <span class="text-content font-medium">{{ debouncedQuery || '-' }}</span>
    </p>

    <!-- * Results -->
    <ul v-if="results.length > 0" class="flex flex-col gap-1">
      <li
        v-for="result in results"
        :key="result.id"
        class="px-3 py-2 rounded-lg bg-surface border border-border-subtle text-sm text-content hover:bg-surface-raised transition-colors"
      >
        <span class="text-content-muted text-xs mr-2">#{{ result.id }}</span> {{ result.title }}
      </li>
    </ul>

    <!-- Empty state -->
    <p v-else-if="debouncedQuery && !isLoading" class="text-sm text-content-muted text-center py-4">
      Tidak ada hasil untuk "{{ debouncedQuery }}"
    </p>
  </div>
</template>
