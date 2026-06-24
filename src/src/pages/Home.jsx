import { useCallback, useEffect, useMemo, useState } from 'react'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'
import { buscarFilmes } from '../services/api'

export default function Home() {
  const [filmes, setFilmes] = useState([])
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('')
  const [pagina, setPagina] = useState(1)
  const [carregando, setCarregando] = useState(true)
  const porPagina = 3

  useEffect(() => {
    document.title = 'CineInfo - Home'
    buscarFilmes().then(dados => {
      setFilmes(dados)
      setCarregando(false)
    })
  }, [])

  const filtrar = useCallback((filme) => {
    const categorias = Array.isArray(filme.categoria)
  ? filme.categoria
  : [filme.categoria]

const texto = `${filme.titulo} ${categorias.join(' ')} ${filme.descricao}`.toLowerCase()

const combinaBusca = texto.includes(busca.toLowerCase())

const combinaCategoria = categoria
  ? categorias.includes(categoria)
  : true

return combinaBusca && combinaCategoria
  }, [busca, categoria])

  const filtrados = useMemo(() => filmes.filter(filtrar), [filmes, filtrar])
  const totalPaginas = Math.ceil(filtrados.length / porPagina) || 1
  const inicio = (pagina - 1) * porPagina
  const filmesPagina = filtrados.slice(inicio, inicio + porPagina)

  useEffect(() => setPagina(1), [busca, categoria])

  if (carregando) return <LoadingSpinner />

  return (
    <>
      <section className="hero">
        <h1>Encontre seu próximo filme</h1>
        <p>Consulte filmes, sessões, avaliações e salve seus favoritos.</p>
      </section>

      <SearchBar busca={busca} setBusca={setBusca} categoria={categoria} setCategoria={setCategoria} />

      {filmesPagina.length === 0 ? (
        <EmptyState mensagem="Nenhum filme encontrado." />
      ) : (
        <section className="grid">
          {filmesPagina.map(filme => <Card key={filme.id} filme={filme} />)}
        </section>
      )}

      <div className="pagination">
        <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>Anterior</button>
        <span>Página {pagina} de {totalPaginas}</span>
        <button disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)}>Próxima</button>
      </div>
    </>
  )
}
