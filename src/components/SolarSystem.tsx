import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, useProgress, PointMaterial } from '@react-three/drei';
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

// Star field component for background
function StarField({ count = 5000 }) {
  const positions = useRef<Float32Array>(new Float32Array(count * 3));
  const sizes = useRef<Float32Array>(new Float32Array(count));
  
  // Generate random star positions and sizes
  if (positions.current.length > 0) {
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions.current[i3] = (Math.random() - 0.5) * 300;
      positions.current[i3 + 1] = (Math.random() - 0.5) * 300;
      positions.current[i3 + 2] = (Math.random() - 0.5) * 300;
      sizes.current[i] = Math.random() * 1.5;
    }
  }
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes.current}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1}
        sizeAttenuation
        transparent
        color="#FFFFFF"
        opacity={0.8}
      />
    </points>
  );
}

// Orbit path component
function OrbitPath({ radius, color }: { radius: number; color: string }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.025, radius + 0.025, 128]} />
      <meshBasicMaterial 
        color={color} 
        opacity={0.3} 
        transparent 
        side={THREE.DoubleSide} 
      />
    </mesh>
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
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
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
      return position * 4;
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />
      
      {/* Main light source at the center (sun) */}
      <pointLight position={[0, 0, 0]} intensity={3} color="#FDB813" distance={100} decay={0.5} />
      
      {/* Secondary lights for better visibility */}
      <pointLight position={[20, 20, 20]} intensity={0.5} color="#FFFFFF" />
      <pointLight position={[-20, -20, -20]} intensity={0.3} color="#FFF4E0" />
      
      {/* Background stars */}
      <StarField count={7000} />
      
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
                  position={[x, 0.5, z]}
                  color="white"
                  fontSize={0.5}
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