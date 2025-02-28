import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { Planet as PlanetType } from '../types';

interface PlanetProps {
  planet: PlanetType;
  orbitRadius?: number;
  onClick: () => void;
  isRealisticScale: boolean;
  position?: [number, number, number];
}

const Planet = ({ 
  planet, 
  orbitRadius, 
  onClick,
  isRealisticScale,
  position = [0, 0, 0]
}: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Calculate planet size
  const getPlanetSize = () => {
    if (isRealisticScale) {
      // Use relative sizes based on Earth = 1
      return planet.realSize * 0.3;
    } else {
      // Use visual sizes for better viewing
      return planet.size * 1.2; // Make planets bigger
    }
  };

  // Animation for orbit and rotation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Self rotation
      meshRef.current.rotation.y += planet.rotationSpeed * 0.01;
      
      // Orbit animation if this planet orbits
      if (orbitRadius) {
        const time = clock.getElapsedTime();
        const angle = time * planet.orbitSpeed;
        meshRef.current.position.x = Math.sin(angle) * orbitRadius;
        meshRef.current.position.z = Math.cos(angle) * orbitRadius;
      } else {
        // Use provided position for the sun or fixed objects
        meshRef.current.position.set(position[0], position[1], position[2]);
      }
    }
  });

  // Special case for Saturn's rings
  const renderSaturnRings = () => {
    if (planet.id === 'saturn') {
      return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[getPlanetSize() * 1.4, getPlanetSize() * 2, 64]} />
          <meshBasicMaterial 
            color="#E4D191" 
            opacity={0.8} 
            transparent 
            side={THREE.DoubleSide}
          />
        </mesh>
      );
    }
    return null;
  };

  // Special case for other planets with rings
  const renderPlanetaryRings = () => {
    if (planet.hasRings && planet.id !== 'saturn') {
      return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[getPlanetSize() * 1.2, getPlanetSize() * 1.5, 64]} />
          <meshBasicMaterial 
            color={planet.color} 
            opacity={0.6} 
            transparent 
            side={THREE.DoubleSide}
          />
        </mesh>
      );
    }
    return null;
  };

  // Special case for the Sun's glow
  const renderSunGlow = () => {
    if (planet.id === 'sun') {
      return (
        <mesh>
          <sphereGeometry args={[getPlanetSize() * 1.2, 32, 32]} />
          <meshBasicMaterial color="#FDB813" opacity={0.2} transparent />
        </mesh>
      );
    }
    return null;
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      >
        <sphereGeometry args={[getPlanetSize(), 32, 32]} />
        {planet.id === 'sun' ? (
          <meshBasicMaterial color={planet.color} />
        ) : (
          <meshStandardMaterial 
            color={planet.color}
            metalness={0.1}
            roughness={0.8}
          />
        )}
      </mesh>
      {renderSaturnRings()}
      {renderPlanetaryRings()}
      {renderSunGlow()}
    </group>
  );
};

export default Planet;