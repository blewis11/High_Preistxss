import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { OrbitControls, useFBXLoader, useTextureLoader, Stats } from 'drei'
import DatGui, { DatNumber, DatColor } from 'react-dat-gui'

import Effects from './Effect.jsx'

import { GrassHill } from './Landscape/Grass'
import { Flower } from './Landscape/Flower'

import * as THREE from 'three'

import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'
import { ObjectLoader } from 'three'

const HeaderGrass = () => {
  return (
    <div className="header-major">
      <span style={{ color: 'white', padding: '15px', fontSize: '20px' }}>Test Grass Render</span>
      <br />
    </div>
  )
}

const FlowerTemp = ({ state }) => {
  const newFlower = useFBXLoader('flowers/Flower1.fbx')
  const flowerRef = useRef()

  useEffect(() => {
    newFlower.scale.set(state.scale, state.scale, state.scale)
    newFlower.rotation.y = state.rotationY
    newFlower.rotation.x = state.rotationX
    newFlower.rotation.z = state.rotationZ
  })

  const [mixer] = useState(() => new THREE.AnimationMixer())
  useEffect(() => void mixer.clipAction(newFlower.animations[0], flowerRef.current).play(), [])
  useFrame(() => {
    mixer.update(0.002)
  })

  const light = new THREE.PointLight(0xff0040, 1, 30)

  const textureFlare0 = useTextureLoader('lensflare0.png')
  const lensflare = new Lensflare()
  lensflare.addElement(new LensflareElement(textureFlare0, 50, 0, light.color))
  light.add(lensflare)

  useFrame(() => {
    const time = Date.now() * 0.0005

    light.position.x = 5 - Math.sin(time * 0.7)
    light.position.y = Math.cos(time * 0.5)
    light.position.z = Math.cos(time * 0.3) - 14
  })

  return (
    <>
      {/* <primitive object={light} /> */}
      <primitive
        object={newFlower}
        ref={flowerRef}
        position={[state.positionX, state.positionY, state.positionZ]}
      />
    </>
  )
}

const SkyBox = () => {
  const { gl } = useThree()
  window.gl = gl
  var directions = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']
  var skyGeometry = new THREE.CubeGeometry(150, 150, 150)
  var materialArray = []

  for (var i = 0; i < 6; i++)
    materialArray.push(
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('scene1_backgroundv2/' + directions[i]),
        side: THREE.BackSide,
      }),
    )

  var skyMaterial = new THREE.MeshFaceMaterial(materialArray)
  var skyBox = new THREE.Mesh(skyGeometry, skyMaterial)

  return (
    <>
      <primitive object={skyBox} rotation={[0, 3.1, 0]} position={[0, -5, 0]} />
    </>
  )
}

const PointLight = ({ state }) => {
  const sphere = new THREE.SphereBufferGeometry(0.1, 16, 8)
  const light = new THREE.PointLight(state.color, state.intensity, state.distance)
  light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: light.color })))
  light.decay = 2
  return <primitive object={light} position={state.position} />
}

const FirstScene = () => {
  const [state, setState] = useState({
    intensity: 1.3,
    positionX: -39,
    positionY: 5,
    positionZ: -9,
  })

  const handleUpdate = newData => {
    console.log({ newData })
    setState({ ...state.data, ...newData })
  }

  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-65, -1, -0.2], fov: 35 }}
        onClick={() => console.log('click')}
      >
        <color attach="background" args={['grey']} />

        {/* debugging helpers */}
        {/* <axisHelper args={25} /> */}
        <Stats />
        {/* <hemisphereLight intensity={0.5} skyColor={0x9a6c9b} groundColor={'pink'} /> */}
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <SkyBox />
        </Suspense>
        <group position={[10, -5, 0]}>
          <Suspense fallback={null}>
            {/* <FlowerTemp state={state} /> */}
            <PointLight
              state={{ color: 'red', position: [-54, 2, 8], intensity: 1.5, distance: 25 }}
            />
            <Flower
              state={{
                positionX: -30,
                positionY: 60,
                positionZ: 62,
                rotationX: -4,
                rotationY: 1.2,
                rotationZ: -2.5,
                scale: 0.15,
              }}
              newFlower={useFBXLoader('flowers/Flower0.fbx')}
            />
            <PointLight
              state={{
                color: 0xb22121,
                position: [-39, 5, -9],
                intensity: 1.3,
                distance: 25,
              }}
            />
            <Flower
              state={{
                positionX: 15,
                positionY: 74,
                positionZ: 26,
                rotationX: -5,
                rotationY: 0.6,
                rotationZ: -1.7,
                scale: 0.15,
              }}
              newFlower={useFBXLoader('flowers/Flower2.fbx')}
            />
            <Flower
              state={{
                positionX: 19,
                positionY: 86,
                positionZ: 52,
                rotationX: -4.3,
                rotationY: 0.8,
                rotationZ: -2.8,
                scale: 0.15,
              }}
              newFlower={useFBXLoader('flowers/Flower3.fbx')}
            />

            <PointLight
              state={{ color: 'red', position: [-54, 2, 8], intensity: 1.5, distance: 25 }}
            />
            <Flower
              state={{
                positionX: -17,
                positionY: 96,
                positionZ: 26,
                rotationX: -5.5,
                rotationY: 0.6,
                rotationZ: -1.7,
                scale: 0.15,
              }}
              newFlower={useFBXLoader('flowers/Flower4.fbx')}
            />
            <Flower
              state={{
                positionX: 25,
                positionY: 66,
                positionZ: 40,
                rotationX: -5.5,
                rotationY: 0.6,
                rotationZ: -1.7,
                scale: 0.101,
              }}
              newFlower={useFBXLoader('flowers/Flower5.fbx')}
            />
            <Flower
              state={{
                positionX: 25,
                positionY: 36,
                positionZ: 40,
                rotationX: -4.4,
                rotationY: 0.6,
                rotationZ: -2.1,
                scale: 0.101,
              }}
              newFlower={useFBXLoader('flowers/Flower6.fbx')}
            />
          </Suspense>

          <Suspense fallback={null}>
            {/* foreground grassy hills */}
            <group rotation={[0, -2.7, 0]} scale={[0.5, 0.5, 0.5]} position={[-50, 0, 0]}>
              <GrassHill position={[1, -7, 1]} rotation={[0.1, -0.3, 0]} />
              <GrassHill position={[-90, -5, 1]} rotation={[0.1, -0.3, 0]} />
              <GrassHill position={[-90, -5, -100]} rotation={[0.1, -4, 0]} />
            </group>
            <OrbitControls />
          </Suspense>
        </group>
        <Effects />
      </Canvas>
      {/* <DatGui data={state} onUpdate={handleUpdate} className={'header-major'}>
        <DatNumber path="positionX" label="positionX" min={-500} max={500} step={1} />
        <DatNumber path="positionY" label="positionY" min={-500} max={500} step={1} />
        <DatNumber path="positionZ" label="positionZ" min={-500} max={500} step={1} />
        <DatNumber path="intensity" label="intensity" min={0} max={5} step={0.1} />
      </DatGui> */}
    </>
  )
}

export { FirstScene, HeaderGrass }
