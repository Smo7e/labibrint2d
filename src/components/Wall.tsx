import { RigidBody } from "@react-three/rapier";
import { Vector3 } from "@react-three/fiber";
import { SIZE_MAP } from "../App";

interface IWallProps {
    position: Vector3;
    color?: string;
    visible?: boolean;
    key_: string;
}

const Wall: React.FC<IWallProps> = ({ position, color = "blue", key_, visible = false }) => {
    return (
        <RigidBody position={position} lockTranslations lockRotations key={key_}>
            <mesh key={`mesh${key_}`} visible={visible}>
                <boxGeometry args={[SIZE_MAP, SIZE_MAP, SIZE_MAP]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </RigidBody>
    );
};

export default Wall;
