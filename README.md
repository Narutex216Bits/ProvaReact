# Catálogo de Filmes e Séries — v2 (Firebase)

Aplicação React + Vite com Firebase Authentication + Firestore.

## PASSO 1 — Configure o Firebase

1. Acesse https://console.firebase.google.com
2. Selecione seu projeto → Configurações → Seus Apps → Web
3. Copie o firebaseConfig e cole em src/firebase.js

## PASSO 2 — Habilite Authentication

No Firebase Console:
- Authentication → Sign-in method → Ativar E-mail/senha

## PASSO 3 — Índice no Firestore

Na primeira execução, o console do navegador mostrará um link para criar
o índice composto necessário (uid ASC + criadoEm DESC). Clique e confirme.

## PASSO 4 — Rodar

  npm install
  npm run dev

Acesse: http://localhost:5173

## Estrutura Firestore

Coleção: filmes
Campos: nome, genero, tipo, ano, nota, uid, email, criadoEm

---
Marcio Henrique de Tulio | v2 Firebase — 17/04/2026
