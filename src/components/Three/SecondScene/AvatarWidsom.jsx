import React, { useState, useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'
import { useFBXLoader } from 'drei'

const AvatarWisdom = ({ state, wisdomAvatarRef }) => {
  const avatar = useFBXLoader('WisdomAnimation.fbx')

  const { camera, scene } = useThree()
  const [mixer] = useState(() => new THREE.AnimationMixer())

  let loader = new THREE.CubeTextureLoader()
  loader.setPath('scene1_background/')
  let textureCube = loader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'nz.jpg', 'pz.jpg'])

  avatar.children[0].material[1].envMap = textureCube
  avatar.children[0].shininess = 500

  useEffect(() => {
    const onMouseMove = event => {
      var mouse = new THREE.Vector2()

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)

      let intersects = raycaster.intersectObjects(scene.children, true)
      if (intersects.length > 0 && wisdomAvatarRef.current) {
        let matchingIntersects = intersects.filter(
          item => item.object.parent.uuid === wisdomAvatarRef.current.uuid,
        )

        if (matchingIntersects.length > 0) {
          mixer.clipAction(wisdomAvatarRef.current.animations[0], wisdomAvatarRef.current).play()
        } else {
          mixer.stopAllAction()
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove, false)
  }, [])

  useFrame(() => {
    mixer.update(0.03)
  })

  return (
    <>
      <primitive
        object={avatar}
        ref={wisdomAvatarRef}
        position={[24, 5, -70]}
        scale={[0.04, 0.04, 0.04]}
        rotation={[0, -0.33, 0]}
        envMap={textureCube}
      />
    </>
  )
}

export { AvatarWisdom }
