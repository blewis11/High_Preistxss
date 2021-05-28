import React from 'react'
import { useFBXLoader } from 'drei'

const Plinth = ({ state }) => {
  const plinth = useFBXLoader('plinth.fbx')

  return (
    <>
      <primitive
        object={plinth}
        position={[24, -1.2, -70]}
        scale={[0.04, 0.04, 0.04]}
        rotation={[0, -0.33, 0]}
      />
    </>
  )
}

export { Plinth }
