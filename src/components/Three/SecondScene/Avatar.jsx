import React, { useState, useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'
import { useFBXLoader } from 'drei'
import * as createjs from 'createjs-module'
import { resolvePtr } from 'dns'

const Avatar = ({ state, avatarRef, avatar, position, rotation, scale }) => {
  const { camera, scene } = useThree()
  const [mixer] = useState(() => new THREE.AnimationMixer())

  useEffect(() => {
    createjs.Tween.get(avatarRef.current.position, { loop: true })
      .to({ y: position[1] + 0.5 }, 1000, createjs.Ease.sineInOut)
      .wait(0.5)
      .to({ y: position[1] }, 1000, createjs.Ease.sineInOut)

    const onMouseMove = event => {
      var mouse = new THREE.Vector2()

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)

      let intersects = raycaster.intersectObjects(scene.children, true)
      if (intersects.length > 0 && avatarRef.current) {
        let matchingIntersects = intersects.filter(
          item => item.object.parent.uuid === avatarRef.current.uuid,
        )

        if (matchingIntersects.length > 0) {
          mixer.clipAction(avatarRef.current.animations[0], avatarRef.current).play()
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
        ref={avatarRef}
        position={position}
        scale={[scale, scale, scale]}
        rotation={[0, rotation, 0]}
      />
    </>
  )
}

export { Avatar }
