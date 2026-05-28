import { useState } from 'react'
import Menu from './components/Menu'
import { createDeck, shuffleDeck } from './data/deck'
import { getRandomJokers } from './data/jokers'
import Card from './components/Card'
import GameOver from './components/GameOver'
import JokerSelection from './components/JokerSelection'
import { evaluatePokerHand } from './utils/pokerHands'
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
  const [lastHand, setLastHand] = useState(null)
  const [lives, setLives] = useState(3)

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
    const handResult = evaluatePokerHand(selectedCards)
    let points = handResult.total

    if (activeJoker) {
      points = activeJoker.apply(points, selectedCards)
    }

    const newScore = score + points
    const remaining = hand.filter((_, i) => !selected.includes(i))

    const cardsNeeded = selected.length
    const newCards = deck.slice(0, cardsNeeded)
    const updatedDeck = deck.slice(cardsNeeded)

    setLastHand({
      name: handResult.name,
      baseScore: handResult.baseScore,
      multiplier: handResult.multiplier,
      total: points
    })
    setHand([...remaining, ...newCards])
    setDeck(updatedDeck)
    setSelected([])
    setScore(newScore)

    if (newScore >= target) {
      const options = getRandomJokers(2)
      setJokerOptions(options)
      setShowJokers(true)
    } else if (updatedDeck.length === 0 && [...remaining, ...newCards].length < 2) {
      if (lives <= 1) {
        setGameOver(true)
      } else {
        const newDeck = shuffleDeck(createDeck())
        setLives(lives - 1)
        setScore(0)
        setLastHand(null)
        dealHand(newDeck)
        setDeck(newDeck.slice(8))
      }
    }
  }

  function discard() {
    if (selected.length === 0) return

    const remaining = hand.filter((_, i) => !selected.includes(i))
    const cardsToDraw = Math.min(selected.length, deck.length)
    const newCards = deck.slice(0, cardsToDraw)
    const newDeck = deck.slice(cardsToDraw)

    setHand([...remaining, ...newCards])
    setDeck(newDeck)
    setSelected([])
    setLastHand(null)
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
    setLastHand(null)
  }

  function restart() {
    const newDeck = shuffleDeck(createDeck())
    const newHand = newDeck.slice(0, 8)
    const remainingDeck = newDeck.slice(8)

    setDeck(remainingDeck)
    setHand(newHand)
    setSelected([])
    setScore(0)
    setTarget(100)
    setRound(1)
    setActiveJoker(null)
    setShowJokers(false)
    setGameOver(false)
    setLastHand(null)
    setLives(3)
  }

  return (
  <div className="app">
    {inMenu ? (
      <Menu onStart={() => setInMenu(false)} />
    ) : (
      <>
        {gameOver && <GameOver score={score} onRestart={restart} />}
        {showJokers && <JokerSelection jokers={jokerOptions} onSelect={selectJoker} />}

        <header className="navbar">
          <span>Ronda {round}</span>
          <h1>Not Balatro</h1>
          <span>Cartas: {deck.length}</span>
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
              <span className="score-label">Vidas</span>
              <span className="score-number">{lives}</span>
            </div>
            <div className="score-box">
              <span className="score-label">Joker activo</span>
              <span className="score-hand">
                {activeJoker ? activeJoker.name : '— ninguno'}
              </span>
            </div>
            <div className="score-box">
              <span className="score-label">Última mano</span>
              <span className="score-hand">
                {lastHand ? `${lastHand.name} +${lastHand.total}` : '— sin jugar'}
              </span>
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
            </section>
          )}
        </main>
      </>
    )}
  </div>
)
}

export default App
