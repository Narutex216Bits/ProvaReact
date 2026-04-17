import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const page = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background: '#0a0a0f',
}

const card = {
  background: '#13131a',
  border: '1px solid rgba(232,200,74,0.2)',
  borderRadius: '14px',
  padding: '40px 36px',
  width: '100%',
  maxWidth: '420px',
}

const logo = {
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: '32px',
  letterSpacing: '6px',
  color: '#e8c84a',
  textAlign: 'center',
  marginBottom: '4px',
}

const sub = {
  textAlign: 'center',
  fontSize: '12px',
  letterSpacing: '2px',
  color: '#8a8680',
  marginBottom: '32px',
  textTransform: 'uppercase',
}

const tabRow = {
  display: 'flex',
  marginBottom: '28px',
  borderBottom: '1px solid rgba(232,200,74,0.15)',
}

const tabStyle = (active) => ({
  flex: 1,
  padding: '10px',
  background: 'transparent',
  border: 'none',
  borderBottom: active ? '2px solid #e8c84a' : '2px solid transparent',
  color: active ? '#e8c84a' : '#8a8680',
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: '15px',
  letterSpacing: '2px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  marginBottom: '-1px',
})

const field = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  marginBottom: '16px',
}

const labelSt = {
  fontSize: '10px',
  letterSpacing: '2px',
  color: '#8a8680',
  textTransform: 'uppercase',
}

const inputSt = {
  background: '#0a0a0f',
  border: '1px solid rgba(232,200,74,0.2)',
  borderRadius: '6px',
  padding: '11px 14px',
  color: '#f0ece0',
  fontSize: '14px',
  fontFamily: 'DM Sans, sans-serif',
  outline: 'none',
}

const btnPrimary = {
  width: '100%',
  background: '#e8c84a',
  color: '#0a0a0f',
  border: 'none',
  borderRadius: '7px',
  padding: '13px',
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: '16px',
  letterSpacing: '3px',
  cursor: 'pointer',
  marginTop: '8px',
  transition: 'background 0.15s',
}

const errorSt = {
  background: 'rgba(255,107,74,0.1)',
  border: '1px solid rgba(255,107,74,0.3)',
  borderRadius: '6px',
  color: '#ff6b4a',
  fontSize: '12px',
  padding: '10px 14px',
  marginBottom: '16px',
}

const successSt = {
  background: 'rgba(100,200,120,0.1)',
  border: '1px solid rgba(100,200,120,0.3)',
  borderRadius: '6px',
  color: '#64c878',
  fontSize: '12px',
  padding: '10px 14px',
  marginBottom: '16px',
}

export default function LoginPage() {
  const { login, cadastrar } = useAuth()
  const [aba, setAba]         = useState('login')
  const [email, setEmail]     = useState('')
  const [senha, setSenha]     = useState('')
  const [erro, setErro]       = useState('')
  const [sucesso, setSucesso] = useState('')
  const [loading, setLoading] = useState(false)

  function limpar() {
    setErro('')
    setSucesso('')
  }

  function traduzirErro(code) {
    const mapa = {
      'auth/email-already-in-use':    'Este e-mail já está cadastrado.',
      'auth/invalid-email':           'E-mail inválido.',
      'auth/weak-password':           'Senha muito fraca (mínimo 6 caracteres).',
      'auth/user-not-found':          'Usuário não encontrado.',
      'auth/wrong-password':          'Senha incorreta.',
      'auth/invalid-credential':      'E-mail ou senha incorretos.',
      'auth/too-many-requests':       'Muitas tentativas. Tente novamente mais tarde.',
    }
    return mapa[code] || 'Ocorreu um erro. Verifique os dados e tente novamente.'
  }

  async function handleSubmit(e) {
    e.preventDefault()
    limpar()
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha e-mail e senha.')
      return
    }
    setLoading(true)
    try {
      if (aba === 'login') {
        await login(email, senha)
      } else {
        await cadastrar(email, senha)
        setSucesso('Conta criada com sucesso! Você já está logado.')
      }
    } catch (err) {
      setErro(traduzirErro(err.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={page}>
      <div style={card}>
        <p style={logo}>CINECAT</p>
        <p style={sub}>Catálogo de Filmes e Séries</p>

        <div style={tabRow}>
          <button style={tabStyle(aba === 'login')}    onClick={() => { setAba('login');    limpar() }}>ENTRAR</button>
          <button style={tabStyle(aba === 'cadastro')} onClick={() => { setAba('cadastro'); limpar() }}>CRIAR CONTA</button>
        </div>

        {erro    && <div style={errorSt}>{erro}</div>}
        {sucesso && <div style={successSt}>{sucesso}</div>}

        <form onSubmit={handleSubmit}>
          <div style={field}>
            <label style={labelSt}>E-mail</label>
            <input
              style={inputSt}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
            />
          </div>
          <div style={field}>
            <label style={labelSt}>Senha</label>
            <input
              style={inputSt}
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder={aba === 'cadastro' ? 'Mínimo 6 caracteres' : '••••••••'}
              autoComplete={aba === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          <button
            type="submit"
            style={{ ...btnPrimary, opacity: loading ? 0.6 : 1 }}
            disabled={loading}
            onMouseEnter={e => { if (!loading) e.target.style.background = '#ffd966' }}
            onMouseLeave={e => e.target.style.background = '#e8c84a'}
          >
            {loading ? 'AGUARDE...' : aba === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}
          </button>
        </form>
      </div>
    </div>
  )
}
