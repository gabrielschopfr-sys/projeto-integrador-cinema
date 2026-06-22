import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Cadastro() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function cadastrar(e) {
    e.preventDefault()
    login(email, senha)
    navigate('/')
  }

  return (
    <section className="auth-card">
      <h1>Criar conta</h1>
      <form onSubmit={cadastrar}>
        <label>E-mail</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Senha</label>
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button className="primary" type="submit">Cadastrar</button>
      </form>
    </section>
  )
}
