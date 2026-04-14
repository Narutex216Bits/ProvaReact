import React from 'react'

const statusBarStyle = {
  background: 'linear-gradient(90deg, #0a0a0f 0%, #1c1c26 40%, #0a0a0f 100%)',
  borderBottom: '1px solid rgba(232, 200, 74, 0.3)',
  padding: '12px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  backdropFilter: 'blur(8px)',
}

const dotStyle = {
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: '#e8c84a',
  display: 'inline-block',
  animation: 'pulse 2s infinite',
}

const titleStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: '22px',
  letterSpacing: '4px',
  color: '#e8c84a',
}

const styleTag = `
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}
`

export default function StatusBar() {
  return (
    <>
      <style>{styleTag}</style>
      <header style={statusBarStyle}>
        <span style={dotStyle} />
        <span style={titleStyle}>CATÁLOGO DE FILMES OU SÉRIES</span>
        <span style={{ ...dotStyle, animationDelay: '1s' }} />
      </header>
    </>
  )
}
