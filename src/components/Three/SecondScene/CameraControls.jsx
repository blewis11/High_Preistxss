import React, { useEffect } from 'react'
import CameraControls from 'camera-controls'
import * as THREE from 'three'
import { useThree, useFrame } from 'react-three-fiber'
import { connect } from 'react-redux'
import { setSelectedAvatar } from '../../../redux/Avatar/actions'

const clock = new THREE.Clock()
CameraControls.install({ THREE: THREE })

const EPS = 1e-5

const CameraController = ({
  wisdomAvatarRef,
  growthAvatarRef,
  healthAvatarRef,
  joyAvatarRef,
  exchangeAvatarRef,
  selectedAvatar,
  setSelectedAvatar,
}) => {
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
    if (selectedAvatar === 'health') {
      cameraControls.fitToBox(healthAvatarRef.current, true)
      cameraControls.rotateTo(-1.5, 1.56, true)
    }

    if (selectedAvatar === 'joy') {
      cameraControls.fitToBox(joyAvatarRef.current, true)
      cameraControls.rotateTo(-3, 1.56, true)
    }

    if (selectedAvatar === 'wisdom') {
      cameraControls.fitToBox(wisdomAvatarRef.current, true)
      cameraControls.rotateTo(-0.3, 1.56, true)
    }

    if (selectedAvatar === 'exchange') {
      cameraControls.fitToBox(exchangeAvatarRef.current, true)
      cameraControls.rotateTo(2.2, 1.56, true)
    }

    if (selectedAvatar === 'growth') {
      cameraControls.fitToBox(growthAvatarRef.current, true)
      cameraControls.rotateTo(1, 1.56, true)
    }
  }, [selectedAvatar])

  useEffect(() => {
    const onClick = event => {
      var mouse = new THREE.Vector2()

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)

      let intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0 && wisdomAvatarRef.current) {
        let matchingWisdownIntersects = intersects.filter(
          item => item.object.parent.uuid === wisdomAvatarRef.current.uuid,
        )

        let matchingGrowthIntersects = intersects.filter(
          item => item.object.parent.uuid === growthAvatarRef.current.uuid,
        )

        let matchingHealthIntersects = intersects.filter(
          item => item.object.parent.uuid === healthAvatarRef.current.uuid,
        )

        let matchingJoyIntersects = intersects.filter(
          item => item.object.parent.uuid === joyAvatarRef.current.uuid,
        )

        let matchingExchangeIntersects = intersects.filter(
          item => item.object.parent.uuid === exchangeAvatarRef.current.uuid,
        )

        if (matchingWisdownIntersects.length > 0) {
          setSelectedAvatar('wisdom')
        }

        if (matchingGrowthIntersects.length > 0) {
          setSelectedAvatar('growth')
        }

        if (matchingHealthIntersects.length > 0) {
          setSelectedAvatar('health')
        }

        if (matchingJoyIntersects.length > 0) {
          setSelectedAvatar('joy')
        }

        if (matchingExchangeIntersects.length > 0) {
          setSelectedAvatar('exchange')
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
          item =>
            item.object.parent.uuid === wisdomAvatarRef.current.uuid ||
            item.object.parent.uuid === growthAvatarRef.current.uuid ||
            item.object.parent.uuid === healthAvatarRef.current.uuid ||
            item.object.parent.uuid === joyAvatarRef.current.uuid ||
            item.object.parent.uuid === exchangeAvatarRef.current.uuid,
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

const mapStateToProps = state => {
  return {
    selectedAvatar: state.avatar.selectedAvatar,
  }
}

const mapDispatchToProps = dispatch => ({
  setSelectedAvatar: avatar => {
    dispatch(setSelectedAvatar(avatar))
  },
})

export { EPS }
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraController)
