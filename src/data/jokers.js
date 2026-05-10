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
    description: 'Si tienes corazones, suma 30 puntos por cada uno',
    apply: (score, selectedCards) => {
      const hearts = selectedCards.filter(c => c.suit === 'hearts').length
      return score + hearts * 30
    }
  },
  {
    id: 'face_boost',
    name: 'Figuras Reales',
    description: 'Multiplica x1.5 por cada figura (J, Q, K)',
    apply: (score, selectedCards) => {
      const faces = selectedCards.filter(c => ['J', 'Q', 'K'].includes(c.value)).length
      return score + faces * 25
    }
  }
]

export function getRandomJokers(count = 2) {
  const shuffled = [...JOKERS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
