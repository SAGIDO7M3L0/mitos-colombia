import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMitos } from './hooks/useMitos'
import { useAuth } from './context/AuthContext'

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

  const mitosRegionActual = regionSeleccionada ? mitosPorRegion[regionSeleccionada] || [] : []
  const anchoLista = Math.max(mitosRegionActual.length * 400, window.innerWidth)

  if (cargando) {
    return <div style={styles.cargando}>Cargando mitos y leyendas...</div>
  }

  return (
    <div ref={scrollRef} style={styles.scrollContainer}>
      {/* Sección 1: mapa — TEMPORAL, se reemplaza por Mapa3D.jsx */}
      <section style={styles.seccionMapa}>
        <h1 style={{ fontSize: 42 }}>Selecciona una región</h1>
        <svg width="340" height="520" viewBox="0 0 340 520">
          <rect x="120" y="20" width="100" height="70" rx="14" fill="#26324f"
            onClick={() => seleccionarRegion('Caribe')} style={{ cursor: 'pointer' }} />
          <rect x="70" y="100" width="80" height="120" rx="14" fill="#26324f"
            onClick={() => seleccionarRegion('Pacífica')} style={{ cursor: 'pointer' }} />
          <rect x="155" y="100" width="90" height="160" rx="14" fill="#26324f"
            onClick={() => seleccionarRegion('Andina')} style={{ cursor: 'pointer' }} />
          <rect x="250" y="120" width="70" height="130" rx="14" fill="#26324f"
            onClick={() => seleccionarRegion('Orinoquía')} style={{ cursor: 'pointer' }} />
          <rect x="120" y="280" width="110" height="170" rx="18" fill="#26324f"
            onClick={() => seleccionarRegion('Amazonía')} style={{ cursor: 'pointer' }} />
          <circle cx="290" cy="70" r="22" fill="#26324f"
            onClick={() => seleccionarRegion('Insular')} style={{ cursor: 'pointer' }} />
        </svg>
      </section>

      {/* Sección 2: lista de mitos de la región seleccionada */}
      <section style={{ ...styles.seccionLista, width: anchoLista }}>
        {!regionSeleccionada ? (
          <p style={styles.placeholder}>Selecciona una región en el mapa para ver sus mitos.</p>
        ) : (
          <>
            <h1 style={{ margin: '0 0 40px' }}>{regionSeleccionada}</h1>
            <div style={styles.cards}>
              {mitosRegionActual.map((mito) => (
                <div key={mito.id} style={styles.card} onClick={() => setMitoSeleccionado(mito)}>
                  <h2 style={styles.cardTitulo}>{mito.titulo}</h2>
                  <p style={styles.cardTexto}>{mito.resumen}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Sección 3: login de admin, siempre visible */}
      <section style={styles.seccionLogin}>
        <LoginAdmin />
      </section>

      {mitoSeleccionado && (
        <PanelDetalle mito={mitoSeleccionado} onCerrar={() => setMitoSeleccionado(null)} />
      )}
    </div>
  )
}

function LoginAdmin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const manejarSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const { error } = await signIn(email, password)
    if (error) {
      setError('Correo o contraseña incorrectos')
      return
    }
    navigate('/admin')
  }

  return (
    <form onSubmit={manejarSubmit} style={styles.loginForm}>
      <h1 style={{ marginBottom: 24 }}>Acceso administrador</h1>
      <input type="email" placeholder="Correo" value={email}
        onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
      <input type="password" placeholder="Contraseña" value={password}
        onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
      {error && <p style={{ color: '#f87171' }}>{error}</p>}
      <button type="submit" style={styles.boton}>Iniciar sesión</button>
    </form>
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
    minWidth: '100vw', height: '100vh', scrollSnapAlign: 'start',
    display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px',
  },
  placeholder: { color: '#94a3b8', fontSize: 20 },
  cards: { display: 'flex', gap: 24, overflowX: 'hidden' },
  card: {
    width: 360, background: '#111827', border: '1px solid #334155', borderRadius: 24,
    padding: 28, cursor: 'pointer', flexShrink: 0,
  },
  cardTitulo: { fontSize: 24, margin: '0 0 12px' },
  cardTexto: { color: '#cbd5e1', lineHeight: 1.6 },
  seccionLogin: {
    minWidth: '100vw', height: '100vh', scrollSnapAlign: 'start',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  loginForm: { display: 'flex', flexDirection: 'column', width: 320 },
  input: {
    padding: '14px 16px', marginBottom: 16, borderRadius: 12,
    border: '1px solid #334155', background: '#111827', color: 'white', fontSize: 16,
  },
  boton: {
    padding: '14px 16px', borderRadius: 12, border: 'none',
    background: 'white', color: '#0b1020', fontWeight: 700, cursor: 'pointer',
  },
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