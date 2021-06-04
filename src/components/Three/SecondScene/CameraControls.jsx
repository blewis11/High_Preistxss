import React from 'react'
import CameraControls from 'camera-controls'
import * as THREE from 'three'
import { useThree, useFrame } from 'react-three-fiber'

const clock = new THREE.Clock()
CameraControls.install({ THREE: THREE })

const EPS = 1e-5

const CameraController = ({
  cameraRef
}) => {
  const { camera, gl } = useThree()
  const cameraControls = new CameraControls(camera, gl.domElement)
  cameraControls.dollySpeed = 0
  cameraControls.azimuthRotateSpeed = -0.3 // negative value to invert rotation direction
  cameraControls.polarRotateSpeed = -0.3 // negative value to invert rotation direction
  cameraControls.truckSpeed = (1 / EPS) * 3
  cameraControls.mouseButtons.wheel = CameraControls.ACTION.ZOOM
  cameraControls.touches.two = CameraControls.ACTION.TOUCH_ZOOM_TRUCK
  cameraControls.saveState()

  cameraRef.current = cameraControls

  useFrame(() => {
    const delta = clock.getDelta()
    cameraControls.update(delta)
  })

  return null
}



export { EPS }
export default CameraController
