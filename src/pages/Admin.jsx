import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { filmes } from '../data'

export default function Admin() {
  const [itens, setItens] = useState(() => {
    const salvo = localStorage.getItem('filmes')
    return salvo ? JSON.parse(salvo) : filmes
  })

  const [titulo, setTitulo] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('filmes', JSON.stringify(itens))
  }, [itens])

  function adicionar(e) {
    e.preventDefault()
    if (!titulo.trim()) return

    setItens([
      ...itens,
      {
        id: String(Date.now()),
        titulo,
        categoria: ['Novo'],
        avaliacao: 0,
        ano: new Date().getFullYear(),
        duracao: '2h',
        imagem: 'https://placehold.co/400x600?text=CineInfo',
        descricao: 'Novo filme cadastrado pelo painel administrativo.',
        sessoes: ['14:00', '17:00', '20:00']
      }
    ])

    setTitulo('')
  }

  function excluir(id) {
    setItens(itens.filter(item => item.id !== id))
  }

  function restaurarCatalogo() {
    if (window.confirm('Deseja restaurar o catálogo original?')) {
      localStorage.removeItem('filmes')
      window.location.reload()
    }
  }

  return (
    <section className="admin-layout">
      <aside className="sidebar">
        <strong>AdminPro</strong>
        <Link to="/">Dashboard</Link>
        <Link to="/admin">Itens</Link>
      </aside>

      <div className="admin-content">
        <h1>Painel Administrativo</h1>
        <form className="admin-form" onSubmit={adicionar}>
          <input
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            placeholder="Título do novo filme"
          />

          <button className="primary">Adicionar</button>

          <button type="button" onClick={restaurarCatalogo}>
            🔄 Restaurar catálogo original
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {itens.map(item => (
              <tr key={item.id}>
                <td>{item.titulo}</td>
                <td>
                  {Array.isArray(item.categoria)
                    ? item.categoria.join(' • ')
                    : item.categoria}
                </td>
                <td><span className="badge">Ativo</span></td>
                <td>
                  <button onClick={() => navigate(`/admin/editar/${item.id}`)}>
                    Editar
                  </button>
                  <button onClick={() => excluir(item.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
