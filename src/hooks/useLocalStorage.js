import { useState } from 'react'

export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const salvo = localStorage.getItem(chave)
    return salvo ? JSON.parse(salvo) : valorInicial
  })

  function atualizar(novoValor) {
    setValor(novoValor)
    localStorage.setItem(chave, JSON.stringify(novoValor))
  }

  return [valor, atualizar]
}
