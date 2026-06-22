import { filmes } from '../data'

export async function buscarFilmes() {
  return new Promise(resolve => {
    setTimeout(() => resolve(filmes), 300)
  })
}

export async function buscarFilmePorId(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve(filmes.find(filme => filme.id === id)), 300)
  })
}