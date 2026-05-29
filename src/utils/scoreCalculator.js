import { getCardNumericValue } from './handEvaluator'

export function calculateScore(handResult, selectedCards, activeJoker) {
  const cardValues = selectedCards.map(c => getCardNumericValue(c.value))
  const cardSum = cardValues.reduce((a, b) => a + b, 0)

  let points = handResult.score + cardSum

  if (activeJoker) {
    points = activeJoker.apply(points, selectedCards)
  }

  return points
}
