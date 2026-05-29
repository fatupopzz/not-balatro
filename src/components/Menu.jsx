import './Menu.css'

function Menu({ onStart, difficulty, onDifficultyChange }) {
  return (
    <div className="menu">
      <div className="menu-box">
        <h1 className="menu-title">Not Balatro</h1>
        <p className="menu-subtitle">¿Puedes sobrevivir la noche?</p>

        <div className="difficulty-selector">
          <label htmlFor="difficulty">Dificultad</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
          >
            <option value="easy">Fácil</option>
            <option value="normal">Normal</option>
            <option value="hard">Difícil</option>
          </select>
        </div>

        <button className="menu-btn" onClick={onStart}>
          Iniciar Juego
        </button>
      </div>
    </div>
  )
}

export default Menu
