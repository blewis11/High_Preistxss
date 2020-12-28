import React, { useRef } from 'react'
import { EffectComposer, SelectiveBloom } from 'react-postprocessing'

const LightSource = ({ lightRef, show_light }) => {
  const selectiveBloomRef = useRef()
  const cylinderGeometryRef = useRef()

  return (
    <>
      <mesh position={[-10, 0, -10]} ref={lightRef}>
        <cylinderGeometry attach="geometry" args={[4, 2, 100, 32]} ref={cylinderGeometryRef} />
        <meshBasicMaterial attach="material" color={0xd9b1e2} transparent={true} opacity={0.7} />
        <EffectComposer>
          <SelectiveBloom
            ref={selectiveBloomRef}
            selection={lightRef}
            luminanceThreshold={0.001}
            intensity={2.5}
          />
        </EffectComposer>
      </mesh>
    </>
  )
}

export { LightSource }
