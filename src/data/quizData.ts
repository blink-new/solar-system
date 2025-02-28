import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Mercury', 'Earth', 'Mars'],
    correctAnswer: 'Mercury',
    explanation: 'Mercury is the closest planet to the Sun, orbiting at an average distance of about 58 million kilometers.',
    difficulty: 'easy'
  },
  {
    id: 2,
    question: 'Which planet is known as the "Red Planet"?',
    options: ['Jupiter', 'Venus', 'Mars', 'Saturn'],
    correctAnswer: 'Mars',
    explanation: 'Mars is often called the "Red Planet" because of the iron oxide (rust) on its surface that gives it a reddish appearance.',
    difficulty: 'easy',
    planetId: 'mars'
  },
  {
    id: 3,
    question: 'Which planet has the most moons?',
    options: ['Earth', 'Jupiter', 'Saturn', 'Uranus'],
    correctAnswer: 'Saturn',
    explanation: 'Saturn has 82 confirmed moons, the most of any planet in our solar system.',
    difficulty: 'medium',
    planetId: 'saturn'
  },
  {
    id: 4,
    question: 'Which planet rotates on its side?',
    options: ['Earth', 'Mars', 'Uranus', 'Neptune'],
    correctAnswer: 'Uranus',
    explanation: 'Uranus rotates on its side with an axial tilt of about 98 degrees, likely caused by a collision with an Earth-sized object long ago.',
    difficulty: 'medium',
    planetId: 'uranus'
  },
  {
    id: 5,
    question: 'Which planet has the Great Red Spot?',
    options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
    correctAnswer: 'Jupiter',
    explanation: 'The Great Red Spot is a giant storm on Jupiter that has been raging for at least 400 years.',
    difficulty: 'easy',
    planetId: 'jupiter'
  },
  {
    id: 6,
    question: 'Which planet is the hottest in our solar system?',
    options: ['Mercury', 'Venus', 'Earth', 'Mars'],
    correctAnswer: 'Venus',
    explanation: 'Despite being farther from the Sun than Mercury, Venus is the hottest planet due to its thick atmosphere that traps heat in a runaway greenhouse effect.',
    difficulty: 'medium',
    planetId: 'venus'
  },
  {
    id: 7,
    question: 'How many planets in our solar system have rings?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '4',
    explanation: 'Four planets have rings: Jupiter, Saturn, Uranus, and Neptune. Saturn\'s rings are the most visible and spectacular.',
    difficulty: 'hard'
  },
  {
    id: 8,
    question: 'Which planet takes the longest to orbit the Sun?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correctAnswer: 'Neptune',
    explanation: 'Neptune takes about 165 Earth years to complete one orbit around the Sun.',
    difficulty: 'medium',
    planetId: 'neptune'
  },
  {
    id: 9,
    question: 'Which planet has a day longer than its year?',
    options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
    correctAnswer: 'Venus',
    explanation: 'Venus rotates so slowly that its day (243 Earth days) is longer than its year (225 Earth days).',
    difficulty: 'hard',
    planetId: 'venus'
  },
  {
    id: 10,
    question: 'Which planet is the only one not named after a god?',
    options: ['Mars', 'Earth', 'Venus', 'Neptune'],
    correctAnswer: 'Earth',
    explanation: 'Earth is the only planet not named after a Roman or Greek god. The name comes from Old English and Germanic words meaning "ground" or "soil".',
    difficulty: 'medium',
    planetId: 'earth'
  },
  {
    id: 11,
    question: 'Which planet has the strongest winds in the solar system?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correctAnswer: 'Neptune',
    explanation: 'Neptune has the strongest winds in the solar system, reaching speeds of up to 2,100 kilometers per hour (1,300 mph).',
    difficulty: 'hard',
    planetId: 'neptune'
  },
  {
    id: 12,
    question: 'Which planet would float if placed in water?',
    options: ['Earth', 'Mars', 'Saturn', 'Mercury'],
    correctAnswer: 'Saturn',
    explanation: 'Saturn has such low density that it would float in water if there were a bathtub large enough to hold it.',
    difficulty: 'hard',
    planetId: 'saturn'
  },
  {
    id: 13,
    question: 'How many Earth days does it take Mercury to orbit the Sun?',
    options: ['88 days', '225 days', '365 days', '687 days'],
    correctAnswer: '88 days',
    explanation: 'Mercury orbits the Sun every 88 Earth days, making it the fastest planet in our solar system.',
    difficulty: 'medium',
    planetId: 'mercury'
  },
  {
    id: 14,
    question: 'Which planet has a hexagonal cloud pattern at its north pole?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correctAnswer: 'Saturn',
    explanation: 'Saturn has a persistent hexagonal cloud pattern at its north pole, a unique feature not seen on any other planet.',
    difficulty: 'hard',
    planetId: 'saturn'
  },
  {
    id: 15,
    question: 'Which is the largest planet in our solar system?',
    options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
    correctAnswer: 'Jupiter',
    explanation: 'Jupiter is the largest planet in our solar system, with a diameter of about 143,000 kilometers (88,850 miles).',
    difficulty: 'easy',
    planetId: 'jupiter'
  }
];