import { useEffect, useState } from 'react'

const mitos = {
  Caribe: [
    'La Llorona',
    'El Hombre Caimán',
    'La Mojana',
    'El Silbón',
    'La Candileja',
    'El Mohán',
    'La Madre Monte',
  ],
  Pacífica: [
    'La Tunda',
    'El Riviel',
    'La Patasola',
    'La Viuda',
    'El Duende',
    'El Bambero',
    'La Madre de Agua',
  ],
  Andina: [
    'El Mohán',
    'La Madre Monte',
    'La Patasola',
    'El Duende',
    'La Candileja',
    'El Silbón',
    'La Llorona',
  ],
  Orinoquía: [
    'El Silbón',
    'La Bola de Fuego',
    'El Jinete Negro',
    'La Sayona',
    'El Carrao',
    'La Mula Herrada',
    'La Viuda',
  ],
  Amazonía: [
    'Yuruparí',
    'La Madre de la Selva',
    'El Curupira',
    'La Sachamama',
    'El Bufeo',
    'El Chullachaqui',
    'La Anaconda Mítica',
  ],
  Insular: [
    'La Sirena',
    'El Pirata Fantasma',
    'La Luz del Mar',
    'El Guardián del Coral',
    'La Isla Perdida',
    'El Náufrago',
    'La Dama Blanca',
  ],
}

