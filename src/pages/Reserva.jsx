import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const assentos = [
  'A1','A2','A3','A4','A5','A6',
  'B1','B2','B3','B4','B5','B6',
  'C1','C2','C3','C4','C5','C6',
  'D1','D2','D3','D4','D5','D6'
]

export default function Reserva() {
  const { id } = useParams()
  const [selecionados, setSelecionados] = useState([])

  function alternarAssento(assento) {
    setSelecionados(prev =>
      prev.includes(assento)
        ? prev.filter(a => a !== assento)
        : [...prev, assento]
    )
  }

  function confirmarReserva() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || []

    const novaReserva = {
      id: Date.now(),
      filmeId: id,
      assentos: selecionados,
      data: new Date().toLocaleString()
    }

    localStorage.setItem('reservas', JSON.stringify([...reservas, novaReserva]))

    alert('Reserva confirmada!')
    setSelecionados([])
  }

  return (
    <section className="container">
      <h1>Reserva de Assentos</h1>

      <p>Filme ID: {id}</p>

      <div className="tela-cinema">TELA</div>

      <div className="mapa-assentos">
        {assentos.map(assento => (
          <button
            key={assento}
            className={selecionados.includes(assento) ? 'assento selecionado' : 'assento'}
            onClick={() => alternarAssento(assento)}
          >
            {assento}
          </button>
        ))}
      </div>

      <p>
        Assentos selecionados: {selecionados.length > 0 ? selecionados.join(', ') : 'nenhum'}
      </p>

      <button
        className="primary"
        disabled={selecionados.length === 0}
        onClick={confirmarReserva}
      >
        Confirmar reserva
      </button>

      <br /><br />

      <Link to="/">Voltar para Home</Link>
    </section>
  )
}