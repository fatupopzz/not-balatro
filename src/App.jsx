import { useGameState, DIFFICULTIES, MAX_ROUNDS } from './hooks/useGameState'
import Menu from './components/Menu'
import Card from './components/Card'
import GameOver from './components/GameOver'
import JokerSelection from './components/JokerSelection'
import RoundFail from './components/RoundFail'
import Victory from './components/Victory'
import FloatingScore from './components/FloatingScore'
import ScorePanel from './components/ScorePanel'
import './App.css'

function App() {
  const game = useGameState()

  if (game.inMenu) {
    return (
      <Menu
        onStart={game.startGame}
        difficulty={game.difficulty}
        onDifficultyChange={game.setDifficulty}
      />
    )
  }

  return (
    <div className="app">
      {game.gameOver     && <GameOver score={game.score} round={game.round} onRestart={game.restart} />}
      {game.showVictory  && <Victory round={game.round} isFinal={game.finalRound} onContinue={game.handleVictoryContinue} />}
      {game.showRoundFail && <RoundFail lives={game.lives} onContinue={game.continueAfterFail} onRestart={game.restart} />}
      {game.showJokers   && <JokerSelection jokers={game.jokerOptions} onSelect={game.selectJoker} />}

      <header className="navbar">
        <span className="nav-round">Ronda {game.round}/{MAX_ROUNDS}</span>
        <h1>Not Balatro</h1>
        <div className="navbar-right">
          <span className="lives">{'♥ '.repeat(game.lives).trim()}</span>
          <span className="cards-left">Mazo: {game.deck.length}</span>
        </div>
      </header>

      <main className="gameboard">
        <ScorePanel
          score={game.score}
          target={game.target}
          lives={game.lives}
          difficulty={DIFFICULTIES[game.difficulty].label}
          detectedHand={game.detectedHand}
          activeJoker={game.activeJoker}
          lastHand={game.lastHand}
        />

        <section className="hand-area">
          <p className="hand-label">Tu mano — selecciona 2 a 5 cartas</p>
          <div className="hand">
            {game.hand.map((card, i) => (
              <Card
                key={`${card.suit}-${card.value}-${i}`}
                card={card}
                index={i}
                selected={game.selected.includes(i)}
                onClick={() => game.toggleCard(i)}
              />
            ))}
          </div>

          {game.floatingPoints && (
            <FloatingScore points={game.floatingPoints} />
          )}
        </section>

        <section className="actions">
          <button onClick={game.playHand} disabled={game.selected.length < 2}>
            Jugar mano
          </button>
          <button onClick={game.discard} disabled={game.selected.length === 0}>
            Descartar
          </button>
          <button onClick={game.skip} disabled={game.deck.length === 0}>
            Skip
          </button>
        </section>

        {game.activeJoker && (
          <div className="joker-active-bar">
            <span>🃏 Joker activo:</span>
            <strong>{game.activeJoker.name}</strong>
            <span className="joker-active-desc">— {game.activeJoker.description}</span>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
