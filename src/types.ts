export interface Planet {
  id: string;
  name: string;
  description: string;
  diameter: number; // km
  mass: string; // kg in scientific notation
  distanceFromSun: number; // million km
  orbitalPeriod: number; // Earth days
  rotationPeriod: number; // Earth days
  temperature: {
    min: number; // Celsius
    max: number; // Celsius
    avg: number; // Celsius
  };
  moons: number;
  hasRings: boolean;
  color: string;
  texture: string;
  funFacts: string[];
  composition: {
    type: string;
    atmosphere: string[];
  };
  position: number; // position from sun (1-8)
  orbitSpeed: number; // for animation
  rotationSpeed: number; // for animation
  size: number; // visual size in the 3D model (not to scale)
  realSize: number; // actual relative size for realistic scale mode
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  planetId?: string; // Optional, if question is about a specific planet
}

export type ViewType = 'system' | 'detail' | 'quiz';