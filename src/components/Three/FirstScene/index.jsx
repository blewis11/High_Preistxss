import * as THREE from 'three'
import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, extend, useThree, useFrame, useResource } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { Provider } from 'react-redux'

import { useFBXLoader, OrbitControls } from 'drei'

import Loader from './helpers/Loader'
import { PointLight } from './helpers/PointLight.jsx'

import { GrassHill } from './Landscape/Grass'
import { Flower } from './Landscape/Flower'
import { SkyBox } from './helpers/SkyBox.jsx'
import { WithCameraPan } from './helpers/WithCameraPan.jsx'

extend({ EffectComposer, RenderPass, UnrealBloomPass })

const getFOV = () => {
  let fov = 35

  const aspect = window.innerWidth / window.innerHeight

  if (aspect > 2.28) {
    fov = 15
  } else if (window.innerWidth <= 532) {
    fov = 65
  } else {
    fov = 35
  }

  return fov
}

const getSkyboxSize = fov => {
  let skyboxSize

  switch (fov) {
    case 35:
      skyboxSize = 130
      break

    default:
      skyboxSize = 700
  }

  return skyboxSize
}

const WithResizeDetect = ({ setSkyboxHeight }) => {
  const { camera } = useThree()

  useEffect(() => {
    const handleResize = () => {
      const fov = getFOV()
      if (camera.fov !== fov) {
        camera.fov = fov
        camera.updateProjectionMatrix()
        setSkyboxHeight(getSkyboxSize(camera.fov))
      }
    }

    window.addEventListener('resize', handleResize)
  })
  return null
}

const FlowersAndHills = ({ data }) => {
  return (
    <>
      <group position={[0, -5, 0]} scale={[1, 1, 1]} rotation={[0, 1.6, 0]}>
        {/* first flower */}
        <PointLight
          state={{
            color: 0xf9cc6b,
            position: [-14, 7, -32],
            intensity: 5,
            distance: 25,
          }}
        />
        <Flower
          state={{
            positionX: -14,
            positionY: -4,
            positionZ: -29,
            rotationX: 2.4,
            rotationY: 2.5,
            rotationZ: -2.5,
            scale: 0.15,
          }}
          newFlower={useFBXLoader('flowers/1621FlowerTest(Blender)1.fbx')}
        />

        {/* second flower */}
        <PointLight
          state={{
            color: 0xb22121,
            position: [-50, 5, -9],
            intensity: 2,
            distance: 25,
          }}
        />
        <Flower
          debug={true}
          state={{
            positionX: -45,
            positionY: -4,
            positionZ: -7,
            rotationX: -5,
            rotationY: 2,
            rotationZ: -1.5,
            scale: 0.17,
          }}
          newFlower={useFBXLoader('flowers/1621FlowerTest(Blender)2.fbx')}
        />

        {/* third flower */}
        <PointLight
          state={{
            color: 0xf9cc6b,
            position: [-7, 10, -10],
            intensity: 5,
            distance: 25,
          }}
        />
        <Flower
          state={{
            positionX: -14,
            positionY: -2,
            positionZ: -9,
            rotationX: -5.7,
            rotationY: 1,
            rotationZ: -0.7,
            scale: 0.15,
          }}
          newFlower={useFBXLoader('flowers/1621FlowerTest(Blender)3.fbx')}
        />

        {/* fourth flower */}
        <PointLight state={{ color: 'red', position: [-54, 2, 8], intensity: 1, distance: 25 }} />
        <Flower
          debug={'debug'}
          state={{
            positionX: -45,
            positionY: -4,
            positionZ: 4,
            rotationX: -6,
            rotationY: 2.3,
            rotationZ: -0.2,
            scale: 0.17,
          }}
          speed={0.007}
          newFlower={useFBXLoader('flowers/1621FlowerTest(Blender).fbx')}
        />

        {/* fifth flower */}
        <PointLight
          state={{
            color: 0xb22121,
            position: [0, 11, 25],
            intensity: 5,
            distance: 25,
          }}
        />
        <Flower
          state={{
            positionX: -1,
            positionY: -5,
            positionZ: 21,
            rotationX: -4.9,
            rotationY: 2,
            rotationZ: -1.3,
            scale: 0.15,
          }}
          speed={0.003}
          newFlower={useFBXLoader('flowers/1621FlowerTest(Blender)4.fbx')}
        />

        {/* sixth flower */}
        <PointLight
          state={{
            color: 'yellow',
            position: [-23, 7, 27],
            intensity: 1.8,
            distance: 25,
          }}
        />
        <PointLight
          state={{
            color: 'red',
            position: [-35, 2, 20],
            intensity: 5,
            distance: 25,
          }}
        />
        <Flower
          state={{
            positionX: -28,
            positionY: -7,
            positionZ: 24,
            rotationX: -4.5,
            rotationY: 2.1,
            rotationZ: -1.9,
            scale: 0.2,
          }}
          newFlower={useFBXLoader('flowers/1621FlowerTest(Blender)5.fbx')}
        />

        {/* foreground grassy hills */}
        <group rotation={[0, -2.7, 0]} scale={[0.5, 0.5, 0.5]} position={[-50, 0, 0]}>
          <GrassHill position={[1, -7, 1]} rotation={[0.1, -0.3, 0]} />
          <GrassHill position={[-90, -5, 1]} rotation={[0.1, -0.3, 0]} />
          <GrassHill position={[-90, -5, -100]} rotation={[0.1, -4, 0]} />
        </group>
      </group>
    </>
  )
}

