import './Card.css'

const SUIT_SYMBOLS = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
}

const RED_SUITS = ['hearts', 'diamonds']

function Card({ card, selected, onClick, index }) {
  const isRed = RED_SUITS.includes(card.suit)
  const symbol = SUIT_SYMBOLS[card.suit]

  return (
    <div
      className={`card ${isRed ? 'card-red' : 'card-black'} ${selected ? 'card-selected' : ''}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="card-corner card-top-left">
        <span className="card-value">{card.value}</span>
        <span className="card-suit">{symbol}</span>
      </div>
      <div className="card-center">{symbol}</div>
      <div className="card-corner card-bottom-right">
        <span className="card-value">{card.value}</span>
        <span className="card-suit">{symbol}</span>
      </div>
    </div>
  )
}

export default Card
