import React, { useRef, useEffect, useState } from 'react'
import { grass } from '../helpers/rawGrassCode'
import { useFrame } from 'react-three-fiber'

import { Hill } from '../Hill'

const GrassHill = ({ position, rotation }) => {
  const ref = useRef()

  const [time, setTime] = useState(0)

  let lastFrame = Date.now()
  let thisFrame

  useEffect(() => {
    grass.traverse(object => {
      object.frustumCulled = false
    })
  })

  useFrame(() => {
    thisFrame = Date.now()
    let dT = (thisFrame - lastFrame) / 500.0
    setTime(time + dT)
    lastFrame = thisFrame
    ref.current.material.uniforms.time.value = time
  })

  return (
    <group position={position} rotation={rotation}>
      <primitive ref={ref} object={grass.clone()} />
      <Hill />
    </group>
  )
}

export { GrassHill, Hill }
