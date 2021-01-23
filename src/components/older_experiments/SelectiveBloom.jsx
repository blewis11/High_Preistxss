import * as THREE from 'three'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, extend, useThree, useFrame, useResource } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import './styles.css'

extend({ EffectComposer, RenderPass, UnrealBloomPass })

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
const App = () => {
  return (
    <Canvas colorManagement={false} camera={{ position: [0, 0, 120] }}>
      <Main>
        <pointLight />
        <ambientLight />
        <RandomSpheres />
      </Main>
      <Bloom>
        <ambientLight />
        <RandomSpheres />
      </Bloom>
    </Canvas>
  )
}
export default App
