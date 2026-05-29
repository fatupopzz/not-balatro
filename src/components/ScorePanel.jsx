import './ScorePanel.css'

function ScorePanel({ score, target, lives, difficulty, detectedHand, activeJoker, lastHand }) {
  const remaining = Math.max(0, target - score)
  const progress = Math.min(100, Math.round((score / target) * 100))

  return (
    <section className="score-panel">
      <div className="score-row score-row-main">
        <div className="score-box score-box-big">
          <span className="score-label">Puntaje</span>
          <span className="score-number">{score}</span>
        </div>
        <div className="score-box score-box-big">
          <span className="score-label">Objetivo</span>
          <span className="score-number">{target}</span>
        </div>
        <div className="score-box score-box-big">
          <span className="score-label">Faltan</span>
          <span className="score-number score-remaining">{remaining}</span>
        </div>
        <div className="score-box score-box-big">
          <span className="score-label">Vidas</span>
          <span className="score-lives">{'♥ '.repeat(lives).trim()}</span>
        </div>
      </div>

      <div className="score-progress-bar">
        <div className="score-progress-fill" style={{ width: `${progress}%` }} />
        <span className="score-progress-label">{progress}%</span>
      </div>

      <div className="score-row score-row-info">
        <div className="score-box">
          <span className="score-label">Dificultad</span>
          <span className="score-hand">{difficulty}</span>
        </div>
        <div className="score-box">
          <span className="score-label">Mano detectada</span>
          <span className="score-hand highlight">{detectedHand.name}</span>
        </div>
        <div className="score-box">
          <span className="score-label">Joker</span>
          <span className="score-hand">{activeJoker ? activeJoker.name : '— ninguno'}</span>
        </div>
        <div className="score-box">
          <span className="score-label">Ultima jugada</span>
          <span className="score-hand">
            {lastHand ? `${lastHand.name} +${lastHand.total}` : '— sin jugar'}
          </span>
        </div>
      </div>
    </section>
  )
}

export default ScorePanel
