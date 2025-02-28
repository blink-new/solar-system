import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

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
  
  // Planet texture mapping
  const planetTextures: Record<string, string> = {
    'sun': 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?q=80&w=500&auto=format&fit=crop',
    'mercury': 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=500&auto=format&fit=crop',
    'venus': 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=500&auto=format&fit=crop',
    'earth': 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=500&auto=format&fit=crop',
    'mars': 'https://images.unsplash.com/photo-1573588028698-f4759befb09a?q=80&w=500&auto=format&fit=crop',
    'jupiter': 'https://images.unsplash.com/photo-1630839437035-dac17da580d0?q=80&w=500&auto=format&fit=crop',
    'saturn': 'https://images.unsplash.com/photo-1614314107768-6018061e5704?q=80&w=500&auto=format&fit=crop',
    'uranus': 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?q=80&w=500&auto=format&fit=crop',
    'neptune': 'https://images.unsplash.com/photo-1614314107918-2163bd6c0b90?q=80&w=500&auto=format&fit=crop'
  };

  // Load texture
  const texture = useLoader(TextureLoader, planetTextures[planet.id]);
  
  // Calculate planet size
  const getPlanetSize = () => {
    if (isRealisticScale) {
      // Use relative sizes based on Earth = 1
      return planet.realSize * 0.2;
    } else {
      // Use visual sizes for better viewing
      return planet.size;
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
          <meshStandardMaterial color="#E4D191" opacity={0.7} transparent />
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
          <meshStandardMaterial color={planet.color} opacity={0.3} transparent />
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
          <meshBasicMaterial 
            map={texture}
            emissive={planet.color}
            emissiveIntensity={0.5}
          />
        ) : (
          <meshStandardMaterial 
            map={texture}
            metalness={0.2}
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