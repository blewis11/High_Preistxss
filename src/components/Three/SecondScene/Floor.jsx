import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { Html, useTextureLoader } from 'drei'
import DatGui, { DatNumber } from 'react-dat-gui'
import { RectLight } from './RectLight.jsx'
import { AvatarWisdom } from './AvatarWidsom.jsx'

const App = ({ state, setState }) => {
  const handleUpdate = newData =>
    setState(prevState => {
      console.log({ newData })
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

const Floor = ({ wisdomAvatarRef }) => {
  const planeRef = useRef()
  const [state, setState] = useState({
    data: {
      positionX: 29.8,
      positionY: 2.5,
      positionZ: -4.1,
      rotation: 0.94,
    },
  })

  const floorTexture = useTextureLoader('marble_floor.jpeg')

  if (floorTexture) {
    floorTexture.wrapS = floorTexture.wrapT = THREE.MirroredRepeatWrapping
    floorTexture.repeat.set(15, 15)
    floorTexture.anisotropy = 16
  }

  const wallTexture = useTextureLoader('guided_wall_texture.jpg')

  return (
    <>
      <axesHelper />
      {/* <Html>
        <div style={{ width: '500px', background: 'blue' }}>
          <App state={state} setState={setState} />
        </div>
      </Html> */}
      <AvatarWisdom state={state} wisdomAvatarRef={wisdomAvatarRef} />
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
        <mesh position={[30, 2.4, -45.8]} ref={planeRef} rotation={[0, -0.95, 0]}>
          <planeGeometry attach="geometry" args={[52, 27, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* front left */}
        <mesh position={[-10.4, 2.5, 9.9]} ref={planeRef} rotation={[0, 2.83, 0]}>
          <planeGeometry attach="geometry" args={[50, 27, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* front right */}
        <mesh position={[29.8, 2.5, -4.1]} ref={planeRef} rotation={[0, 0.94, 0]}>
          <planeGeometry attach="geometry" args={[55, 27, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>

        <RectLight />
      </group>
    </>
  )
}

export { Floor }
