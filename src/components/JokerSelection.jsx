import './JokerSelection.css'

function JokerSelection({ jokers, onSelect }) {
  return (
    <div className="joker-overlay">
      <div className="joker-box">
        <h2>Elige un Comodin</h2>
        <p className="joker-subtitle">Selecciona uno para potenciar la siguiente ronda</p>
        <div className="joker-options">
          {jokers.map((joker) => (
            <div
              key={joker.id}
              className="joker-card"
              onClick={() => onSelect(joker)}
            >
              <span className="joker-icon">🃏</span>
              <span className="joker-name">{joker.name}</span>
              <span className="joker-desc">{joker.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JokerSelection
