<script setup lang="ts">
// Tidak perlu import RouterLink/RouterView, mereka auto-tersedia secara global
</script>

<template>
  <main class="min-h-screen bg-background text-content flex flex-col">
    <!-- Navbar Global -->
    <header class="border-b border-border bg-surface px-8 py-4 flex items-center gap-6">
      <div class="font-bold text-primary tracking-widest uppercase">VUE-ROUTER</div>
      <nav class="flex gap-4">
        <RouterLink to="/" class="..." active-class="!text-primary underline">Beranda</RouterLink>
        <RouterLink to="/about" class="..." active-class="!text-primary underline"
          >Tentang
        </RouterLink>
        <RouterLink to="/products" class="..." active-class="!text-primary underline"
          >Produk</RouterLink
        >
        <!-- Link Baru -->
        <RouterLink to="/optimize" class="..." active-class="!text-primary underline"
          >Optimasi</RouterLink
        >
      </nav>
    </header>

    <div class="flex-1 p-8 max-w-3xl mx-auto w-full">
      <!-- VUE ROUTER 4 KEEPALIVE SYNTAX -->
      <RouterView v-slot="{ Component }">
        <KeepAlive include="OptimizeView">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </div>
  </main>
</template>
