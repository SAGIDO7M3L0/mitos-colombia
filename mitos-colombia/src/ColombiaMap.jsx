import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function ColombiaMap() {
  const { scene } = useGLTF('/models/colombia_map.glb')
  const [hexSeleccionado, setHexSeleccionado] = useState(null)

  scene.traverse((obj) => {
  if (obj.isMesh) {
    console.log(obj.name)
  }
  })
  
  useFrame(() => {
    scene.traverse((obj) => {
      if (!obj.isMesh) return

      if (!obj.userData.posicionOriginal) {
        obj.userData.posicionOriginal = obj.position.y
      }

      const posicionOriginal = obj.userData.posicionOriginal
      const objetivo =
        obj.name === hexSeleccionado
          ? posicionOriginal + -0.5
          : posicionOriginal

      obj.position.y += (objetivo - obj.position.y) * 1
    })
  })

  return (
    <primitive
      object={scene}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHexSeleccionado(e.object.name)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHexSeleccionado(null)
      }}
    />
  )
}

useGLTF.preload('/models/colombia_map.glb')