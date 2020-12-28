import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { useFBXLoader, useTextureLoader } from 'drei'

import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'

import * as THREE from 'three'

const Flower = ({ state, newFlower }) => {
  const flowerRef = useRef()

  useEffect(() => {
    console.log({ flower: flowerRef.current })
    window.flower = flowerRef.current
    newFlower.scale.set(state.scale, state.scale, state.scale)
    newFlower.rotation.y = state.rotationY
    newFlower.rotation.x = state.rotationX
    newFlower.rotation.z = state.rotationZ
  })

  const [mixer] = useState(() => new THREE.AnimationMixer())
  useEffect(() => void mixer.clipAction(newFlower.animations[0], flowerRef.current).play(), [])
  useFrame(() => {
    mixer.update(0.002)
  })

  // const textureFlare0 = useTextureLoader('lensflare0.png')
  // const lensflare = new Lensflare()
  // lensflare.addElement(new LensflareElement(textureFlare0, 50, 0, light.color))
  // light.add(lensflare)

  // useFrame(() => {
  //   const time = Date.now() * 0.0005

  //   light.position.x = 5 - Math.sin(time * 0.7)
  //   light.position.y = Math.cos(time * 0.5)
  //   light.position.z = Math.cos(time * 0.3) - 14
  // })

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
