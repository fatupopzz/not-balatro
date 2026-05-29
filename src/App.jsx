import { useState } from 'react'
import Menu from './components/Menu'
import { createDeck, shuffleDeck } from './data/deck'
import { getRandomJokers } from './data/jokers'
import { evaluateHand } from './utils/handEvaluator'
import { calculateScore } from './utils/scoreCalculator'
import Card from './components/Card'
import GameOver from './components/GameOver'
import JokerSelection from './components/JokerSelection'
import RoundFail from './components/RoundFail'
import Victory from './components/Victory'
import './App.css'

const DIFFICULTIES = {
  easy:   { label: 'Facil',   initialTarget: 80,  targetIncrease: 40 },
  normal: { label: 'Normal',  initialTarget: 100, targetIncrease: 50 },
  hard:   { label: 'Dificil', initialTarget: 130, targetIncrease: 70 }
}

const MAX_ROUNDS = 8

function freshGame(difficulty) {
  const deck = shuffleDeck(createDeck())
  return {
    deck: deck.slice(8),
    hand: deck.slice(0, 8),
    score: 0,
    round: 1,
    lives: 3,
    target: DIFFICULTIES[difficulty].initialTarget,
    activeJoker: null
  }
}

function App() {
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
  const [showJokers, setShowJokers] = useState(false)
  const [jokerOptions, setJokerOptions] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [showVictory, setShowVictory] = useState(false)
  // roundFail: muestra cuando se acaban las cartas sin llegar al objetivo
  const [showRoundFail, setShowRoundFail] = useState(false)
  const [finalRound, setFinalRound] = useState(false)

  // ── Iniciar / reiniciar ────────────────────────────────────────────────────
  function startGame() {
    const g = freshGame(difficulty)
    setDeck(g.deck)
    setHand(g.hand)
    setSelected([])
    setScore(g.score)
    setTarget(g.target)
    setRound(g.round)
    setLives(g.lives)
    setActiveJoker(g.activeJoker)
    setLastHand(null)
    setGameOver(false)
    setShowVictory(false)
    setShowRoundFail(false)
    setFinalRound(false)
    setShowJokers(false)
    setInMenu(false)
  }

  function restart() {
    startGame()
  }

  // ── Seleccion de cartas ────────────────────────────────────────────────────
  function toggleCard(index) {
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index))
    } else if (selected.length < 5) {
      setSelected([...selected, index])
    }
  }

  // ── Jugar mano ────────────────────────────────────────────────────────────
  function playHand() {
    if (selected.length < 2) return

    const selectedCards = selected.map(i => hand[i])
    const handResult = evaluateHand(selectedCards)
    const points = calculateScore(handResult, selectedCards, activeJoker)
    const newScore = score + points

    // Reemplazar cartas jugadas con nuevas del mazo
    const remaining = hand.filter((_, i) => !selected.includes(i))
    const cardsNeeded = selected.length
    const newCards = deck.slice(0, cardsNeeded)
    const newDeck = deck.slice(cardsNeeded)
    const newHand = [...remaining, ...newCards]

    setLastHand({ name: handResult.name, total: points })
    setSelected([])

    // Gano la ronda
    if (newScore >= target) {
      setScore(newScore)
      setHand(newHand)
      setDeck(newDeck)

      if (round >= MAX_ROUNDS) {
        // Gano el juego completo
        setFinalRound(true)
        setShowVictory(true)
      } else {
        setShowVictory(true)
      }
      return
    }

    // No gano aun - chequear si quedan cartas para seguir jugando
    // Se necesitan al menos 2 cartas para poder jugar
    const canContinue = newHand.length >= 2

    setScore(newScore)
    setHand(newHand)
    setDeck(newDeck)

    if (!canContinue) {
      // Se acabaron las cartas sin llegar al objetivo => perder vida
      handleRoundFail()
    }
  }

  // ── Descartar ─────────────────────────────────────────────────────────────
  function discard() {
    if (selected.length === 0) return

    const remaining = hand.filter((_, i) => !selected.includes(i))
    const cardsToDraw = Math.min(selected.length, deck.length)
    const newCards = deck.slice(0, cardsToDraw)
    const newDeck = deck.slice(cardsToDraw)
    const newHand = [...remaining, ...newCards]

    setHand(newHand)
    setDeck(newDeck)
    setSelected([])
    setLastHand(null)

    // Si despues de descartar no hay cartas suficientes
    if (newHand.length < 2) {
      handleRoundFail()
    }
  }

  // ── Skip (repartir mano nueva del mazo) ───────────────────────────────────
  function skip() {
    if (deck.length < 8) {
      // No hay suficientes cartas para skip completo
      // usar las que quedan o fallar ronda
      if (deck.length < 2) {
        handleRoundFail()
        return
      }
      const newHand = deck
      setHand(newHand)
      setDeck([])
      setSelected([])
      setLastHand(null)
      return
    }

    const newHand = deck.slice(0, 8)
    const newDeck = deck.slice(8)
    setHand(newHand)
    setDeck(newDeck)
    setSelected([])
    setLastHand(null)
  }

  // ── Perder una vida / ronda fallida ───────────────────────────────────────
  function handleRoundFail() {
    const newLives = lives - 1
    if (newLives <= 0) {
      setLives(0)
      setGameOver(true)
    } else {
      setLives(newLives)
      setShowRoundFail(true)
    }
  }

  // El jugador acepta la penalizacion y sigue con nueva baraja
  function continueAfterFail() {
    const newDeck = shuffleDeck(createDeck())
    setDeck(newDeck.slice(8))
    setHand(newDeck.slice(0, 8))
    setSelected([])
    setScore(0)
    setLastHand(null)
    setShowRoundFail(false)
  }

  // ── Victoria de ronda ─────────────────────────────────────────────────────
  function handleVictoryContinue() {
    setShowVictory(false)
    if (finalRound) {
      setInMenu(true)
      setFinalRound(false)
      return
    }
    const options = getRandomJokers(2)
    setJokerOptions(options)
    setShowJokers(true)
  }

  function selectJoker(joker) {
    const newDeck = shuffleDeck(createDeck())
    const newRound = round + 1
    const newTarget = target + DIFFICULTIES[difficulty].targetIncrease

    setActiveJoker(joker)
    setShowJokers(false)
    setRound(newRound)
    setTarget(newTarget)
    setScore(0)
    setLastHand(null)
    setHand(newDeck.slice(0, 8))
    setDeck(newDeck.slice(8))
    setSelected([])
  }

  // ── Preview de mano seleccionada ──────────────────────────────────────────
  const detectedHand = evaluateHand(selected.map(i => hand[i]))
  const cardsInDeck = deck.length

  return (
    <div className="app">
      {inMenu ? (
        <Menu
          onStart={startGame}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />
      ) : (
        <>
          {gameOver    && <GameOver score={score} round={round} onRestart={restart} />}
          {showVictory && <Victory round={round} isFinal={finalRound} onContinue={handleVictoryContinue} />}
          {showRoundFail && <RoundFail lives={lives} onContinue={continueAfterFail} onRestart={restart} />}
          {showJokers  && <JokerSelection jokers={jokerOptions} onSelect={selectJoker} />}

          <header className="navbar">
            <span className="nav-round">Ronda {round}/{MAX_ROUNDS}</span>
            <h1>Not Balatro</h1>
            <div className="navbar-right">
              <span className="lives">{'♥ '.repeat(lives).trim()}</span>
              <span className="cards-left">Mazo: {cardsInDeck}</span>
            </div>
          </header>

          <main className="gameboard">
            <section className="score-panel">
              <div className="score-box">
                <span className="score-label">Puntaje</span>
                <span className="score-number">{score}</span>
              </div>
              <div className="score-box">
                <span className="score-label">Objetivo</span>
                <span className="score-number">{target}</span>
              </div>
              <div className="score-box">
                <span className="score-label">Restante</span>
                <span className="score-number score-remaining">{Math.max(0, target - score)}</span>
              </div>
              <div className="score-box">
                <span className="score-label">Dificultad</span>
                <span className="score-hand">{DIFFICULTIES[difficulty].label}</span>
              </div>
              <div className="score-box">
                <span className="score-label">Mano</span>
                <span className="score-hand highlight">{detectedHand.name}</span>
              </div>
              <div className="score-box">
                <span className="score-label">Joker</span>
                <span className="score-hand">{activeJoker ? activeJoker.name : '— ninguno'}</span>
              </div>
              <div className="score-box">
                <span className="score-label">Ultima mano</span>
                <span className="score-hand">
                  {lastHand ? `${lastHand.name} +${lastHand.total}` : '— sin jugar'}
                </span>
              </div>
            </section>

            <section className="hand-area">
              <p className="hand-label">Tu mano — selecciona 2 a 5 cartas</p>
              <div className="hand">
                {hand.map((card, i) => (
                  <Card
                    key={`${card.suit}-${card.value}-${i}`}
                    card={card}
                    index={i}
                    selected={selected.includes(i)}
                    onClick={() => toggleCard(i)}
                  />
                ))}
              </div>
            </section>

            <section className="actions">
              <button onClick={playHand} disabled={selected.length < 2}>
                Jugar mano
              </button>
              <button onClick={discard} disabled={selected.length === 0}>
                Descartar
              </button>
              <button onClick={skip} disabled={deck.length === 0}>
                Skip
              </button>
            </section>

            {activeJoker && (
              <div className="joker-active-bar">
                <span>🃏 Joker activo:</span>
                <strong>{activeJoker.name}</strong>
                <span className="joker-active-desc">— {activeJoker.description}</span>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  )
}

export default App
