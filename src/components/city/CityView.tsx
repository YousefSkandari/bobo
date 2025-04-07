'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Building } from './Building';

interface CityViewProps {
  buildings: {
    id: string;
    type: string;
    level: number;
    positionX: number;
    positionY: number;
    positionZ: number;
  }[];
}

export default function CityView({ buildings }: CityViewProps) {
  return (
    <div className="w-full h-[600px]">
      <Canvas
        camera={{ position: [10, 10, 10], fov: 75 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <OrbitControls />
        <gridHelper args={[20, 20]} />
        {buildings.map((building) => (
          <Building
            key={building.id}
            type={building.type}
            level={building.level}
            position={[building.positionX, building.positionY, building.positionZ]}
          />
        ))}
      </Canvas>
    </div>
  );
} 