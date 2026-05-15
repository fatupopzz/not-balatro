export function getCardNumericValue(value) {
  if (value === 'A') return 11
  if (['J', 'Q', 'K'].includes(value)) return 10
  return parseInt(value)
}

export function evaluateHand(cards) {
  if (cards.length === 0) return { name: 'Sin mano', score: 0 }

  const values = cards.map(c => c.value)
  const suits = cards.map(c => c.suit)

  const valueCounts = {}
  for (const v of values) {
    valueCounts[v] = (valueCounts[v] || 0) + 1
  }

  const counts = Object.values(valueCounts).sort((a, b) => b - a)
  const isFlush = suits.every(s => s === suits[0]) && cards.length === 5
  const numericValues = values.map(getCardNumericValue).sort((a, b) => a - b)
  const isStraight = cards.length === 5 && numericValues.every(
    (v, i) => i === 0 || v === numericValues[i - 1] + 1
  )

  if (isFlush && isStraight) return { name: 'Escalera de Color', score: 100 }
  if (counts[0] === 4)        return { name: 'Poker', score: 80 }
  if (counts[0] === 3 && counts[1] === 2) return { name: 'Full House', score: 70 }
  if (isFlush)                return { name: 'Color', score: 60 }
  if (isStraight)             return { name: 'Escalera', score: 50 }
  if (counts[0] === 3)        return { name: 'Trio', score: 40 }
  if (counts[0] === 2 && counts[1] === 2) return { name: 'Doble Par', score: 25 }
  if (counts[0] === 2)        return { name: 'Par', score: 15 }

  return { name: 'Carta Alta', score: 5 }
}
