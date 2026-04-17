import React, { useState } from 'react'
import { useAuth } from './context/AuthContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import StatusBar from './components/StatusBar.jsx'
import Footer from './components/Footer.jsx'
import MovieForm from './components/MovieForm.jsx'
import MovieList from './components/MovieList.jsx'

const mainStyle = {
  flex: 1,
  maxWidth: '1100px',
  margin: '0 auto',
  width: '100%',
  padding: '36px 24px',
}

const filterBarStyle = {
  display: 'flex',
  gap: '7px',
  flexWrap: 'wrap',
  marginBottom: '28px',
}

const filterBtnStyle = (active) => ({
  background: active ? '#e8c84a' : 'transparent',
  color: active ? '#0a0a0f' : '#8a8680',
  border: `1px solid ${active ? '#e8c84a' : 'rgba(232,200,74,0.2)'}`,
  borderRadius: '5px',
  padding: '5px 13px',
  fontSize: '10px',
  letterSpacing: '1.5px',
  fontFamily: 'Bebas Neue, sans-serif',
  cursor: 'pointer',
  transition: 'all 0.15s',
})

const userBarStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '12px',
  padding: '8px 24px',
  borderBottom: '1px solid rgba(232,200,74,0.08)',
  background: '#0d0d14',
}

const emailStyle = {
  fontSize: '11px',
  color: '#8a8680',
  letterSpacing: '0.5px',
}

const btnLogout = {
  background: 'transparent',
  border: '1px solid rgba(255,107,74,0.35)',
  borderRadius: '4px',
  color: '#ff6b4a',
  fontSize: '10px',
  letterSpacing: '1.5px',
  padding: '4px 12px',
  fontFamily: 'Bebas Neue, sans-serif',
  cursor: 'pointer',
}

const FILTROS = ['Todos','Filme','Série','Ação','Comédia','Drama','Horror','Ficção Científica','Animação']

function AppAutenticado() {
  const { user, logout } = useAuth()
  const [filtro, setFiltro] = useState('')

  return (
    <>
      <StatusBar />
      <div style={userBarStyle}>
        <span style={emailStyle}>{user.email}</span>
        <button
          style={btnLogout}
          onClick={logout}
          onMouseEnter={e => e.target.style.background='rgba(255,107,74,0.1)'}
          onMouseLeave={e => e.target.style.background='transparent'}
        >
          SAIR
        </button>
      </div>
      <main style={mainStyle}>
        <MovieForm />
        <div style={filterBarStyle}>
          {FILTROS.map(f => {
            const val = f === 'Todos' ? '' : f
            return (
              <button
                key={f}
                style={filterBtnStyle(filtro === val)}
                onClick={() => setFiltro(val)}
              >
                {f.toUpperCase()}
              </button>
            )
          })}
        </div>
        <MovieList filtro={filtro} />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        background:'#0a0a0f', fontFamily:'Bebas Neue, sans-serif',
        fontSize:'18px', letterSpacing:'4px', color:'#e8c84a',
      }}>
        CARREGANDO...
      </div>
    )
  }

  if (!user) return <LoginPage />
  return <AppAutenticado />
}
