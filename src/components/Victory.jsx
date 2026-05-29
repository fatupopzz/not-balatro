import './Victory.css'

function Victory({ round, isFinal, onContinue }) {
  return (
    <div className="victory-overlay">
      <div className="victory-box">
        {isFinal ? (
          <>
            <h2>Ganaste!</h2>
            <p className="victory-round">Completaste las {round} rondas</p>
            <p className="victory-msg">Eres un maestro de las cartas.</p>
          </>
        ) : (
          <>
            <h2>Sobreviviste!</h2>
            <p className="victory-round">Ronda {round} completada</p>
            <p className="victory-msg">Elige tu comodin para continuar...</p>
          </>
        )}
        <button onClick={onContinue}>
          {isFinal ? 'Volver al menu' : 'Continuar'}
        </button>
      </div>
    </div>
  )
}

export default Victory
