import React from 'react'
import * as THREE from 'three'

const PointLight = ({ state }) => {
  const sphere = new THREE.SphereBufferGeometry(0.1, 16, 8)
  const light = new THREE.PointLight(state.color, state.intensity, state.distance)
  // light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: light.color })))
  light.decay = 2
  return <primitive object={light} position={state.position} />
}

export { PointLight }
