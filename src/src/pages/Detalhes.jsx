import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { buscarFilmePorId } from '../services/api'
import { filmes } from '../data'
import { useFavoritos } from '../context/FavoritosContext'
import LoadingSpinner from '../components/LoadingSpinner'
import Card from '../components/Card'

export default function Detalhes() {
  const { id } = useParams()
  const [filme, setFilme] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const { alternarFavorito, estaFavorito } = useFavoritos()

  useEffect(() => {
    setCarregando(true)
    buscarFilmePorId(id).then(dados => {
      setFilme(dados)
      setCarregando(false)
      document.title = dados ? `CineInfo - ${dados.titulo}` : 'Filme não encontrado'
    })
  }, [id])

  if (carregando) return <LoadingSpinner />
  if (!filme) return <h1>Filme não encontrado</h1>

  const relacionados = filmes.filter(item => item.categoria === filme.categoria && item.id !== filme.id).slice(0, 3)

  return (
    <section>
      <p className="breadcrumb"><Link to="/">Home</Link> › {filme.categoria} › {filme.titulo}</p>

      <div className="details">
        <div>
          <img className="details-img" src={filme.imagem} alt={`Imagem do filme ${filme.titulo}`} />
          <div className="actions">
            <button onClick={() => alternarFavorito(filme.id)}>{estaFavorito(filme.id) ? 'Remover favorito' : 'Favoritar'}</button>
            <button onClick={() => navigator.share ? navigator.share({ title: filme.titulo }) : alert('Compartilhamento simulado')}>Compartilhar</button>
          </div>
        </div>
        <div>
          <span className="badge">{filme.categoria}</span>
          <h1>{filme.titulo}</h1>
          <p>⭐ {filme.avaliacao} • {filme.ano} • {filme.duracao}</p>
          <p>{filme.descricao}</p>
          <h3>Sessões disponíveis</h3>
          <p>{filme.sessoes.join(' • ')}</p>
          <button className="primary">Reservar ingresso</button>
        </div>
      </div>

      <h2>Itens relacionados</h2>
      <section className="grid small">
        {relacionados.map(item => <Card key={item.id} filme={item} />)}
      </section>
    </section>
  )
}
