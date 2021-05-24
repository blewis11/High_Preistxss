import React, { useEffect } from 'react'
import CameraControls from 'camera-controls'
import * as THREE from 'three'
import { useThree, useFrame } from 'react-three-fiber'

const clock = new THREE.Clock()
CameraControls.install({ THREE: THREE })

const EPS = 1e-5

const CameraController = ({ wisdomAvatarRef }) => {
  const { camera, gl, scene } = useThree()
  const cameraControls = new CameraControls(camera, gl.domElement)
  cameraControls.dollySpeed = 0
  cameraControls.azimuthRotateSpeed = -0.3 // negative value to invert rotation direction
  cameraControls.polarRotateSpeed = -0.3 // negative value to invert rotation direction
  cameraControls.truckSpeed = (1 / EPS) * 3
  cameraControls.mouseButtons.wheel = CameraControls.ACTION.ZOOM
  cameraControls.touches.two = CameraControls.ACTION.TOUCH_ZOOM_TRUCK
  cameraControls.saveState()

  useFrame(() => {
    const delta = clock.getDelta()
    cameraControls.update(delta)
  })

  useEffect(() => {
    const onClick = event => {
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
          cameraControls.fitToBox(wisdomAvatarRef.current, true)
          cameraControls.rotateTo(-0.3, 1.56, true)
        }
      }
    }

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
          document.body.style.cursor = 'pointer'
        } else {
          document.body.style.cursor = 'default'
        }
      }
    }

    document.addEventListener('click', onClick, false)
    document.addEventListener('mousemove', onMouseMove, false)
  })

  return null
}

export { CameraController, EPS }
