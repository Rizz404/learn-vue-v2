<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
interface Props {
  isOpen: boolean
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
})

const emit = defineEmits<{
  close: []
}>()

defineSlots<{
  default(props: object): unknown
  footer?(props: object): unknown
}>()
</script>

<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-content/40"
      @click.self="emit('close')"
    >
      <!-- Modal box -->
      <div
        class="bg-surface border border-border rounded-[--radius-card] w-full max-w-md shadow-xl"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <h3 class="text-base font-semibold text-content">
            {{ title }}
          </h3>
          <button
            @click="emit('close')"
            class="text-content-muted hover:text-content transition-colors text-lg leading-none"
          >
            &times;
          </button>
        </div>

        <!-- Body: default slot -->
        <div class="px-6 py-5 text-sm text-content-secondary">
          <slot />
        </div>

        <!-- Footer: named slot (opsional) -->
        <div
          v-if="$slots.footer"
          class="px-6 py-4 border-t border-border-subtle flex justify-end gap-3"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
