import React, { useRef, useEffect } from "react"
import { Perlin } from '../helpers/perlin'
import { ground } from '../helpers/rawGrassCode'
import verticesData from './vertices.json'

const CustomHill = ({position}) => {
  const terrainRef = useRef()

  useEffect(() => {
    const terrain = terrainRef.current
    console.log({terrain})
    let peak = 40
    let smoothing = 300
    let perlin = new Perlin()
    
    const vertices = terrain.geometry.attributes.position.array
    let verticesIndex = 0

    for (let i = 0; i <= vertices.length; i += 3) {
      // var noiseResult = peak * perlin.noise(
      //   vertices[i]/smoothing, 
      //   vertices[i+1]/smoothing
      // )
      
      const vertexData = verticesData.data[verticesIndex]

      vertices[i+2] = vertexData
      verticesIndex += 1
    }
    
    terrain.geometry.attributes.position.needsUpdate = true
    terrain.geometry.computeVertexNormals()
    terrain.rotation.x = -Math.PI / 2
    terrain.rotation.z = 1.5
  })

  return (
    <>
      <mesh ref={terrainRef} position={[-450,-10,-150]}>
        <planeBufferGeometry attach="geometry" args={[1000, 500, 256, 256]}/>
        <meshLambertMaterial attach="material" />
      </mesh>
    </>
  )
}

const Hill = ({position}) => {
  return (
    <primitive object={ground.clone()} position={position} />
  )
}

export {
  Hill,
  CustomHill
}
