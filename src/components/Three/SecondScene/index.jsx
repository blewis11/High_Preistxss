import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Provider } from 'react-redux'
import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { Html, useTextureLoader, useFBXLoader, OrbitControls } from 'drei'
import { CameraController, EPS } from './CameraControls.jsx'
import DatGui, { DatNumber } from 'react-dat-gui'
import { Suspense } from 'react'

const App = ({ state, setState }) => {
  const handleUpdate = newData =>
    setState(prevState => {
      return { data: { ...prevState.data, ...newData } }
    })

  return (
    <DatGui data={state.data} onUpdate={handleUpdate}>
      <DatNumber path="positionX" label="positionX" min={-200} max={200} step={0.1} />
      <DatNumber path="positionY" label="positionY" min={-200} max={200} step={0.1} />
      <DatNumber path="positionZ" label="positionZ" min={-200} max={200} step={0.1} />
      <DatNumber path="rotation" label="rotation" min={-5} max={5} step={0.01} />
    </DatGui>
  )
}

const RectLight = ({ state }) => {
  RectAreaLightUniformsLib.init()
  const rectLight1 = new THREE.RectAreaLight(0xfdf3c6, 0.6, 120, 120)
  const helper = new RectAreaLightHelper(rectLight1)

  return (
    <>
      <group position={[0, 14, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <primitive object={rectLight1} />
        <primitive object={helper} />
      </group>
    </>
  )
}

const AvatarWisdom = ({ state }) => {
  const ref = useRef()
  const avatar = useFBXLoader('avatars/WisdomFloat.fbx')

  useEffect(() => {
    console.log(ref.current)
  }, [ref.current])

  const [mixer] = useState(() => new THREE.AnimationMixer())

  useEffect(() => {
    ref.current.children[1].material[1].shininess = 500
    ref.current.children[1].material[1].reflectivity = 500
    ref.current.children[1].material[1].specular = new THREE.Color('orange')
  })

  useEffect(() => void mixer.clipAction(ref.current.animations[0], ref.current).play(), [])
  useFrame(() => {
    mixer.update(0.03)
  })

  return (
    <>
      <primitive
        object={avatar}
        ref={ref}
        position={[5.5, -1.3, -16.6]}
        scale={[0.05, 0.05, 0.05]}
        rotation={[0, -0.33, 0]}
      />
    </>
  )
}

const Floor = () => {
  const planeRef = useRef()
  const [state, setState] = useState({
    data: {
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      rotation: 0,
    },
  })

  const floorTexture = useTextureLoader('marble_floor.jpeg')
  const wallTexture = useTextureLoader('guided_wall_texture.jpg')

  return (
    <>
      <axesHelper />
      {/* <Html>
        <div style={{ width: '500px', background: 'blue' }}>
          <App state={state} setState={setState} />
        </div>
      </Html> */}
      <AvatarWisdom state={state} />
      <group position={[0, 7, 26]}>
        {/* bottom  */}
        <mesh position={[0, -11, -25]} ref={planeRef} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry attach="geometry" args={[45, 5]} />
          <meshStandardMaterial attach="material" map={floorTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* back right */}
        <mesh position={[-10, 1.5, -59]} ref={planeRef} rotation={[0, 0.3, 0]}>
          <planeGeometry attach="geometry" args={[52, 25, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* back left */}
        <mesh position={[-34, 1.5, -24]} ref={planeRef} rotation={[0, 1.6, 0]}>
          <planeGeometry attach="geometry" args={[55, 25, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* back right */}
        <mesh position={[32, 2.2, -48]} ref={planeRef} rotation={[0, -0.95, 0]}>
          <planeGeometry attach="geometry" args={[55, 27, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* front left */}
        <mesh position={[-10, 2.2, 12]} ref={planeRef} rotation={[0, 2.8, 0]}>
          <planeGeometry attach="geometry" args={[52, 27, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* front right */}
        <mesh position={[31, 2.3, -4]} ref={planeRef} rotation={[0, 0.9, 0]}>
          <planeGeometry attach="geometry" args={[57, 27, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* top  */}
        <RectLight />
      </group>
    </>
  )
}

const SecondScene = ({ store }) => {
  return (
    <>
      <Canvas colorManagement shadowMap camera={{ position: [0, 0, EPS], fov: 80 }}>
        <Provider store={store}>
          <ambientLight intensity={0.2} />
          {/* <pointLight color={"purple"} intensity={0.5} /> */}
          <Suspense fallback={null}>
            <Floor />
          </Suspense>
          <CameraController />
        </Provider>
      </Canvas>
    </>
  )
}

export { SecondScene }
