import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function enviar(e) {
    e.preventDefault()
    login(email, senha)
    navigate('/')
  }

  return (
    <section className="auth-card">
      <h1>🎬 Login</h1>
      <form onSubmit={enviar}>
        <label>E-mail</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required />
        <label>Senha</label>
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Digite sua senha" required />
        <button className="primary" type="submit">Entrar</button>
      </form>
      <p>Use um e-mail com “admin” para liberar o painel administrativo.</p>
      <Link to="/cadastro">Criar conta</Link>
    </section>
  )
}
