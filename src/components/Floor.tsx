import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { forwardRef, useEffect, useMemo, useReducer } from "react";
import { getLvl, getUpdate, setNeedUpdate, SIZE_MAP } from "../App";
import { arrLvl } from ".";
import Wall from "./Wall";

const Floor = forwardRef((props: any, ref: any) => {
    console.log(props);
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (getUpdate()) {
                setNeedUpdate();
                forceUpdate();
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const floorMesh = useMemo(
        () => (
            <RigidBody lockRotations lockTranslations position={[0, 0, -0.5]}>
                <mesh ref={ref}>
                    <boxGeometry args={[5000, 500, 1]} />
                    <meshStandardMaterial color="green" />
                </mesh>
                <CuboidCollider args={[5000, 500, 1]} />
            </RigidBody>
        ),
        [ref]
    );

    return (
        <>
            {arrLvl.map((lvl, lvlIndex) => (
                <React.Fragment key={`lvl-${lvlIndex}`}>
                    {lvl.map((row, rowIndex) => (
                        <React.Fragment key={`row-${rowIndex}`}>
                            {row.map((rowNum, rowNumIndex) => {
                                const key = `lvl-${getLvl()}-${lvlIndex}-row-${rowIndex}-col-${rowNumIndex}`;
                                if (rowNum === 1) {
                                    return (
                                        <Wall
                                            key={key}
                                            position={[rowIndex * SIZE_MAP + lvlIndex * 200, rowNumIndex * SIZE_MAP, 0]}
                                            key_={key} // This prop name is a bit redundant, consider changing it.
                                            visible={
                                                getLvl() === lvlIndex ||
                                                getLvl() === lvlIndex - 1 ||
                                                getLvl() === lvlIndex + 1
                                                    ? true
                                                    : false
                                            }
                                        />
                                    );
                                } else if (rowNum === 2) {
                                    return (
                                        <mesh
                                            key={key}
                                            position={[rowIndex * SIZE_MAP + lvlIndex * 200, rowNumIndex * SIZE_MAP, 0]}
                                            name="meshTp"
                                            visible={getLvl() === lvlIndex || getLvl() === lvlIndex + 1 ? true : false}
                                        >
                                            <boxGeometry args={[SIZE_MAP, SIZE_MAP, SIZE_MAP]} />
                                            <meshStandardMaterial />
                                        </mesh>
                                    );
                                } else {
                                    return <React.Fragment key={key} />;
                                }
                            })}
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}

            {floorMesh}
        </>
    );
});
export default Floor;
