import React, { Suspense, useRef } from "react"
import { Canvas } from "react-three-fiber"
import { OrbitControls, Stats, useFBXLoader } from "drei"

import { SkyBoxExample } from '../older_experiments/SkyBox'
import { GrassHill } from './Landscape/Grass'
import { CustomHill } from './Landscape/Hill'
import { Flower } from './Landscape/Flower'
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
        camera={{ position: [79, 3, 38], fov: 35 }}>
        <color attach="background" args={["grey"]}   />
        <fog attach="fog" args={[0xcbced2, 230, 800]} />

        {/* debugging helpers */}
        {/* <axisHelper args={25}/> */}
        <Stats />

        <SkyBoxExample path={'scene1_background/'} images={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']}/>
        <Suspense fallback={null}> 
          {/* <LightSource lightRef={lightRef} /> */}

          {/* foreground grassy hills */}
          <GrassHill position={[1,-7,1]} rotation={[0.1,-0.3,0]} />
          <GrassHill position={[-90,-5,1]} rotation={[0.1,-0.3,0]}  />
          <GrassHill position={[-90,-5,-100]} rotation={[0.1,-0.3,0]}  />

          {/* flowers */}
          <Flower position={[0,-6,30]} rotationY={-0.7} rotationZ={-0.7} scale={0.1} />
          {/* <Flower position={[0,-6,-30]} rotationY={-0.7} rotationZ={-0.7} scale={0.2} /> */}

          {/* background plain hills */}
          <CustomHill position={[-90,0,-100]}/>
          <OrbitControls />
      </Suspense> 
    </Canvas>
  )
}

export {
  FirstScene,
  HeaderGrass
}
