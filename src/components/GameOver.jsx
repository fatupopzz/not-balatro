import './GameOver.css'

function GameOver({ score, onRestart }) {
  const finalMessage = score > 0
    ? 'Te quedaste sin vidas antes de superar el objetivo.'
    : 'La suerte no acompañó esta partida.'

  return (
    <div className="gameover-overlay">
      <div className="gameover-box">
        <h2>GAME OVER</h2>
        <p className="gameover-score">Puntaje final: {score}</p>
        <p className="gameover-msg">{finalMessage}</p>
        <p className="gameover-hint">Prueba otra combinación de cartas y aprovecha mejor tus jokers.</p>
        <button onClick={onRestart}>Intentar de nuevo</button>
      </div>
    </div>
  )
}

export default GameOver
