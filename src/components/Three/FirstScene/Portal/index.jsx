import React, { useRef, useEffect } from 'react'
import { useFBXLoader } from 'drei'

import * as THREE from 'three'

const Portal = () => {
  const ref = useRef()
  const lightRef = useRef()
  const portal = useFBXLoader('Portal2FBX.fbx')

  const targetObject = new THREE.Object3D()
  targetObject.position.set(0, 10, 0)

  const light = new THREE.SpotLight(0xf9cc6b)
  light.position.set(0, 12, 10)
  light.target = targetObject

  useEffect(() => {
    window.material = portal.children[1].material

    for (let i = 0; i < portal.children.length; i++) {
      portal.children[i].material.reflectivity = 0.5
      portal.children[i].material.shininess = 500
    }

    portal.scale.set(0.4, 0.4, 0.4)
  })

  return (
    <>
      <primitive object={light.target} />
      <primitive ref={lightRef} object={light} />
      <primitive ref={ref} object={portal} position={[0, 12, -15]} rotation={[Math.PI, 0, 0]} />
    </>
  )
}

export { Portal }
