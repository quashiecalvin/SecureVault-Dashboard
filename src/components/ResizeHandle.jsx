import { useCallback } from 'react'

function ResizeHandle({ onResize }) {

  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()

    // Track position continuously so each delta is relative to the last mouse position
    let lastX = e.clientX

    const handleMouseMove = (e) => {
      const delta = e.clientX - lastX
      lastX = e.clientX
      onResize(delta)
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    // Attach to window so dragging works even if mouse leaves the handle
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [onResize])

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        width: 4,
        height: '100vh',
        cursor: 'col-resize',
        background: 'transparent',
        flexShrink: 0,
        zIndex: 10,
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#2A2F45'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    />
  )
}

export default ResizeHandle