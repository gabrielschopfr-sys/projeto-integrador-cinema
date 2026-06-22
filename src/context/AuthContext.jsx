import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem('cineinfo_usuario')
    return salvo ? JSON.parse(salvo) : null
  })

  function login(email, senha) {
    const novoUsuario = {
      nome: email.split('@')[0] || 'Usuário',
      email,
      perfil: email.includes('admin') ? 'admin' : 'usuario'
    }
    localStorage.setItem('cineinfo_usuario', JSON.stringify(novoUsuario))
    setUsuario(novoUsuario)
  }

  function logout() {
    localStorage.removeItem('cineinfo_usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
