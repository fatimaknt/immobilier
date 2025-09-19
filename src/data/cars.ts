import { Car } from '@/types';

export const cars: Car[] = [
  {
    id: '1',
    brand: 'KIA',
    model: 'CARNIVAL LIMOUSINE',
    type: 'Limousine',
    year: 2023,
    seats: 8,
    transmission: 'Automatique',
    pricePerDay: 45000,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1549924231-f129b911e442',
      'https://images.unsplash.com/photo-1494905998402-395d579af36f',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d'
    ],
    conditions: ['Permis de conduire valide', 'Caution de 200 000 FCFA', 'Assurance tous risques incluse', 'Âge minimum 25 ans']
  },
  {
    id: '2',
    brand: 'KIA',
    model: 'CARNIVAL SIMPLE',
    type: 'Monospace',
    year: 2022,
    seats: 7,
    transmission: 'Automatique',
    pricePerDay: 35000,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      'https://images.unsplash.com/photo-1558618047-3c8c4d5c8b99',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c'
    ],
    conditions: ['Permis de conduire valide', 'Caution de 150 000 FCFA', 'Assurance incluse', 'Âge minimum 23 ans']
  },
  {
    id: '3',
    brand: 'HYUNDAI',
    model: 'STAREX',
    type: 'Monospace',
    year: 2021,
    seats: 9,
    transmission: 'Manuelle',
    pricePerDay: 30000,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027',
      'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9'
    ],
    conditions: ['Permis de conduire valide', 'Caution de 120 000 FCFA', 'Assurance incluse', 'Expérience conduite requise']
  },
  {
    id: '4',
    brand: 'RENAULT',
    model: 'QM3',
    type: 'SUV Compact',
    year: 2022,
    seats: 5,
    transmission: 'Automatique',
    pricePerDay: 25000,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f'
    ],
    conditions: ['Permis de conduire valide', 'Caution de 100 000 FCFA', 'Assurance incluse']
  },
  {
    id: '5',
    brand: 'RENAULT',
    model: 'QM3',
    type: 'SUV Compact',
    year: 2023,
    seats: 5,
    transmission: 'Automatique',
    pricePerDay: 25000,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f'
    ],
    conditions: ['Permis de conduire valide', 'Caution de 100 000 FCFA', 'Assurance incluse']
  },
  {
    id: '6',
    brand: 'CHEVROLET',
    model: 'CAMARO',
    type: 'Coupé Sport',
    year: 2022,
    seats: 4,
    transmission: 'Automatique',
    pricePerDay: 55000,
    available: false,
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027',
      'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9'
    ],
    conditions: ['Permis de conduire valide', 'Caution de 300 000 FCFA', 'Assurance tous risques incluse', 'Âge minimum 28 ans', 'Expérience conduite sportive']
  },
  {
    id: '7',
    brand: 'TOYOTA',
    model: 'LAND CRUISER',
    type: 'SUV 4x4',
    year: 2023,
    seats: 7,
    transmission: 'Automatique',
    pricePerDay: 50000,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f'
    ],
    conditions: ['Permis de conduire valide', 'Caution de 250 000 FCFA', 'Assurance tous risques incluse', 'Âge minimum 25 ans']
  },
  {
    id: '8',
    brand: 'TOYOTA',
    model: 'LAND CRUISER V8',
    type: 'SUV Premium',
    year: 2024,
    seats: 8,
    transmission: 'Automatique',
    pricePerDay: 65000,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f'
    ],
    conditions: ['Permis de conduire valide', 'Caution de 350 000 FCFA', 'Assurance tous risques incluse', 'Âge minimum 30 ans', 'Références de conduite']
  }
];