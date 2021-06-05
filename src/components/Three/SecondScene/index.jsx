import React, { useRef } from 'react'
import { Canvas } from 'react-three-fiber'
import { Provider } from 'react-redux'
import { Floor } from './Floor.jsx'
import CameraController, { EPS } from './CameraControls.jsx'
import { Suspense } from 'react'
import CameraMovements from './CameraMovements'

import * as THREE from 'three'
const Lights = () => {
  const light = new THREE.DirectionalLight(0xe3b6e1)
  light.target.position.set(500, 0, 500)
  light.intensity = 0.2
  light.castShadow = true

  return (
    <>
      <hemisphereLight args={['blue', '0xf9cc6b', 0.3]} />
      <directionalLight position={[20, 20, 5]} intensity={0.5} args={[0xe3b6e1]} />
      <primitive object={light} position={[47, 10, 40]} />
    </>
  )
}

const SecondScene = ({ store }) => {
  const wisdomGroupRef = useRef()
  const growthGroupRef = useRef()
  const healthGroupRef = useRef()
  const joyGroupRef = useRef()
  const exchangeGroupRef = useRef()

  const wisdomAvatarRef = useRef()
  const growthAvatarRef = useRef()
  const healthAvatarRef = useRef()
  const joyAvatarRef = useRef()
  const exchangeAvatarRef = useRef()

  const wisdomPlinthRef = useRef()
  const growthPlinthRef = useRef()
  const healthPlinthRef = useRef()
  const joyPlinthRef = useRef()
  const exchangePlinthRef = useRef()

  const middleRef = useRef()
  const cameraRef = useRef()

  return (
    <>
      <Canvas concurrent colorManagement camera={{ position: [0, 0, EPS], fov: 80 }}>
        <Provider store={store}>
          <Lights />

          <Suspense fallback={null}>
            <Floor
              wisdomAvatarRef={wisdomAvatarRef}
              growthAvatarRef={growthAvatarRef}
              healthAvatarRef={healthAvatarRef}
              joyAvatarRef={joyAvatarRef}
              exchangeAvatarRef={exchangeAvatarRef}
              wisdomPlinthRef={wisdomPlinthRef}
              growthPlinthRef={growthPlinthRef}
              healthPlinthRef={healthPlinthRef}
              joyPlinthRef={joyPlinthRef}
              exchangePlinthRef={exchangePlinthRef}
              wisdomGroupRef={wisdomGroupRef}
              growthGroupRef={growthGroupRef}
              healthGroupRef={healthGroupRef}
              joyGroupRef={joyGroupRef}
              exchangeGroupRef={exchangeGroupRef}
            />
          </Suspense>
          <CameraController cameraRef={cameraRef} />
          <CameraMovements
            wisdomAvatarRef={wisdomAvatarRef}
            growthAvatarRef={growthAvatarRef}
            healthAvatarRef={healthAvatarRef}
            joyAvatarRef={joyAvatarRef}
            exchangeAvatarRef={exchangeAvatarRef}
            wisdomPlinthRef={wisdomPlinthRef}
            growthPlinthRef={growthPlinthRef}
            healthPlinthRef={healthPlinthRef}
            joyPlinthRef={joyPlinthRef}
            exchangePlinthRef={exchangePlinthRef}
            wisdomGroupRef={wisdomGroupRef}
            growthGroupRef={growthGroupRef}
            healthGroupRef={healthGroupRef}
            joyGroupRef={joyGroupRef}
            exchangeGroupRef={exchangeGroupRef}
            cameraRef={cameraRef}
          />
          {/* <OrbitControls enableZoom={true} /> */}
          <mesh position={[0, 0, EPS]} ref={middleRef}>
            <meshBasicMaterial transparent opacity={0} attach="material" />
            <sphereGeometry attach="geometry" args={[0.0005, 5, 5]} />
          </mesh>
        </Provider>
      </Canvas>
    </>
  )
}

export { SecondScene }
