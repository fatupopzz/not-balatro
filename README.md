# Not Balatro

A simplified roguelike card game inspired by Balatro, built with React + Vite.

## How to Play

1. Choose a difficulty level in the main menu and press **Start Game**
2. Select 2 to 5 cards from your hand to form a poker hand
3. Press **Play Hand** to score points
4. Reach the **target score** before running out of cards
5. If you succeed, choose a **Joker** for the next round
6. If you run out of cards without reaching the target, you lose a life and get a new deck
7. Survive all 8 rounds to win

## Poker Hands

| Hand | Base Points |
|------|-------------|
| High Card | 5 |
| Pair | 15 |
| Two Pair | 25 |
| Three of a Kind | 40 |
| Straight | 50 |
| Flush | 60 |
| Full House | 70 |
| Four of a Kind | 80 |
| Straight Flush | 100 |

Total score = hand points + sum of selected card values + active joker effect.

## Jokers (8 available)

| Joker | Effect |
|-------|--------|
| Multiplier | x2 total score |
| Fixed Bonus | +50 points |
| Golden Heart | +30 per heart card |
| Royal Figures | +25 per face card (J, Q, K) |
| Arcane Straight | +80 if hand contains a straight |
| Triple Threat | x3 total score |
| King of Diamonds | +40 per diamond card |
| Ace of Death | +60 per Ace |

## Additional Features

- **Discard** — discard selected cards and draw new ones from the deck
- **Skip** — discard the full hand and draw 8 new cards
- **Lives system** — 3 lives per game
- **Difficulty levels** — Easy / Normal / Hard (affects starting target and round increase)
- **8 rounds** — survive them all to win
- **Joker selection** — choose a power-up between rounds
- **Round fail screen** — clear feedback when a round is lost
- **Victory screen** — shown when the target score is reached
- **Responsive design** — works on desktop and mobile

## Tech Stack

- React 19
- Vite 8
- CSS custom properties
- No external UI libraries
- Card assets: svg-cards by htdebeer (LGPL)

## Getting Started

```bash
npm install
npm run dev
```

## VIdeo on YouTube 
https://youtu.be/L4M2TQrnk9c

## Credits

Universidad del Valle de Guatemala — Web Systems and Technologies, Semester 1 2026
