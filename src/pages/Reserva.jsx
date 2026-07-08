import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const assentos = [
  'A1','A2','A3','A4','A5','A6','A7','A8',
  'B1','B2','B3','B4','B5','B6','B7','B8',
  'C1','C2','C3','C4','C5','C6','C7','C8',
  'D1','D2','D3','D4','D5','D6','D7','D8'
]

const ocupadosFixos = ['A3', 'B5', 'C2', 'D7']
const precoIngresso = 28

export default function Reserva() {
  const { id } = useParams()
  const [selecionados, setSelecionados] = useState([])

  function alternarAssento(assento) {
    if (ocupadosFixos.includes(assento)) return

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
      total: selecionados.length * precoIngresso,
      data: new Date().toLocaleString()
    }

    localStorage.setItem('reservas', JSON.stringify([...reservas, novaReserva]))

    alert('Reserva confirmada!')
    setSelecionados([])
  }

  return (
    <section className="container reserva-container">
      <h1>Reserva de Assentos</h1>
      <p>Escolha seus lugares para o filme.</p>

      <div className="tela-cinema">TELA</div>

      <div className="mapa-assentos">
        {assentos.map(assento => {
          const ocupado = ocupadosFixos.includes(assento)
          const selecionado = selecionados.includes(assento)

          return (
            <button
              key={assento}
              className={`assento ${ocupado ? 'ocupado' : ''} ${selecionado ? 'selecionado' : ''}`}
              onClick={() => alternarAssento(assento)}
              disabled={ocupado}
            >
              {assento}
            </button>
          )
        })}
      </div>

      <div className="legenda-assentos">
        <span><b className="livre"></b> Livre</span>
        <span><b className="selecionado"></b> Selecionado</span>
        <span><b className="ocupado"></b> Ocupado</span>
      </div>

      <div className="resumo-reserva">
        <p>Assentos: {selecionados.length > 0 ? selecionados.join(', ') : 'nenhum'}</p>
        <p>Total: R$ {selecionados.length * precoIngresso},00</p>

        <button
          className="primary"
          disabled={selecionados.length === 0}
          onClick={confirmarReserva}
        >
          Confirmar reserva
        </button>
      </div>

      <br />

      <Link to="/">Voltar para Home</Link>
    </section>
  )
}
