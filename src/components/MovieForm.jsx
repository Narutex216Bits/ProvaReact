import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.js'
import { useAuth } from '../context/AuthContext.jsx'

const GENEROS = [
  'Ação', 'Aventura', 'Animação', 'Comédia', 'Drama',
  'Fantasia', 'Ficção Científica', 'Horror', 'Romance',
  'Suspense', 'Terror', 'Thriller', 'Documentário',
]

const formStyle = {
  background: '#13131a',
  border: '1px solid rgba(232,200,74,0.15)',
  borderRadius: '12px',
  padding: '28px 32px',
  marginBottom: '32px',
}
const formTitleStyle = {
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: '18px',
  letterSpacing: '3px',
  color: '#e8c84a',
  marginBottom: '18px',
}
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '14px',
  marginBottom: '14px',
}
const fieldStyle = { display: 'flex', flexDirection: 'column', gap: '5px' }
const labelStyle = { fontSize: '10px', letterSpacing: '2px', color: '#8a8680', textTransform: 'uppercase' }
const inputStyle = {
  background: '#0a0a0f',
  border: '1px solid rgba(232,200,74,0.2)',
  borderRadius: '6px',
  padding: '9px 13px',
  color: '#f0ece0',
  fontSize: '13px',
  fontFamily: 'DM Sans, sans-serif',
  outline: 'none',
}
const btnRow = { display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }
const btnStyle = (disabled) => ({
  background: disabled ? '#555' : '#e8c84a',
  color: '#0a0a0f',
  border: 'none',
  borderRadius: '6px',
  padding: '10px 26px',
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: '15px',
  letterSpacing: '2px',
  cursor: disabled ? 'not-allowed' : 'pointer',
})
const errorSt   = { color: '#ff6b4a', fontSize: '12px' }
const successSt = { color: '#64c878', fontSize: '12px' }

export default function MovieForm() {
  const { user } = useAuth()
  const [nome,   setNome]   = useState('')
  const [genero, setGenero] = useState('')
  const [tipo,   setTipo]   = useState('Filme')
  const [ano,    setAno]    = useState('')
  const [nota,   setNota]   = useState('')
  const [msg,    setMsg]    = useState({ tipo: '', texto: '' })
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!nome.trim() || !genero) {
      setMsg({ tipo: 'erro', texto: 'Preencha ao menos o nome e o gênero.' })
      return
    }
    setSaving(true)
    setMsg({ tipo: '', texto: '' })
    try {
      await addDoc(collection(db, 'filmes'), {
        nome:      nome.trim(),
        genero,
        tipo,
        ano:       ano || null,
        nota:      nota ? parseFloat(nota) : null,
        uid:       user.uid,
        email:     user.email,
        criadoEm: serverTimestamp(),
      })
      setMsg({ tipo: 'ok', texto: '✔ Salvo no Firestore!' })
      setNome(''); setGenero(''); setTipo('Filme'); setAno(''); setNota('')
    } catch (err) {
      setMsg({ tipo: 'erro', texto: 'Erro ao salvar: ' + err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={formStyle}>
      <p style={formTitleStyle}>+ ADICIONAR TÍTULO</p>
      <form onSubmit={handleSubmit}>
        <div style={gridStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Nome *</label>
            <input style={inputStyle} value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Oppenheimer" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Gênero *</label>
            <select style={inputStyle} value={genero} onChange={e => setGenero(e.target.value)}>
              <option value="">Selecione...</option>
              {GENEROS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Tipo</label>
            <select style={inputStyle} value={tipo} onChange={e => setTipo(e.target.value)}>
              <option>Filme</option>
              <option>Série</option>
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Ano</label>
            <input style={inputStyle} value={ano} onChange={e => setAno(e.target.value)} placeholder="2024" maxLength={4} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Nota (0–10)</label>
            <input style={inputStyle} value={nota} onChange={e => setNota(e.target.value)} type="number" min="0" max="10" step="0.1" placeholder="9.2" />
          </div>
        </div>
        <div style={btnRow}>
          <button
            type="submit"
            style={btnStyle(saving)}
            disabled={saving}
            onMouseEnter={e => { if (!saving) e.target.style.background = '#ffd966' }}
            onMouseLeave={e => { if (!saving) e.target.style.background = saving ? '#555' : '#e8c84a' }}
          >
            {saving ? 'SALVANDO...' : 'CADASTRAR'}
          </button>
          {msg.texto && <span style={msg.tipo === 'erro' ? errorSt : successSt}>{msg.texto}</span>}
        </div>
      </form>
    </div>
  )
}
