import { Planet } from '../types';

export const planetData: Planet[] = [
  {
    id: 'sun',
    name: 'Sun',
    description: 'The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun radiates energy mainly as light, ultraviolet, and infrared radiation, and is the most important source of energy for life on Earth.',
    diameter: 1392700,
    mass: '1.989 × 10^30',
    distanceFromSun: 0,
    orbitalPeriod: 0,
    rotationPeriod: 27,
    temperature: {
      min: 5500,
      max: 15000000,
      avg: 5778
    },
    moons: 0,
    hasRings: false,
    color: '#FDB813',
    texture: '/textures/sun.jpg',
    funFacts: [
      'The Sun contains 99.86% of the mass in the Solar System.',
      'The Sun is classified as a G-type main-sequence star, or G dwarf star, or more informally, a yellow dwarf.',
      'Light from the Sun takes about 8 minutes to reach Earth.',
      'The Sun is about 4.6 billion years old.'
    ],
    composition: {
      type: 'Star',
      atmosphere: ['Hydrogen', 'Helium']
    },
    position: 0,
    orbitSpeed: 0,
    rotationSpeed: 0.01,
    size: 5,
    realSize: 109 // Relative to Earth
  },
  {
    id: 'mercury',
    name: 'Mercury',
    description: 'Mercury is the smallest and innermost planet in the Solar System. It has no natural satellites and no substantial atmosphere. The planet has a large iron core which generates a magnetic field about 1% as strong as that of Earth.',
    diameter: 4879,
    mass: '3.3011 × 10^23',
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    rotationPeriod: 58.6,
    temperature: {
      min: -173,
      max: 427,
      avg: 167
    },
    moons: 0,
    hasRings: false,
    color: '#B7B8B9',
    texture: '/textures/mercury.jpg',
    funFacts: [
      'Mercury is the fastest planet, orbiting the Sun every 88 Earth days.',
      'Mercury is the smallest planet in our solar system.',
      'Mercury has the most extreme temperature variations of any planet, ranging from -173°C at night to 427°C during the day.',
      'A day on Mercury (sunrise to sunrise) is 176 Earth days long.'
    ],
    composition: {
      type: 'Terrestrial',
      atmosphere: ['Oxygen', 'Sodium', 'Hydrogen', 'Helium']
    },
    position: 1,
    orbitSpeed: 0.04,
    rotationSpeed: 0.004,
    size: 0.8,
    realSize: 0.38 // Relative to Earth
  },
  {
    id: 'venus',
    name: 'Venus',
    description: 'Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth\'s night sky after the Moon, Venus can cast shadows and can be visible to the naked eye in broad daylight.',
    diameter: 12104,
    mass: '4.8675 × 10^24',
    distanceFromSun: 108.2,
    orbitalPeriod: 224.7,
    rotationPeriod: -243, // Negative because it rotates in the opposite direction
    temperature: {
      min: 462,
      max: 462,
      avg: 462
    },
    moons: 0,
    hasRings: false,
    color: '#E6E2AF',
    texture: '/textures/venus.jpg',
    funFacts: [
      'Venus rotates in the opposite direction to most planets.',
      'A day on Venus is longer than a year on Venus.',
      'Venus is the hottest planet in our solar system, even though Mercury is closer to the Sun.',
      'Venus has a thick atmosphere that traps heat, causing a runaway greenhouse effect.'
    ],
    composition: {
      type: 'Terrestrial',
      atmosphere: ['Carbon Dioxide', 'Nitrogen']
    },
    position: 2,
    orbitSpeed: 0.015,
    rotationSpeed: -0.002,
    size: 1.5,
    realSize: 0.95 // Relative to Earth
  },
  {
    id: 'earth',
    name: 'Earth',
    description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth\'s surface is covered with water. Earth\'s atmosphere consists mostly of nitrogen and oxygen.',
    diameter: 12756,
    mass: '5.9724 × 10^24',
    distanceFromSun: 149.6,
    orbitalPeriod: 365.2,
    rotationPeriod: 1,
    temperature: {
      min: -88,
      max: 58,
      avg: 15
    },
    moons: 1,
    hasRings: false,
    color: '#6B93D6',
    texture: '/textures/earth.jpg',
    funFacts: [
      'Earth is the only planet not named after a god.',
      'Earth is the densest planet in the Solar System.',
      'Earth rotation is gradually slowing down.',
      'Earth has a powerful magnetic field that protects us from the solar wind.'
    ],
    composition: {
      type: 'Terrestrial',
      atmosphere: ['Nitrogen', 'Oxygen', 'Argon', 'Carbon Dioxide']
    },
    position: 3,
    orbitSpeed: 0.01,
    rotationSpeed: 0.01,
    size: 1.5,
    realSize: 1 // Relative to Earth (reference)
  },
  {
    id: 'mars',
    name: 'Mars',
    description: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. Mars is often referred to as the "Red Planet" because of the iron oxide prevalent on its surface, which gives it a reddish appearance.',
    diameter: 6792,
    mass: '6.4171 × 10^23',
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    rotationPeriod: 1.03,
    temperature: {
      min: -153,
      max: 20,
      avg: -65
    },
    moons: 2,
    hasRings: false,
    color: '#E27B58',
    texture: '/textures/mars.jpg',
    funFacts: [
      'Mars has the largest dust storms in the solar system.',
      'Mars has the tallest mountain in the solar system, Olympus Mons.',
      'Mars has seasons like Earth, but they last twice as long.',
      'Scientists have found evidence of liquid water on Mars.'
    ],
    composition: {
      type: 'Terrestrial',
      atmosphere: ['Carbon Dioxide', 'Nitrogen', 'Argon']
    },
    position: 4,
    orbitSpeed: 0.008,
    rotationSpeed: 0.009,
    size: 1.2,
    realSize: 0.53 // Relative to Earth
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined.',
    diameter: 142984,
    mass: '1.8982 × 10^27',
    distanceFromSun: 778.6,
    orbitalPeriod: 4331,
    rotationPeriod: 0.41,
    temperature: {
      min: -145,
      max: -145,
      avg: -145
    },
    moons: 79,
    hasRings: true,
    color: '#C88B3A',
    texture: '/textures/jupiter.jpg',
    funFacts: [
      'Jupiter has the shortest day of all the planets, rotating once every 9.8 hours.',
      'Jupiter has the Great Red Spot, a giant storm that has been raging for hundreds of years.',
      'Jupiter has a very strong magnetic field, 14 times stronger than Earth\'s.',
      'Jupiter has at least 79 moons, the most of any planet in our solar system.'
    ],
    composition: {
      type: 'Gas Giant',
      atmosphere: ['Hydrogen', 'Helium', 'Methane', 'Ammonia']
    },
    position: 5,
    orbitSpeed: 0.004,
    rotationSpeed: 0.04,
    size: 3,
    realSize: 11.2 // Relative to Earth
  },
  {
    id: 'saturn',
    name: 'Saturn',
    description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth. It has only one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive.',
    diameter: 120536,
    mass: '5.6834 × 10^26',
    distanceFromSun: 1433.5,
    orbitalPeriod: 10747,
    rotationPeriod: 0.45,
    temperature: {
      min: -178,
      max: -178,
      avg: -178
    },
    moons: 82,
    hasRings: true,
    color: '#E4D191',
    texture: '/textures/saturn.jpg',
    funFacts: [
      'Saturn has the most extensive rings in the solar system.',
      'Saturn is the least dense planet in our solar system and would float in water.',
      'Saturn has a hexagonal cloud pattern at its north pole.',
      'A day on Saturn is only 10.7 hours long.'
    ],
    composition: {
      type: 'Gas Giant',
      atmosphere: ['Hydrogen', 'Helium', 'Methane']
    },
    position: 6,
    orbitSpeed: 0.003,
    rotationSpeed: 0.03,
    size: 2.5,
    realSize: 9.45 // Relative to Earth
  },
  {
    id: 'uranus',
    name: 'Uranus',
    description: 'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is similar in composition to Neptune, and both have bulk chemical compositions which differ from that of the larger gas giants Jupiter and Saturn.',
    diameter: 51118,
    mass: '8.6810 × 10^25',
    distanceFromSun: 2872.5,
    orbitalPeriod: 30589,
    rotationPeriod: -0.72, // Negative because it rotates in the opposite direction
    temperature: {
      min: -224,
      max: -224,
      avg: -224
    },
    moons: 27,
    hasRings: true,
    color: '#D1E7E7',
    texture: '/textures/uranus.jpg',
    funFacts: [
      'Uranus rotates on its side, with an axial tilt of 98 degrees.',
      'Uranus is the coldest planet in our solar system, despite not being the farthest from the Sun.',
      'Uranus was the first planet discovered with a telescope.',
      'Uranus is named after the Greek god of the sky.'
    ],
    composition: {
      type: 'Ice Giant',
      atmosphere: ['Hydrogen', 'Helium', 'Methane']
    },
    position: 7,
    orbitSpeed: 0.002,
    rotationSpeed: -0.02,
    size: 2,
    realSize: 4.01 // Relative to Earth
  },
  {
    id: 'neptune',
    name: 'Neptune',
    description: 'Neptune is the eighth and farthest known planet from the Sun in the Solar System. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. Neptune is 17 times the mass of Earth, slightly more massive than its near-twin Uranus.',
    diameter: 49528,
    mass: '1.0243 × 10^26',
    distanceFromSun: 4495.1,
    orbitalPeriod: 59800,
    rotationPeriod: 0.67,
    temperature: {
      min: -218,
      max: -218,
      avg: -218
    },
    moons: 14,
    hasRings: true,
    color: '#5B5DDF',
    texture: '/textures/neptune.jpg',
    funFacts: [
      'Neptune has the strongest winds in the solar system, reaching speeds of 2,100 km/h.',
      'Neptune was predicted to exist through mathematical calculations before it was actually observed.',
      'Neptune has a Great Dark Spot, similar to Jupiter\'s Great Red Spot.',
      'A year on Neptune lasts 165 Earth years.'
    ],
    composition: {
      type: 'Ice Giant',
      atmosphere: ['Hydrogen', 'Helium', 'Methane']
    },
    position: 8,
    orbitSpeed: 0.001,
    rotationSpeed: 0.025,
    size: 2,
    realSize: 3.88 // Relative to Earth
  }
];