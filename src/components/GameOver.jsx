import './GameOver.css'

function GameOver({ score, round, onRestart }) {
  return (
    <div className="gameover-overlay">
      <div className="gameover-box">
        <h2>GAME OVER</h2>
        <p className="gameover-score">Puntaje final: {score}</p>
        <p className="gameover-round">Llegaste a la ronda {round}</p>
        <p className="gameover-msg">
          Se acabaron las vidas antes de superar el objetivo.
        </p>
        <button onClick={onRestart}>Intentar de nuevo</button>
      </div>
    </div>
  )
}

export default GameOver
