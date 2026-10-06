import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { session, cargando } = useAuth()

  if (cargando) {
    return <div>Cargando...</div>
  }

  if (!session) {
    return <Navigate to="/" replace />
  }

  return children
}
