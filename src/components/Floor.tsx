import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";

const Floor = forwardRef((props: any, ref: any) => {
    return (
        <RigidBody position={[0, 0, -0.5]} lockTranslations lockRotations>
            <mesh ref={ref}>
                <boxGeometry args={[200, 200, 1]} />
                <meshStandardMaterial color="green" />
            </mesh>
            <CuboidCollider args={[10, 10, 0.5]} />
        </RigidBody>
    );
});
export default Floor;
