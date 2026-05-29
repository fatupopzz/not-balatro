export const JOKERS = [
  {
    id: 'multiplier',
    name: 'Multiplicador',
    description: 'Multiplica tu puntaje x2',
    apply: (score) => score * 2
  },
  {
    id: 'bonus',
    name: 'Bonus Fijo',
    description: 'Suma 50 puntos al puntaje',
    apply: (score) => score + 50
  },
  {
    id: 'hearts_boost',
    name: 'Corazon de Oro',
    description: 'Suma 30 puntos por cada corazon',
    apply: (score, selectedCards) => {
      const hearts = selectedCards.filter(c => c.suit === 'hearts').length
      return score + hearts * 30
    }
  },
  {
    id: 'face_boost',
    name: 'Figuras Reales',
    description: 'Suma 25 puntos por cada figura J Q K',
    apply: (score, selectedCards) => {
      const faces = selectedCards.filter(c => ['J', 'Q', 'K'].includes(c.value)).length
      return score + faces * 25
    }
  },
  {
    id: 'triple',
    name: 'Triple Amenaza',
    description: 'Multiplica tu puntaje x3',
    apply: (score) => score * 3
  },
  {
    id: 'diamonds_boost',
    name: 'Rey de Diamantes',
    description: 'Suma 40 puntos por cada diamante',
    apply: (score, selectedCards) => {
      const diamonds = selectedCards.filter(c => c.suit === 'diamonds').length
      return score + diamonds * 40
    }
  },
  {
    id: 'ace_boost',
    name: 'As de la Muerte',
    description: 'Suma 60 puntos por cada As',
    apply: (score, selectedCards) => {
      const aces = selectedCards.filter(c => c.value === 'A').length
      return score + aces * 60
    }
  }
]

export function getRandomJokers(count = 2) {
  const shuffled = [...JOKERS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
