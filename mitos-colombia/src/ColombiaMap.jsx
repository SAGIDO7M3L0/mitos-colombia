import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function ColombiaMap() {
  const group = useRef()
  const { scene } = useGLTF('/models/colombia_map.glb')

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/colombia_map.glb')