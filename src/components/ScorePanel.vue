<script setup>
import { useGameStore } from '@/stores/gameStore';

const game = useGameStore()
</script>

<template>
  <aside class="score-panel">
    <div>
      <span>Level</span>
      <strong>{{ game.level }}</strong>
    </div>

    <div>
      <span>Score</span>
      <strong>{{ game.score }}</strong>
    </div>

    <div>
      <span>Mistakes</span>
      <strong>{{ game.mistakes }}/3</strong>
    </div>
  </aside>
</template>
