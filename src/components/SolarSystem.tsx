import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, useProgress } from '@react-three/drei';
import { usePlanets } from '../context/PlanetContext';
import Planet from './Planet';
import { ViewType } from '../types';
import * as THREE from 'three';

interface SolarSystemProps {
  setSelectedPlanet: (id: string) => void;
  setView: (view: ViewType) => void;
  showOrbits: boolean;
  isRealisticScale: boolean;
}

// Loading component for suspense fallback
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}

// Orbit path component
function OrbitPath({ radius, color }: { radius: number; color: string }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.025, radius + 0.025, 64]} />
      <meshBasicMaterial 
        color={color} 
        opacity={0.4} 
        transparent 
        side={THREE.DoubleSide} 
      />
    </mesh>
  );
}

// Simple star field
function StarField() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 100)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} sizeAttenuation color="white" />
    </points>
  );
}

const SolarSystem = ({ 
  setSelectedPlanet, 
  setView, 
  showOrbits,
  isRealisticScale
}: SolarSystemProps) => {
  const { planets } = usePlanets();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slow rotation of the entire system for visual effect
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  const handlePlanetClick = (id: string) => {
    setSelectedPlanet(id);
    setView('detail');
  };

  // Calculate orbit radius based on position
  const getOrbitRadius = (position: number) => {
    if (isRealisticScale) {
      // More realistic spacing (still not to actual scale)
      return position * position * 1.5;
    } else {
      // Visually pleasing spacing
      return position * 5;
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      {/* Simple star field */}
      <StarField />
      
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.8} />
      
      {/* Main light source at the center (sun) */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
      
      {/* Secondary light for better visibility */}
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      <group ref={groupRef}>
        {/* Sun at the center */}
        <Planet 
          planet={planets[0]} 
          position={[0, 0, 0]} 
          onClick={() => handlePlanetClick(planets[0].id)}
          isRealisticScale={isRealisticScale}
        />
        
        {/* Planets */}
        {planets.slice(1).map((planet) => {
          const orbitRadius = getOrbitRadius(planet.position);
          const angle = Math.random() * Math.PI * 2; // Random starting position
          const x = Math.sin(angle) * orbitRadius;
          const z = Math.cos(angle) * orbitRadius;
          
          return (
            <group key={planet.id}>
              {/* Orbit path */}
              {showOrbits && (
                <OrbitPath radius={orbitRadius} color={planet.color} />
              )}
              
              {/* Planet with orbit animation */}
              <Planet 
                planet={planet} 
                orbitRadius={orbitRadius} 
                onClick={() => handlePlanetClick(planet.id)}
                isRealisticScale={isRealisticScale}
              />
              
              {/* Planet name */}
              {showOrbits && (
                <Text
                  position={[x, 1, z]}
                  color="white"
                  fontSize={0.7}
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={0.05}
                  outlineColor="#000000"
                >
                  {planet.name}
                </Text>
              )}
            </group>
          );
        })}
      </group>
    </Suspense>
  );
};

export default SolarSystem;