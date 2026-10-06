import { useState, useRef } from 'react'
import { useMitos } from './hooks/useMitos'
import Mapa3D from './Mapa3D'

export default function PaginaPublica() {
  const { mitosPorRegion, cargando } = useMitos()
  const [regionSeleccionada, setRegionSeleccionada] = useState(null)
  const [mitoSeleccionado, setMitoSeleccionado] = useState(null)
  const scrollRef = useRef(null)

  const seleccionarRegion = (nombre) => {
    setRegionSeleccionada(nombre)
    setMitoSeleccionado(null)
    setTimeout(() => {
      scrollRef.current?.scrollTo({ left: window.innerWidth, behavior: 'smooth' })
    }, 0)
  }
  

  if (cargando) {
    return <div style={styles.cargando}>Cargando mitos y leyendas...</div>
  }

  return (
    <div ref={scrollRef} style={styles.scrollContainer}>
      {/* Sección 1: mapa — TEMPORAL, se reemplaza por Mapa3D.jsx */}
      <section style={styles.seccionMapa}>
        <Mapa3D onRegionSelect={seleccionarRegion} />
      </section>

      {/* Sección 2: lista de mitos de la región seleccionada */}
      <section style={styles.seccionLista}>
  {!regionSeleccionada ? (
    <>
      <h1 style={styles.tituloRegiones}>Regiones de Colombia</h1>

      <div style={styles.regionesScroll}>
        {[
          'Caribe',
          'Pacífica',
          'Andina',
          'Orinoquía',
          'Amazonía',
          'Insular',
        ].map((region) => (
          <button
            key={region}
            style={styles.botonRegion}
            onClick={() => seleccionarRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </>
  ) : (
    <div style={styles.contenidoRegion}>
      <button
        style={styles.botonVolver}
        onClick={() => setRegionSeleccionada(null)}
      >
        ← Regiones
      </button>

      <h1 style={styles.tituloRegion}>{regionSeleccionada}</h1>

      <div style={styles.contenedorMitos}>
        <div style={styles.tablaMitos}>
          <h2>Mitos y leyendas</h2>

          {mitosPorRegion[regionSeleccionada]?.map((mito) => (
            <div
              key={mito.id}
              style={styles.filaMito}
              onClick={() => setMitoSeleccionado(mito)}
            >
              <strong>{mito.titulo}</strong>
              <span>{mito.resumen}</span>
            </div>
          ))}

          {(!mitosPorRegion[regionSeleccionada] ||
            mitosPorRegion[regionSeleccionada].length === 0) && (
            <p style={styles.sinMitos}>
              No hay mitos registrados para esta región.
            </p>
          )}
        </div>

        <div style={styles.videoContainer}>
          <div style={styles.videoPlaceholder}>
            <span>VIDEO</span>
            <p>Espacio para la animación del mito</p>
          </div>
        </div>
      </div>
    </div>
  )}
</section>

      {mitoSeleccionado && (
        <PanelDetalle mito={mitoSeleccionado} onCerrar={() => setMitoSeleccionado(null)} />
      )}
    </div>
  )
}

function PanelDetalle({ mito, onCerrar }) {
  const { session } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <div style={panelStyles.overlay} onClick={onCerrar} />
      <div style={panelStyles.panel}>
        <button style={panelStyles.cerrar} onClick={onCerrar}>✕</button>
        <div style={{ padding: 28 }}>
          <div style={panelStyles.regionLabel}>{mito.region}</div>
          <h2 style={panelStyles.titulo}>{mito.titulo}</h2>
          <p style={panelStyles.texto}>{mito.resumen}</p>
          {mito.autor && <p style={panelStyles.meta}>Autor/fuente: {mito.autor}</p>}
          {session && (
            <button
              style={panelStyles.botonEditar}
              onClick={() => navigate(`/admin?editar=${mito.id}`)}
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </>
  )
}

const styles = {
  contenidoRegion: {
  width: '100%',
  maxWidth: 1400,
},

botonVolver: {
  background: 'transparent',
  border: 'none',
  color: '#94a3b8',
  fontSize: 16,
  cursor: 'pointer',
  marginBottom: 20,
},

tituloRegion: {
  fontSize: 48,
  margin: '0 0 40px',
},

contenedorMitos: {
  display: 'flex',
  gap: 40,
  width: '100%',
},

tablaMitos: {
  flex: 1,
  maxHeight: 500,
  overflowY: 'auto',
},

filaMito: {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 20,
  marginBottom: 12,
  background: '#111827',
  border: '1px solid #334155',
  borderRadius: 16,
  cursor: 'pointer',
},

sinMitos: {
  color: '#94a3b8',
},

videoContainer: {
  flex: 1,
},

videoPlaceholder: {
  width: '100%',
  aspectRatio: '16 / 9',
  background: '#111827',
  border: '1px solid #334155',
  borderRadius: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#64748b',
},

botonRegion: {
  flexShrink: 0,
  width: 260,
  height: 160,
  borderRadius: 24,
  border: '1px solid #334155',
  background: '#111827',
  color: 'white',
  fontSize: 24,
  fontWeight: 600,
  cursor: 'pointer',
},
  cargando: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#050816', color: 'white', fontFamily: 'Inter, sans-serif',
  },
  scrollContainer: {
    display: 'flex', overflowX: 'auto', height: '100vh',
    scrollSnapType: 'x mandatory', background: '#050816', color: 'white',
    fontFamily: 'Inter, sans-serif',
  },
  seccionMapa: {
    minWidth: '100vw', height: '100vh', scrollSnapAlign: 'start',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
  },
  seccionLista: {
  minWidth: '100vw',
  height: '100vh',
  scrollSnapAlign: 'start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 80px',
  boxSizing: 'border-box',
},

tituloRegiones: {
  fontSize: 48,
  margin: '0 0 50px',
},

regionesScroll: {
  display: 'flex',
  gap: 24,
  overflowX: 'auto',
  paddingBottom: 20,
},

botonRegion: {
  flexShrink: 0,
  width: 260,
  height: 160,
  borderRadius: 24,
  border: '1px solid #334155',
  background: '#111827',
  color: 'white',
  fontSize: 24,
  fontWeight: 600,
  cursor: 'pointer',
},
  cardTitulo: { fontSize: 24, margin: '0 0 12px' },
  cardTexto: { color: '#cbd5e1', lineHeight: 1.6 },
  
}

const panelStyles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 10 },
  panel: {
    position: 'fixed', top: 0, right: 0, width: 420, height: '100vh', background: '#0b1020',
    borderLeft: '1px solid #1f2937', zIndex: 11, boxShadow: '-12px 0 40px rgba(0,0,0,0.45)',
    overflowY: 'auto',
  },
  cerrar: {
    position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: 12,
    border: '1px solid #334155', background: '#111827', color: 'white', cursor: 'pointer', fontSize: 18,
  },
  regionLabel: { fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 12 },
  titulo: { fontSize: 36, margin: '0 0 16px' },
  texto: { color: '#cbd5e1', lineHeight: 1.8, fontSize: 16 },
  meta: { color: '#94a3b8', fontSize: 14, marginTop: 16 },
  botonEditar: {
    marginTop: 24, padding: '12px 20px', borderRadius: 12, border: 'none',
    background: '#3b82f6', color: 'white', fontWeight: 700, cursor: 'pointer',
  },
}