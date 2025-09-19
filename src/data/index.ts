export interface Apartment {
  id: string;
  title: string;
  description: string;
  zone: 'Ouest-foire' | 'Cité Mixta' | 'Cité Kalia';
  address: string;
  rooms: number;
  bathrooms: number;
  surface: number;
  price_per_day: number;
  price_per_week: number;
  available: boolean;
  equipment: string[];
  images: string[];
  location: {
    lat: number;
    lng: number;
  };
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  type: string;
  year: number;
  seats: number;
  transmission: 'Manuelle' | 'Automatique';
  price_per_day: number;
  available: boolean;
  images: string[];
  conditions: string[];
}

export interface Zone {
  name: string;
  count: number;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  type: 'Appartement' | 'Voiture';
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Booking {
  id: string;
  type: 'Apartment' | 'Car';
  itemId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}