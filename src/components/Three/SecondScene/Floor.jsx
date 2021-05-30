import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { Html, useTextureLoader } from 'drei'
import DatGui, { DatNumber } from 'react-dat-gui'
import { RectLight } from './RectLight.jsx'
import { AvatarWisdom } from './AvatarWidsom.jsx'
import { Plinth } from './Plinth.jsx'

const App = ({ state, setState }) => {
  const handleUpdate = newData =>
    setState(prevState => {
      console.log({ newData })
      return { data: { ...prevState.data, ...newData } }
    })

  return (
    <DatGui data={state.data} onUpdate={handleUpdate}>
      <DatNumber path="rotation" label="rotation" step={0.05} />
      <DatNumber path="size" label="size" step={1} />
      <DatNumber path="positionX" label="positionx" step={1} />
      <DatNumber path="positionY" label="positiony" step={1} />
      <DatNumber path="positionZ" label="positionz" step={1} />
    </DatGui>
  )
}

const Mirror = () => {
  const geometry = new THREE.CircleGeometry(160, 64)
  const groundMirror = new Reflector(geometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777,
  })
  // groundMirror.position.y = -6
  groundMirror.rotateX(-Math.PI / 2)

  return (
    <group position={[0, -11.1, 0]}>
      <primitive object={groundMirror} />
    </group>
  )
}

const Floor = ({ wisdomAvatarRef }) => {
  const planeRef = useRef()
  const [state, setState] = useState({
    data: {
      positionX: 6,
      positionY: 64,
      positionZ: -37,
      rotation: -0.3,
      size: 288,
    },
  })

  const floorTexture = useTextureLoader('fliesedunkel3.jpg')

  floorTexture.wrapS = floorTexture.wrapT = THREE.MirroredRepeatWrapping
  floorTexture.repeat.set(40, 40)
  floorTexture.anisotropy = 16

  const wallTexture = useTextureLoader('wallpapersketch3blaustichig.jpg')
  const ceilingTexture = useTextureLoader('desaturated.jpg')
  return (
    <>
      <axesHelper />
      {/* <Html>
        <div style={{ width: '500px', background: 'blue' }}>
          <App state={state} setState={setState} />
        </div>
      </Html> */}
      <AvatarWisdom state={state} wisdomAvatarRef={wisdomAvatarRef} />
      <Plinth />
      <group position={[0, 7, 26]}>
        {/* bottom  */}
        <mesh position={[0, -11, -25]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry attach="geometry" args={[145.5, 5]} />
          <meshPhysicalMaterial
            attach="material"
            color="blue"
            metalness={0.0}
            roughness={0.1}
            clearcoat={1.0}
            transparent
            opacity={0.5}
          />
        </mesh>
        {/* top */}
        <mesh position={[6, 64, -37]} rotation={[-Math.PI / 2, 0, -0.3]}>
          <planeGeometry attach="geometry" args={[288, 288, 100, 32]} />
          <meshStandardMaterial attach="material" map={ceilingTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* back right */}
        <mesh position={[-35, 27.5, -136]} rotation={[0, 0.3, 0]}>
          <planeGeometry attach="geometry" args={[174, 77, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* back left */}
        <mesh position={[-117, 27.5, -25]} rotation={[0, 1.57, 0]}>
          <planeGeometry attach="geometry" args={[171, 77, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* back right */}
        <mesh position={[96, 27.5, -93]} rotation={[0, -0.94, 0]}>
          <planeGeometry attach="geometry" args={[168, 77, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* front left */}
        <mesh position={[-37, 27.5, 86]} rotation={[0, 2.83, 0]}>
          <planeGeometry attach="geometry" args={[172, 77, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* front right */}
        <mesh position={[94, 27.5, 44]} rotation={[0, 0.94, 0]}>
          <planeGeometry attach="geometry" args={[173, 77, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>

        <RectLight />
        <Mirror />
      </group>
    </>
  )
}

export { Floor }
