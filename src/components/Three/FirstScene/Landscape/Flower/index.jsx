import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { useTextureLoader } from 'drei'

import * as THREE from 'three'

const Flower = ({ state, newFlower, debug }) => {
  const flowerRef = useRef()

  if (debug === 'debug') {
    console.log({ newFlower })
  }

  const petalsTexture = useTextureLoader('Petals_ColorMap.jpg')
  const specularMap = useTextureLoader('Petals_GlossMap.jpg')

  useEffect(() => {
    // newFlower.children[0].material[4].map = petalsTexture
    newFlower.children[0].material[4].specular = new THREE.Color('orange')
    newFlower.children[0].material[4].shininess = 50
    // newFlower.children[0].material[4].specularMap = specularMap

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
