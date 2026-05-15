import './GameOver.css'

function GameOver({ score, onRestart }) {
  return (
    <div className="gameover-overlay">
      <div className="gameover-box">
        <h2>GAME OVER</h2>
        <p className="gameover-score">Puntaje final: {score}</p>
        <p className="gameover-msg">No lograste alcanzar el objetivo...</p>
        <button onClick={onRestart}>Intentar de nuevo</button>
      </div>
    </div>
  )
}

export default GameOver
