# Not Balatro

A simplified roguelike card game inspired by Balatro, built with React + Vite.

## About

Not Balatro is a poker-based card game where you select cards to form poker hands, earn points, and try to reach the target score before running out of cards. Each round gets harder, but you can collect Jokers to boost your score.

## How to Play

1. Click **Start Game** from the main menu
2. Click **Deal Cards** to receive 8 cards
3. Select 2 to 5 cards to form a poker hand
4. Click **Play Hand** to score points
5. Reach the target score to advance to the next round
6. Choose a **Joker** at the end of each round to boost future scores
7. You have 3 lives — lose one every time you run out of cards without reaching the target
8. Survive as many rounds as possible!

## Poker Hands

| Hand | Points |
|------|--------|
| High Card | 5 |
| Pair | 15 |
| Two Pair | 25 |
| Three of a Kind | 40 |
| Straight | 50 |
| Flush | 60 |
| Full House | 70 |
| Four of a Kind | 80 |
| Straight Flush | 100 |

## Jokers

- Multiplicador — Multiplies total score x2
- Bonus Fijo — Adds 50 points to total score
- Corazon de Oro — Adds 30 points per heart card
- Figuras Reales — Adds 25 points per face card (J, Q, K)
- Triple Amenaza — Multiplies total score x3
- Rey de Diamantes — Adds 40 points per diamond card
- As de la Muerte — Adds 60 points per Ace

## Features

- Full poker hand detection
- 3 lives system
- Joker selection between rounds
- Victory and Game Over screens
- Card deal animations
- Responsive design
- Skip and Discard mechanics
- FNAF-inspired visual theme

## Tech Stack

- React 19
- Vite 8
- CSS custom properties
- No external UI libraries

## Run Locally

npm install
npm run dev

## Authors

Universidad del Valle de Guatemala — Sistemas y Tecnologias Web, Semestre 1 2026
