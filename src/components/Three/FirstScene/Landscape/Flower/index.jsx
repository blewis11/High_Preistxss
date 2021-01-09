import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from 'react-three-fiber'

import * as THREE from 'three'

const Flower = ({ state, newFlower, speed }) => {
  const flowerRef = useRef()

  const animationSpeed = speed ? speed : 0.005

  useEffect(() => {
    newFlower.children[1].material[3].specular = new THREE.Color('orange')
    newFlower.children[1].material[3].shininess = 50

    window.flower = flowerRef.current
    newFlower.scale.set(state.scale, state.scale, state.scale)
    newFlower.rotation.y = state.rotationY
    newFlower.rotation.x = state.rotationX
    newFlower.rotation.z = state.rotationZ
  })

  const [mixer] = useState(() => new THREE.AnimationMixer())
  useEffect(() => void mixer.clipAction(newFlower.animations[0], flowerRef.current).play(), [])
  useFrame(() => {
    mixer.update(animationSpeed)
  })

  return (
    <>
      <primitive
        object={newFlower}
        ref={flowerRef}
        position={[state.positionX, state.positionY, state.positionZ]}
      />
    </>
  )
}

export { Flower }
