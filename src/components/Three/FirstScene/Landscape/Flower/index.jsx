import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { useFBXLoader, useTextureLoader } from 'drei'

import * as THREE from 'three'

const Flower = ({ state, newFlower }) => {
  const flowerRef = useRef()

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

const FlowerGLTF = ({ state, newFlower }) => {
  const flowerRef = useRef()

  const petalsTexture = useTextureLoader('Petals_ColorMap.jpg')
  const specularMap = useTextureLoader('Petals_GlossMap.jpg')

  useEffect(() => {
    // newFlower.materials['defaultMat'].map = petalsTexture
    newFlower.materials['defaultMat'].specular = new THREE.Color('orange')
    newFlower.materials['defaultMat'].shininess = 50
    // newFlower.materials['defaultMat'].specularMap = specularMap

    window.flower = flowerRef.current
    newFlower.scene.scale.set(state.scale, state.scale, state.scale)
    newFlower.scene.rotation.y = state.rotationY
    newFlower.scene.rotation.x = state.rotationX
    newFlower.scene.rotation.z = state.rotationZ
  })

  const [mixer] = useState(() => new THREE.AnimationMixer())
  useEffect(() => void mixer.clipAction(newFlower.animations[0], flowerRef.current).play(), [])
  useFrame(() => {
    mixer.update(0.003)
  })

  return (
    <>
      <primitive
        object={newFlower.scene}
        ref={flowerRef}
        position={[state.positionX, state.positionY, state.positionZ]}
      />
    </>
  )
}

export { Flower, FlowerGLTF }
