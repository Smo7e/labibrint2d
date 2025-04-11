import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Character from "./components/Character";
import "./App.css";
import React, { useRef, useState } from "react";
import Floor from "./components/Floor";
import { Object3D } from "three";
import GameTimer from "./components/GamerTimer";
import Leaderboard from "./components/Leaderbord";
import Win from "./components/Win";

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
export enum EPAGES {
    MENU,
    TABLES,
    GAME,
    WIN,
}
const App: React.FC = () => {
    const floorRef = useRef<Object3D>(null);
    const gameTimerRef = useRef<any>(null);
    const [epages, setEpages] = useState<EPAGES>(EPAGES.MENU);
    const [gameStats, setGameStats] = useState({ time: 0 });
    const winFunc = (): void => {
        setGameStats(gameTimerRef.current.getGameStats());
        setEpages(EPAGES.WIN);
    };

    return (
        <>
            {epages === EPAGES.MENU ? (
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <button style={{ width: "100%" }} onClick={() => setEpages(EPAGES.GAME)} type="button">
                        Играть
                    </button>
                    <button style={{ width: "100%" }} onClick={() => setEpages(EPAGES.TABLES)} type="button">
                        Таблицы
                    </button>
                </div>
            ) : epages === EPAGES.TABLES ? (
                <Leaderboard onClose={setEpages} />
            ) : epages === EPAGES.GAME ? (
                <>
                    <Canvas
                        orthographic
                        camera={{
                            near: 0.1,
                            far: 10000,
                            zoom: 3,
                        }}
                    >
                        {/* <OrbitControls /> */}
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={0.8} />
                        <Physics gravity={[0, 0, 0]}>
                            <Character floorRef={floorRef} winFunc={winFunc} />

                            <Floor ref={floorRef} />
                        </Physics>
                    </Canvas>
                    <GameTimer ref={gameTimerRef} />
                </>
            ) : epages === EPAGES.WIN ? (
                <Win gameStats={gameStats} setEpages={setEpages} />
            ) : (
                <></>
            )}
        </>
    );
};

export default App;
