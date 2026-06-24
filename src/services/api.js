import { filmes } from '../data'

const API_KEY = '1c3153bf029ab488c66d55a2b708bf37'

function converterCategoriasTMDB(genreIds = []) {
  const mapa = {
    28: 'Ação',
    12: 'Aventura',
    16: 'Animação',
    35: 'Comédia',
    80: 'Crime',
    99: 'Documentário',
    18: 'Drama',
    27: 'Terror',
    10749: 'Romance',
    878: 'Ficção científica',
    53: 'Suspense'
  }

  const categorias = genreIds
    .map(id => mapa[id])
    .filter(Boolean)

  return categorias.length > 0 ? categorias : ['Outros']
}

function converterFilmeTMDB(filme) {
  return {
    id: filme.id.toString(),
    titulo: filme.title || filme.original_title || 'Sem título',
    categoria: converterCategoriasTMDB(filme.genre_ids),
    avaliacao: filme.vote_average
      ? Number((filme.vote_average / 2).toFixed(1))
      : 0,
    ano: filme.release_date?.slice(0, 4) || 'Sem ano',
    duracao: '-',
    imagem: filme.poster_path
      ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
      : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=900&auto=format&fit=crop',
    descricao: filme.overview || 'Descrição não disponível.',
    sessoes: ['14:00', '17:00', '20:00']
  }
}

export async function buscarFilmes() {
  try {
    const resposta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`
    )

   const dados = await resposta.json()


if (!dados.results) {
  return filmes
}

const filmesTMDB = dados.results
  .filter(filme =>
    filme.title &&
    filme.poster_path &&
    filme.overview &&
    /^[A-Za-zÀ-ÿ0-9\s:,.!?'"()-]+$/.test(filme.title)
  )
  .map(converterFilmeTMDB)

    return [...filmes, ...filmesTMDB]
  } catch (erro) {
    console.error('Erro ao buscar TMDB:', erro)
    return filmes
  }
}

export async function buscarFilmePorId(id) {
  const filmeLocal = filmes.find(filme => filme.id === id)

  if (filmeLocal) {
    return filmeLocal
  }

  try {
    const resposta = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    )

    const filme = await resposta.json()

    return converterFilmeTMDB(filme)
  } catch (erro) {
    console.error('Erro ao buscar filme:', erro)
    return null
  }
}
