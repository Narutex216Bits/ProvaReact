import React from 'react'

const footerStyle = {
  marginTop: 'auto',
  borderTop: '1px solid rgba(232, 200, 74, 0.15)',
  padding: '20px 32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#0d0d14',
  flexWrap: 'wrap',
  gap: '8px',
}

const nameStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: '16px',
  letterSpacing: '2px',
  color: '#e8c84a',
}

const dateStyle = {
  fontSize: '13px',
  color: 'var(--text-muted)',
  letterSpacing: '1px',
}

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <span style={nameStyle}>MARCIO HENRIQUE DE TULIO</span>
      <span style={dateStyle}>14/04/2026</span>
    </footer>
  )
}
