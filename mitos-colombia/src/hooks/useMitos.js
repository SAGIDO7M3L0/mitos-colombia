import { useEffect, useState } from 'react'
import { supabase } from "../lib/supabaseClient";

export function useMitos() {
  const [mitosPorRegion, setMitosPorRegion] = useState({})
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargar() {
      const { data, error } = await supabase.from('mitos_leyendas').select('*')
      if (error) {
        setError(error.message)
        setCargando(false)
        return
      }
      const agrupado = {}
      for (const mito of data) {
        if (!agrupado[mito.region]) agrupado[mito.region] = []
        agrupado[mito.region].push(mito)
      }
      setMitosPorRegion(agrupado)
      setCargando(false)
    }
    cargar()
  }, [])

  return { mitosPorRegion, cargando, error }
}