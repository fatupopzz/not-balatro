export const CARD_VALUES = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  10: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2
}

export function getCardValue(card) {
  return CARD_VALUES[card.value] || 0
}

export function getSortedCardValues(cards) {
  return cards
    .map((card) => getCardValue(card))
    .sort((a, b) => a - b)
}

export function countCardsByValue(cards) {
  return cards.reduce((counts, card) => {
    counts[card.value] = (counts[card.value] || 0) + 1
    return counts
  }, {})
}

export function countCardsBySuit(cards) {
  return cards.reduce((counts, card) => {
    counts[card.suit] = (counts[card.suit] || 0) + 1
    return counts
  }, {})
}
