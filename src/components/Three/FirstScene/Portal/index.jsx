import React, { useRef, useEffect, useState } from 'react'
import { useThree, useFrame } from 'react-three-fiber'
import { Sphere } from 'drei'
import * as THREE from 'three'
import { connect } from 'react-redux'
import {
  setMouseOverPortal,
  setEnlargePortal,
  setFadeToBlack,
  setSceneNumber
} from '../../../../redux/State/actions'
import * as createjs from 'createjs-module'

const Portal = ({
  setEnlargePortal,
  enlargePortal,
  textureCube,
  setMouseOverPortal,
  mouseOverPortal,
  setFadeToBlack,
  gotoSecondScene
}) => {
  var ref = useRef()
  const { camera, scene } = useThree()

  useEffect(() => {
    if (ref.current) {
      const portal = ref.current
      createjs.Tween.get(portal.position, { loop: true })
        .to({ y: 0.8 }, 1000, createjs.Ease.sineInOut)
        .wait(0)
        .to({ y: 0.5 }, 1000, createjs.Ease.sineInOut)
    }
  })

  useEffect(() => {
    if (mouseOverPortal) {
      const portal = ref.current
      createjs.Tween.get(portal.scale).to(
        { x: 1.05, y: 1.05, z: 1.05 },
        200,
        createjs.Ease.cubicInOut,
      )
    }

    if (!mouseOverPortal) {
      const portal = ref.current
      createjs.Tween.get(portal.scale).to({ x: 1, y: 1, z: 1 }, 200, createjs.Ease.cubicInOut)
    }

    if (enlargePortal) {
      window.setTimeout(() => {
        const portal = ref.current
        createjs.Tween.get(portal.scale).to({ x: 15, y: 15, z: 15 }, 2000, createjs.Ease.cubicInOut)
          .call(
            window.setTimeout(() => {
              gotoSecondScene()
            }, 2000)
          )
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
    <Sphere args={[6, 50, 50]} ref={ref} position={[0, 0.5, 0]}>
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
  gotoSecondScene: () => {
    dispatch(setSceneNumber(2))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Portal)
