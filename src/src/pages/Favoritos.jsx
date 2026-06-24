import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import { useFavoritos } from '../context/FavoritosContext'

export default function Favoritos() {
  const { favoritos } = useFavoritos()

  return (
    <section>
      <h1>Meus favoritos</h1>
      {favoritos.length === 0 ? (
        <EmptyState mensagem="Nenhum favorito ainda." />
      ) : (
        <div className="grid two">
          {favoritos.map(filme => <Card key={filme.id} filme={filme} />)}
        </div>
      )}
    </section>
  )
}
