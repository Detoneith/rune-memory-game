import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { runes } from '@/data/runes'

function wait(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })
}

export const useGameStore = defineStore('game', function () {
  const availableRunes = ref(runes)

  const sequence = ref([])
  const playerInput = ref([])

  const level = ref(1)
  const score = ref(0)
  const mistakes = ref(0)

  const isPlaying = ref(false)
  const isShowingSequence = ref(false)
  const highlightedRuneId = ref(null)

  const message = ref('Start a game to begin.')

  const sequenceLength = computed(function () {
    return Math.min(2 + level.value, 8)
  })

  const canPlay = computed(function () {
    return isPlaying.value && isShowingSequence.value
  })

  function getRandomRuneId() {
    const randomIndex = Math.floor(Math.random() * availableRunes.value.length)
    return availableRunes.value[randomIndex].id
  }

  function generateSequence() {
    sequence.value = Array.from({ length: sequenceLength.value }, function () {
      return getRandomRuneId()
    })
  }

  async function showSequence() {
    isShowingSequence.value = true
    highlightedRuneId.value = null
    message.value = 'Observe the sequence...'

    await wait(600)

    for (const runeId of sequence.value) {
      highlightedRuneId.value = runeId
      await wait(650)
      highlightedRuneId.value = null
      await wait(250)
    }

    isShowingSequence.value = false
    message.value = "Now it's your turn to replay the sequence."
  }

  async function startGame() {
    level.value = 1
    score.value = 0
    mistakes.value = 0
    playerInput.value = []
    isPlaying.value = true

    generateSequence()
    await showSequence()
  }

  async function nextRound() {
    level.value += 1
    playerInput.value = []

    generateSequence()
    await showSequence()
  }

  async function replayCurrentSequence() {
    playerInput.value = []
    await showSequence()
  }

  async function selectRune(runeId) {
    if (!canPlay.value) return

    const expectedRuneId = sequence.value[playerInput.value.length]

    if (runeId !== expectedRuneId) {
      mistakes.value += 1
      score.value = Math.max(0, score.value - 10)

      if (mistakes.value >= 3) {
        endGame()
        return
      }

      message.value = 'Error. The sequence will be replayed.'

      await wait(900)
      await replayCurrentSequence()
      return
    }

    playerInput.value.push(runeId)
    score.value += 10 + level.value

    if (playerInput.value.length == sequence.value.length) {
      message.value = 'Successful sequence.'
      await wait(900)
      await nextRound()
    }
  }

  function endGame() {
    isPlaying.value = false
    isShowingSequence.value = false
    highlightedRuneId.value = null

    message.value = 'Game over. Try again.'
  }

  return {
    availableRunes,
    sequence,
    playerInput,
    level,
    score,
    mistakes,
    isPlaying,
    isShowingSequence,
    highlightedRuneId,
    message,
    sequenceLength,
    canPlay,
    startGame,
    selectRune,
    endGame,
  }
})
