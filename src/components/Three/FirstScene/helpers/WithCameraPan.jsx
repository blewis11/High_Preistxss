import { useState, useEffect } from 'react'

import { useThree, useFrame } from 'react-three-fiber'
import * as THREE from 'three'

const WithCameraPan = () => {
  const { camera, scene } = useThree()

  let [mouse, setMouse] = useState(new THREE.Vector2())
  let [target, setTarget] = useState(new THREE.Vector2())

  let [windowHalf, setWindowHalf] = useState(
    new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
  )

  useFrame(() => {
    setTarget(new THREE.Vector2(0.005 * mouse.x, 0.005 * mouse.y))

    camera.position.x += 0.03 * (target.x - camera.position.x)
    camera.position.y += 0.03 * (target.y - camera.position.y)

    camera.lookAt(scene.position) //added to keep view in center. feel free to try with and without
  })

  useEffect(() => {
    const onMouseMove = event => {
      setMouse(new THREE.Vector2(windowHalf.x - event.clientX, windowHalf.y - event.clientY))
    }

    const onResize = event => {
      const width = window.innerWidth
      const height = window.innerHeight
      setWindowHalf(new THREE.Vector2(width / 2, height / 2))
    }

    document.addEventListener('mousemove', onMouseMove, false)
    window.addEventListener('resize', onResize, false)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return null
}

export { WithCameraPan }
