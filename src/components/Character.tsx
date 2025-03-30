import { useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { PerspectiveCamera, Plane, Raycaster, Vector2, Vector3 } from "three";

const Character: React.FC<any> = ({ floorRef }) => {
    console.log(1);
    const ref = useRef<RapierRigidBody>(null);
    const { rapier, world } = useRapier();
    const [target, setTarget] = useState<Vector3>(new Vector3(-6, 0.5, 0));
    const speed = 20;
    const { camera } = useThree();

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
        <RigidBody type="dynamic" ref={ref} position={[-6, 0.5, 0]}>
            <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>
    );
};
export default Character;
