import { useState } from 'react';
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
  const [isNightMode, setIsNightMode] = useState(false);
  const [isRealisticScale, setIsRealisticScale] = useState(false);

  return (
    <PlanetProvider>
      <div className={`app-container min-h-screen ${isNightMode ? 'bg-gray-900' : 'bg-indigo-950'}`}>
        <Toaster position="top-center" />
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
              <Canvas camera={{ position: [0, 20, 25], fov: 60 }}>
                <ambientLight intensity={isNightMode ? 0.1 : 0.5} />
                <pointLight position={[0, 0, 0]} intensity={isNightMode ? 5 : 10} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
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
      </div>
    </PlanetProvider>
  );
}

export default App;