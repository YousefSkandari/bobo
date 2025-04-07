'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface BuildingProps {
  type: string;
  level: number;
  position: [number, number, number];
}

export function Building({ type, level, position }: BuildingProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Add subtle animation
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  const getColor = () => {
    switch (type) {
      case 'residential':
        return '#4B5563';
      case 'commercial':
        return '#059669';
      case 'industrial':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const height = level * 2;

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[2, height, 2]} />
      <meshStandardMaterial color={getColor()} />
    </mesh>
  );
} 