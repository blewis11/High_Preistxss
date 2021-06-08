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
      return { data: { ...prevState.data, ...newData } }
    })

  return (
    <DatGui data={state.data} onUpdate={handleUpdate}>
      <DatNumber path="rotation" label="rotation" step={0.05} />
      <DatNumber path="scale" label="scale" step={0.01} />
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
      positionY: -1,
      positionZ: 36,
      rotation: -0.095,
      scale: 0.11,
    },
  })

  const wallTexture = useTextureLoader('wallpapersketch3blaustichig.jpg')
  const ceilingTexture = useTextureLoader('21-06-07_ceiling6.jpg')

  let loader = new THREE.CubeTextureLoader()
  loader.setPath('envmap3/')
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

  var healthSpotLight = new THREE.SpotLight(0xe3b6e1, 1)
  healthSpotLight.distance = 100
  healthSpotLight.angle = 0.52
  healthSpotLight.position.set(0, 30, -2)
  healthSpotLight.target.position.set(50, 0, 5)

  var exchangeSpotLight = new THREE.SpotLight(0xe3b6e1, 1)
  exchangeSpotLight.distance = 100
  exchangeSpotLight.angle = 0.52
  exchangeSpotLight.position.set(0, 30, -2)
  exchangeSpotLight.target.position.set(-53, 0, 26)

  var growthSpotLight = new THREE.SpotLight(0xe3b6e1, 3)
  growthSpotLight.distance = 100
  growthSpotLight.angle = 0.3
  growthSpotLight.position.set(0, 30, -2)
  growthSpotLight.target.position.set(-24, 15, -24)

  var joySpotLight = new THREE.SpotLight(0xe3b6e1, 1)
  joySpotLight.distance = 100
  joySpotLight.angle = 0.52
  joySpotLight.position.set(0, 30, -2)
  joySpotLight.target.position.set(0, 0, 39)

  var wisdomSpotLight = new THREE.SpotLight(0xe3b6e1, 3)
  wisdomSpotLight.distance = 100
  wisdomSpotLight.angle = 0.2
  wisdomSpotLight.position.set(0, 30, -2)
  wisdomSpotLight.target.position.set(12, 0, -66)

  return (
    <>
      {/* <Html>
        <div style={{ width: '500px', background: 'blue' }}>
          <App state={state} setState={setState} />
        </div>
      </Html> */}

      <group ref={wisdomGroupRef}>
        <primitive object={wisdomSpotLight} />
        <primitive object={wisdomSpotLight.target} />
        <Avatar
          state={state}
          avatarRef={wisdomAvatarRef}
          avatar={wisdom}
          position={[24, 5, -70]}
          rotation={-0.33}
          scale={0.04}
        />
        <Plinth
          plinth={useFBXLoader('plinth/WisdomPlinth4.fbx')}
          position={[24, -1, -70]}
          rotation={1.25}
          plinthRef={wisdomPlinthRef}
        />
      </group>

      {/* position={[state.data.positionX, state.data.positionY, state.data.positionZ]} */}
      <group ref={growthGroupRef}>
        <primitive object={growthSpotLight} />
        <primitive object={growthSpotLight.target} />
        <Avatar
          state={state}
          avatarRef={growthAvatarRef}
          avatar={growth}
          position={[-52, 8, -36]}
          rotation={-3.95}
          scale={4.85}
        />
        <Plinth
          plinth={useFBXLoader('plinth/GrowthPlinth4.fbx')}
          position={[-52, -1, -38]}
          rotation={-3.7}
          plinthRef={growthPlinthRef}
        />
      </group>

      <group ref={healthGroupRef}>
        <primitive object={healthSpotLight} />
        <primitive object={healthSpotLight.target} />
        <Avatar
          state={state}
          avatarRef={healthAvatarRef}
          avatar={health}
          position={[66, 6, 0]}
          rotation={-1.4}
          scale={0.11}
        />
        <Plinth
          plinth={useFBXLoader('plinth/HealthPlinth4.fbx')}
          position={[66, -1, 0]}
          rotation={0.05}
          plinthRef={healthPlinthRef}
        />
      </group>

      <group ref={joyGroupRef}>
        <primitive object={joySpotLight} />
        <primitive object={joySpotLight.target} />
        <Avatar
          state={state}
          avatarRef={joyAvatarRef}
          avatar={joy}
          position={[22, 12, 68]}
          rotation={-1.4}
          scale={0.015}
        />
        <Plinth
          plinth={useFBXLoader('plinth/JoyPlinth4.fbx')}
          position={[22, -1, 69]}
          rotation={-1.35}
          plinthRef={joyPlinthRef}
        />
      </group>

      <group ref={exchangeGroupRef}>
        <primitive object={exchangeSpotLight} />
        <primitive object={exchangeSpotLight.target} />
        <Avatar
          state={state}
          avatarRef={exchangeAvatarRef}
          avatar={exchange}
          position={[-48, 11, 36]}
          rotation={-4.05}
          scale={state.data.scale}
        />
        <Plinth
          plinth={useFBXLoader('plinth/ExchangePlinth4.fbx')}
          position={[-48, -1, 36]}
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
