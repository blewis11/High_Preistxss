import React, { useEffect } from 'react'
import { useThree } from 'react-three-fiber'
import { connect } from 'react-redux'
import { setSelectedAvatar, setAvatarSelected } from '../../../redux/Avatar/actions'
import * as THREE from 'three'

const CameraMovements = ({
  selectedAvatar,
  wisdomAvatarRef,
  growthAvatarRef,
  healthAvatarRef,
  joyAvatarRef,
  exchangeAvatarRef,
  wisdomPlinthRef,
  growthPlinthRef,
  healthPlinthRef,
  joyPlinthRef,
  exchangePlinthRef,
  wisdomGroupRef,
  growthGroupRef,
  healthGroupRef,
  joyGroupRef,
  exchangeGroupRef,
  setSelectedAvatar,
  setAvatarSelected,
  cameraRef,
}) => {
  const { camera, scene } = useThree()

  useEffect(() => {
    const cameraControls = cameraRef
    if (selectedAvatar === 'health') {
      cameraControls.current.fitToBox(healthGroupRef.current, true)
      cameraControls.current.rotateTo(-1.5, 1.56, true)
    }

    if (selectedAvatar === 'joy') {
      cameraControls.current.fitToBox(joyGroupRef.current, true)
      cameraControls.current.rotateTo(-3, 1.56, true)
    }

    if (selectedAvatar === 'wisdom') {
      cameraControls.current.fitToBox(wisdomGroupRef.current, true)
      cameraControls.current.rotateTo(-0.3, 1.56, true)
    }

    if (selectedAvatar === 'exchange') {
      cameraControls.current.fitToBox(exchangeGroupRef.current, true)
      cameraControls.current.rotateTo(2.2, 1.56, true)
    }

    if (selectedAvatar === 'growth') {
      cameraControls.current.fitToBox(growthGroupRef.current, true)
      cameraControls.current.rotateTo(1, 1.56, true)
    }
  })

  useEffect(() => {
    const onClick = event => {
      var mouse = new THREE.Vector2()

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)

      let intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
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

        let matchingWisdownIntersectsPlinth = intersects.filter(
          item => item.object.parent.uuid === wisdomPlinthRef.current.uuid,
        )

        let matchingGrowthIntersectsPlinth = intersects.filter(
          item => item.object.parent.uuid === growthPlinthRef.current.uuid,
        )

        let matchingHealthIntersectsPlinth = intersects.filter(
          item => item.object.parent.uuid === healthPlinthRef.current.uuid,
        )

        let matchingJoyIntersectsPlinth = intersects.filter(
          item => item.object.parent.uuid === joyPlinthRef.current.uuid,
        )

        let matchingExchangeIntersectsPlinth = intersects.filter(
          item => item.object.parent.uuid === exchangePlinthRef.current.uuid,
        )

        if (matchingWisdownIntersectsPlinth.length > 0 && window.location.pathname !== '/explore') {
          setSelectedAvatar('wisdom')
        }

        if (matchingGrowthIntersectsPlinth.length > 0 && window.location.pathname !== '/explore') {
          setSelectedAvatar('growth')
        }

        if (matchingHealthIntersectsPlinth.length > 0 && window.location.pathname !== '/explore') {
          setSelectedAvatar('health')
        }

        if (matchingJoyIntersectsPlinth.length > 0 && window.location.pathname !== '/explore') {
          setSelectedAvatar('joy')
        }

        if (
          matchingExchangeIntersectsPlinth.length > 0 &&
          window.location.pathname !== '/explore'
        ) {
          setSelectedAvatar('exchange')
        }

        if (matchingWisdownIntersects.length > 0) {
          setAvatarSelected(true)
        }

        if (matchingGrowthIntersects.length > 0) {
          setAvatarSelected(true)
        }

        if (matchingHealthIntersects.length > 0) {
          setAvatarSelected(true)
        }

        if (matchingJoyIntersects.length > 0) {
          setAvatarSelected(true)
        }

        if (matchingExchangeIntersects.length > 0) {
          setAvatarSelected(true)
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
            item.object.parent.uuid === exchangeAvatarRef.current.uuid ||
            item.object.parent.uuid === wisdomPlinthRef.current.uuid ||
            item.object.parent.uuid === growthPlinthRef.current.uuid ||
            item.object.parent.uuid === healthPlinthRef.current.uuid ||
            item.object.parent.uuid === joyPlinthRef.current.uuid ||
            item.object.parent.uuid === exchangePlinthRef.current.uuid,
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
  setAvatarSelected: avatar => {
    dispatch(setAvatarSelected(avatar))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraMovements)
