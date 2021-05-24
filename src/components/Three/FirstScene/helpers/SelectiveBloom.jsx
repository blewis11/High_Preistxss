import React from 'react'

const vertexShader = `
  varying vec2 vUv;

  void main() {

    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  }
`

const fragmentShader = `
  uniform sampler2D baseTexture;
  uniform sampler2D bloomTexture;

  varying vec2 vUv;

  void main() {

    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

  }
`

const ENTIRE_SCENE = 0,
  BLOOM_SCENE = 1

const bloomLayer = new THREE.Layers()
bloomLayer.set(BLOOM_SCENE)

const params = {
  exposure: 1,
  bloomStrength: 5,
  bloomThreshold: 0,
  bloomRadius: 0,
  scene: 'Scene with Glow',
}

const SelectiveBloom = () => {
  return null
}
