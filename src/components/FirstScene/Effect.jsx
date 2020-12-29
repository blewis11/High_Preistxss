import React, { useRef, useState, useEffect } from 'react'

import { detect } from 'detect-browser'
import MobileDetect from 'mobile-detect'

import { WebGLMultisampleRenderTarget, RGBAFormat, sRGBEncoding } from 'three'
import { extend, useThree, useFrame } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { ColorCorrectionShader } from 'three/examples/jsm/shaders/ColorCorrectionShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

import mergeRefs from 'react-merge-refs'

extend({ EffectComposer, RenderPass, ShaderPass, UnrealBloomPass })

const isWebGL2Available = () => {
  try {
    let canvas = document.createElement('canvas')
    let isAvailable = !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'))
    console.log(`is available: ${isAvailable}`)
    return isAvailable
  } catch (e) {
    console.log(`is not available`)
    return false
  }
}

const Effects = React.forwardRef(
  ({ children, multisamping = 8, renderIndex = 1, ...props }, ref) => {
    const composer = useRef()
    const { scene, camera, gl, size } = useThree()
    const [target] = useState(() => {
      if (isWebGL2Available() && multisamping > 0) {
        const t = new WebGLMultisampleRenderTarget(size.width, size.height, {
          format: RGBAFormat,
          encoding: sRGBEncoding,
        })
        t.samples = 8
        return t
      }
    })

    useEffect(() => {
      composer.current.setSize(size.width, size.height)
      composer.current.setPixelRatio(gl.getPixelRatio())
    }, [gl, size])

    useFrame(() => composer.current.render(), renderIndex)

    const shader = ColorCorrectionShader
    shader.uniforms['powRGB'].value.set(0.85, 1, 0.85)
    shader.uniforms['mulRGB'].value.set(0.9, 0.9, 1)

    const browser = detect()

    let effectsEnabled

    switch (browser.name) {
      case 'safari':
        effectsEnabled = false
        break
      default:
        effectsEnabled = true
    }

    let isMobile = new MobileDetect(window.navigator.userAgent).mobile() !== null
    console.log({ isMobile })

    return (
      <effectComposer ref={mergeRefs([ref, composer])} args={[gl, target]} {...props}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        {effectsEnabled && !isMobile && <shaderPass attachArray="passes" args={[shader]} />}
      </effectComposer>
    )
  },
)

export default Effects
