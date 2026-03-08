<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
interface Props {
  shadow?: boolean
}

withDefaults(defineProps<Props>(), {
  shadow: false,
})

defineSlots<{
  header?(props: object): unknown
  default(props: object): unknown
  footer?(props: object): unknown
}>()
</script>

<template>
  <div
    class="bg-surface border border-border rounded-[--radius-card] overflow-hidden"
    :class="shadow ? 'shadow-md' : ''"
  >
    <!-- * Named slot header (opsional) -->
    <div v-if="$slots.header" class="px-5 py-4 border-b border-border-subtle">
      <slot name="header" />
    </div>

    <!-- * Main content -->
    <div class="px-5 py-4">
      <slot />
    </div>

    <!-- Named slot: footer (opsional) -->
    <div v-if="$slots.footer" class="px-5 py-4 border-t border-border-subtle bg-surface-raised">
      <slot name="footer" />
    </div>
  </div>
</template>
