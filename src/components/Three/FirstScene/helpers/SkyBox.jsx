import React from 'react'
import * as THREE from 'three'

const SkyBox = ({ skyboxHeight }) => {
  let directions = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']
  let skyGeometry = new THREE.CubeGeometry(skyboxHeight, skyboxHeight, skyboxHeight)
  let materialArray = []

  for (let i = 0; i < 6; i++)
    materialArray.push(
      new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('scene1_backgroundv3/' + directions[i]),
        side: THREE.BackSide,
      }),
    )

  let skyBox = new THREE.Mesh(skyGeometry, materialArray)

  return <primitive object={skyBox} rotation={[0, 3.05, 0]} position={[0, -6, 0]} />
}

export { SkyBox }
