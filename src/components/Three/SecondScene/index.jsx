import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { Provider } from 'react-redux'
import * as THREE from 'three'
import { OrbitControls } from 'drei'


const Floor = () => {
    const planeRef = useRef()

    return (
        <>
            <axesHelper />
            <group position={[0, 10, 30]}>
                {/* bottom  */}
                <mesh position={[0, -11, -25]} ref={planeRef} rotation={[- Math.PI / 2, 0, 0]}>
                    <circleGeometry attach="geometry" args={[15, 5]} />
                    <meshPhongMaterial attach="material" color={0xd9b1e2} />
                </mesh>
                {/* back */}
                <mesh position={[-4, -4, -37]} ref={planeRef} rotation={[0, 0.3, 0]}>
                    <planeGeometry attach="geometry" args={[20, 20, 100, 32]} />
                    <meshPhongMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh>
                {/* back left */}
                <mesh position={[-12, -4.1, -25]} ref={planeRef} rotation={[0, 1.6, 0]}>
                    <planeGeometry attach="geometry" args={[20, 20, 100, 32]} />
                    <meshPhongMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh>
                {/* back right */}
                <mesh position={[8, -4, -35]} ref={planeRef} rotation={[0, -0.95, 0]}>
                    <planeGeometry attach="geometry" args={[25, 20, 100, 32]} />
                    <meshPhongMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh>
                {/* front left */}
                <mesh position={[-7, -4.1, -15]} ref={planeRef} rotation={[0, 2.8, 0]}>
                    <planeGeometry attach="geometry" args={[25, 20, 100, 32]} />
                    <meshPhongMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh>
                {/* front right */}
                <mesh position={[-7, -4.1, -10]} ref={planeRef} rotation={[0, -2.1, 0]}>
                    <planeGeometry attach="geometry" args={[25, 20, 100, 32]} />
                    <meshPhongMaterial attach="material" color={0xd9b1e2} side={THREE.DoubleSide} />
                </mesh>
            </group>
        </>
    )
}

const SecondScene = ({ store }) => {
    return (
        <>
            <Canvas colorManagement shadowMap>
                <Provider store={store}>
                    <pointLight color={"purple"} intensity={0.5} />
                    <Floor />

                    <OrbitControls enableZoom={true} />
                </Provider>
            </Canvas>
        </>
    )
}

export { SecondScene }
