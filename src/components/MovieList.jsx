import React, { useEffect, useState } from 'react'
import {
  collection, query, orderBy, onSnapshot, deleteDoc, doc, where
} from 'firebase/firestore'
import { db } from '../firebase.js'
import { useAuth } from '../context/AuthContext.jsx'
import MovieCard from './MovieCard.jsx'

const headerStyle = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  marginBottom: '20px',
  borderBottom: '1px solid rgba(232,200,74,0.1)',
  paddingBottom: '12px',
}
const titleStyle = {
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: '18px',
  letterSpacing: '3px',
  color: '#e8c84a',
}
const countStyle  = { fontSize: '11px', color: '#8a8680' }
const gridStyle   = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '14px',
}
const emptyStyle  = { textAlign: 'center', padding: '50px 20px', color: '#8a8680' }
const emptyIcon   = {
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: '16px',
  letterSpacing: '3px',
  marginTop: '10px',
}
const loadingStyle = { textAlign: 'center', padding: '40px', color: '#8a8680', fontSize: '13px', letterSpacing: '2px' }

export default function MovieList({ filtro }) {
  const { user } = useAuth()
  const [filmes,   setFilmes]   = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    // Escuta em tempo real a coleção filmes do usuário logado
    const q = query(
      collection(db, 'filmes'),
      where('uid', '==', user.uid),
      orderBy('criadoEm', 'desc')
    )
    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      setFilmes(lista)
      setLoading(false)
    }, (err) => {
      console.error('Firestore erro:', err)
      setLoading(false)
    })
    return () => unsub()
  }, [user.uid])

  async function removerFilme(id) {
    try {
      await deleteDoc(doc(db, 'filmes', id))
    } catch (err) {
      alert('Erro ao remover: ' + err.message)
    }
  }

  const listaFiltrada = filmes.filter(f => {
    if (!filtro) return true
    if (filtro === 'Filme' || filtro === 'Série') return f.tipo === filtro
    return f.genero === filtro
  })

  return (
    <div>
      <div style={headerStyle}>
        <span style={titleStyle}>MEU CATÁLOGO</span>
        <span style={countStyle}>
          {loading ? '...' : `${listaFiltrada.length} título${listaFiltrada.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {loading ? (
        <p style={loadingStyle}>CARREGANDO FIRESTORE...</p>
      ) : listaFiltrada.length === 0 ? (
        <div style={emptyStyle}>
          <p style={{ fontSize: '32px', opacity: 0.2 }}>▶</p>
          <p style={emptyIcon}>NENHUM TÍTULO ENCONTRADO</p>
          <p style={{ fontSize: '12px', marginTop: '6px' }}>
            {filtro ? 'Tente outro filtro ou adicione novos títulos.' : 'Adicione seu primeiro filme ou série acima.'}
          </p>
        </div>
      ) : (
        <div style={gridStyle}>
          {listaFiltrada.map(filme => (
            <MovieCard key={filme.id} filme={filme} onRemove={removerFilme} />
          ))}
        </div>
      )}
    </div>
  )
}
