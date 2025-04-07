import { useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { Box3, Mesh, Raycaster, Vector2, Vector3 } from "three";
import { setLvl } from "../App";

const Character: React.FC<any> = ({ floorRef }) => {
    const [currentLvl, setCurrentLvl] = useState<number>(0);
    const defultPosition = new Vector3(-40 - currentLvl, -45 - currentLvl, 0);

    const [target, setTarget] = useState<Vector3>(defultPosition);
    const { camera, scene } = useThree();
    camera.position.set(200 * currentLvl, 0, 5);
    const ref = useRef<RapierRigidBody>(null);
    const { rapier, world } = useRapier();
    const speed = 200;
    useEffect(() => {
        if (!rapier || !world) return;
        const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault();

            const mouse = new Vector2();
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            const raycaster = new Raycaster();

            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(floorRef.current ? [floorRef.current] : []); // Передайте массив объектов, с которыми хотите проверить пересечение
            if (intersects.length > 0) {
                const intersection = intersects[0].point;
                setTarget(intersection);
            }
        };

        window.addEventListener("mousedown", handleMouseDown);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, [rapier, world]);
    function checkMeshIntersection(mesh1: Mesh, mesh2: Mesh): boolean {
        const box1 = new Box3().setFromObject(mesh1);
        const box2 = new Box3().setFromObject(mesh2);

        return box1.intersectsBox(box2);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            const meshTp = scene.children.filter((el) => {
                return el.name === "meshTp";
            })[currentLvl] as Mesh;
            console.log(meshTp);
            const rigidPlayer = scene.children.filter((el) => {
                return el.name === "rigidPlayer";
            })[0];
            const meshPlayer = rigidPlayer.children[0] as Mesh;
            if (checkMeshIntersection(meshTp, meshPlayer)) {
                setCurrentLvl((el) => {
                    setLvl(el + 1);
                    console.log(el + 1);

                    return el + 1;
                });
                camera.zoom /= 1.1;
            }
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, [currentLvl]);
    useFrame((state, delta) => {
        if (!ref.current) return;

        const rigidBody = ref.current;
        const position = rigidBody.translation();
        const direction = new Vector3().subVectors(target, position);
        const distance = direction.length();

        if (distance > 0.1) {
            direction.normalize();
            direction.multiplyScalar(speed);

            rigidBody.setLinvel(direction, true);
        } else {
            rigidBody.setLinvel(new Vector3(0, 0, 0), true);
        }
    });

    return (
        <RigidBody name="rigidPlayer" type="dynamic" ref={ref} position={defultPosition} lockTranslations>
            <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>
    );
};
export default Character;
