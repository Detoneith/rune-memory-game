<script setup>
import { useGameStore } from '@/stores/gameStore';

const game = useGameStore()
</script>

<template>
  <section class="game-controls">
    <p>{{ game.message }}</p>

    <button class="main-button" @click="game.startGame">
      {{ game.isPlaying ? 'Retry' : 'Begin the Ritual' }}
    </button>

    <button v-if="game.isPlaying" class="secondary-button" @click="game.endGame">
      Give up
    </button>
  </section>
</template>
