import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { OrbitControls, useFBXLoader, useTextureLoader } from 'drei'
import DatGui, { DatNumber } from 'react-dat-gui'

import { GrassHill } from './Landscape/Grass'
import { CustomHill } from './Landscape/Hill'
import { Flower } from './Landscape/Flower'

import * as THREE from 'three'

import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'

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

  return <primitive object={skyBox} rotation={[0, 3.1, 0]} />
}

const FirstScene = () => {
  const [state, setState] = useState({
    positionX: -25,
    positionY: 75,
    positionZ: 82,
    rotationX: -4,
    rotationY: 1.2,
    rotationZ: -2.5,
    scale: 0.2,
  })

  const handleUpdate = newData => {
    console.log({ newData })
    setState({ ...state.data, ...newData })
  }

  return (
    <>
      <Canvas colorManagement shadowMap camera={{ position: [-87, -1, -0.2], fov: 35 }}>
        <color attach="background" args={['grey']} />
        <fog attach="fog" args={[0xcbced2, 1, 800]} />

        {/* debugging helpers */}
        <axisHelper args={25} />
        <Suspense fallback={null}>
          <SkyBox />
        </Suspense>
        <group position={[0, -5, 0]}>
          <Suspense fallback={null}>
            {/* <FlowerTemp state={state} /> */}
            <Flower
              state={{
                positionX: -45,
                positionY: 60,
                positionZ: 62,
                rotationX: -4,
                rotationY: 1.2,
                rotationZ: -2.5,
                scale: 0.15,
              }}
              newFlower={useFBXLoader('flowers/Flower0.fbx')}
            />
          </Suspense>

          <hemisphereLight args={[0x080820, 0xffdaec, 1]} />
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
      </Canvas>
      {/* <DatGui data={state} onUpdate={handleUpdate} className={'header-major'}>
        <DatNumber path="positionX" label="positionX" min={-500} max={500} step={1} />
        <DatNumber path="positionY" label="positionY" min={-500} max={500} step={1} />
        <DatNumber path="positionZ" label="positionZ" min={-500} max={500} step={1} />
        <DatNumber path="rotationX" label="rotationX" min={-10} max={10} step={0.1} />
        <DatNumber path="rotationY" label="rotationY" min={-10} max={10} step={0.1} />
        <DatNumber path="rotationZ" label="rotationZ" min={-10} max={10} step={0.1} />
        <DatNumber path="scale" label="scale" min={-1} max={1} step={0.05} />
      </DatGui> */}
    </>
  )
}

export { FirstScene, HeaderGrass }
