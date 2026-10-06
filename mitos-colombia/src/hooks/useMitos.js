import { useEffect, useState } from 'react'
import { obtenerMitos } from '../services/mitosService'

export function useMitos() {
  const [mitos, setMitos] = useState([])
  const [mitosPorRegion, setMitosPorRegion] = useState({})
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargarMitos() {
      try {
        const data = await obtenerMitos()

        console.log('Mitos desde Supabase:', data)

        setMitos(data)

        const agrupados = {}

        for (const mito of data) {
          if (!agrupados[mito.region]) {
            agrupados[mito.region] = []
          }

          agrupados[mito.region].push(mito)
        }

        setMitosPorRegion(agrupados)
      } catch (error) {
        setError(error.message)
      } finally {
        setCargando(false)
      }
    }

    cargarMitos()
  }, [])

  return {
    mitos,
    mitosPorRegion,
    cargando,
    error,
  }
}