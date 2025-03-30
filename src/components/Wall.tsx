import { RigidBody } from "@react-three/rapier";
import { Vector3 } from "@react-three/fiber";
import { SIZE_MAP } from "../App";

interface IWallProps {
    position: Vector3;
}

const Wall: React.FC<IWallProps> = ({ position }) => {
    return (
        <RigidBody position={position} lockTranslations lockRotations>
            <mesh>
                <boxGeometry args={[SIZE_MAP, SIZE_MAP, SIZE_MAP]} />
                <meshStandardMaterial color={"red"} transparent opacity={0.5} />
            </mesh>
        </RigidBody>
    );
};

export default Wall;
