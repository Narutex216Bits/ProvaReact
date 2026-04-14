import React from 'react'

const cardStyle = {
  background: '#13131a',
  border: '1px solid rgba(232, 200, 74, 0.12)',
  borderRadius: '10px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  transition: 'border-color 0.2s, transform 0.15s',
  position: 'relative',
  overflow: 'hidden',
}

const accentLineStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '3px',
  height: '100%',
  background: '#e8c84a',
  borderRadius: '10px 0 0 10px',
}

const accentLineSerieStyle = {
  ...accentLineStyle,
  background: '#ff6b4a',
}

const nameStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: '20px',
  letterSpacing: '1.5px',
  color: '#f0ece0',
  paddingLeft: '8px',
}

const badgeContainerStyle = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  paddingLeft: '8px',
}

const badgeStyle = {
  fontSize: '11px',
  letterSpacing: '1.5px',
  padding: '3px 10px',
  borderRadius: '4px',
  textTransform: 'uppercase',
}

const genreBadgeStyle = {
  ...badgeStyle,
  background: 'rgba(232, 200, 74, 0.1)',
  color: '#e8c84a',
  border: '1px solid rgba(232, 200, 74, 0.25)',
}

const typeBadgeStyle = (tipo) => ({
  ...badgeStyle,
  background: tipo === 'Série' ? 'rgba(255, 107, 74, 0.1)' : 'rgba(100, 180, 255, 0.1)',
  color: tipo === 'Série' ? '#ff6b4a' : '#64b4ff',
  border: `1px solid ${tipo === 'Série' ? 'rgba(255,107,74,0.25)' : 'rgba(100,180,255,0.25)'}`,
})

const metaStyle = {
  display: 'flex',
  gap: '16px',
  paddingLeft: '8px',
  marginTop: '4px',
}

const metaItemStyle = {
  fontSize: '12px',
  color: '#8a8680',
}

const notaStyle = {
  fontSize: '18px',
  fontFamily: 'var(--font-display)',
  color: '#e8c84a',
  letterSpacing: '1px',
}

const btnRemoverStyle = {
  alignSelf: 'flex-end',
  background: 'transparent',
  border: '1px solid rgba(255, 107, 74, 0.3)',
  borderRadius: '4px',
  color: '#ff6b4a',
  fontSize: '11px',
  letterSpacing: '1.5px',
  padding: '4px 12px',
  cursor: 'pointer',
  transition: 'background 0.2s',
}

export default function MovieCard({ filme, onRemove }) {
  return (
    <div
      style={cardStyle}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(232, 200, 74, 0.35)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(232, 200, 74, 0.12)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={filme.tipo === 'Série' ? accentLineSerieStyle : accentLineStyle} />

      <span style={nameStyle}>{filme.nome}</span>

      <div style={badgeContainerStyle}>
        <span style={genreBadgeStyle}>{filme.genero}</span>
        <span style={typeBadgeStyle(filme.tipo)}>{filme.tipo}</span>
      </div>

      <div style={metaStyle}>
        {filme.ano && (
          <span style={metaItemStyle}>Ano: {filme.ano}</span>
        )}
        {filme.nota && (
          <span style={notaStyle}>{parseFloat(filme.nota).toFixed(1)} <span style={{ fontSize: '11px', color: '#8a8680' }}>/ 10</span></span>
        )}
      </div>

      <button
        style={btnRemoverStyle}
        onClick={() => onRemove(filme.id)}
        onMouseEnter={e => e.target.style.background = 'rgba(255,107,74,0.1)'}
        onMouseLeave={e => e.target.style.background = 'transparent'}
      >
        REMOVER
      </button>
    </div>
  )
}
