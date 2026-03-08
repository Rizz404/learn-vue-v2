<script setup lang="ts">
// Tidak perlu import RouterLink/RouterView, mereka auto-tersedia secara global
</script>

<template>
  <main class="min-h-screen bg-background text-content flex flex-col">
    <!-- Navbar Global -->
    <header class="border-b border-border bg-surface px-8 py-4 flex items-center gap-6">
      <div class="font-bold text-primary tracking-widest uppercase">VUE-ROUTER</div>

      <nav class="flex gap-4">
        <!-- Gunakan RouterLink, BUKAN <a> tag -->
        <!-- Active class akan otomatis ditambahkan oleh Vue Router -->
        <RouterLink
          to="/"
          class="text-sm font-medium text-content-secondary hover:text-content transition-colors"
          active-class="!text-primary underline underline-offset-4"
        >
          Beranda
        </RouterLink>

        <RouterLink
          to="/about"
          class="text-sm font-medium text-content-secondary hover:text-content transition-colors"
          active-class="!text-primary underline underline-offset-4"
        >
          Tentang
        </RouterLink>

        <RouterLink
          to="/products"
          class="text-sm font-medium text-content-secondary hover:text-content transition-colors"
          active-class="!text-primary underline underline-offset-4"
        >
          Produk
        </RouterLink>
      </nav>
    </header>

    <!-- Konten Halaman (Outlet) -->
    <div class="flex-1 p-8 max-w-3xl mx-auto w-full">
      <!-- Halaman yang aktif akan dirender di sini! -->
      <RouterView />
    </div>
  </main>
</template>
