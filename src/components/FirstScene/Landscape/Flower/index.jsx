import React, { useEffect, useState, useRef } from "react"
import { useFrame } from 'react-three-fiber'
import { useGLTFLoader } from "drei"
import * as THREE from "three"

const Flower = () => {
  const gltfRef = useRef()
  const directionalLightRef = useRef()
  const gltf = useGLTFLoader("TestFlowerAnimation.gltf")

  useEffect(() => { 
    // position flower in scene 
    gltf.scene.position.x = 0
    gltf.scene.position.y = -50
    gltf.scene.position.z = 300
  })

  const [ mixer ] = useState(() => new THREE.AnimationMixer())  
  useEffect(() => void mixer.clipAction(gltf.animations[0], gltfRef.current).play(), [])

  useFrame(() => {
    mixer.update(0.001)
  })

  return (
    <>
    <spotLight
          color={0xc9a7d3}
          castShadow
          position={[0, -30,300]}
          intensity={0.5} 
          ref={directionalLightRef}   
      />
      <primitive object={gltf.scene} dispose={null} ref={gltfRef} />
    </>
  )
}

export { 
  Flower
}
