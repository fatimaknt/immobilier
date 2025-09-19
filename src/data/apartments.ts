import { Apartment } from '@/types';

export const apartments: Apartment[] = [
  // Cité Mixta - 14 appartements
  {
    id: 'mixta-01',
    title: 'Appartement Standing - Cité Mixta',
    description: 'Superbe appartement moderne avec vue imprenable, dans un quartier calme et sécurisé.',
    zone: 'Cité Mixta',
    address: 'Rue 12, Cité Mixta, Dakar',
    rooms: 3,
    bathrooms: 2,
    surface: 120,
    pricePerDay: 25000,
    pricePerWeek: 150000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking privé', 'Balcon'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e'
    ],
    location: {
      lat: 14.716677,
      lng: -17.467686
    }
  },
  {
    id: 'mixta-02',
    title: 'Studio Moderne - Cité Mixta',
    description: 'Studio lumineux et bien agencé, parfait pour un séjour court ou moyen terme.',
    zone: 'Cité Mixta',
    address: 'Rue 8, Cité Mixta, Dakar',
    rooms: 1,
    bathrooms: 1,
    surface: 45,
    pricePerDay: 15000,
    pricePerWeek: 90000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Kitchenette', 'TV', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    location: {
      lat: 14.717200,
      lng: -17.467200
    }
  },
  {
    id: 'mixta-03',
    title: 'Appartement Familial - Cité Mixta',
    description: 'Grand appartement idéal pour familles, avec toutes les commodités nécessaires.',
    zone: 'Cité Mixta',
    address: 'Rue 15, Cité Mixta, Dakar',
    rooms: 4,
    bathrooms: 3,
    surface: 140,
    pricePerDay: 30000,
    pricePerWeek: 180000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Balcon', 'Machine à laver'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8'
    ],
    location: {
      lat: 14.717800,
      lng: -17.466800
    }
  },
  {
    id: 'mixta-04',
    title: 'Duplex Premium - Cité Mixta',
    description: 'Magnifique duplex avec terrasse privée et vue panoramique.',
    zone: 'Cité Mixta',
    address: 'Rue 20, Cité Mixta, Dakar',
    rooms: 5,
    bathrooms: 3,
    surface: 180,
    pricePerDay: 40000,
    pricePerWeek: 240000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Terrasse', 'Machine à laver', 'Jardin'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e'
    ],
    location: {
      lat: 14.718200,
      lng: -17.466400
    }
  },
  {
    id: 'mixta-05',
    title: 'Appartement Confort - Cité Mixta',
    description: 'Appartement confortable avec tous les équipements modernes.',
    zone: 'Cité Mixta',
    address: 'Rue 5, Cité Mixta, Dakar',
    rooms: 2,
    bathrooms: 1,
    surface: 75,
    pricePerDay: 18000,
    pricePerWeek: 108000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    location: {
      lat: 14.716400,
      lng: -17.467900
    }
  },
  {
    id: 'mixta-06',
    title: 'Studio Executive - Cité Mixta',
    description: 'Studio haut de gamme pour professionnels en déplacement.',
    zone: 'Cité Mixta',
    address: 'Rue 3, Cité Mixta, Dakar',
    rooms: 1,
    bathrooms: 1,
    surface: 50,
    pricePerDay: 20000,
    pricePerWeek: 120000,
    available: false,
    equipment: ['Climatisation', 'Wi-Fi haut débit', 'Kitchenette', 'TV LED', 'Parking', 'Bureau'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e'
    ],
    location: {
      lat: 14.716000,
      lng: -17.468200
    }
  },
  {
    id: 'mixta-07',
    title: 'Appartement Vue Mer - Cité Mixta',
    description: 'Appartement avec vue partielle sur la mer, très lumineux.',
    zone: 'Cité Mixta',
    address: 'Rue 25, Cité Mixta, Dakar',
    rooms: 3,
    bathrooms: 2,
    surface: 110,
    pricePerDay: 28000,
    pricePerWeek: 168000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Balcon vue mer'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8'
    ],
    location: {
      lat: 14.719000,
      lng: -17.465800
    }
  },
  {
    id: 'mixta-08',
    title: 'Loft Moderne - Cité Mixta',
    description: 'Loft au design contemporain avec de beaux volumes.',
    zone: 'Cité Mixta',
    address: 'Rue 18, Cité Mixta, Dakar',
    rooms: 2,
    bathrooms: 2,
    surface: 95,
    pricePerDay: 22000,
    pricePerWeek: 132000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine ouverte', 'TV LED', 'Parking', 'Mezzanine'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    location: {
      lat: 14.717500,
      lng: -17.467000
    }
  },
  {
    id: 'mixta-09',
    title: 'Appartement Terrasse - Cité Mixta',
    description: 'Bel appartement avec grande terrasse aménagée.',
    zone: 'Cité Mixta',
    address: 'Rue 22, Cité Mixta, Dakar',
    rooms: 3,
    bathrooms: 2,
    surface: 125,
    pricePerDay: 26000,
    pricePerWeek: 156000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Grande terrasse', 'Barbecue'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e'
    ],
    location: {
      lat: 14.718500,
      lng: -17.466200
    }
  },
  {
    id: 'mixta-10',
    title: 'Studio Plus - Cité Mixta',
    description: 'Studio agrandi avec coin nuit séparé.',
    zone: 'Cité Mixta',
    address: 'Rue 7, Cité Mixta, Dakar',
    rooms: 1,
    bathrooms: 1,
    surface: 55,
    pricePerDay: 17000,
    pricePerWeek: 102000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Kitchenette', 'TV', 'Parking', 'Coin nuit'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8'
    ],
    location: {
      lat: 14.716800,
      lng: -17.467500
    }
  },
  {
    id: 'mixta-11',
    title: 'Appartement Jardin - Cité Mixta',
    description: 'Appartement en rez-de-jardin avec accès direct au jardin.',
    zone: 'Cité Mixta',
    address: 'Rue 10, Cité Mixta, Dakar',
    rooms: 4,
    bathrooms: 2,
    surface: 135,
    pricePerDay: 32000,
    pricePerWeek: 192000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Jardin privé', 'Machine à laver'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    location: {
      lat: 14.717000,
      lng: -17.467800
    }
  },
  {
    id: 'mixta-12',
    title: 'Penthouse - Cité Mixta',
    description: 'Penthouse avec vue panoramique et terrasse sur le toit.',
    zone: 'Cité Mixta',
    address: 'Rue 30, Cité Mixta, Dakar',
    rooms: 5,
    bathrooms: 3,
    surface: 200,
    pricePerDay: 50000,
    pricePerWeek: 300000,
    available: false,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Terrasse toit', 'Jacuzzi', 'Machine à laver'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e'
    ],
    location: {
      lat: 14.719500,
      lng: -17.465200
    }
  },
  {
    id: 'mixta-13',
    title: 'Appartement Business - Cité Mixta',
    description: 'Appartement équipé pour professionnels avec bureau.',
    zone: 'Cité Mixta',
    address: 'Rue 14, Cité Mixta, Dakar',
    rooms: 2,
    bathrooms: 1,
    surface: 80,
    pricePerDay: 19000,
    pricePerWeek: 114000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi haut débit', 'Cuisine équipée', 'TV', 'Parking', 'Bureau équipé', 'Imprimante'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8'
    ],
    location: {
      lat: 14.717300,
      lng: -17.467300
    }
  },
  {
    id: 'mixta-14',
    title: 'Appartement Cocooning - Cité Mixta',
    description: 'Appartement douillet et chaleureux, décoration soignée.',
    zone: 'Cité Mixta',
    address: 'Rue 6, Cité Mixta, Dakar',
    rooms: 3,
    bathrooms: 2,
    surface: 115,
    pricePerDay: 24000,
    pricePerWeek: 144000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Décoration design', 'Balcon'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    location: {
      lat: 14.716600,
      lng: -17.467700
    }
  },

  // Ouest-foire - 13 appartements
  {
    id: 'ouest-01',
    title: 'Villa Moderne - Ouest-foire',
    description: 'Belle villa spacieuse dans le quartier prisé d\'Ouest-foire.',
    zone: 'Ouest-foire',
    address: 'Avenue Cheikh Anta Diop, Ouest-foire',
    rooms: 4,
    bathrooms: 3,
    surface: 160,
    pricePerDay: 35000,
    pricePerWeek: 210000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Piscine', 'Jardin', 'Machine à laver'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e'
    ],
    location: {
      lat: 14.715677,
      lng: -17.475686
    }
  },
  {
    id: 'ouest-02',
    title: 'Appartement Standing - Ouest-foire',
    description: 'Appartement de standing avec vue dégagée.',
    zone: 'Ouest-foire',
    address: 'Rue 11, Ouest-foire, Dakar',
    rooms: 3,
    bathrooms: 2,
    surface: 130,
    pricePerDay: 27000,
    pricePerWeek: 162000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Balcon'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    location: {
      lat: 14.716200,
      lng: -17.475200
    }
  },
  {
    id: 'ouest-03',
    title: 'Studio Deluxe - Ouest-foire',
    description: 'Studio haut de gamme avec équipements premium.',
    zone: 'Ouest-foire',
    address: 'Rue 8, Ouest-foire, Dakar',
    rooms: 1,
    bathrooms: 1,
    surface: 60,
    pricePerDay: 20000,
    pricePerWeek: 120000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi haut débit', 'Kitchenette premium', 'TV LED', 'Parking', 'Balcon'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8'
    ],
    location: {
      lat: 14.715800,
      lng: -17.475800
    }
  },
  {
    id: 'ouest-04',
    title: 'Appartement Familial - Ouest-foire',
    description: 'Grand appartement parfait pour les familles.',
    zone: 'Ouest-foire',
    address: 'Rue 15, Ouest-foire, Dakar',
    rooms: 4,
    bathrooms: 3,
    surface: 150,
    pricePerDay: 33000,
    pricePerWeek: 198000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Balcon', 'Machine à laver', 'Lave-vaisselle'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e'
    ],
    location: {
      lat: 14.716800,
      lng: -17.474800
    }
  },
  {
    id: 'ouest-05',
    title: 'Loft Artistique - Ouest-foire',
    description: 'Loft au style unique avec déco artistique.',
    zone: 'Ouest-foire',
    address: 'Rue 20, Ouest-foire, Dakar',
    rooms: 2,
    bathrooms: 2,
    surface: 100,
    pricePerDay: 25000,
    pricePerWeek: 150000,
    available: false,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine ouverte', 'TV LED', 'Parking', 'Espace artistique', 'Terrasse'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    location: {
      lat: 14.717200,
      lng: -17.474400
    }
  },
  {
    id: 'ouest-06',
    title: 'Appartement Confort - Ouest-foire',
    description: 'Appartement confortable et bien situé.',
    zone: 'Ouest-foire',
    address: 'Rue 5, Ouest-foire, Dakar',
    rooms: 3,
    bathrooms: 2,
    surface: 120,
    pricePerDay: 26000,
    pricePerWeek: 156000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Balcon'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8'
    ],
    location: {
      lat: 14.715400,
      lng: -17.476000
    }
  },
  {
    id: 'ouest-07',
    title: 'Studio Compact - Ouest-foire',
    description: 'Studio optimisé avec rangements intelligents.',
    zone: 'Ouest-foire',
    address: 'Rue 3, Ouest-foire, Dakar',
    rooms: 1,
    bathrooms: 1,
    surface: 40,
    pricePerDay: 16000,
    pricePerWeek: 96000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Kitchenette', 'TV', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e'
    ],
    location: {
      lat: 14.715000,
      lng: -17.476400
    }
  },
  {
    id: 'ouest-08',
    title: 'Duplex Premium - Ouest-foire',
    description: 'Magnifique duplex avec finitions haut de gamme.',
    zone: 'Ouest-foire',
    address: 'Rue 25, Ouest-foire, Dakar',
    rooms: 5,
    bathrooms: 3,
    surface: 180,
    pricePerDay: 45000,
    pricePerWeek: 270000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Terrasse', 'Machine à laver', 'Lave-vaisselle'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    location: {
      lat: 14.717800,
      lng: -17.473800
    }
  },
  {
    id: 'ouest-09',
    title: 'Appartement Moderne - Ouest-foire',
    description: 'Appartement rénové avec équipements modernes.',
    zone: 'Ouest-foire',
    address: 'Rue 12, Ouest-foire, Dakar',
    rooms: 2,
    bathrooms: 1,
    surface: 85,
    pricePerDay: 21000,
    pricePerWeek: 126000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8'
    ],
    location: {
      lat: 14.716400,
      lng: -17.475600
    }
  },
  {
    id: 'ouest-10',
    title: 'Penthouse Vue Mer - Ouest-foire',
    description: 'Penthouse exceptionnel avec vue mer panoramique.',
    zone: 'Ouest-foire',
    address: 'Rue 30, Ouest-foire, Dakar',
    rooms: 4,
    bathrooms: 3,
    surface: 170,
    pricePerDay: 55000,
    pricePerWeek: 330000,
    available: false,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Terrasse vue mer', 'Jacuzzi', 'Machine à laver'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e'
    ],
    location: {
      lat: 14.718200,
      lng: -17.473400
    }
  },
  {
    id: 'ouest-11',
    title: 'Appartement Cosy - Ouest-foire',
    description: 'Appartement chaleureux et bien décoré.',
    zone: 'Ouest-foire',
    address: 'Rue 7, Ouest-foire, Dakar',
    rooms: 2,
    bathrooms: 1,
    surface: 75,
    pricePerDay: 19000,
    pricePerWeek: 114000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV', 'Parking', 'Balcon'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    location: {
      lat: 14.715600,
      lng: -17.476200
    }
  },
  {
    id: 'ouest-12',
    title: 'Villa avec Piscine - Ouest-foire',
    description: 'Villa de luxe avec piscine privée et jardin.',
    zone: 'Ouest-foire',
    address: 'Rue 35, Ouest-foire, Dakar',
    rooms: 6,
    bathrooms: 4,
    surface: 220,
    pricePerDay: 60000,
    pricePerWeek: 360000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking', 'Piscine privée', 'Jardin', 'Machine à laver', 'Barbecue'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8'
    ],
    location: {
      lat: 14.718600,
      lng: -17.473000
    }
  },
  {
    id: 'ouest-13',
    title: 'Studio Business - Ouest-foire',
    description: 'Studio équipé pour professionnels en déplacement.',
    zone: 'Ouest-foire',
    address: 'Rue 18, Ouest-foire, Dakar',
    rooms: 1,
    bathrooms: 1,
    surface: 50,
    pricePerDay: 18000,
    pricePerWeek: 108000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi haut débit', 'Kitchenette', 'TV', 'Parking', 'Bureau équipé'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e'
    ],
    location: {
      lat: 14.717000,
      lng: -17.474600
    }
  },

  // Cité Kalia - 2 appartements
  {
    id: 'kalia-01',
    title: 'Villa Luxueuse - Cité Kalia',
    description: 'Villa exceptionnelle avec piscine et jardin tropical dans le quartier résidentiel de Cité Kalia.',
    zone: 'Cité Kalia',
    address: 'Rue 5, Cité Kalia, Dakar',
    rooms: 5,
    bathrooms: 3,
    surface: 250,
    pricePerDay: 45000,
    pricePerWeek: 270000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking privé', 'Piscine', 'Jardin tropical', 'Machine à laver', 'Lave-vaisselle', 'Barbecue'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8'
    ],
    location: {
      lat: 14.720677,
      lng: -17.460686
    }
  },
  {
    id: 'kalia-02',
    title: 'Résidence Premium - Cité Kalia',
    description: 'Résidence haut de gamme avec services de conciergerie et sécurité 24h/24.',
    zone: 'Cité Kalia',
    address: 'Rue 10, Cité Kalia, Dakar',
    rooms: 4,
    bathrooms: 3,
    surface: 200,
    pricePerDay: 40000,
    pricePerWeek: 240000,
    available: true,
    equipment: ['Climatisation', 'Wi-Fi', 'Cuisine équipée', 'TV LED', 'Parking sécurisé', 'Balcon', 'Machine à laver', 'Sécurité 24h', 'Conciergerie'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e'
    ],
    location: {
      lat: 14.721200,
      lng: -17.460200
    }
  }
];