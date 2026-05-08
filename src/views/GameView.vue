<script setup>
import GameBoard from '@/components/GameBoard.vue';
import GameControls from '@/components/GameControls.vue';
import ScorePanel from '@/components/ScorePanel.vue';
</script>

<template>
  <main class="game-header">
    <header class="game-header">
      <RouterLink to="/" class="back-link">
        ← Menu
      </RouterLink>
      <h1>Chamber of Glyphs</h1>
    </header>

    <ScorePanel></ScorePanel>
    <GameControls></GameControls>
    <GameBoard></GameBoard>
  </main>
</template>
