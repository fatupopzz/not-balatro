import { useState } from 'react'
import Menu from './components/Menu'
import { createDeck, shuffleDeck } from './data/deck'
import { getRandomJokers } from './data/jokers'
import { evaluateHand } from './utils/handEvaluator'
import { calculateScore } from './utils/scoreCalculator'
import Card from './components/Card'
import GameOver from './components/GameOver'
import JokerSelection from './components/JokerSelection'
import Victory from './components/Victory'
import './App.css'

function App() {
  const [inMenu, setInMenu] = useState(true)
  const [deck, setDeck] = useState(() => shuffleDeck(createDeck()))
  const [hand, setHand] = useState([])
  const [selected, setSelected] = useState([])
  const [score, setScore] = useState(0)
  const [target, setTarget] = useState(100)
  const [round, setRound] = useState(1)
  const [activeJoker, setActiveJoker] = useState(null)
  const [showJokers, setShowJokers] = useState(false)
  const [jokerOptions, setJokerOptions] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [lives, setLives] = useState(3)
  const [showVictory, setShowVictory] = useState(false)

  function dealHand(currentDeck) {
    if (currentDeck.length < 8) {
      setGameOver(true)
      return
    }
    const newHand = currentDeck.slice(0, 8)
    const remaining = currentDeck.slice(8)
    setHand(newHand)
    setDeck(remaining)
    setSelected([])
  }

  function toggleCard(index) {
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index))
    } else if (selected.length < 5) {
      setSelected([...selected, index])
    }
  }

  function playHand() {
    if (selected.length < 2) return
    const selectedCards = selected.map(i => hand[i])
    const handResult = evaluateHand(selectedCards)
    const points = calculateScore(handResult, selectedCards, activeJoker)

    const newScore = score + points
    const remaining = hand.filter((_, i) => !selected.includes(i))
    setHand(remaining)
    setSelected([])
    setScore(newScore)

    if (newScore >= target) {
      setShowVictory(true)
    } else if (deck.length === 0 && remaining.length === 0) {
      const newLives = lives - 1
      setLives(newLives)
      if (newLives <= 0) {
        setGameOver(true)
      } else {
        const newDeck = shuffleDeck(createDeck())
        dealHand(newDeck)
        setDeck(newDeck.slice(8))
        setScore(0)
      }
    }
  }

  function discard() {
    if (selected.length === 0) return
    const remaining = hand.filter((_, i) => !selected.includes(i))
    const newCards = deck.slice(0, selected.length)
    const newDeck = deck.slice(selected.length)
    setHand([...remaining, ...newCards])
    setDeck(newDeck)
    setSelected([])
  }

  function skip() {
    if (deck.length < 8) {
      setGameOver(true)
      return
    }
    const newHand = deck.slice(0, 8)
    const remaining = deck.slice(8)
    setHand(newHand)
    setDeck(remaining)
    setSelected([])
  }

  function handleVictoryContinue() {
    setShowVictory(false)
    const options = getRandomJokers(2)
    setJokerOptions(options)
    setShowJokers(true)
  }

  function selectJoker(joker) {
    setActiveJoker(joker)
    setShowJokers(false)
    setRound(round + 1)
    setTarget(target + 50)
    const newDeck = shuffleDeck(createDeck())
    dealHand(newDeck)
    setDeck(newDeck.slice(8))
    setScore(0)
  }

  function restart() {
    const newDeck = shuffleDeck(createDeck())
    setDeck(newDeck)
    setHand([])
    setSelected([])
    setScore(0)
    setTarget(100)
    setRound(1)
    setActiveJoker(null)
    setShowJokers(false)
    setGameOver(false)
    setLives(3)
    setShowVictory(false)
    setInMenu(true)
  }

  const detectedHand = evaluateHand(selected.map(i => hand[i]))

  return (
    <div className="app">
      {inMenu ? (
        <Menu onStart={() => setInMenu(false)} />
      ) : (
        <>
          {gameOver && <GameOver score={score} onRestart={restart} />}
          {showVictory && <Victory round={round} onContinue={handleVictoryContinue} />}
          {showJokers && <JokerSelection jokers={jokerOptions} onSelect={selectJoker} />}

          <header className="navbar">
            <span>Ronda {round}</span>
            <h1>Not Balatro</h1>
            <div className="navbar-right">
              <span className="lives">{'♥ '.repeat(lives).trim()}</span>
              <span className="cards-left">Cartas: {deck.length}</span>
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
                <span className="score-label">Mano</span>
                <span className="score-hand">{detectedHand.name}</span>
              </div>
            </section>

            <section className="hand-area">
              <p className="hand-label">Tu mano — selecciona 2 a 5 cartas</p>
              <div className="hand">
                {hand.length === 0 ? (
                  <button onClick={() => dealHand(deck)}>Repartir cartas</button>
                ) : (
                  hand.map((card, i) => (
                    <Card
                      key={i}
                      card={card}
                      index={i}
                      selected={selected.includes(i)}
                      onClick={() => toggleCard(i)}
                    />
                  ))
                )}
              </div>
            </section>

            {hand.length > 0 && (
              <section className="actions">
                <button onClick={playHand} disabled={selected.length < 2}>
                  Jugar mano
                </button>
                <button onClick={discard} disabled={selected.length === 0}>
                  Descartar
                </button>
                <button onClick={skip}>
                  Skip
                </button>
              </section>
            )}
          </main>
        </>
      )}
    </div>
  )
}

export default App
