import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { Html, useTextureLoader } from 'drei'
import DatGui, { DatNumber } from 'react-dat-gui'
import { RectLight } from './RectLight.jsx'
import { Avatar } from './Avatar'
import { Plinth } from './Plinth.jsx'
import { useFBXLoader } from 'drei'

const App = ({ state, setState }) => {
  const handleUpdate = newData =>
    setState(prevState => {
      console.log({ newData })
      return { data: { ...prevState.data, ...newData } }
    })

  return (
    <DatGui data={state.data} onUpdate={handleUpdate}>
      <DatNumber path="rotation" label="rotation" step={0.05} />
      <DatNumber path="scale" label="scale" step={0.01} />
      <DatNumber path="positionX" label="positionx" step={0.1} />
      <DatNumber path="positionY" label="positiony" step={0.1} />
      <DatNumber path="positionZ" label="positionz" step={0.1} />
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

const Floor = ({
  wisdomAvatarRef,
  growthAvatarRef,
  healthAvatarRef,
  joyAvatarRef,
  exchangeAvatarRef,
  wisdomPlinthRef,
  growthPlinthRef,
  healthPlinthRef,
  joyPlinthRef,
  exchangePlinthRef,
  wisdomGroupRef,
  growthGroupRef,
  healthGroupRef,
  joyGroupRef,
  exchangeGroupRef,
}) => {
  const [state, setState] = useState({
    data: {
      positionX: -48,
      positionY: 1,
      positionZ: 36,
      rotation: -0.095,
      scale: 0.11,
    },
  })

  const wallTexture = useTextureLoader('wallpapersketch3blaustichig.jpg')
  const ceilingTexture = useTextureLoader('ceiling2.jpg')

  let loader = new THREE.CubeTextureLoader()
  loader.setPath('scene1_background/')
  let textureCube = loader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'nz.jpg', 'pz.jpg'])

  const wisdom = useFBXLoader('avatars/Wisdom.fbx')
  wisdom.children[0].material.map(m => (m.envMap = textureCube))

  const growth = useFBXLoader('avatars/Growth.fbx')
  growth.children.map(c => (c.material.envMap = textureCube))

  const health = useFBXLoader('avatars/Health.fbx')
  health.children.map(c => (c.material.envMap = textureCube))

  const joy = useFBXLoader('avatars/Joy.fbx')
  joy.children.map(c => {
    if (c.material) {
      c.material.envMap = textureCube
    }
  })

  const exchange = useFBXLoader('avatars/Exchange.fbx')
  exchange.children.map(c => (c.material.envMap = textureCube))

  return (
    <>
      {/* <Html>
        <div style={{ width: '500px', background: 'blue' }}>
          <App state={state} setState={setState} />
        </div>
      </Html> */}
      <group ref={wisdomGroupRef}>
        <Avatar
          state={state}
          avatarRef={wisdomAvatarRef}
          avatar={wisdom}
          position={[24, 5, -70]}
          rotation={-0.33}
          scale={0.04}
        />
        <Plinth
          plinth={useFBXLoader('plinth/WisdomPlinth3.fbx')}
          position={[23, 1, -67.5]}
          rotation={1.25}
          plinthRef={wisdomPlinthRef}
        />
      </group>

      <group ref={growthGroupRef}>
        <Avatar
          state={state}
          avatarRef={growthAvatarRef}
          avatar={growth}
          position={[-52, 8, -36]}
          rotation={-3.95}
          scale={4.85}
        />
        <Plinth
          plinth={useFBXLoader('plinth/GrowthPlinth3.fbx')}
          position={[-51.2, 1, -38]}
          rotation={-3.7}
          plinthRef={growthPlinthRef}
        />
      </group>

      <group ref={healthGroupRef}>
        <Avatar
          state={state}
          avatarRef={healthAvatarRef}
          avatar={health}
          position={[66, 6, 0]}
          rotation={-1.4}
          scale={0.11}
        />
        <Plinth
          plinth={useFBXLoader('plinth/HealthPlinth3.fbx')}
          position={[63.1, 1, 0]}
          rotation={0.05}
          plinthRef={healthPlinthRef}
        />
      </group>

      <group ref={joyGroupRef}>
        <Avatar
          state={state}
          avatarRef={joyAvatarRef}
          avatar={joy}
          position={[22, 12, 68]}
          rotation={-1.4}
          scale={0.015}
        />
        <Plinth
          plinth={useFBXLoader('plinth/JoyPlinth3.fbx')}
          position={[21.7, 1, 67.3]}
          rotation={-1.35}
          plinthRef={joyPlinthRef}
        />
      </group>

      <group ref={exchangeGroupRef}>
        <Avatar
          state={state}
          avatarRef={exchangeAvatarRef}
          avatar={exchange}
          position={[-48, 11, 36]}
          rotation={-4.05}
          scale={state.data.scale}
        />
        <Plinth
          plinth={useFBXLoader('plinth/ExchangePlinth3.fbx')}
          position={[-45.9, 1, 34.2]}
          rotation={-2.45}
          plinthRef={exchangePlinthRef}
        />
      </group>

      <group position={[0, 7, 26]}>
        {/* bottom  */}
        <mesh position={[0, -11, -25]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry attach="geometry" args={[145.5, 5]} />
          <meshPhysicalMaterial
            attach="material"
            color={0x0b072c}
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
