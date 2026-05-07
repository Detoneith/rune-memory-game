<script setup>
defineProps({
  rune: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
})

defineEmits(['select'])
</script>

<template>
  <button class="rune-card" :class="{ 'rune-card--active': active }" :disabled="disabled"
    @click="$emit('select', rune.id)">
    <span class="rune-card__symbol">{{ rune.symbol }}</span>
    <span class="rune-card__name">{{ rune.name }}</span>
  </button>
</template>
