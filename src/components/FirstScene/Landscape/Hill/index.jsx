import React, { useRef } from "react"
import { ground } from '../RawGrassCode'

const Hill = ({position, rotation, color}) => {
  return (
    <primitive object={ground.clone()} />
  )
}

export {
  Hill
}
