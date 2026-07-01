import { Link, useNavigate } from 'react-router-dom'
import { useFavoritos } from '../context/FavoritosContext'

export default function Card({ filme }) {
  const navigate = useNavigate()
  const { alternarFavorito, estaFavorito } = useFavoritos()
  const favorito = estaFavorito(filme.id)

  return (
    <article className="card">
<Link to={`/filme/${filme.id}`}>
  <img
    src={filme.imagem}
    alt={`Cartaz do filme ${filme.titulo}`}
    loading="lazy"
    style={{ cursor: 'pointer' }}
  />
</Link>
      <div className="card-body">
        <button className="heart" onClick={() => alternarFavorito(filme.id)} aria-label="Favoritar filme">
          {favorito ? '❤️' : '🤍'}
        </button>
        <h3>{filme.titulo}</h3>
        <p>{filme.descricao.substring(0, 95)}...</p>
<p>
⭐ {filme.avaliacao} • {
  Array.isArray(filme.categoria)
    ? filme.categoria.join(' • ')
    : filme.categoria
}
</p>        <button onClick={() => navigate(`/filme/${filme.id}`)}>Ver detalhes</button>
      </div>
    </article>
  )
}
