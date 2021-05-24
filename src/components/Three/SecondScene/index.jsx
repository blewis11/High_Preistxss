import React, { useRef } from 'react'
import { Canvas } from 'react-three-fiber'
import { Provider } from 'react-redux'
import { Floor } from './Floor.jsx'
import { CameraController, EPS } from './CameraControls.jsx'
import { Suspense } from 'react'
import { OrbitControls } from 'drei'

const SecondScene = ({ store }) => {
  const wisdomAvatarRef = useRef()

  return (
    <>
      <Canvas colorManagement shadowMap camera={{ position: [0, 0, EPS], fov: 80 }}>
        <Provider store={store}>
          <ambientLight intensity={0.2} />
          {/* <pointLight color={"purple"} intensity={0.5} /> */}
          <Suspense fallback={null}>
            <Floor wisdomAvatarRef={wisdomAvatarRef} />
          </Suspense>
          {/* <OrbitControls /> */}
          <CameraController wisdomAvatarRef={wisdomAvatarRef} />
        </Provider>
      </Canvas>
    </>
  )
}

export { SecondScene }
