import React, { Suspense, useRef } from "react"
import { Canvas, useThree, useFrame } from "react-three-fiber"
import { OrbitControls, Stats, useFBXLoader, useGLTFLoader } from "drei"

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
  // const lightRef = useRef() 

  return (
    <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-87, 3.36, 0.65], fov: 35 }}>
        <color attach="background" args={["grey"]}   />
        <fog attach="fog" args={[0xcbced2, 1, 800]} />

        {/* debugging helpers */}
        <axisHelper args={25}/>
        <Stats />

        <ambientLight intensity={1} />
        <SkyBoxExample path={'scene1_backgroundv2/'} images={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']}/>
        <Suspense fallback={null}> 
          {/* <LightSource lightRef={lightRef} /> */}

          {/* foreground grassy hills */}
          <group rotation={[0,-2.7,0]} >
            <GrassHill position={[1,-7,1]} rotation={[0.1,-0.3,0]} />
            <GrassHill position={[-90,-5,1]} rotation={[0.1,-0.3,0]}  />
            <GrassHill position={[-90,-5,-100]} rotation={[0.1,-0.3,0]}  />
          `  {/* flowers */}
            <Flower position={[0,-6,-30]} rotationY={-0.7} rotationZ={-0.7} scale={0.1} fbx={useFBXLoader("flowers/Flower1.fbx")} />
            <Flower position={[4,-4,-25]} rotationY={-2} rotationZ={-0.7} scale={0.2} fbx={useFBXLoader("flowers/Flower2.fbx")}/>

            <Flower position={[0,-12, 30]} rotationY={-0.7} rotationZ={-0.7} scale={0.1} fbx={useFBXLoader("flowers/Flower3.fbx")} />
            <Flower position={[-5,-12, 30]} rotationY={-2} rotationZ={-0.9} scale={0.15} fbx={useFBXLoader("flowers/Flower4.fbx")}/>

            <Flower position={[-35,-10, 15]} rotationY={-2} rotationZ={-0.7} scale={0.2} fbx={useFBXLoader("flowers/Flower5.fbx")}/>
            
            <Flower position={[-135,-15, 35]} rotationY={-0.5} rotationZ={-0.7} scale={0.1} fbx={useFBXLoader("flowers/Flower6.fbx")}/>
            <Flower position={[-145,-15, 25]} rotationY={-2} rotationZ={-0.7} scale={0.3} fbx={useFBXLoader("flowers/Flower7.fbx")}/>

            <Flower position={[45,-2, -15]} rotationY={-2} rotationZ={-0.7} scale={0.2} fbx={useFBXLoader("flowers/Flower8.fbx")}/>
            <Flower position={[-145, -3, -180]} rotationY={-1.5} rotationZ={-0.7} scale={0.1} fbx={useFBXLoader("flowers/Flower9.fbx")}/>

            {/* background plain hills */}
            <CustomHill position={[-90,0,-100]}/>
          </group>
          <OrbitControls/>
      </Suspense> 
    </Canvas>
  )
}

export {
  FirstScene,
  HeaderGrass
}
