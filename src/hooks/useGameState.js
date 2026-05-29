import { useState } from 'react'
import { createDeck, shuffleDeck } from '../data/deck'
import { getRandomJokers } from '../data/jokers'
import { evaluateHand } from '../utils/handEvaluator'
import { calculateScore } from '../utils/scoreCalculator'

export const DIFFICULTIES = {
  easy:   { label: 'Facil',   initialTarget: 80,  targetIncrease: 40 },
  normal: { label: 'Normal',  initialTarget: 100, targetIncrease: 50 },
  hard:   { label: 'Dificil', initialTarget: 130, targetIncrease: 70 }
}

export const MAX_ROUNDS = 8

function freshDeck() {
  return shuffleDeck(createDeck())
}

export function useGameState() {
  const [inMenu, setInMenu] = useState(true)
  const [difficulty, setDifficulty] = useState('normal')

  const [deck, setDeck] = useState([])
  const [hand, setHand] = useState([])
  const [selected, setSelected] = useState([])
  const [score, setScore] = useState(0)
  const [target, setTarget] = useState(100)
  const [round, setRound] = useState(1)
  const [lives, setLives] = useState(3)
  const [activeJoker, setActiveJoker] = useState(null)

  const [lastHand, setLastHand] = useState(null)
  const [floatingPoints, setFloatingPoints] = useState(null)
  const [showJokers, setShowJokers] = useState(false)
  const [jokerOptions, setJokerOptions] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [showVictory, setShowVictory] = useState(false)
  const [showRoundFail, setShowRoundFail] = useState(false)
  const [finalRound, setFinalRound] = useState(false)

  function startGame() {
    const d = freshDeck()
    setDeck(d.slice(8))
    setHand(d.slice(0, 8))
    setSelected([])
    setScore(0)
    setTarget(DIFFICULTIES[difficulty].initialTarget)
    setRound(1)
    setLives(3)
    setActiveJoker(null)
    setLastHand(null)
    setFloatingPoints(null)
    setGameOver(false)
    setShowVictory(false)
    setShowRoundFail(false)
    setFinalRound(false)
    setShowJokers(false)
    setInMenu(false)
  }

  function toggleCard(index) {
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index))
    } else if (selected.length < 5) {
      setSelected([...selected, index])
    }
  }

  function triggerFloatingPoints(points) {
    setFloatingPoints(points)
    setTimeout(() => setFloatingPoints(null), 1200)
  }

  function playHand() {
    if (selected.length < 2) return

    const selectedCards = selected.map(i => hand[i])
    const handResult = evaluateHand(selectedCards)
    const points = calculateScore(handResult, selectedCards, activeJoker)
    const newScore = score + points

    const remaining = hand.filter((_, i) => !selected.includes(i))
    const newCards = deck.slice(0, selected.length)
    const newDeck = deck.slice(selected.length)
    const newHand = [...remaining, ...newCards]

    setLastHand({ name: handResult.name, total: points })
    setSelected([])
    triggerFloatingPoints(points)

    if (newScore >= target) {
      setScore(newScore)
      setHand(newHand)
      setDeck(newDeck)
      if (round >= MAX_ROUNDS) {
        setFinalRound(true)
      }
      setShowVictory(true)
      return
    }

    const canContinue = newHand.length >= 2
    setScore(newScore)
    setHand(newHand)
    setDeck(newDeck)

    if (!canContinue) handleRoundFail(lives)
  }

  function discard() {
    if (selected.length === 0) return

    const remaining = hand.filter((_, i) => !selected.includes(i))
    const newCards = deck.slice(0, Math.min(selected.length, deck.length))
    const newDeck = deck.slice(newCards.length)
    const newHand = [...remaining, ...newCards]

    setHand(newHand)
    setDeck(newDeck)
    setSelected([])
    setLastHand(null)

    if (newHand.length < 2) handleRoundFail(lives)
  }

  function skip() {
    if (deck.length < 2) { handleRoundFail(lives); return }

    const count = Math.min(8, deck.length)
    setHand(deck.slice(0, count))
    setDeck(deck.slice(count))
    setSelected([])
    setLastHand(null)
  }

  function handleRoundFail(currentLives) {
    const newLives = currentLives - 1
    if (newLives <= 0) {
      setLives(0)
      setGameOver(true)
    } else {
      setLives(newLives)
      setShowRoundFail(true)
    }
  }

  function continueAfterFail() {
    const d = freshDeck()
    setDeck(d.slice(8))
    setHand(d.slice(0, 8))
    setSelected([])
    setScore(0)
    setLastHand(null)
    setShowRoundFail(false)
  }

  function handleVictoryContinue() {
    setShowVictory(false)
    if (finalRound) {
      setInMenu(true)
      setFinalRound(false)
      return
    }
    setJokerOptions(getRandomJokers(2))
    setShowJokers(true)
  }

  function selectJoker(joker) {
    const d = freshDeck()
    setActiveJoker(joker)
    setShowJokers(false)
    setRound(r => r + 1)
    setTarget(t => t + DIFFICULTIES[difficulty].targetIncrease)
    setScore(0)
    setLastHand(null)
    setHand(d.slice(0, 8))
    setDeck(d.slice(8))
    setSelected([])
  }

  const detectedHand = evaluateHand(selected.map(i => hand[i]))

  return {
    // state
    inMenu, difficulty, deck, hand, selected, score, target,
    round, lives, activeJoker, lastHand, floatingPoints,
    showJokers, jokerOptions, gameOver, showVictory,
    showRoundFail, finalRound, detectedHand,
    // actions
    startGame, restart: startGame, setDifficulty,
    toggleCard, playHand, discard, skip,
    continueAfterFail, handleVictoryContinue, selectJoker
  }
}
