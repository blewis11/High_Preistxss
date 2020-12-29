import React from 'react'
import { ground } from '../helpers/rawGrassCode'

const Hill = ({ position }) => {
  return <primitive object={ground.clone()} position={position} />
}

export { Hill }
