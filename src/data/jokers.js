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
  },
  {
    id: 'straight_master',
    name: 'Escalera Arcana',
    description: 'Si tienes una escalera, suma 80 puntos extra',
    apply: (score, selectedCards) => {
      const values = selectedCards
        .map(card => {
          if (card.value === 'A') return 14
          if (card.value === 'K') return 13
          if (card.value === 'Q') return 12
          if (card.value === 'J') return 11
          return Number(card.value)
        })
        .sort((a, b) => a - b)

      let streak = 1

      for (let i = 1; i < values.length; i += 1) {
        if (values[i] === values[i - 1] + 1) {
          streak += 1
        }
      }

      return streak >= 5 ? score + 80 : score
    }
  }
]

export function getRandomJokers(count = 2) {
  const shuffled = [...JOKERS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
