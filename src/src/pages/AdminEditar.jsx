import { useNavigate, useParams } from 'react-router-dom'
import { filmes } from '../data'

export default function AdminEditar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const filme = filmes.find(item => item.id === id)

  if (!filme) return <h1>Item não encontrado</h1>

  function salvar(e) {
    e.preventDefault()
    alert('Alteração salva de forma simulada!')
    navigate('/admin')
  }

  return (
    <section className="auth-card">
      <h1>Editar filme</h1>
      <form onSubmit={salvar}>
        <label>Título</label>
        <input defaultValue={filme.titulo} />
        <label>Categoria</label>
        <input defaultValue={filme.categoria} />
        <label>Descrição</label>
        <textarea defaultValue={filme.descricao} />
        <button className="primary">Salvar</button>
      </form>
    </section>
  )
}
