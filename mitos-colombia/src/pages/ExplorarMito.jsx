
import { useNavigate } from 'react-router-dom'

export default function ExplorarMito() {
  const navigate = useNavigate()

  return (
    <main style={styles.contenedor}>
      <button
        style={styles.botonVolver}
        onClick={() => navigate('/regiones')}
        aria-label="Volver a regiones"
        title="Volver a regiones"
      >
        ←
      </button>

      <h1 style={styles.tituloRegion}>
      Región Andina
      </h1>

      <div style={styles.contenido}>
        <section style={styles.info} />

        <section style={styles.video} />
      </div>
    </main>
  )
}

const styles = {

  tituloRegion: {
  position: 'absolute',
  top: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  margin: 0,
  color: '#b9a16a',
  fontSize: '28px',
  fontWeight: 500,
  letterSpacing: '3px',
  textTransform: 'uppercase',
},
  contenedor: {
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
    background: '#080807',
    fontFamily: 'Inter, sans-serif',
    overflow: 'hidden',
  },

  botonVolver: {
    position: 'absolute',
    top: '40px',
    left: '50px',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: '1px solid #b9a16a',
    borderRadius: '50%',
    color: '#b9a16a',
    fontSize: '24px',
    cursor: 'pointer',
    padding: 0,
    zIndex: 10,
  },

  contenido: {
    display: 'flex',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: '120px 50px 50px',
    gap: '30px',
  },

  info: {
    width: '40%',
    height: '100%',
    boxSizing: 'border-box',
    border: '1px solid #b9a16a',
    background: '#11100d',
  },

  video: {
    width: '60%',
    height: '100%',
    boxSizing: 'border-box',
    border: '1px solid #475569',
    background: '#111827',
  },
}
