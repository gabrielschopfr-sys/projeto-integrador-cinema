export default function SearchBar({ busca, setBusca, categoria, setCategoria }) {
  return (
    <section className="filters">
      <input
        type="search"
        placeholder="Buscar filme, categoria ou palavra-chave..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />
      <select value={categoria} onChange={e => setCategoria(e.target.value)}>
        <option value="">Todas as categorias</option>
        <option value="Drama">Drama</option>
        <option value="Comédia">Comédia</option>
        <option value="Ficção científica">Ficção científica</option>
        <option value="Animação">Animação</option>
        <option value="Ação">Ação</option>
        <option value="Terror">Terror</option>
        <option value="Nacional">Nacional</option>
        <option value="LGBTQIA+">LGBTQIA+</option>
      </select>
    </section>
  )
}
