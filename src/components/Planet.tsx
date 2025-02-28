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
          <meshStandardMaterial 
            color="#E4D191" 
            opacity={0.8} 
            transparent 
            side={THREE.DoubleSide}
            metalness={0.3}
            roughness={0.7}
            emissive="#E4D191"
            emissiveIntensity={0.1}
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
          <meshStandardMaterial 
            color={planet.color} 
            opacity={0.6} 
            transparent 
            side={THREE.DoubleSide}
            metalness={0.3}
            roughness={0.7}
            emissive={planet.color}
            emissiveIntensity={0.1}
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
        <>
          {/* Inner glow */}
          <mesh>
            <sphereGeometry args={[getPlanetSize() * 1.1, 32, 32]} />
            <meshBasicMaterial color="#FFF4E0" opacity={0.3} transparent />
          </mesh>
          {/* Outer glow */}
          <mesh>
            <sphereGeometry args={[getPlanetSize() * 1.3, 32, 32]} />
            <meshBasicMaterial color="#FDB813" opacity={0.2} transparent />
          </mesh>
          {/* Far outer glow */}
          <mesh>
            <sphereGeometry args={[getPlanetSize() * 1.8, 32, 32]} />
            <meshBasicMaterial color="#FDB813" opacity={0.1} transparent />
          </mesh>
        </>
      );
    }
    return null;
  };

  // Add atmosphere for terrestrial planets
  const renderAtmosphere = () => {
    if (['earth', 'venus', 'mars', 'uranus', 'neptune'].includes(planet.id)) {
      const atmosphereColors = {
        'earth': '#88BFFF',
        'venus': '#FFF0B5',
        'mars': '#FFD2B5',
        'uranus': '#D1E7E7',
        'neptune': '#5B5DDF'
      };
      
      const color = atmosphereColors[planet.id as keyof typeof atmosphereColors] || '#FFFFFF';
      
      return (
        <mesh>
          <sphereGeometry args={[getPlanetSize() * 1.05, 32, 32]} />
          <meshBasicMaterial color={color} opacity={0.3} transparent />
        </mesh>
      );
    }
    return null;
  };

  // Get planet material based on type
  const getPlanetMaterial = () => {
    if (planet.id === 'sun') {
      return (
        <meshBasicMaterial 
          color={planet.color}
          emissive={planet.color}
          emissiveIntensity={1}
        />
      );
    } else if (['jupiter', 'saturn'].includes(planet.id)) {
      // Gas giants with bands
      return (
        <meshStandardMaterial 
          color={planet.color}
          metalness={0.1}
          roughness={0.8}
          emissive={planet.color}
          emissiveIntensity={0.2}
        />
      );
    } else if (['uranus', 'neptune'].includes(planet.id)) {
      // Ice giants
      return (
        <meshStandardMaterial 
          color={planet.color}
          metalness={0.3}
          roughness={0.6}
          emissive={planet.color}
          emissiveIntensity={0.2}
        />
      );
    } else {
      // Terrestrial planets
      return (
        <meshStandardMaterial 
          color={planet.color}
          metalness={0.2}
          roughness={0.8}
          emissive={planet.color}
          emissiveIntensity={0.1}
        />
      );
    }
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
        {getPlanetMaterial()}
      </mesh>
      {renderAtmosphere()}
      {renderSaturnRings()}
      {renderPlanetaryRings()}
      {renderSunGlow()}
    </group>
  );
};

export default Planet;