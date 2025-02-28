import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import SolarSystem from './components/SolarSystem';
import PlanetDetail from './components/PlanetDetail';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import { PlanetProvider } from './context/PlanetContext';
import './App.css';

function App() {
  const [view, setView] = useState<'system' | 'detail' | 'quiz'>('system');
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [showOrbits, setShowOrbits] = useState(true);
  const [isNightMode, setIsNightMode] = useState(true); // Default to night mode for better visuals
  const [isRealisticScale, setIsRealisticScale] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <PlanetProvider>
      <div className={`app-container min-h-screen ${isNightMode ? 'bg-gray-900' : 'bg-indigo-950'}`}>
        <Toaster position="top-center" />
        
        {isLoading ? (
          <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
            <div className="w-24 h-24 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h1 className="text-2xl font-bold text-white mb-2">Loading Solar System</h1>
            <p className="text-gray-300">Preparing for your cosmic journey...</p>
          </div>
        ) : (
          <>
            <Navbar 
              view={view} 
              setView={setView} 
              showOrbits={showOrbits}
              setShowOrbits={setShowOrbits}
              isNightMode={isNightMode}
              setIsNightMode={setIsNightMode}
              isRealisticScale={isRealisticScale}
              setIsRealisticScale={setIsRealisticScale}
            />
            
            <AnimatePresence mode="wait">
              {view === 'system' && (
                <motion.div 
                  key="system"
                  className="w-full h-[calc(100vh-64px)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Canvas 
                    camera={{ position: [0, 20, 25], fov: 60 }}
                    gl={{ 
                      antialias: true,
                      alpha: true,
                      logarithmicDepthBuffer: true
                    }}
                    shadows
                  >
                    <color attach="background" args={[isNightMode ? '#000000' : '#0c0f2d']} />
                    <fog attach="fog" args={[isNightMode ? '#000000' : '#0c0f2d', 30, 100]} />
                    
                    <SolarSystem 
                      setSelectedPlanet={setSelectedPlanet} 
                      setView={setView} 
                      showOrbits={showOrbits}
                      isRealisticScale={isRealisticScale}
                    />
                    
                    <OrbitControls 
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      minDistance={5}
                      maxDistance={100}
                      dampingFactor={0.1}
                      rotateSpeed={0.5}
                    />
                  </Canvas>
                </motion.div>
              )}
              
              {view === 'detail' && selectedPlanet && (
                <motion.div 
                  key="detail"
                  className="w-full h-[calc(100vh-64px)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PlanetDetail 
                    planetId={selectedPlanet} 
                    onBack={() => setView('system')}
                    isNightMode={isNightMode}
                  />
                </motion.div>
              )}
              
              {view === 'quiz' && (
                <motion.div 
                  key="quiz"
                  className="w-full h-[calc(100vh-64px)] flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Quiz onBack={() => setView('system')} isNightMode={isNightMode} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </PlanetProvider>
  );
}

export default App;