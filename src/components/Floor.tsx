import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { forwardRef, useEffect, useState } from "react";
import { getLvl, getUpdate, setNeedUpdate, SIZE_MAP } from "../App";
import { arrLvl } from ".";
import Wall from "./Wall";

const Floor = forwardRef((props: any, ref: any) => {
    const [trueArr, setTrueArr] = useState<number[][][]>(
        getNeedIndexArr().map((el) => {
            return arrLvl[el];
        })
    );
    function getNeedIndexArr(): number[] {
        let needArr = [getLvl()];
        if (getLvl() - 1 >= 0) needArr.push(getLvl() - 1);
        if (getLvl() + 1 <= 9) needArr.push(getLvl() + 1);
        return needArr;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (getUpdate()) {
                setNeedUpdate();
                setTrueArr(
                    getNeedIndexArr().map((el) => {
                        return arrLvl[el];
                    })
                );
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            {trueArr.map((lvl, lvlIndex) => (
                <React.Fragment key={`lvl-${lvlIndex}`}>
                    {lvl.map((row, rowIndex) => (
                        <React.Fragment key={`row-${rowIndex}`}>
                            {row.map((rowNum, rowNumIndex) => {
                                const key = `lvl-${getLvl()}-${lvlIndex}-row-${rowIndex}-col-${rowNumIndex}`;
                                if (rowNum === 1) {
                                    return (
                                        <Wall
                                            key={key}
                                            position={[
                                                rowNumIndex * SIZE_MAP -
                                                    (lvl[0].length * SIZE_MAP) / 2 +
                                                    200 * getNeedIndexArr()[lvlIndex],
                                                rowIndex * SIZE_MAP - (lvl.length * SIZE_MAP) / 2,
                                                0,
                                            ]}
                                            key_={key} // This prop name is a bit redundant, consider changing it.
                                        />
                                    );
                                } else if (rowNum === 2) {
                                    return (
                                        <mesh
                                            key={key}
                                            position={[
                                                rowNumIndex * SIZE_MAP -
                                                    (lvl[0].length * SIZE_MAP) / 2 +
                                                    200 * getNeedIndexArr()[lvlIndex],
                                                rowIndex * SIZE_MAP - (lvl.length * SIZE_MAP) / 2,
                                                0,
                                            ]}
                                            name="meshTp"
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

            <RigidBody position={[0, 0, -0.5]} lockRotations lockTranslations>
                <mesh ref={ref}>
                    <boxGeometry args={[5000, 500, 1]} />
                    <meshStandardMaterial color="green" />
                </mesh>
                <CuboidCollider args={[5000, 500, 1]} />
            </RigidBody>
        </>
    );
});
export default Floor;
