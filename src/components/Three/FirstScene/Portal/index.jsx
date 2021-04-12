import React, { useRef, useEffect } from 'react'
import { useThree, useFrame } from 'react-three-fiber'
import { Sphere } from 'drei'
import * as THREE from 'three'
import { connect } from 'react-redux'
import {
  setMouseOverPortal,
  setEnlargePortal,
  setFadeToBlack,
} from '../../../../redux/State/actions'

const Portal = ({
  setEnlargePortal,
  enlargePortal,
  textureCube,
  setMouseOverPortal,
  mouseOverPortal,
  setFadeToBlack,
}) => {
  var ref = useRef()
  const { camera, scene } = useThree()

  console.log({ mouseOverPortal })
  useFrame(() => {
    if (enlargePortal) {
      window.setTimeout(() => {
        const portal = ref.current
        var radius = portal.geometry.parameters.radius
        var scale = radius * 0.1 // adjust the multiplier to whatever
        portal.scale.x += scale
        portal.scale.y += scale
        portal.scale.z += scale
      }, 100)
    }
  })
  useEffect(() => {
    const onClick = event => {
      var mouse = new THREE.Vector2()

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)

      let intersects = raycaster.intersectObjects(scene.children)

      if (intersects.length > 0) {
        let matchingIntersects = intersects.filter(item => item.object.uuid === ref.current.uuid)

        if (matchingIntersects.length > 0) {
          setEnlargePortal(true)
          setFadeToBlack()
        }
      }
    }

    const onMouseOver = event => {
      var mouse = new THREE.Vector2()

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)

      let intersects = raycaster.intersectObjects(scene.children)

      if (intersects.length > 0) {
        let matchingIntersects = intersects.filter(item => item.object.uuid === ref.current.uuid)

        if (matchingIntersects.length > 0 && !mouseOverPortal) {
          setMouseOverPortal(true)
        }

        if (matchingIntersects.length === 0) {
          setMouseOverPortal(false)
        }
      }
    }

    document.addEventListener('click', onClick, false)
    document.addEventListener('mousemove', onMouseOver, false)
  }, [])

  return (
    <Sphere args={[5, 50, 50]} ref={ref}>
      <meshPhysicalMaterial
        envMap={textureCube}
        attach="material"
        color="blue"
        metalness={0.0}
        roughness={0.1}
        clearcoat={1.0}
      />
    </Sphere>
  )
}

const mapStateToProps = state => {
  return {
    mouseOverPortal: state.state.mouseOverPortal,
    enlargePortal: state.state.enlargePortal,
  }
}

const mapDispatchToProps = dispatch => ({
  setMouseOverPortal: value => {
    dispatch(setMouseOverPortal(value))
  },
  setEnlargePortal: value => {
    dispatch(setEnlargePortal(value))
  },
  setFadeToBlack: () => {
    dispatch(setFadeToBlack())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Portal)
