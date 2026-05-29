import './FloatingScore.css'

function FloatingScore({ points }) {
  return (
    <div className="floating-score">
      +{points}
    </div>
  )
}

export default FloatingScore
