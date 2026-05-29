// Valor numerico de carta para calculo de score
export function getCardNumericValue(value) {
  if (value === 'A') return 11
  if (['J', 'Q', 'K'].includes(value)) return 10
  return parseInt(value)
}

// Valor para detectar escaleras
function getCardStraightValue(value) {
  if (value === 'A') return 14
  if (value === 'K') return 13
  if (value === 'Q') return 12
  if (value === 'J') return 11
  return parseInt(value)
}

function checkConsecutive(sorted) {
  if (sorted.length < 5) return false
  let streak = 1
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1] + 1) {
      streak++
      if (streak >= 5) return true
    } else if (sorted[i] !== sorted[i - 1]) {
      streak = 1
    }
  }
  return false
}

function isStraightCards(cards) {
  if (cards.length < 5) return false
  const raw = cards.map(c => getCardStraightValue(c.value))
  const unique = [...new Set(raw)].sort((a, b) => a - b)

  // A-2-3-4-5 (A como 1)
  if (unique.includes(14)) {
    const withLow = [1, ...unique].sort((a, b) => a - b)
    if (checkConsecutive(withLow)) return true
  }

  return checkConsecutive(unique)
}

export function evaluateHand(cards) {
  if (!cards || cards.length === 0) return { name: 'Selecciona cartas', score: 0 }
  if (cards.length === 1) return { name: 'Carta Alta', score: 5 }

  const values = cards.map(c => c.value)
  const suits = cards.map(c => c.suit)

  const valueCounts = {}
  for (const v of values) {
    valueCounts[v] = (valueCounts[v] || 0) + 1
  }

  const counts = Object.values(valueCounts).sort((a, b) => b - a)
  const isFlush = suits.every(s => s === suits[0]) && cards.length === 5
  const isStraight = isStraightCards(cards)

  if (isFlush && isStraight) return { name: 'Escalera de Color', score: 100 }
  if (counts[0] === 4)       return { name: 'Poker', score: 80 }
  if (counts[0] === 3 && counts[1] === 2) return { name: 'Full House', score: 70 }
  if (isFlush)               return { name: 'Color', score: 60 }
  if (isStraight)            return { name: 'Escalera', score: 50 }
  if (counts[0] === 3)       return { name: 'Trio', score: 40 }
  if (counts[0] === 2 && counts[1] === 2) return { name: 'Doble Par', score: 25 }
  if (counts[0] === 2)       return { name: 'Par', score: 15 }

  return { name: 'Carta Alta', score: 5 }
}
