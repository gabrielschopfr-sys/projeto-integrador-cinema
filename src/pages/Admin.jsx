import { useState, useEffect } from 'react'
import { filmes } from '../data'

const categoriasPadrao = [
  'Drama',
  'Comédia',
  'Ação',
  'Aventura',
  'Animação',
  'Terror',
  'Suspense',
  'Romance',
  'Ficção científica',
  'LGBTQIA+',
  'Nacional'
]

const filmeInicial = {
  id: '',
  titulo: '',
  categoria: [],
  avaliacao: 0,
  ano: new Date().getFullYear(),
  duracao: '',
  imagem: '',
  descricao: '',
  sessoes: ['14:00', '17:00', '20:00']
}

export default function Admin() {
  const [itens, setItens] = useState(() => {
    const salvo = localStorage.getItem('filmes')
    return salvo ? JSON.parse(salvo) : filmes
  })

  const [form, setForm] = useState(filmeInicial)
  const [editando, setEditando] = useState(false)
  const [novaCategoria, setNovaCategoria] = useState('')
  const [categorias, setCategorias] = useState(() => {
    const salvas = localStorage.getItem('categorias')
    return salvas ? JSON.parse(salvas) : categoriasPadrao
  })

  useEffect(() => {
    localStorage.setItem('filmes', JSON.stringify(itens))
  }, [itens])

  useEffect(() => {
    localStorage.setItem('categorias', JSON.stringify(categorias))
  }, [categorias])

  const totalFilmes = itens.length
  const totalCategorias = categorias.length
  const filmesNacionais = itens.filter(item =>
    Array.isArray(item.categoria)
      ? item.categoria.includes('Nacional')
      : item.categoria === 'Nacional'
  ).length
  const filmesLgbt = itens.filter(item =>
    Array.isArray(item.categoria)
      ? item.categoria.includes('LGBTQIA+')
      : item.categoria === 'LGBTQIA+'
  ).length
  const mediaAvaliacoes = totalFilmes
    ? (itens.reduce((soma, item) => soma + Number(item.avaliacao || 0), 0) / totalFilmes).toFixed(1)
    : '0.0'
  const totalReservas = JSON.parse(localStorage.getItem('reservas'))?.length || 0

  function atualizarCampo(campo, valor) {
    setForm({ ...form, [campo]: valor })
  }

  function alternarCategoria(cat) {
    const jaTem = form.categoria.includes(cat)

    setForm({
      ...form,
      categoria: jaTem
        ? form.categoria.filter(c => c !== cat)
        : [...form.categoria, cat]
    })
  }

  function adicionarCategoria() {
    const nome = novaCategoria.trim()
    if (!nome) return

    if (!categorias.includes(nome)) {
      setCategorias([...categorias, nome])
    }

    if (!form.categoria.includes(nome)) {
      setForm({ ...form, categoria: [...form.categoria, nome] })
    }

    setNovaCategoria('')
  }

  function salvar(e) {
    e.preventDefault()

    if (!form.titulo.trim()) {
      alert('Informe o título do filme.')
      return
    }

    const filmeSalvo = {
      ...form,
      id: editando ? form.id : String(Date.now()),
      categoria: form.categoria.length ? form.categoria : ['Outros'],
      avaliacao: Number(form.avaliacao),
      ano: Number(form.ano),
      imagem: form.imagem || 'https://placehold.co/400x600?text=CineInfo',
      descricao: form.descricao || 'Descrição não informada.',
      duracao: form.duracao || '2h',
      sessoes: Array.isArray(form.sessoes)
        ? form.sessoes
        : String(form.sessoes).split(',').map(s => s.trim())
    }

    if (editando) {
      setItens(itens.map(item => item.id === form.id ? filmeSalvo : item))
    } else {
      setItens([...itens, filmeSalvo])
    }

    setForm(filmeInicial)
    setEditando(false)
  }

  function editar(item) {
    setForm({
      ...item,
      categoria: Array.isArray(item.categoria) ? item.categoria : [item.categoria],
      sessoes: Array.isArray(item.sessoes) ? item.sessoes : ['14:00', '17:00', '20:00']
    })

    setEditando(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function excluir(id) {
    if (window.confirm('Deseja excluir este filme?')) {
      setItens(itens.filter(item => item.id !== id))
    }
  }

  function restaurarCatalogo() {
    if (window.confirm('Deseja restaurar o catálogo original?')) {
      localStorage.removeItem('filmes')
      localStorage.removeItem('categorias')
      window.location.reload()
    }
  }

  return (
    <section className="admin-layout">
      <aside className="sidebar">
        <strong>AdminPro</strong>
        <a href="#dashboard">Dashboard</a>
        <a href="#formulario">Cadastrar filme</a>
        <a href="#itens">Gerenciar filmes</a>
      </aside>

      <div className="admin-content">
        <h1>Painel Administrativo</h1>

        <div id="dashboard">
          <h2>Dashboard</h2>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>{totalFilmes}</h3>
              <p>🎬 Filmes cadastrados</p>
            </div>

            <div className="dashboard-card">
              <h3>{totalCategorias}</h3>
              <p>🏷 Categorias</p>
            </div>

            <div className="dashboard-card">
              <h3>{filmesNacionais}</h3>
              <p>🇧🇷 Filmes nacionais</p>
            </div>

            <div className="dashboard-card">
              <h3>{filmesLgbt}</h3>
              <p>🏳️‍🌈 Filmes LGBTQIA+</p>
            </div>

            <div className="dashboard-card">
              <h3>{mediaAvaliacoes}</h3>
              <p>⭐ Média das avaliações</p>
            </div>

            <div className="dashboard-card">
              <h3>{totalReservas}</h3>
              <p>🎟 Reservas</p>
            </div>
          </div>
        </div>

        <h2 id="formulario">Cadastrar filme</h2>

        <form className="admin-form" onSubmit={salvar}>
          <input
            value={form.titulo}
            onChange={e => atualizarCampo('titulo', e.target.value)}
            placeholder="Título do filme"
          />

          <textarea
            value={form.descricao}
            onChange={e => atualizarCampo('descricao', e.target.value)}
            placeholder="Descrição do filme"
          />

          <input
            value={form.imagem}
            onChange={e => atualizarCampo('imagem', e.target.value)}
            placeholder="URL da imagem"
          />

          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.avaliacao}
            placeholder="Avaliação (0 a 5)"
            onChange={e => atualizarCampo('avaliacao', e.target.value)}
          />

          <input
            type="number"
            value={form.ano}
            onChange={e => atualizarCampo('ano', e.target.value)}
            placeholder="Ano"
          />

          <input
            value={form.duracao}
            onChange={e => atualizarCampo('duracao', e.target.value)}
            placeholder="Duração"
          />

          <input
            value={Array.isArray(form.sessoes) ? form.sessoes.join(', ') : form.sessoes}
            onChange={e => atualizarCampo('sessoes', e.target.value)}
            placeholder="Sessões separadas por vírgula"
          />

          <h3>Categorias</h3>

          <div className="categorias-admin">
            {categorias.map(cat => (
              <label key={cat}>
                <input
                  type="checkbox"
                  checked={form.categoria.includes(cat)}
                  onChange={() => alternarCategoria(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          <div className="nova-categoria">
            <input
              value={novaCategoria}
              onChange={e => setNovaCategoria(e.target.value)}
              placeholder="Criar nova categoria"
            />

            <button type="button" onClick={adicionarCategoria}>
              + Categoria
            </button>
          </div>

          <button className="primary">
            {editando ? 'Salvar alterações' : 'Adicionar filme'}
          </button>

          {editando && (
            <button
              type="button"
              onClick={() => {
                setForm(filmeInicial)
                setEditando(false)
              }}
            >
              Cancelar edição
            </button>
          )}

          <button type="button" onClick={restaurarCatalogo}>
            🔄 Restaurar catálogo original
          </button>
        </form>

        <h2 id="itens">Gerenciar filmes</h2>

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
                  <button onClick={() => editar(item)}>Editar</button>
                  <button onClick={() => excluir(item.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
