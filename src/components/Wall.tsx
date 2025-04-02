import { RigidBody } from "@react-three/rapier";
import { Vector3 } from "@react-three/fiber";
import { SIZE_MAP } from "../App";

interface IWallProps {
    position: Vector3;
    color?: string;
    key_: string;
}

const Wall: React.FC<IWallProps> = ({ position, color = "blue", key_ }) => {
    return (
        <RigidBody position={position} lockTranslations lockRotations key={key_}>
            <mesh key={`mesh${key_}`}>
                <boxGeometry args={[SIZE_MAP, SIZE_MAP, SIZE_MAP]} />
                <meshStandardMaterial color={color} transparent opacity={0.5} />
            </mesh>
        </RigidBody>
    );
};

export default Wall;
