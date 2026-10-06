
import { useNavigate } from 'react-router-dom'
import { useMitos } from '../hooks/useMitos'

export default function Regiones() {
  const navigate = useNavigate()
  const { mitos, cargando, error } = useMitos()

  if (cargando) {
    return (
      <main style={styles.estado}>
        <p>Cargando mitos...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main style={styles.estado}>
        <p>Error al cargar los mitos: {error}</p>
        <button onClick={() => navigate('/')}>
          ← Volver al mapa
        </button>
      </main>
    )
  }

  return (
    <main style={styles.contenedor}>
      <button
        style={styles.botonVolver}
        onClick={() => navigate('/')}
      >
        ← Volver al mapa
      </button>

      <h1 style={styles.titulo}>Mitos y leyendas</h1>

      <div style={styles.tablaContenedor}>
        <table style={styles.tabla}>
          <thead>
            <tr>
              <th style={styles.th}>Título</th>
              <th style={styles.th}>Región</th>
              <th style={styles.th}>Resumen</th>
              <th style={styles.th}>Técnica</th>
              <th style={styles.th}>Autor</th>
              <th style={styles.th}>Referencias</th>
              <th style={styles.th}>Video</th>
              <th style={styles.th}>Imagen</th>
              <th style={styles.th}>Creado</th>
              <th style={styles.th}>Actualizado</th>
            </tr>
          </thead>

          <tbody>
            {mitos.map((mito) => (
              <tr
                key={mito.id}
                style={styles.tr}
                onClick={() => navigate(`/mito/${mito.id}`)}
              >
                <td style={styles.td}>
                  {mito.titulo || '—'}
                </td>

                <td style={styles.td}>
                  {mito.region || '—'}
                </td>

                <td style={styles.td}>
                  {mito.resumen || '—'}
                </td>

                <td style={styles.td}>
                  {mito.tecnica_animacion || '—'}
                </td>

                <td style={styles.td}>
                  {mito.autor || '—'}
                </td>

                <td style={styles.td}>
                  {mito.referencias || '—'}
                </td>

                <td style={styles.td}>
                  {mito.video_url ? 'Disponible' : '—'}
                </td>

                <td style={styles.td}>
                  {mito.imagen_portada_url ? 'Disponible' : '—'}
                </td>

                <td style={styles.td}>
                  {mito.created_at
                    ? new Date(mito.created_at).toLocaleDateString()
                    : '—'}
                </td>

                <td style={styles.td}>
                  {mito.update_at
                    ? new Date(mito.update_at).toLocaleDateString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mitos.length === 0 && (
        <p style={styles.sinMitos}>
          No hay mitos registrados en Supabase.
        </p>
      )}
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
    padding: '40px 60px',
    fontFamily: 'Inter, sans-serif',
  },

  estado: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#050816',
    color: 'white',
    fontFamily: 'Inter, sans-serif',
  },

  botonVolver: {
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    fontSize: 16,
    cursor: 'pointer',
    marginBottom: 30,
  },

  titulo: {
    fontSize: 42,
    margin: '0 0 30px',
  },

  tablaContenedor: {
    width: '100%',
    height: 'calc(100vh - 180px)',
    overflow: 'auto',
    border: '1px solid #334155',
    borderRadius: 16,
    background: '#0b1020',
  },

  tabla: {
    width: 'max-content',
    minWidth: '100%',
    borderCollapse: 'collapse',
  },

  th: {
    position: 'sticky',
    top: 0,
    background: '#111827',
    color: '#f8fafc',
    padding: '16px',
    textAlign: 'left',
    borderBottom: '1px solid #334155',
    whiteSpace: 'nowrap',
  },

  td: {
    padding: '16px',
    borderBottom: '1px solid #1e293b',
    color: '#cbd5e1',
    maxWidth: 350,
  },

  tr: {
    cursor: 'pointer',
  },

  sinMitos: {
    color: '#94a3b8',
    marginTop: 20,
  },
}
