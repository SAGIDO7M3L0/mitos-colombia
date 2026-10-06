
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Inicio from './pages/Inicio'
import Regiones from './pages/Regiones'
import ExplorarMito from './pages/ExplorarMito'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route path="/regiones" element={<Regiones />} />

          <Route path="/mito/:id" element={<ExplorarMito />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
