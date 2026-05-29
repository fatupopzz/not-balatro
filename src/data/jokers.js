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
    id: 'straight_master',
    name: 'Escalera Arcana',
    description: 'Si tienes una escalera, suma 80 puntos extra',
    apply: (score, selectedCards) => {
      const values = selectedCards.map(card => {
        if (card.value === 'A') return 14
        if (card.value === 'K') return 13
        if (card.value === 'Q') return 12
        if (card.value === 'J') return 11
        return Number(card.value)
      })
      const unique = [...new Set(values)].sort((a, b) => a - b)
      if (unique.includes(14)) unique.unshift(1)
      let streak = 1
      for (let i = 1; i < unique.length; i++) {
        if (unique[i] === unique[i - 1] + 1) {
          streak++
          if (streak >= 5) return score + 80
        } else {
          streak = 1
        }
      }
      return score
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
