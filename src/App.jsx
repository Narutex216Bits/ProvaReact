import React, { useState } from 'react'
import StatusBar from './components/StatusBar.jsx'
import Footer from './components/Footer.jsx'
import MovieForm from './components/MovieForm.jsx'
import MovieList from './components/MovieList.jsx'

const mainStyle = {
  flex: 1,
  maxWidth: '1100px',
  margin: '0 auto',
  width: '100%',
  padding: '40px 24px',
}

const filterBarStyle = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginBottom: '32px',
}

const filterBtnStyle = (active) => ({
  background: active ? '#e8c84a' : 'transparent',
  color: active ? '#0a0a0f' : '#8a8680',
  border: `1px solid ${active ? '#e8c84a' : 'rgba(232, 200, 74, 0.2)'}`,
  borderRadius: '5px',
  padding: '5px 14px',
  fontSize: '11px',
  letterSpacing: '1.5px',
  fontFamily: 'var(--font-display)',
  cursor: 'pointer',
  transition: 'all 0.15s',
})

const FILTROS = ['Todos', 'Filme', 'Série', 'Ação', 'Comédia', 'Drama', 'Horror', 'Romance', 'Ficção Científica']

const FILMES_INICIAIS = [
  { id: 1, nome: 'Oppenheimer', genero: 'Drama', tipo: 'Filme', ano: '2023', nota: '9.0' },
  { id: 2, nome: 'Breaking Bad', genero: 'Drama', tipo: 'Série', ano: '2008', nota: '9.5' },
  { id: 3, nome: 'Interstellar', genero: 'Ficção Científica', tipo: 'Filme', ano: '2014', nota: '9.3' },
]

export default function App() {
  const [filmes, setFilmes] = useState(FILMES_INICIAIS)
  const [filtro, setFiltro] = useState('')

  function adicionarFilme(filme) {
    setFilmes(prev => [filme, ...prev])
  }

  function removerFilme(id) {
    setFilmes(prev => prev.filter(f => f.id !== id))
  }

  return (
    <>
      <StatusBar />
      <main style={mainStyle}>
        <MovieForm onAdd={adicionarFilme} />

        <div style={filterBarStyle}>
          {FILTROS.map(f => (
            <button
              key={f}
              style={filterBtnStyle(filtro === (f === 'Todos' ? '' : f))}
              onClick={() => setFiltro(f === 'Todos' ? '' : f)}
              onMouseEnter={e => {
                if (filtro !== (f === 'Todos' ? '' : f))
                  e.target.style.borderColor = 'rgba(232, 200, 74, 0.5)'
              }}
              onMouseLeave={e => {
                if (filtro !== (f === 'Todos' ? '' : f))
                  e.target.style.borderColor = 'rgba(232, 200, 74, 0.2)'
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <MovieList filmes={filmes} onRemove={removerFilme} filtro={filtro} />
      </main>
      <Footer />
    </>
  )
}
