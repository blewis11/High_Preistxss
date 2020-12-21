import React, { useRef, useEffect, useState } from "react"
import { grass } from '../RawGrassCode'
import { useFrame } from 'react-three-fiber'

import { Hill } from '../Hill'
import { Flower } from '../Flower'

const GrassHill = ({position, rotation}) => {
  const ref = useRef()

  const [ time, setTime ] = useState(0)

  let lastFrame = Date.now()
  let thisFrame

  useEffect(() => { 
    ref.current.frustumCulled = false
  })

  useFrame(() => {
    thisFrame = Date.now()
    let dT = (thisFrame - lastFrame)/500.0
    setTime(time + dT)
    lastFrame = thisFrame
    ref.current.material.uniforms.time.value = time
  })

  return (
    <group position={position} rotation={rotation}>
      <Flower />
      <primitive ref={ref} object={grass.clone()} /> 
      <Hill />
    </group>
  )
}

export {
  GrassHill,
  Hill
}
