import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import ColombiaMap from './ColombiaMap'

export default function Mapa3D() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#050816',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0.1, 0.5],
          fov: 30,
        }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 10, 5]}
          intensity={2}
        />

        <ColombiaMap />

        <Environment preset="city" />

        <OrbitControls />
      </Canvas>
    </div>
  )
}