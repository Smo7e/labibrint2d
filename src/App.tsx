import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import Wall from "./components/Wall";
import Character from "./components/Character";
import "./App.css";
import React, { useRef } from "react";
import Floor from "./components/floor";
import { Object3D } from "three";

export const SIZE_MAP = 9;
const App: React.FC = () => {
    const floorRef = useRef<Object3D>(null);
    const wallArr = [
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    ];
    return (
        <Canvas
            orthographic
            camera={{
                near: 0.1,
                far: 10000,
                zoom: 10,
            }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <Physics gravity={[0, 0, 0]}>
                <Character floorRef={floorRef} />
                <Wall position={[5, 0, 0]} />
                {wallArr.map((row, rowIndex) => {
                    return row.map((rowNum, rowNumIndex) => {
                        const key = `${rowIndex}-${rowNumIndex}-wall`;
                        console.log(rowNum);
                        return rowNum === 1 ? (
                            <Wall
                                position={[
                                    rowNumIndex * SIZE_MAP - (wallArr[0].length * SIZE_MAP) / 2,
                                    rowIndex * SIZE_MAP - (wallArr.length * SIZE_MAP) / 2,
                                    0,
                                ]}
                                key={key}
                            />
                        ) : (
                            <React.Fragment key={key}></React.Fragment>
                        );
                    });
                })}

                <Floor ref={floorRef} />
            </Physics>
        </Canvas>
    );
};

export default App;
