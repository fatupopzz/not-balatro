import './Card.css'

// Mapeo de suit/value del juego al nombre de archivo PNG
const SUIT_MAP = {
  hearts:   'heart',
  diamonds: 'diamond',
  clubs:    'club',
  spades:   'spade'
}

const VALUE_MAP = {
  'A':  '1',
  '2':  '2',
  '3':  '3',
  '4':  '4',
  '5':  '5',
  '6':  '6',
  '7':  '7',
  '8':  '8',
  '9':  '9',
  '10': '10',
  'J':  'jack',
  'Q':  'queen',
  'K':  'king'
}

function getCardImage(card) {
  const suit = SUIT_MAP[card.suit]
  const value = VALUE_MAP[card.value]
  return `/cards/${suit}_${value}.png`
}

function Card({ card, selected, onClick, index }) {
  const imgSrc = getCardImage(card)

  return (
    <div
      className={`card ${selected ? 'card-selected' : ''}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <img
        src={imgSrc}
        alt={`${card.value} of ${card.suit}`}
        className="card-img"
        draggable={false}
      />
    </div>
  )
}

export default Card
