<script setup lang="ts">
type InputType = 'text' | 'email' | 'password' | 'number' | 'search'

interface Props {
  label?: string
  placeholder?: string
  type?: InputType
  error?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  type: 'text',
  error: '',
  disabled: false,
})

// * defineModel: dua-arah binding untuk value utama
const model = defineModel<string>({ default: '' })

// * defineEmits: event tambahan selain model update
const emit = defineEmits<{
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const handleClear = () => {
  model.value = ''
  emit('clear')
}
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <!-- * Label -->
    <label v-if="label" class="text-sm font-medium text-content-secondary">{{ label }}</label>

    <!-- * Input wrapper -->
    <div class="relative flex items-center">
      <input
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        class="w-full px-3 py-2 rounded-lg border text-sm text-content placeholder:text-content-muted bg-surface transition-colors outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
        :class="error ? 'border-danger' : 'border-border'"
      />

      <!-- * Clear button -->
      <button
        v-if="model.length > 0 && !disabled"
        @click="handleClear"
        type="button"
        class="absolute right-2.5 text-content-muted hover:text-content transition-colors text-xs"
      >
        &times;
      </button>
    </div>

    <!-- * Error message -->
    <p v-if="error" class="text-xs text-danger">{{ error }}</p>
  </div>
</template>
