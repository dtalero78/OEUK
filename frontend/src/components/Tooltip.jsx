import { useState } from 'react'

function Tooltip({ text }) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleTooltip = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsVisible(!isVisible)
  }

  const hideTooltip = () => {
    setIsVisible(false)
  }

  return (
    <span className="tooltip-wrapper">
      <button
        type="button"
        className="tooltip-trigger"
        onClick={toggleTooltip}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={hideTooltip}
        aria-label="More information"
      >
        ?
      </button>
      {isVisible && (
        <>
          <div className="tooltip-overlay" onClick={hideTooltip} />
          <div className="tooltip-content">
            {text}
            <button className="tooltip-close" onClick={hideTooltip}>×</button>
          </div>
        </>
      )}
    </span>
  )
}

export default Tooltip
