import React, { useRef, useEffect } from 'react'
import { extend, useThree, useFrame } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'

import { ColorCorrectionShader } from 'three/examples/jsm/shaders/ColorCorrectionShader'

extend({ EffectComposer, ShaderPass, RenderPass, SSAOPass, UnrealBloomPass, BokehPass })

export default function Effects() {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()

  useEffect(() => void composer.current.setSize(size.width, size.height), [size])

  useFrame(() => composer.current.render(), 2)

  const shader = ColorCorrectionShader
  shader.uniforms[ 'powRGB' ].value.set( 0.85, 1, 0.85 )

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass
        attachArray="passes"
        args={[shader]}
      />
    </effectComposer>
  )
}
