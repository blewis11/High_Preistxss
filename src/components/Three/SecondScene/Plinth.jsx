import React from 'react'

const Plinth = ({ state, position, rotation, plinth }) => {
  return (
    <>
      <primitive
        object={plinth}
        position={position}
        scale={[0.04, 0.04, 0.04]}
        rotation={[0, rotation, 0]}
      />
    </>
  )
}

export { Plinth }
