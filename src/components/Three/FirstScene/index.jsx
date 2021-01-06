import React, { Suspense, useState, useEffect } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { useFBXLoader } from 'drei'
import { Provider } from 'react-redux'

import Effects from './Effect.jsx'
import Loader from './helpers/Loader'
import { WithCameraPan } from './helpers/WithCameraPan.jsx'

import { GrassHill } from './Landscape/Grass'
import { Flower } from './Landscape/Flower'

import * as THREE from 'three'

const getFOV = () => {
  let fov = 35

  if (window.innerWidth <= 532) {
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
      skyboxSize = 170
      break

    default:
      skyboxSize = 500
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

const SkyBox = ({ skyboxHeight }) => {
  let directions = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']
  let skyGeometry = new THREE.CubeGeometry(skyboxHeight, skyboxHeight, skyboxHeight)
  let materialArray = []

  for (let i = 0; i < 6; i++)
    materialArray.push(
      new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('scene1_backgroundv2/' + directions[i]),
        side: THREE.BackSide,
      }),
    )

  let skyBox = new THREE.Mesh(skyGeometry, materialArray)

  return <primitive object={skyBox} rotation={[0, -1.6, 0]} position={[0, -10, 0]} />
}

const PointLight = ({ state }) => {
  const light = new THREE.PointLight(state.color, state.intensity, state.distance)
  light.decay = 2
  return <primitive object={light} position={state.position} />
}

const FlowersAndHills = () => {
  return (
    <group position={[0, -5, 0]} scale={[1, 1, 1]} rotation={[0, 1.5, 0]}>
      {/* first flower */}
      <PointLight
        state={{
          color: 0xf9cc6b,
          position: [-7, 7, -32],
          intensity: 5,
          distance: 25,
        }}
      />
      <Flower
        state={{
          positionX: -14,
          positionY: 2,
          positionZ: -29,
          rotationX: 1.5,
          rotationY: 1.5,
          rotationZ: -1.7,
          scale: 0.15,
        }}
        newFlower={useFBXLoader('flowers/1230FlowerTestFBX5.fbx')}
      />

      {/* second flower */}
      <PointLight
        state={{
          color: 0xb22121,
          position: [-39, 5, -9],
          intensity: 5,
          distance: 25,
        }}
      />
      <Flower
        debug={true}
        state={{
          positionX: -42,
          positionY: 3,
          positionZ: -10,
          rotationX: -5,
          rotationY: 1.6,
          rotationZ: -1.5,
          scale: 0.15,
        }}
        newFlower={useFBXLoader('flowers/1230FlowerTestFBX1.fbx')}
      />

      {/* third flower */}
      <Flower
        state={{
          positionX: -14,
          positionY: 4,
          positionZ: -9,
          rotationX: -5.7,
          rotationY: 1,
          rotationZ: -0.7,
          scale: 0.101,
        }}
        newFlower={useFBXLoader('flowers/1230FlowerTestFBX2.fbx')}
      />

      {/* fourth flower */}
      <PointLight state={{ color: 'red', position: [-54, 2, 8], intensity: 1, distance: 25 }} />
      <Flower
        debug={'debug'}
        state={{
          positionX: -45,
          positionY: 3,
          positionZ: 8,
          rotationX: -4.8,
          rotationY: 1.6,
          rotationZ: -1.7,
          scale: 0.12,
        }}
        newFlower={useFBXLoader('flowers/1230FlowerTestFBX6.fbx')}
      />

      {/* fifth flower */}
      <PointLight
        state={{
          color: 0xb22121,
          position: [9, 11, 27],
          intensity: 5,
          distance: 25,
        }}
      />
      <Flower
        state={{
          positionX: -1,
          positionY: 1,
          positionZ: 21,
          rotationX: -4.9,
          rotationY: 1.2,
          rotationZ: -1.3,
          scale: 0.101,
        }}
        newFlower={useFBXLoader('flowers/1230FlowerTestFBX3.fbx')}
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
          position: [-23, 2, 27],
          intensity: 5,
          distance: 25,
        }}
      />
      <Flower
        state={{
          positionX: -28,
          positionY: 2,
          positionZ: 24,
          rotationX: -5,
          rotationY: 1.7,
          rotationZ: -1.7,
          scale: 0.15,
        }}
        newFlower={useFBXLoader('flowers/1230FlowerTestFBX4.fbx')}
      />

      {/* foreground grassy hills */}
      <group rotation={[0, -2.7, 0]} scale={[0.5, 0.5, 0.5]} position={[-50, 0, 0]}>
        <GrassHill position={[1, -7, 1]} rotation={[0.1, -0.3, 0]} />
        <GrassHill position={[-90, -5, 1]} rotation={[0.1, -0.3, 0]} />
        <GrassHill position={[-90, -5, -100]} rotation={[0.1, -4, 0]} />
      </group>
    </group>
  )
}

const FirstScene = ({ store }) => {
  const [skyboxHeight, setSkyboxHeight] = useState(getSkyboxSize(getFOV()))

  return (
    <>
      <Canvas colorManagement shadowMap camera={{ position: [-5, 1.11, 75], fov: getFOV() }}>
        <Provider store={store}>
          <WithResizeDetect setSkyboxHeight={setSkyboxHeight} />
          {/* <WithCameraPan /> */}

          <color attach="background" args={['grey']} />

          <hemisphereLight intensity={0.8} skyColor={'blue'} groundColor={0xf9cc6b} />
          <ambientLight intensity={0.3} color={'purple'} />
          <Suspense fallback={<Loader />}>
            <FlowersAndHills />
          </Suspense>
          <SkyBox skyboxHeight={skyboxHeight} />
          <Effects />
        </Provider>
      </Canvas>
    </>
  )
}

export { FirstScene }
