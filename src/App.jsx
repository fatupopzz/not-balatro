import { useState } from 'react'
import { createDeck, shuffleDeck } from './data/deck'
import Card from './components/Card'
import './App.css'

function App() {
  const [deck, setDeck] = useState(() => shuffleDeck(createDeck()))
  const [hand, setHand] = useState([])
  const [selected, setSelected] = useState([])
  const [score, setScore] = useState(0)
  const [target, setTarget] = useState(100)
  const [round, setRound] = useState(1)

  function dealHand(currentDeck) {
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

  return (
    <div className="app">
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
            <span className="score-label">Mano</span>
            <span className="score-number score-hand">— selecciona</span>
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
                  selected={selected.includes(i)}
                  onClick={() => toggleCard(i)}
                />
              ))
            )}
          </div>
        </section>

        {hand.length > 0 && (
          <section className="actions">
            <button disabled={selected.length < 2}>Jugar mano</button>
            <button disabled={selected.length === 0}>Descartar</button>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
