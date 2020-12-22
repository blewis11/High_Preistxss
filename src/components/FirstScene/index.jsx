import React, { Suspense, useRef } from "react"
import { Canvas } from "react-three-fiber"
import { OrbitControls, Stats } from "drei"

import { SkyBoxExample } from '../older_experiments/SkyBox'
import { GrassHill } from './Landscape/Grass'
import { CustomHill } from './Landscape/Hill'
import { LightSource } from './LightSource'

const HeaderGrass = () => {
  return (
    <div className="header-major">
      <span style={{ color: "white", padding: "15px", fontSize: "20px" }}>Test Grass Render</span><br/>
    </div>
  )
}

const FirstScene = () => {
  const lightRef = useRef()
  
  return (
    <Canvas
        colorManagement
        shadowMap
        camera={{ position: [79, 5, 38], fov: 35 }}>
        <color attach="background" args={["grey"]}   />
      
      <SkyBoxExample />
      <Suspense fallback={null}> 
        {/* <LightSource lightRef={lightRef} /> */}

        {/* foreground grassy hills */}
        <GrassHill position={[1,-7,1]} rotation={[0.1,-0.3,0]} />
        <GrassHill position={[-90,-5,1]} rotation={[0.1,-0.3,0]}  />
        <GrassHill position={[-90,-5,-100]} rotation={[0.1,-0.3,0]}  />

        {/* background plain hills */}
        <CustomHill position={[-90,0,-100]}/>
        <OrbitControls />
      </Suspense> 
      <Stats />
    </Canvas>
  )
}

export {
  FirstScene,
  HeaderGrass
}
