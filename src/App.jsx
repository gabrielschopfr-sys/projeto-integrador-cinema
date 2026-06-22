import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Detalhes from './pages/Detalhes'
import Favoritos from './pages/Favoritos'
import Admin from './pages/Admin'
import AdminEditar from './pages/AdminEditar'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/filme/:id" element={<Detalhes />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/editar/:id" element={<ProtectedRoute><AdminEditar /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
