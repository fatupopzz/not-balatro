import './Menu.css'

function Menu({ onStart }) {
  return (
    <div className="menu">
      <div className="menu-box">
        <h1 className="menu-title">Not Balatro</h1>
        <p className="menu-subtitle">¿Puedes sobrevivir la noche?</p>
        <button className="menu-btn" onClick={onStart}>
          Iniciar Juego
        </button>
      </div>
    </div>
  )
}

export default Menu
