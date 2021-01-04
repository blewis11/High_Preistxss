import React from 'react'
import * as THREE from 'three'

const SkyBox = () => {
  var directions = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']
  var skyGeometry = new THREE.CubeGeometry(150, 150, 150)
  var materialArray = []
  for (var i = 0; i < 6; i++)
    materialArray.push(
      new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('scene1_backgroundv2/' + directions[i]),
        side: THREE.BackSide,
      }),
    )
  // var skyMaterial = new THREE.MeshFaceMaterial(materialArray)
  var skyBox = new THREE.Mesh(skyGeometry, materialArray)
  return <primitive object={skyBox} rotation={[0, 3.1, 0]} />
}

export { SkyBox }
