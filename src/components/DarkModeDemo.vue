<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
</script>

<template>
  <div class="min-h-screen bg-surface p-8">
    <div class="max-w-2xl mx-auto space-y-8">
      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-text-primary">Tailwind v4 Design System</h1>
        <p class="text-text-secondary">Design tokens, dark mode, dan color palette siap pakai</p>
      </div>

      <!-- Dark mode toggle -->
      <div class="flex items-center gap-4 p-4 rounded-card bg-surface-muted border border-border">
        <span class="text-sm font-medium text-text-primary">Dark Mode</span>
        <button
          @click="toggleDarkMode"
          class="relative w-12 h-6 rounded-full transition-colors duration-200"
          :class="isDark ? 'bg-brand-500' : 'bg-border'"
        >
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
            :class="isDark ? 'translate-x-6' : 'translate-x-0'"
          />
        </button>
        <span class="text-sm text-text-muted">
          {{ isDark ? 'Dark' : 'Light' }}
        </span>
      </div>

      <!-- Color Palette -->
      <div class="space-y-3">
        <h2 class="text-lg font-semibold text-text-primary">Brand Colors</h2>
        <div class="grid grid-cols-5 gap-2">
          <div class="space-y-1 text-center">
            <div class="h-10 rounded-md bg-brand-100" />
            <span class="text-xs text-text-muted">100</span>
          </div>
          <div class="space-y-1 text-center">
            <div class="h-10 rounded-md bg-brand-300" />
            <span class="text-xs text-text-muted">300</span>
          </div>
          <div class="space-y-1 text-center">
            <div class="h-10 rounded-md bg-brand-500" />
            <span class="text-xs text-text-muted">500</span>
          </div>
          <div class="space-y-1 text-center">
            <div class="h-10 rounded-md bg-brand-700" />
            <span class="text-xs text-text-muted">700</span>
          </div>
          <div class="space-y-1 text-center">
            <div class="h-10 rounded-md bg-brand-900" />
            <span class="text-xs text-text-muted">900</span>
          </div>
        </div>
      </div>

      <!-- Status Colors -->
      <div class="space-y-3">
        <h2 class="text-lg font-semibold text-text-primary">Status Colors</h2>
        <div class="grid grid-cols-4 gap-3">
          <div class="p-3 rounded-md bg-success/10 border border-success/20">
            <span class="text-sm font-medium text-success">Success</span>
          </div>
          <div class="p-3 rounded-md bg-warning/10 border border-warning/20">
            <span class="text-sm font-medium text-warning">Warning</span>
          </div>
          <div class="p-3 rounded-md bg-danger/10 border border-danger/20">
            <span class="text-sm font-medium text-danger">Danger</span>
          </div>
          <div class="p-3 rounded-md bg-info/10 border border-info/20">
            <span class="text-sm font-medium text-info">Info</span>
          </div>
        </div>
      </div>

      <!-- Typography Scale -->
      <div class="space-y-3">
        <h2 class="text-lg font-semibold text-text-primary">Typography</h2>
        <div class="p-4 rounded-card bg-surface-muted border border-border space-y-2">
          <p class="text-xs text-text-muted">text-xs — Smallest label</p>
          <p class="text-sm text-text-secondary">text-sm — Body secondary</p>
          <p class="text-base text-text-primary">text-base — Body primary</p>
          <p class="text-lg font-medium text-text-primary">text-lg — Subheading</p>
          <p class="text-2xl font-bold text-text-primary">text-2xl — Heading</p>
        </div>
      </div>

      <!-- Surface Layers -->
      <div class="space-y-3">
        <h2 class="text-lg font-semibold text-text-primary">Surface Layers</h2>
        <div class="p-4 rounded-card bg-surface border border-border">
          <p class="text-sm text-text-secondary mb-2">bg-surface</p>
          <div class="p-3 rounded-md bg-surface-muted border border-border">
            <p class="text-sm text-text-secondary mb-2">bg-surface-muted</p>
            <div class="p-2 rounded bg-surface-subtle border border-border-muted">
              <p class="text-xs text-text-muted">bg-surface-subtle</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
