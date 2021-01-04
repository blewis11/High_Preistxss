import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from 'react-three-fiber'

import * as THREE from 'three'

const Flower = ({ state, newFlower, debug }) => {
  const flowerRef = useRef()

  useEffect(() => {
    newFlower.children[0].material[4].specular = new THREE.Color('orange')
    newFlower.children[0].material[4].shininess = 50

    window.flower = flowerRef.current
    newFlower.scale.set(state.scale, state.scale, state.scale)
    newFlower.rotation.y = state.rotationY
    newFlower.rotation.x = state.rotationX
    newFlower.rotation.z = state.rotationZ
  })

  const [mixer] = useState(() => new THREE.AnimationMixer())
  useEffect(() => void mixer.clipAction(newFlower.animations[0], flowerRef.current).play(), [])
  useFrame(() => {
    mixer.update(0.005)
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
