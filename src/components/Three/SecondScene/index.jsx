import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { Provider } from 'react-redux'
import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { Html, OrbitControls } from 'drei'
import CameraControls from "camera-controls";

import DatGui, { DatNumber } from 'react-dat-gui';

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

const RectLight = ({ state }) => {
    RectAreaLightUniformsLib.init()
    const rectLight1 = new THREE.RectAreaLight(0xfdf3c6, 0.5, 120, 120);
    const helper = new RectAreaLightHelper(rectLight1)

    return (
        <>
            <group position={[0, 17, -25]} rotation={[- Math.PI / 2, 0, 0]}>
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
            positionX: 31, positionY: -3, positionZ: -5, rotation: 0.9
        }
    })

    return (
        <>
            <axesHelper />
            {/* <Html><div style={{ width: '500px', background: 'blue' }}><App state={state} setState={setState} /></div></Html> */}
            <group position={[0, 7, 26]}>
                {/* bottom  */}
                <mesh position={[0, -11, -25]} ref={planeRef} rotation={[- Math.PI / 2, 0, 0]}>
                    <circleGeometry attach="geometry" args={[45, 5]} />
                    <meshStandardMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh>
                {/* back right */}
                <mesh position={[-14, -4, -59]} ref={planeRef} rotation={[0, 0.3, 0]}>
                    <planeGeometry attach="geometry" args={[60, 35, 100, 32]} />
                    <meshStandardMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh>
                {/* back left */}
                <mesh position={[-34, -4, -25]} ref={planeRef} rotation={[0, 1.6, 0]}>
                    <planeGeometry attach="geometry" args={[60, 35, 100, 32]} />
                    <meshStandardMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh>
                {/* back right */}
                <mesh position={[29, -4, -48]} ref={planeRef} rotation={[0, -0.95, 0]}>
                    <planeGeometry attach="geometry" args={[60, 35, 100, 32]} />
                    <meshStandardMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh>
                {/* front left */}
                <mesh position={[-7, -4, 12]} ref={planeRef} rotation={[0, 2.8, 0]}>
                    <planeGeometry attach="geometry" args={[60, 35, 100, 32]} />
                    <meshStandardMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh>
                {/* front right */}
                <mesh position={[31, -4, -5]} ref={planeRef} rotation={[0, 0.9, 0]}>
                    <planeGeometry attach="geometry" args={[60, 35, 100, 32]} />
                    <meshStandardMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh>
                {/* top  */}
                <RectLight state={state} />
                {/* <mesh position={[0, 5, -25]} ref={planeRef} rotation={[- Math.PI / 2, 0, 0]}>
                    <circleGeometry attach="geometry" args={[15, 5]} />
                    <meshPhongMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh> */}
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
                    <Floor />

                    <WithCameraControlers />
                </Provider>
            </Canvas>
        </>
    )
}

export { SecondScene }
