import React, { useEffect, useState, useRef, Suspense } from "react"
import { useFrame } from 'react-three-fiber'
import { useFBXLoader } from "drei"
import * as THREE from "three"

const Flower = ({position, rotationY, rotationZ, scale, fbx}) => {
  const fbxRef = useRef()
  const lightRef = useRef()

  useEffect(() => {
    // position flower in scene 
    fbx.scale.set(scale,scale,scale)
    fbx.rotation.y = rotationY
    fbx.rotation.z = rotationZ
  })

  const [ mixer ] = useState(() => new THREE.AnimationMixer())  
  useEffect(() => void mixer.clipAction(fbx.animations[0], fbxRef.current).play(), [])
  useFrame(() => {
    mixer.update(0.002)
  })

  return (
    <Suspense fallback={null}>
      <primitive object={fbx} dispose={null} ref={fbxRef} position={position}/>
    </Suspense>
  )
}

export { 
  Flower
}
