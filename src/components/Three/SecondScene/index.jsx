import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { Provider } from 'react-redux'
import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { Html, useTextureLoader } from 'drei'
import CameraControls from "camera-controls";

import DatGui, { DatNumber } from 'react-dat-gui';
import { Suspense } from 'react'
import { light } from '@material-ui/core/styles/createPalette'

const clock = new THREE.Clock();
CameraControls.install({ THREE: THREE });

const EPS = 1e-5;

const WithCameraControlers = ({ position, modelRef, modelRef1 }) => {
    const { camera, gl } = useThree();
    const cameraControls = new CameraControls(camera, gl.domElement);
    cameraControls.dollySpeed = 0;
    cameraControls.azimuthRotateSpeed = -0.3; // negative value to invert rotation direction
    cameraControls.polarRotateSpeed = -0.3; // negative value to invert rotation direction
    cameraControls.truckSpeed = (1 / EPS) * 3;
    cameraControls.mouseButtons.wheel = CameraControls.ACTION.ZOOM;
    cameraControls.touches.two = CameraControls.ACTION.TOUCH_ZOOM_TRUCK;
    cameraControls.saveState();

    useFrame(() => {
        const delta = clock.getDelta();
        cameraControls.update(delta);
    });


    return null;
};

const App = ({ state, setState }) => {

    const handleUpdate = newData =>
        setState(prevState => {
            return { data: { ...prevState.data, ...newData } }
        });

    return (
        <DatGui data={state.data} onUpdate={handleUpdate}>
            <DatNumber path='positionX' label='positionX' min={-200} max={200} step={1} />
            <DatNumber path='positionY' label='positionY' min={-200} max={200} step={1} />
            <DatNumber path='positionZ' label='positionZ' min={-200} max={200} step={1} />
            <DatNumber path='rotation' label='rotation' min={-5} max={5} step={0.1} />
        </DatGui>
    )
}

const Sphere = ({ position }) => {
    const sphere = new THREE.SphereGeometry(0.5, 16, 8)
    const light = new THREE.PointLight(0xff0040, 2, 50)
    light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })))

    return (
        <>
            <primitive object={light} position={[0, 0, 0]} />
        </>
    )
}

const RectLight = ({ state }) => {
    RectAreaLightUniformsLib.init()
    const rectLight1 = new THREE.RectAreaLight(0xfdf3c6, 0.6, 120, 120);
    const helper = new RectAreaLightHelper(rectLight1)

    return (
        <>
            <group position={[0, 14, -25]} rotation={[- Math.PI / 2, 0, 0]}>
                <primitive object={rectLight1} />
                <primitive object={helper} />
            </group>
        </>
    )
}

const Floor = () => {
    const planeRef = useRef()
    const [state, setState] = useState({
        data: {
            positionX: 31, positionY: -4, positionZ: -4, rotation: 0.9
        }
    })

    const floorTexture = useTextureLoader('marble_floor.jpeg')
    const wallTexture = useTextureLoader('guided_wall_texture.jpg')

    return (
        <>
            <axesHelper />
            {/* <Html><div style={{ width: '500px', background: 'blue' }}><App state={state} setState={setState} /></div></Html> */}
            <group position={[0, 7, 26]}>
                {/* bottom  */}
                <mesh position={[0, -11, -25]} ref={planeRef} rotation={[- Math.PI / 2, 0, 0]}>
                    <circleGeometry attach="geometry" args={[45, 5]} />
                    <meshStandardMaterial attach="material" map={floorTexture} side={THREE.DoubleSide} />
                </mesh>
                {/* back right */}
                <mesh position={[-10, 1.5, -59]} ref={planeRef} rotation={[0, 0.3, 0]}>
                    <planeGeometry attach="geometry" args={[52, 25, 100, 32]} />
                    <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
                </mesh>
                {/* back left */}
                <mesh position={[-34, 1.5, -24]} ref={planeRef} rotation={[0, 1.6, 0]}>
                    <planeGeometry attach="geometry" args={[55, 25, 100, 32]} />
                    <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
                </mesh>
                {/* back right */}
                <mesh position={[32, 2.2, -48]} ref={planeRef} rotation={[0, -0.95, 0]}>
                    <planeGeometry attach="geometry" args={[55, 27, 100, 32]} />
                    <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
                </mesh>
                {/* front left */}
                <mesh position={[-10, 2.2, 12]} ref={planeRef} rotation={[0, 2.8, 0]}>
                    <planeGeometry attach="geometry" args={[52, 27, 100, 32]} />
                    <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
                </mesh>
                {/* front right */}
                <mesh position={[state.data.positionX, 2.3, state.data.positionZ]} ref={planeRef} rotation={[0, 0.9, 0]}>
                    <planeGeometry attach="geometry" args={[57, 27, 100, 32]} />
                    <meshStandardMaterial attach="material" map={wallTexture} side={THREE.DoubleSide} />
                </mesh>
                {/* top  */}
                <RectLight state={state} />
            </group>
        </>
    )
}

const SecondScene = ({ store }) => {
    return (
        <>
            <Canvas colorManagement shadowMap camera={{ position: [0, 0, EPS], fov: 80 }}>
                <Provider store={store}>
                    {/* <pointLight color={"purple"} intensity={0.5} /> */}
                    <Suspense fallback={null}>
                        <Floor />
                    </Suspense>
                    <WithCameraControlers />
                </Provider>
            </Canvas>
        </>
    )
}

export { SecondScene }
