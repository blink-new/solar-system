import { createContext, useContext, ReactNode } from 'react';
import { planetData } from '../data/planetData';
import { Planet } from '../types';

interface PlanetContextType {
  planets: Planet[];
  getPlanetById: (id: string) => Planet | undefined;
}

const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

export function PlanetProvider({ children }: { children: ReactNode }) {
  const planets = planetData;

  const getPlanetById = (id: string) => {
    return planets.find(planet => planet.id === id);
  };

  return (
    <PlanetContext.Provider value={{ planets, getPlanetById }}>
      {children}
    </PlanetContext.Provider>
  );
}

export function usePlanets() {
  const context = useContext(PlanetContext);
  if (context === undefined) {
    throw new Error('usePlanets must be used within a PlanetProvider');
  }
  return context;
}