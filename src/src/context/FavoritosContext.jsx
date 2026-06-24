import { createContext, useCallback, useContext, useState } from 'react'
import { filmes } from '../data'

const FavoritosContext = createContext()

export function FavoritosProvider({ children }) {
  const [favoritosIds, setFavoritosIds] = useState(() => {
    const salvo = localStorage.getItem('cineinfo_favoritos')
    return salvo ? JSON.parse(salvo) : []
  })

  const salvar = useCallback((ids) => {
    setFavoritosIds(ids)
    localStorage.setItem('cineinfo_favoritos', JSON.stringify(ids))
  }, [])

  const alternarFavorito = useCallback((id) => {
    const existe = favoritosIds.includes(id)
    const novos = existe ? favoritosIds.filter(item => item !== id) : [...favoritosIds, id]
    salvar(novos)
  }, [favoritosIds, salvar])

  function estaFavorito(id) {
    return favoritosIds.includes(id)
  }

  const favoritos = filmes.filter(filme => favoritosIds.includes(filme.id))

  return (
    <FavoritosContext.Provider value={{ favoritos, favoritosIds, alternarFavorito, estaFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritos() {
  return useContext(FavoritosContext)
}
