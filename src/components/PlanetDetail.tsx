import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, ThermometerSun, Ruler, Clock, Satellite } from 'lucide-react';
import { usePlanets } from '../context/PlanetContext';
import Planet from './Planet';

interface PlanetDetailProps {
  planetId: string;
  onBack: () => void;
  isNightMode: boolean;
}

const PlanetDetail = ({ planetId, onBack, isNightMode }: PlanetDetailProps) => {
  const { getPlanetById } = usePlanets();
  const planet = getPlanetById(planetId);
  const [activeTab, setActiveTab] = useState<'overview' | 'facts' | 'composition'>('overview');

  if (!planet) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p>Planet not found</p>
        <button 
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Solar System
        </button>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className={`w-full h-full flex flex-col md:flex-row ${isNightMode ? 'text-white' : 'text-white'}`}>
      {/* Planet 3D View */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={isNightMode ? 0.1 : 0.5} />
          <pointLight position={[10, 10, 10]} intensity={isNightMode ? 1 : 2} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Planet 
            planet={planet} 
            onClick={() => {}} 
            isRealisticScale={false}
          />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
          />
        </Canvas>
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Planet Information */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto p-6 bg-indigo-900 bg-opacity-90">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">{planet.name}</h1>
          
          {/* Tabs */}
          <div className="flex border-b border-indigo-700 mb-4">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('facts')}
              className={`px-4 py-2 ${activeTab === 'facts' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-white'}`}
            >
              Fun Facts
            </button>
            <button 
              onClick={() => setActiveTab('composition')}
              className={`px-4 py-2 ${activeTab === 'composition' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-white'}`}
            >
              Composition
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                <p className="text-lg">{planet.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-indigo-800 bg-opacity-50 p-4 rounded-lg flex items-center">
                    <Ruler className="mr-3 text-yellow-400" size={24} />
                    <div>
                      <h3 className="text-sm text-gray-300">Diameter</h3>
                      <p className="text-lg font-semibold">{formatNumber(planet.diameter)} km</p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-800 bg-opacity-50 p-4 rounded-lg flex items-center">
                    <ThermometerSun className="mr-3 text-yellow-400" size={24} />
                    <div>
                      <h3 className="text-sm text-gray-300">Average Temperature</h3>
                      <p className="text-lg font-semibold">{planet.temperature.avg}°C</p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-800 bg-opacity-50 p-4 rounded-lg flex items-center">
                    <Clock className="mr-3 text-yellow-400" size={24} />
                    <div>
                      <h3 className="text-sm text-gray-300">Orbital Period</h3>
                      <p className="text-lg font-semibold">
                        {planet.orbitalPeriod === 0 
                          ? 'N/A' 
                          : `${formatNumber(planet.orbitalPeriod)} Earth days`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-800 bg-opacity-50 p-4 rounded-lg flex items-center">
                    <Satellite className="mr-3 text-yellow-400" size={24} />
                    <div>
                      <h3 className="text-sm text-gray-300">Moons</h3>
                      <p className="text-lg font-semibold">{planet.moons}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">More Details</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-300">Mass:</span>
                      <span>{planet.mass} kg</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-300">Distance from Sun:</span>
                      <span>{planet.distanceFromSun === 0 ? 'N/A' : `${formatNumber(planet.distanceFromSun)} million km`}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-300">Rotation Period:</span>
                      <span>
                        {Math.abs(planet.rotationPeriod)} Earth days
                        {planet.rotationPeriod < 0 ? ' (retrograde)' : ''}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-300">Has Rings:</span>
                      <span>{planet.hasRings ? 'Yes' : 'No'}</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
            
            {activeTab === 'facts' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Info className="mr-2 text-yellow-400" size={20} />
                  Fun Facts about {planet.name}
                </h2>
                <ul className="space-y-3">
                  {planet.funFacts.map((fact, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-indigo-800 bg-opacity-50 p-3 rounded-lg"
                    >
                      {fact}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'composition' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Planet Type</h2>
                  <p className="bg-indigo-800 bg-opacity-50 p-3 rounded-lg">
                    {planet.composition.type}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Atmosphere</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {planet.composition.atmosphere.map((gas, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-indigo-800 bg-opacity-50 p-2 rounded-lg text-center"
                      >
                        {gas}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Temperature Range</h2>
                  <div className="bg-indigo-800 bg-opacity-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>Minimum</span>
                      <span>Maximum</span>
                    </div>
                    <div className="h-4 bg-gradient-to-r from-blue-500 to-red-500 rounded-full relative">
                      <div className="absolute -top-6 left-0 text-sm">{planet.temperature.min}°C</div>
                      <div className="absolute -top-6 right-0 text-sm">{planet.temperature.max}°C</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlanetDetail;