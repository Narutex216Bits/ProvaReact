import React, { useState } from 'react'

const GENEROS = [
  'Ação', 'Aventura', 'Animação', 'Comédia', 'Drama',
  'Fantasia', 'Ficção Científica', 'Horror', 'Romance',
  'Suspense', 'Terror', 'Thriller', 'Documentário',
]

const TIPOS = ['Filme', 'Série']

const formStyle = {
  background: '#13131a',
  border: '1px solid rgba(232, 200, 74, 0.15)',
  borderRadius: '12px',
  padding: '28px 32px',
  marginBottom: '40px',
}

const formTitleStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: '20px',
  letterSpacing: '3px',
  color: '#e8c84a',
  marginBottom: '20px',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '16px',
  marginBottom: '16px',
}

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
}

const labelStyle = {
  fontSize: '11px',
  letterSpacing: '2px',
  color: '#8a8680',
  textTransform: 'uppercase',
}

const inputStyle = {
  background: '#0a0a0f',
  border: '1px solid rgba(232, 200, 74, 0.2)',
  borderRadius: '6px',
  padding: '10px 14px',
  color: '#f0ece0',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const btnStyle = {
  background: '#e8c84a',
  color: '#0a0a0f',
  border: 'none',
  borderRadius: '6px',
  padding: '11px 28px',
  fontFamily: 'var(--font-display)',
  fontSize: '16px',
  letterSpacing: '2px',
  transition: 'background 0.2s, transform 0.1s',
}

export default function MovieForm({ onAdd }) {
  const [nome, setNome] = useState('')
  const [genero, setGenero] = useState('')
  const [tipo, setTipo] = useState('Filme')
  const [ano, setAno] = useState('')
  const [nota, setNota] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!nome.trim() || !genero) {
      setError('Preencha ao menos o nome e o gênero.')
      return
    }
    onAdd({ id: Date.now(), nome: nome.trim(), genero, tipo, ano, nota })
    setNome('')
    setGenero('')
    setTipo('Filme')
    setAno('')
    setNota('')
    setError('')
  }

  return (
    <div style={formStyle}>
      <p style={formTitleStyle}>+ ADICIONAR</p>
      <form onSubmit={handleSubmit}>
        <div style={gridStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Nome *</label>
            <input
              style={inputStyle}
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex: Dune: Part Two"
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Gênero *</label>
            <select
              style={inputStyle}
              value={genero}
              onChange={e => setGenero(e.target.value)}
            >
              <option value="">Selecione...</option>
              {GENEROS.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Tipo</label>
            <select
              style={inputStyle}
              value={tipo}
              onChange={e => setTipo(e.target.value)}
            >
              {TIPOS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Ano</label>
            <input
              style={inputStyle}
              value={ano}
              onChange={e => setAno(e.target.value)}
              placeholder="Ex: 2024"
              maxLength={4}
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Nota (0-10)</label>
            <input
              style={inputStyle}
              value={nota}
              onChange={e => setNota(e.target.value)}
              placeholder="Ex: 9.2"
              type="number"
              min="0"
              max="10"
              step="0.1"
            />
          </div>
        </div>
        {error && (
          <p style={{ color: '#ff6b4a', fontSize: '13px', marginBottom: '12px' }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          style={btnStyle}
          onMouseEnter={e => e.target.style.background = '#ffd966'}
          onMouseLeave={e => e.target.style.background = '#e8c84a'}
        >
          CADASTRAR
        </button>
      </form>
    </div>
  )
}
