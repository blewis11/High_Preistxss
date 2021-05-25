import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { Html, useTextureLoader } from 'drei'
import DatGui, { DatNumber } from 'react-dat-gui'
import { RectLight } from './RectLight.jsx'
import { AvatarWisdom } from './AvatarWidsom.jsx'

const App = ({ state, setState }) => {
  const handleUpdate = newData =>
    setState(prevState => {
      return { data: { ...prevState.data, ...newData } }
    })

  return (
    <DatGui data={state.data} onUpdate={handleUpdate}>
      <DatNumber path="positionX" label="positionX" min={-1000} max={1000} step={1} />
      <DatNumber path="positionY" label="positionY" min={-200} max={200} step={0.1} />
      <DatNumber path="positionZ" label="positionZ" min={-1000} max={1000} step={1} />
      <DatNumber path="rotation" label="rotation" min={-5} max={5} step={0.01} />
      <DatNumber path="width" label="width" min={-500} max={500} step={1} />
      <DatNumber path="height" label="height" min={-500} max={500} step={1} />
    </DatGui>
  )
}

const Floor = ({ wisdomAvatarRef }) => {
  const planeRef = useRef()
  const [state, setState] = useState({
    data: {
      height: 47,
      positionX: 24,
      positionY: -1.2,
      positionZ: -70,
      rotation: 0.04,
      width: 173,
    },
  })

  const floorTexture = useTextureLoader('fliesedunkel3.jpg')

  if (floorTexture) {
    floorTexture.wrapS = floorTexture.wrapT = THREE.MirroredRepeatWrapping
    floorTexture.repeat.set(40, 40)
    floorTexture.anisotropy = 16
  }

  const wallTexture = useTextureLoader('wallpaper.jpg')

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
          <circleGeometry attach="geometry" args={[145.5, 5]} />
          <meshStandardMaterial attach="material" map={floorTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* back right */}
        <mesh position={[-35, 27.7, -136]} ref={planeRef} rotation={[0, 0.3, 0]}>
          <planeGeometry attach="geometry" args={[174, 77, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* back left */}
        <mesh position={[-117, 27.7, -25]} ref={planeRef} rotation={[0, 1.57, 0]}>
          <planeGeometry attach="geometry" args={[171, 77, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* back right */}
        <mesh position={[96, 27.7, -93]} ref={planeRef} rotation={[0, -0.94, 0]}>
          <planeGeometry attach="geometry" args={[168, 77, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* front left */}
        <mesh position={[-37, 27.7, 86]} ref={planeRef} rotation={[0, 2.83, 0]}>
          <planeGeometry attach="geometry" args={[172, 77, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* front right */}
        <mesh position={[94, 27.7, 44]} ref={planeRef} rotation={[0, 0.94, 0]}>
          <planeGeometry attach="geometry" args={[173, 77, 100, 32]} />
          <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
        </mesh>

        <RectLight />
      </group>
    </>
  )
}

export { Floor }
