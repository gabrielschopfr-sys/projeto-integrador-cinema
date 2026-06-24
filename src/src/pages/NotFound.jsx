import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="empty">
      <h1>404 - Página não encontrada</h1>
      <p>O caminho digitado não existe.</p>
      <Link className="btn" to="/">Voltar para Home</Link>
    </section>
  )
}
