# Not Balatro

Version simplificada de Balatro construida con React + Vite.

## Como jugar

1. Elige dificultad en el menu principal y presiona **Iniciar Juego**
2. Selecciona 2 a 5 cartas de tu mano para formar una mano de poker
3. Presiona **Jugar mano** para sumar puntos
4. Alcanza el **objetivo** de puntaje antes de quedarte sin cartas
5. Si lo logras, elige un **Joker** para la siguiente ronda
6. Si no alcanzas el objetivo y se acaban las cartas, pierdes una vida y recibes nueva baraja
7. Sobrevive las 8 rondas para ganar

## Manos de poker

| Mano | Puntos base |
|------|-------------|
| Carta Alta | 5 |
| Par | 15 |
| Doble Par | 25 |
| Trio | 40 |
| Escalera | 50 |
| Color | 60 |
| Full House | 70 |
| Poker | 80 |
| Escalera de Color | 100 |

El puntaje total = puntos de mano + suma de valores de cartas seleccionadas + efecto de joker.

## Jokers disponibles (8)

| Joker | Efecto |
|-------|--------|
| Multiplicador | x2 al puntaje |
| Bonus Fijo | +50 puntos |
| Corazon de Oro | +30 por cada corazon |
| Figuras Reales | +25 por cada J, Q, K |
| Escalera Arcana | +80 si tienes escalera |
| Triple Amenaza | x3 al puntaje |
| Rey de Diamantes | +40 por cada diamante |
| As de la Muerte | +60 por cada As |

## Mecánicas adicionales

- **Descartar** — descarta cartas seleccionadas y toma nuevas del mazo
- **Skip** — descarta la mano completa y toma 8 cartas nuevas
- **Sistema de vidas** — 3 vidas por partida
- **Dificultad** — Facil / Normal / Dificil (afecta objetivo inicial y aumento por ronda)
- **8 rondas** — sobrevivir todas gana el juego

## Tecnologias

- React 19
- Vite 8
- CSS con custom properties
- Sin librerias de UI externas

## Instalar y correr

```bash
npm install
npm run dev
```

## Creditos

Universidad del Valle de Guatemala — Sistemas y Tecnologias Web, Semestre 1 2026