function Sphere({ geometry, x, y, z, s }) {
  const ref = useRef()
  useFrame(state => {
    ref.current.position.x = x + Math.sin((state.clock.getElapsedTime() * s) / 2)
    ref.current.position.y = y + Math.sin((state.clock.getElapsedTime() * s) / 2)
    ref.current.position.z = z + Math.sin((state.clock.getElapsedTime() * s) / 2)
  })
  return (
    <mesh ref={ref} position={[x, y, z]} scale={[s, s, s]} geometry={geometry}>
      <meshStandardMaterial attach="material" color="hotpink" roughness={1} />
    </mesh>
  )
}

function RandomSpheres() {
  const [geometry] = useState(() => new THREE.IcosahedronBufferGeometry(1, 4), [])
  const data = useMemo(() => {
    return new Array(15).fill().map((_, i) => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      z: Math.random() * 100 - 50,
      s: Math.random() + 10,
    }))
  }, [])
  return data.map((props, i) => <Sphere key={i} {...props} geometry={geometry} />)
}

function Bloom({ children }) {
  const { gl, camera, size } = useThree()
  const ref = useResource()
  const composer = useRef()
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
  useEffect(() => void ref.current && composer.current.setSize(size.width, size.height), [size])
  useFrame(() => ref.current && composer.current.render(), 1)
  return (
    <>
      <scene ref={ref}>{children}</scene>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={ref.current} camera={camera} />
        <unrealBloomPass attachArray="passes" args={[aspect, 1.5, 1, 0]} />
      </effectComposer>
    </>
  )
}

function Main({ children }) {
  const scene = useRef()
  const { gl, camera } = useThree()
  useFrame(
    () => void ((gl.autoClear = false), gl.clearDepth(), gl.render(scene.current, camera)),
    2,
  )
  return <scene ref={scene}>{children}</scene>
}

const FirstScene = ({ store }) => {
  const [skyboxHeight, setSkyboxHeight] = useState(getSkyboxSize(getFOV()))

  return (
    <Canvas colorManagement shadowMap camera={{ position: [-5, 1.11, 75], fov: getFOV() }}>
      <OrbitControls />
      <Provider store={store}>
        <Main>
          <SkyBox skyboxHeight={skyboxHeight} />
          <hemisphereLight intensity={0.8} skyColor={'blue'} groundColor={0xf9cc6b} />
          <ambientLight intensity={0.3} color={'purple'} />
          <Suspense fallback={<Loader />}>
            <FlowersAndHills />
          </Suspense>
        </Main>
        <Bloom>
          <ambientLight />
          <RandomSpheres />
        </Bloom>
      </Provider>
    </Canvas>
  )
}
export { FirstScene }
