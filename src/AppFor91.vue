<script setup lang="ts">
// Kosong, mantap!
</script>

<template>
  <main class="min-h-screen bg-background text-content font-sans">
    <!-- Navbar Aplikasi -->
    <header class="border-b border-border bg-surface px-6 py-4 shadow-sm">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 group">
          <!-- Logo pura-pura pakai Emoji -->
          <div
            class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform"
          >
            ✓
          </div>
          <span class="font-bold text-lg tracking-tight text-primary">Task Master</span>
        </RouterLink>

        <nav>
          <RouterLink
            to="/"
            class="text-sm font-medium text-content-secondary hover:text-content transition-colors"
            active-class="!text-primary font-bold"
          >
            My Tasks
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Tempat halaman akan dirender -->
    <div class="max-w-4xl mx-auto p-6 w-full mt-4">
      <RouterView />
    </div>
  </main>
</template>
