import React, { Suspense } from "react"
import { useThree } from "react-three-fiber"
import { useCubeTextureLoader } from "drei"

// Loads the skybox texture and applies it to the scene.
const SkyBox = () => {

  const envMap = useCubeTextureLoader(
    ['skybox_nz.jpg', 'skybox_nx.jpg', 'skybox_py.jpg', 'skybox_ny.jpg', 'skybox_pz.jpg', 'skybox_nz.jpg'], 
    { path: 'cube/' }
  )

  const { scene } = useThree()
  scene.background = envMap
  return null
}

const SkyBoxExample = () => {

  return (
    <>
      <Suspense fallback={null}>
        <SkyBox />
      </Suspense>
    </>
  )
}

export { SkyBoxExample }
