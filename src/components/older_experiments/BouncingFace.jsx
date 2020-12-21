import React, { Suspense, useRef, useState, useEffect } from "react"
import { useFrame } from "react-three-fiber"
import { useFBXLoader } from "drei"
import * as THREE from 'three'
const BouncingFace = () => {
  const object = useRef()

  const fbx = useFBXLoader("test_for_sven.fbx")
  fbx.position.y = -50
  const [mixer] = useState(() => new THREE.AnimationMixer())  
  useEffect(() => void mixer.clipAction(fbx.animations[0], object.current).play(), [])

  useFrame(() => {
    mixer.update(0.01)
  })

  return <primitive object={fbx} dispose={null} ref={object}/>
}

const BouncingFaceExample = () => {
  return (
    <>
        {/* This light makes things look pretty */}
        <ambientLight intensity={0.3} />
        {/* Our main source of light, also casting our shadow */}
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* A light to help illumnate the spinning boxes */}
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <group>
          <Suspense fallback={null}>
            <BouncingFace />
          </Suspense>
        </group>
    </>
  )
}

export {
  BouncingFaceExample
}
