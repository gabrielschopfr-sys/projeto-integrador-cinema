import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavoritos } from '../context/FavoritosContext'

export default function Navbar() {
  const { usuario, logout } = useAuth()
  const { favoritos } = useFavoritos()
  const navigate = useNavigate()

  function sair() {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <Link className="logo" to="/">🎬 CineInfo</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favoritos">Favoritos ({favoritos.length})</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <div className="user-area">
        {usuario ? (
          <>
            <span>Olá, {usuario.nome}</span>
            <button onClick={sair}>Sair</button>
          </>
        ) : (
          <Link className="btn" to="/login">Entrar</Link>
        )}
      </div>
    </header>
  )
}
