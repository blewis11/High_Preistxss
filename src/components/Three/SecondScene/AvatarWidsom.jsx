import React, { useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import { useFBXLoader } from 'drei'

const AvatarWisdom = ({ state, wisdomAvatarRef }) => {
  const avatar = useFBXLoader('avatars/WisdomFloat.fbx')

  const [mixer] = useState(() => new THREE.AnimationMixer())

  useEffect(() => {
    wisdomAvatarRef.current.children[1].material[1].shininess = 500
    wisdomAvatarRef.current.children[1].material[1].reflectivity = 500
    wisdomAvatarRef.current.children[1].material[1].specular = new THREE.Color('orange')
  })

  useEffect(
    () =>
      void mixer.clipAction(wisdomAvatarRef.current.animations[0], wisdomAvatarRef.current).play(),
    [],
  )
  useFrame(() => {
    mixer.update(0.03)
  })

  return (
    <>
      <primitive
        object={avatar}
        ref={wisdomAvatarRef}
        position={[5.5, -1.3, -16.6]}
        scale={[0.02, 0.02, 0.02]}
        rotation={[0, -0.33, 0]}
      />
    </>
  )
}

export { AvatarWisdom }
