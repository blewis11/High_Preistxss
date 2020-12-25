import React, { useRef, useEffect, useState } from "react"
import { grass, ground } from './GrassRaw'
import { useGLTFLoader } from "drei"
import { useFrame, useThree } from 'react-three-fiber'

import * as THREE from "three"

const Hill = ({position, rotation, color}) => {
  const groundRef = useRef()
  return (
    <primitive object={ground.clone()} ref={groundRef} />
  )
}

const GrassHill = ({position, rotation}) => {
  const ref = useRef()
  const gltfRef = useRef()
  const directionalLightRef = useRef()
  const groundRef = useRef()

  const { camera } = useThree()

  const gltf = useGLTFLoader("TestFlowerAnimation.gltf")

  const [ mixer ] = useState(() => new THREE.AnimationMixer())  
  useEffect(() => void mixer.clipAction(gltf.animations[0], gltfRef.current).play(), [])

  useFrame(() => {
    mixer.update(0.001)
  })

  let lastFrame = Date.now()
  let thisFrame
  let time = 0

  useEffect(() => { 
    ref.current.frustumCulled = false
    camera.layers.enable(2)
    // position flower in scene 
    gltf.scene.position.x = 0
    gltf.scene.position.y = -50
    gltf.scene.position.z = 300
  
    gltf.scene.traverse((object) => {
      object.layers.set(2)
    })

    groundRef.current.layers.set(0)
    directionalLightRef.current.layers.set(2) 
  })

  useFrame(() => {
    thisFrame = Date.now()
    let dT = (thisFrame - lastFrame)/500.0
    time += dT	
    lastFrame = thisFrame
    ref.current.material.uniforms.time.value = time
  })

  return (
    <group position={position} rotation={rotation}>
      <spotLight
          color={0xc9a7d3}
          castShadow
          position={[0, -30,300]}
          intensity={0.5} 
          ref={directionalLightRef} 
      />
    
      <primitive object={gltf.scene} dispose={null} ref={gltfRef} />
      <primitive ref={ref} object={grass.clone()} /> 
      <primitive object={ground.clone()} ref={groundRef} />
      <mesh>
        <cylinderBufferGeometry args={[1, 1, 10, 32]} />
        <meshLambertMaterial color={'pink'} />
      </mesh>
    </group>
  )
}

export {
  GrassHill
}
