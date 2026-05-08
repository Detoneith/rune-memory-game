<script setup>
import { useGameStore } from '@/stores/gameStore';
import RuneCard from './RuneCard.vue';

const game = useGameStore()
</script>

<template>
  <section class="game-board">
    <RuneCard v-for="rune in game.availableRunes" :key="rune.id" :rune="rune"
      :active="game.highlightedRuneId === rune.id" :disabled="!game.canPlay" @select="game.selectRune">
    </RuneCard>
  </section>
</template>
