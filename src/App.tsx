import { Canvas, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Wall from "./components/Wall";
import Character from "./components/Character";
import "./App.css";
import React, { useEffect, useRef } from "react";
import Floor from "./components/Floor";
import { Box3, Mesh, Object3D } from "three";

let lvl = 0;
let needUpdata = false;
export const getLvl = () => {
    return lvl;
};
export const setLvl = (newLvl: number) => {
    needUpdata = true;
    lvl = newLvl;
};
export const setNeedUpdate = () => {
    needUpdata = false;
};
export const getUpdate = () => {
    return needUpdata;
};
export const SIZE_MAP = 9;
const App: React.FC = () => {
    const floorRef = useRef<Object3D>(null);

    return (
        <Canvas
            orthographic
            camera={{
                near: 0.1,
                far: 10000,
                zoom: 3,
            }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <Physics gravity={[0, 0, 0]}>
                <Character floorRef={floorRef} />

                <Floor ref={floorRef} />
            </Physics>
        </Canvas>
    );
};

export default App;
