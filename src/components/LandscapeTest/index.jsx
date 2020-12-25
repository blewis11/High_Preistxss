import React, { useEffect, useRef } from "react"
import { Canvas } from "react-three-fiber"
import { OrbitControls, useGLTFLoader, Stats } from "drei"

const LandscapeExample = () => {
  const gltf = useGLTFLoader("landscape2.gltf")
  const ref = useRef()
  
  useEffect(() => {
    gltf.materials[""].metalness = 0
  })

  const nodes = gltf.nodes

  return (
    <Canvas
        colorManagement
        shadowMap
        camera={gltf.cameras[0]}>
        {/* <directionalLight 
          castShadow
          position={[0, 10, 0]}
          intensity={0.5}
        /> */}
        {/* <pointLight object={gltf.nodes['Light1']} dispose={null} ref={ref}/> */}

        <primitive object={gltf.scene} dispose={null} />
        <OrbitControls />
        <Stats showPanel={0}/>  
    </Canvas>
  )
}

const HeaderLandscape = () => {
  return (
    <div className="header-major">
      <span style={{ color: "white", padding: "15px" }}>Test Landscape Render</span>
    </div>
  )
}

export {
  LandscapeExample,
  HeaderLandscape
}
