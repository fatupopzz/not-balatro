import './Victory.css'

function Victory({ round, onContinue }) {
  return (
    <div className="victory-overlay">
      <div className="victory-box">
        <h2>Sobreviviste!</h2>
        <p className="victory-round">Ronda {round} completada</p>
        <p className="victory-msg">Elige tu comodin para continuar...</p>
        <button onClick={onContinue}>Continuar</button>
      </div>
    </div>
  )
}

export default Victory
