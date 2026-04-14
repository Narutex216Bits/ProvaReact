import React from 'react'
import MovieCard from './MovieCard.jsx'

const headerStyle = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  marginBottom: '20px',
  borderBottom: '1px solid rgba(232, 200, 74, 0.1)',
  paddingBottom: '12px',
}

const titleStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: '20px',
  letterSpacing: '3px',
  color: '#e8c84a',
}

const countStyle = {
  fontSize: '12px',
  color: '#8a8680',
  letterSpacing: '1px',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '16px',
}

const emptyStyle = {
  textAlign: 'center',
  padding: '60px 20px',
  color: '#8a8680',
}

const emptyIconStyle = {
  fontSize: '48px',
  marginBottom: '16px',
  opacity: 0.3,
}

const emptyTextStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: '18px',
  letterSpacing: '3px',
  color: '#8a8680',
}

export default function MovieList({ filmes, onRemove, filtro }) {
  const listaFiltrada = filmes.filter(f => {
    if (!filtro) return true
    if (filtro === 'Filme' || filtro === 'Série') return f.tipo === filtro
    return f.genero === filtro
  })

  return (
    <div>
      <div style={headerStyle}>
        <span style={titleStyle}>CATÁLOGO</span>
        <span style={countStyle}>{listaFiltrada.length} título{listaFiltrada.length !== 1 ? 's' : ''}</span>
      </div>

      {listaFiltrada.length === 0 ? (
        <div style={emptyStyle}>
          <div style={emptyIconStyle}>▶</div>
          <p style={emptyTextStyle}>NENHUM TÍTULO AQUI</p>
          <p style={{ fontSize: '13px', marginTop: '8px' }}>Adicione seu primeiro filme ou série acima.</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {listaFiltrada.map(filme => (
            <MovieCard key={filme.id} filme={filme} onRemove={onRemove} />
          ))}
        </div>
      )}
    </div>
  )
}
