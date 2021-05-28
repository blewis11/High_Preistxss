import React from 'react'
import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'

const RectLight = ({ state }) => {
  RectAreaLightUniformsLib.init()
  const rectLight1 = new THREE.RectAreaLight('red', 20, 25, 25)
  const helper = new RectAreaLightHelper(rectLight1)

  return (
    <>
      <group position={[0, 37, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <primitive object={rectLight1} />
        <primitive object={helper} />
      </group>
    </>
  )
}

export { RectLight }
