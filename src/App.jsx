.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-panel);
}

.navbar h1 {
  font-size: 28px;
  letter-spacing: 4px;
}

.navbar span {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 1px;
}

.gameboard {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.score-panel {
  display: flex;
  gap: 16px;
}

.score-box {
  flex: 1;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  padding: 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.score-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.score-number {
  font-family: var(--font-title);
  font-size: 32px;
  color: var(--accent-yellow);
}

.score-hand {
  font-size: 16px;
  color: var(--text-muted);
}

.hand-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hand-label {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 1px;
}

.hand {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 120px;
  align-items: flex-end;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