export default function App() {
  const [pantalla, setPantalla] = useState('inicio')
  const [region, setRegion] = useState('')
  const [offset, setOffset] = useState(0)
  const [mitoSeleccionado, setMitoSeleccionado] = useState(null)

  useEffect(() => {
    if (pantalla !== 'timeline') return

    const onScroll = () => {
      setOffset(window.scrollY)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [pantalla])

  const abrirRegion = (nombre) => {
    setRegion(nombre)
    setPantalla('timeline')
    setMitoSeleccionado(null)
    setTimeout(() => window.scrollTo(0, 0), 0)
  }

  if (pantalla === 'inicio') {
    return (
      <div style={styles.inicio}>
        <div style={styles.center}>
          <h1 style={styles.titulo}>Mitos de Colombia</h1>
          <p style={styles.subtitulo}>
            Explora las leyendas y relatos de las regiones de Colombia.
          </p>
          <button
            onClick={() => setPantalla('mapa')}
            style={styles.boton}
          >
            Comenzar
          </button>
        </div>
      </div>
    )
  }

  if (pantalla === 'mapa') {
    return (
      <div style={styles.mapa}>
        <h1 style={{ fontSize: 42 }}>Selecciona una región</h1>

        <svg width="340" height="520" viewBox="0 0 340 520">
          <rect x="120" y="20" width="100" height="70" rx="14"
            fill="#26324f" onClick={() => abrirRegion('Caribe')}
            style={{ cursor: 'pointer' }} />

          <rect x="70" y="100" width="80" height="120" rx="14"
            fill="#26324f" onClick={() => abrirRegion('Pacífica')}
            style={{ cursor: 'pointer' }} />

          <rect x="155" y="100" width="90" height="160" rx="14"
            fill="#26324f" onClick={() => abrirRegion('Andina')}
            style={{ cursor: 'pointer' }} />

          <rect x="250" y="120" width="70" height="130" rx="14"
            fill="#26324f" onClick={() => abrirRegion('Orinoquía')}
            style={{ cursor: 'pointer' }} />

          <rect x="120" y="280" width="110" height="170" rx="18"
            fill="#26324f" onClick={() => abrirRegion('Amazonía')}
            style={{ cursor: 'pointer' }} />

          <circle cx="290" cy="70" r="22"
            fill="#26324f" onClick={() => abrirRegion('Insular')}
            style={{ cursor: 'pointer' }} />
        </svg>
      </div>
    )
  }

  return (
    <div style={{ height: '350vh', background: '#050816' }}>
      <div style={styles.timelineSticky}>
        <div style={styles.header}>
          <button
            onClick={() => setPantalla('mapa')}
            style={styles.back}
          >
            ← Mapa
          </button>
          <h1 style={{ margin: 0 }}>{region}</h1>
        </div>

        <div style={styles.linea}></div>

        <div
          style={{
            ...styles.cards,
            transform: `translateX(${-offset * 1.5}px)`,
          }}
        >
          {mitos[region].map((mito, i) => (
            <div
              key={i}
              style={styles.card}
              onClick={() => setMitoSeleccionado(mito)}
            >
              <div style={styles.numero}>{i + 1}</div>
              <div style={styles.punto}></div>
              <h2 style={styles.cardTitulo}>{mito}</h2>
              <p style={styles.cardTexto}>
                Relato tradicional de la región {region}.
              </p>
            </div>
          ))}
        </div>

        {mitoSeleccionado && (
          <>
            <div
              style={styles.overlay}
              onClick={() => setMitoSeleccionado(null)}
            />

            <div style={styles.panel}>
              <button
                style={styles.cerrar}
                onClick={() => setMitoSeleccionado(null)}
              >
                ✕
              </button>

              <div style={styles.imagenPlaceholder}>
                Imagen
              </div>

              <div style={{ padding: 28 }}>
                <div style={styles.regionLabel}>{region}</div>

                <h2 style={styles.panelTitulo}>{mitoSeleccionado}</h2>

                <p style={styles.panelTexto}>
                  Este mito forma parte de la tradición oral de la región {region}. 
                  En la versión final, aquí se mostrará una ilustración, un resumen narrativo, 
                  audio ambiental y una transición hacia la experiencia completa.
                </p>

                <button style={styles.botonExperiencia}>
                  Ver experiencia completa
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  inicio: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #050816 0%, #0b1020 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Inter, sans-serif',
  },
  center: {
    textAlign: 'center',
    maxWidth: 700,
    padding: 40,
  },
  titulo: {
    fontSize: 72,
    margin: 0,
    fontWeight: 800,
  },
  subtitulo: {
    marginTop: 24,
    fontSize: 20,
    color: '#b8c1d9',
  },
  boton: {
    marginTop: 40,
    padding: '18px 42px',
    fontSize: 20,
    fontWeight: 700,
    borderRadius: 18,
    border: 'none',
    cursor: 'pointer',
    background: 'white',
    color: '#0b1020',
  },
  mapa: {
    minHeight: '100vh',
    background: '#050816',
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  timelineSticky: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflow: 'hidden',
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    padding: 40,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 80,
    position: 'relative',
    zIndex: 3,
  },
  back: {
    padding: '10px 16px',
    borderRadius: 12,
    border: '1px solid #334155',
    background: 'transparent',
    color: 'white',
    cursor: 'pointer',
  },
  linea: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    background: '#334155',
  },
  cards: {
    display: 'flex',
    gap: 80,
    position: 'absolute',
    top: '50%',
    left: 120,
    transform: 'translateY(-50%)',
    transition: 'transform 0.05s linear',
  },
  card: {
    width: 320,
    background: '#111827',
    border: '1px solid #334155',
    borderRadius: 24,
    padding: 28,
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, border-color 0.2s ease',
  },
  numero: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
  },
  punto: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: 'white',
    position: 'absolute',
    top: '50%',
    left: -48,
    transform: 'translateY(-50%)',
  },
  cardTitulo: {
    fontSize: 28,
    margin: '0 0 12px',
  },
  cardTexto: {
    color: '#cbd5e1',
    lineHeight: 1.6,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    zIndex: 10,
  },
  panel: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: 420,
    height: '100vh',
    background: '#0b1020',
    borderLeft: '1px solid #1f2937',
    zIndex: 11,
    boxShadow: '-12px 0 40px rgba(0,0,0,0.45)',
    overflowY: 'auto',
  },
  cerrar: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
    border: '1px solid #334155',
    background: '#111827',
    color: 'white',
    cursor: 'pointer',
    fontSize: 18,
  },
  imagenPlaceholder: {
    height: 240,
    background: 'linear-gradient(135deg, #1e293b, #334155)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94a3b8',
    fontSize: 18,
    borderBottom: '1px solid #1f2937',
  },
  regionLabel: {
    fontSize: 13,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#94a3b8',
    marginBottom: 12,
  },
  panelTitulo: {
    fontSize: 36,
    margin: '0 0 16px',
  },
  panelTexto: {
    color: '#cbd5e1',
    lineHeight: 1.8,
    fontSize: 16,
  },
  botonExperiencia: {
    marginTop: 28,
    width: '100%',
    padding: '16px 20px',
    borderRadius: 16,
    border: 'none',
    background: 'white',
    color: '#0b1020',
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
  },
}