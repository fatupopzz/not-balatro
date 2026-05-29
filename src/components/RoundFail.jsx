import './RoundFail.css'

function RoundFail({ lives, onContinue, onRestart }) {
  return (
    <div className="roundfail-overlay">
      <div className="roundfail-box">
        <h2>Ronda Perdida</h2>
        <p className="roundfail-lives">
          {'♥ '.repeat(lives).trim() || '☠'}
        </p>
        <p className="roundfail-msg">
          Se acabaron las cartas antes de alcanzar el objetivo.
        </p>
        <p className="roundfail-sub">
          {lives > 0
            ? `Te quedan ${lives} vida${lives > 1 ? 's' : ''}. Se reparte una nueva baraja.`
            : 'No te quedan vidas.'}
        </p>
        <div className="roundfail-actions">
          {lives > 0 && (
            <button onClick={onContinue}>Continuar con nueva baraja</button>
          )}
          <button className="btn-secondary" onClick={onRestart}>Reiniciar partida</button>
        </div>
      </div>
    </div>
  )
}

export default RoundFail
