
import { useNavigate, useParams } from 'react-router-dom'

export default function ExplorarMito() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <main style={styles.contenedor}>
      <button
        style={styles.botonVolver}
        onClick={() => navigate('/regiones')}
      >
        ← Volver a regiones
      </button>

      <div style={styles.contenido}>
        <section style={styles.info}>
          <span style={styles.etiqueta}>Mito seleccionado</span>

          <h1>{id}</h1>

          <p>
            Aquí aparecerá la información completa del mito:
            descripción, autor, referencias, técnica de animación
            y demás información almacenada en Supabase.
          </p>
        </section>

        <section style={styles.video}>
          <span>VIDEO</span>
          <p>Espacio para la animación del mito</p>
        </section>
      </div>
    </main>
  )
}

const styles = {
  contenedor: {
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
    overflow: 'hidden',
    background: '#050816',
    color: 'white',
    padding: '60px 80px',
    fontFamily: 'Inter, sans-serif',
  },

  botonVolver: {
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    fontSize: 16,
    cursor: 'pointer',
    marginBottom: 50,
  },

  contenido: {
    display: 'flex',
    gap: 60,
    width: '100%',
    height: '70%',
    alignItems: 'center',
  },

  info: {
    flex: 1,
  },

  etiqueta: {
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    fontSize: 13,
  },

  infoTitulo: {
    fontSize: 52,
    margin: '16px 0 24px',
  },

  infoTexto: {
    color: '#cbd5e1',
    fontSize: 18,
    lineHeight: 1.7,
  },

  video: {
    flex: 1,
    aspectRatio: '16 / 9',
    maxWidth: 700,
    background: '#111827',
    border: '1px solid #334155',
    borderRadius: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
  },
}
