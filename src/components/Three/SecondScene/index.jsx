import React, { useRef, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { Provider } from 'react-redux'
import { Floor } from './Floor.jsx'
import { CameraController, EPS } from './CameraControls.jsx'
import { Suspense } from 'react'
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
  const wisdomAvatarRef = useRef()

  return (
    <>
      <Canvas concurrent colorManagement camera={{ position: [0, 0, EPS], fov: 80 }}>
        <Provider store={store}>
          <Lights />

          <Suspense fallback={null}>
            <Floor wisdomAvatarRef={wisdomAvatarRef} />
          </Suspense>
          <CameraController wisdomAvatarRef={wisdomAvatarRef} />
        </Provider>
      </Canvas>
    </>
  )
}

export { SecondScene }
