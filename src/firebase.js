// ============================================================
//  ATENÇÃO: Substitua os valores abaixo pelas suas credenciais
//  do Firebase Console → Configurações do Projeto → Seus Apps
// ============================================================

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDyfR8HpiSXOKWG37ii9eoLrMfaVCzuIT8",
  authDomain: "provapratica-marciohenrique.firebaseapp.com",
  projectId: "provapratica-marciohenrique",
  storageBucket: "provapratica-marciohenrique.firebasestorage.app",
  messagingSenderId: "7768300344",
  appId: "1:7768300344:web:43d2cc50564dc6ed7dffcd"
};


const app       = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db   = getFirestore(app)
