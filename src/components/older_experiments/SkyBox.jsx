import React, { Suspense } from "react"
import { useThree } from "react-three-fiber"
import { useCubeTextureLoader } from "drei"

// Loads the skybox texture and applies it to the scene.
const SkyBox = ({path, images}) => {
  const envMap = useCubeTextureLoader(
    images, 
    { path }
  )

  const { scene } = useThree()
  scene.background = envMap
  return null
}

const SkyBoxExample = (props) => {

  return (
    <>
      <Suspense fallback={null} >
        <SkyBox {...props} />
      </Suspense>
    </>
  )
}

export { SkyBoxExample }
