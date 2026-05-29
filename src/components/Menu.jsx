import './Menu.css'

const DIFFICULTY_INFO = {
  easy:   { label: 'Facil',   desc: 'Objetivo inicial: 80 pts, aumenta 40 por ronda' },
  normal: { label: 'Normal',  desc: 'Objetivo inicial: 100 pts, aumenta 50 por ronda' },
  hard:   { label: 'Dificil', desc: 'Objetivo inicial: 130 pts, aumenta 70 por ronda' }
}

function Menu({ onStart, difficulty, onDifficultyChange }) {
  const info = DIFFICULTY_INFO[difficulty]

  return (
    <div className="menu">
      <div className="menu-box">
        <h1 className="menu-title">Not Balatro</h1>
        <p className="menu-subtitle">Sobrevive 8 rondas de poker</p>

        <div className="menu-rules">
          <p>Selecciona 2-5 cartas para formar manos de poker</p>
          <p>Alcanza el puntaje objetivo antes de quedarte sin cartas</p>
          <p>Tienes 3 vidas — elige jokers para potenciar tu puntaje</p>
        </div>

        <div className="difficulty-selector">
          <label htmlFor="difficulty">Dificultad</label>
          <div className="difficulty-options">
            {Object.entries(DIFFICULTY_INFO).map(([key, val]) => (
              <button
                key={key}
                className={`diff-btn ${difficulty === key ? 'diff-active' : ''}`}
                onClick={() => onDifficultyChange(key)}
              >
                {val.label}
              </button>
            ))}
          </div>
          <p className="diff-desc">{info.desc}</p>
        </div>

        <button className="menu-btn" onClick={onStart}>
          Iniciar Juego
        </button>
      </div>
    </div>
  )
}

export default Menu
