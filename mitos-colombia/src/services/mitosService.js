import { supabase } from '../lib/supabaseClient'

export async function obtenerMitos() {
  const { data, error } = await supabase
    .from('mitos_leyendas')
    .select('*')
    .order('titulo', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}   