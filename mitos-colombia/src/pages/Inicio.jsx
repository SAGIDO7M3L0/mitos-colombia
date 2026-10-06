import { useNavigate } from 'react-router-dom'
import Mapa3D from '../Mapa3D'

export default function Inicio() {
  const navigate = useNavigate()

  return (
    <main style={styles.contenedor}>
      <Mapa3D />

      <button
        style={styles.boton}
        onClick={() => navigate('/regiones')}
      >
        Ver regiones
      </button>
    </main>
  )
}

const styles = {
  contenedor: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: '#050816',
  },

  boton: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '16px 32px',
    borderRadius: 12,
    border: '1px solid #334155',
    background: '#111827',
    color: 'white',
    fontSize: 18,
    fontWeight: 600,
    cursor: 'pointer',
    zIndex: 10,
  },
}
