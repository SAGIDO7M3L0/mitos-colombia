  import { Canvas } from '@react-three/fiber'
  import { OrbitControls, Environment } from '@react-three/drei'
  import ColombiaMap from './ColombiaMap'

  export default function Mapa3D({ onRegionSelect }) {
    return (
      <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundImage: "url('/BaseMapa_redondo.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      >
        <Canvas
        gl={{ alpha: true }}
          camera={{
            position: [0, 0.8, 0.5],
            fov: 20,
          }}
        >
          <ambientLight intensity={1.5} />

          <directionalLight
            position={[5, 10, 5]}
            intensity={2}
          />

          <ColombiaMap />

          <Environment preset="city" />

          <OrbitControls
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
  />
        </Canvas>
      </div>
    )
  }