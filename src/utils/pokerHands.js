import {
  countCardsBySuit,
  countCardsByValue,
  getSortedCardValues
} from './cardValues'

function hasFlush(cards) {
  const suitCounts = countCardsBySuit(cards)
  return Object.values(suitCounts).some((count) => count >= 5)
}

function hasStraight(cards) {
  const values = [...new Set(getSortedCardValues(cards))]

  if (values.includes(14)) {
    values.unshift(1)
  }

  let streak = 1

  for (let i = 1; i < values.length; i += 1) {
    if (values[i] === values[i - 1] + 1) {
      streak += 1
      if (streak >= 5) return true
    } else {
      streak = 1
    }
  }

  return false
}

export function evaluatePokerHand(cards) {
  if (cards.length === 0) {
    return {
      name: 'No hand',
      baseScore: 0,
      multiplier: 0,
      total: 0
    }
  }

  const valueCounts = countCardsByValue(cards)
  const counts = Object.values(valueCounts).sort((a, b) => b - a)

  const isFlush = hasFlush(cards)
  const isStraight = hasStraight(cards)

  let hand = {
    name: 'High Card',
    baseScore: 20,
    multiplier: 1
  }

  if (isStraight && isFlush) {
    hand = { name: 'Straight Flush', baseScore: 120, multiplier: 4 }
  } else if (counts[0] === 4) {
    hand = { name: 'Four of a Kind', baseScore: 100, multiplier: 3.5 }
  } else if (counts[0] === 3 && counts[1] >= 2) {
    hand = { name: 'Full House', baseScore: 90, multiplier: 3 }
  } else if (isFlush) {
    hand = { name: 'Flush', baseScore: 75, multiplier: 2.5 }
  } else if (isStraight) {
    hand = { name: 'Straight', baseScore: 70, multiplier: 2.3 }
  } else if (counts[0] === 3) {
    hand = { name: 'Three of a Kind', baseScore: 55, multiplier: 2 }
  } else if (counts[0] === 2 && counts[1] === 2) {
    hand = { name: 'Two Pair', baseScore: 45, multiplier: 1.7 }
  } else if (counts[0] === 2) {
    hand = { name: 'Pair', baseScore: 35, multiplier: 1.4 }
  }

  return {
    ...hand,
    total: Math.floor(hand.baseScore * hand.multiplier)
  }
}
