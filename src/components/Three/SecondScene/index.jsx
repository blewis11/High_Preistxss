import React, { useRef, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { Provider } from 'react-redux'
import { Floor } from './Floor.jsx'
import { CameraController, EPS } from './CameraControls.jsx'
import { Suspense } from 'react'
import { OrbitControls } from 'drei'
import * as THREE from 'three'

const Lights = () => {
  const light = new THREE.DirectionalLight(0xffffff)
  light.target.position.set(500, 0, 500)
  light.intensity = 0.2
  light.castShadow = true

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[20, 20, 5]} intensity={0.1} />
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
