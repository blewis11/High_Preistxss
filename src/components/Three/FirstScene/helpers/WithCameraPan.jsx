import React, { useState, useEffect, useRef } from 'react'

import { useThree, useFrame } from 'react-three-fiber'
import { OrbitControls } from 'drei'
import * as THREE from 'three'

const WithCameraPan = () => {
  const orbitRef = useRef()

  const { camera } = useThree()

  let [mouse, setMouse] = useState(new THREE.Vector2())
  let [target, setTarget] = useState(new THREE.Vector2())

  let [windowHalf, setWindowHalf] = useState(
    new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
  )

  useFrame(() => {
    setTarget(new THREE.Vector2((1 - mouse.x) * 0.002, (1 - mouse.y) * 0.002))


    if (camera.rotation.x > -0.09 && camera.rotation.x < 0.09) {
      camera.rotation.x += 0.02 * (target.y - camera.rotation.x)
    }

    if (camera.rotation.x > -0.09) {

    }

    // camera is below threshold but we're moving up
    if (camera.rotation.x < -0.09 && 0.02 * (target.y - camera.rotation.x) > camera.rotation.x) {
      console.log(`check 2`)
      camera.rotation.x += 0.02 * (target.y - camera.rotation.x)
    }

    camera.rotation.y += 0.02 * (target.x - camera.rotation.y)
  })

  useEffect(() => {
    const onMouseMove = event => {
      setMouse(new THREE.Vector2(event.clientX - windowHalf.x, event.clientY - windowHalf.x))
    }

    const onResize = event => {
      const width = window.innerWidth
      const height = window.innerHeight
      setWindowHalf(new THREE.Vector2(width / 2, height / 2))
    }

    document.addEventListener('mousemove', onMouseMove, false)
    window.addEventListener('resize', onResize, false)
  }, [])

  return null
}

export { WithCameraPan }
