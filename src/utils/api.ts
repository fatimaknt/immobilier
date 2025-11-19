import { Apartment, Car, Booking } from '@/types';

// Mock API functions - replace with real API calls in production

export const api = {
    // Apartments
    getApartments: async (): Promise<Apartment[]> => {
        // Mock API call - replace with actual endpoint
        const { apartments } = await import('@/data/apartments');
        return apartments;
    },

    getApartmentById: async (id: string): Promise<Apartment | null> => {
        const apartments = await api.getApartments();
        return apartments.find(apt => apt.id === id) || null;
    },

    getApartmentsByZone: async (zone: string): Promise<Apartment[]> => {
        const apartments = await api.getApartments();
        return apartments.filter(apt => apt.zone === zone);
    },

    // Cars
    getCars: async (): Promise<Car[]> => {
        const { cars } = await import('@/data/cars');
        return cars;
    },

    getCarById: async (id: string): Promise<Car | null> => {
        const cars = await api.getCars();
        return cars.find(car => car.id === id) || null;
    },

    getAvailableCars: async (): Promise<Car[]> => {
        const cars = await api.getCars();
        return cars.filter(car => car.available);
    },

    // Bookings
    createBooking: async (bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
        // Mock API call - replace with actual endpoint
        const booking: Booking = {
            ...bookingData,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
        };

        // In a real app, this would make an HTTP request
        console.log('Creating booking:', booking);
        return booking;
    },

    getBookings: async (): Promise<Booking[]> => {
        // Mock API call - replace with actual endpoint
        return [];
    },

    updateBookingStatus: async (id: string, status: Booking['status']): Promise<void> => {
        // Mock API call - replace with actual endpoint
        console.log(`Updating booking ${id} status to ${status}`);
    },

    // Contact
    sendContactMessage: async (contactData: {
        name: string;
        email: string;
        phone?: string;
        subject: string;
        message: string;
    }): Promise<void> => {
        // Mock API call - replace with actual endpoint
        console.log('Sending contact message:', contactData);
    },

    // Search
    searchApartments: async (query: {
        zone?: string;
        minPrice?: number;
        maxPrice?: number;
        rooms?: number;
        available?: boolean;
    }): Promise<Apartment[]> => {
        const apartments = await api.getApartments();

        return apartments.filter(apartment => {
            if (query.zone && apartment.zone !== query.zone) return false;
            if (query.minPrice && apartment.price_per_day < query.minPrice) return false;
            if (query.maxPrice && apartment.price_per_day > query.maxPrice) return false;
            if (query.rooms && apartment.rooms !== query.rooms) return false;
            if (query.available !== undefined && apartment.available !== query.available) return false;
            return true;
        });
    },

    searchCars: async (query: {
        type?: string;
        transmission?: string;
        minPrice?: number;
        maxPrice?: number;
        available?: boolean;
    }): Promise<Car[]> => {
        const cars = await api.getCars();

        return cars.filter(car => {
            if (query.type && car.type !== query.type) return false;
            if (query.transmission && car.transmission !== query.transmission) return false;
            if (query.minPrice && car.price_per_day < query.minPrice) return false;
            if (query.maxPrice && car.price_per_day > query.maxPrice) return false;
            if (query.available !== undefined && car.available !== query.available) return false;
            return true;
        });
    }
};
