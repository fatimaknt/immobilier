export interface Photo {
    id: string;
    src: string;
    title: string;
    category: 'apartment' | 'car';
    location?: string;
    featured?: boolean;
}

export const galleryPhotos: Photo[] = [
    // Appartements Cité Mixta
    {
        id: 'apt-cm-1',
        src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Appartement moderne Cité Mixta',
        category: 'apartment',
        location: 'Cité Mixta',
        featured: true
    },
    {
        id: 'apt-cm-2',
        src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Salon spacieux Cité Mixta',
        category: 'apartment',
        location: 'Cité Mixta'
    },
    {
        id: 'apt-cm-3',
        src: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Cuisine équipée Cité Mixta',
        category: 'apartment',
        location: 'Cité Mixta'
    },

    // Appartements Ouest-foire
    {
        id: 'apt-of-1',
        src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Vue panoramique Ouest-foire',
        category: 'apartment',
        location: 'Ouest-foire',
        featured: true
    },
    {
        id: 'apt-of-2',
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Chambre confortable Ouest-foire',
        category: 'apartment',
        location: 'Ouest-foire'
    },
    {
        id: 'apt-of-3',
        src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Terrasse privée Ouest-foire',
        category: 'apartment',
        location: 'Ouest-foire'
    },

    // Appartements Cité Kalia
    {
        id: 'apt-ck-1',
        src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Luxueux appartement Cité Kalia',
        category: 'apartment',
        location: 'Cité Kalia',
        featured: true
    },
    {
        id: 'apt-ck-2',
        src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Salle de bain moderne Cité Kalia',
        category: 'apartment',
        location: 'Cité Kalia'
    },

    // Voitures KIA CARNIVAL
    {
        id: 'car-kia-1',
        src: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'KIA CARNIVAL LIMOUSINE',
        category: 'car',
        featured: true
    },
    {
        id: 'car-kia-2',
        src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'KIA CARNIVAL SIMPLE',
        category: 'car',
        featured: true
    },

    // HYUNDAI STAREX
    {
        id: 'car-hyundai-1',
        src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'HYUNDAI STAREX Premium',
        category: 'car'
    },
    {
        id: 'car-hyundai-2',
        src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'HYUNDAI STAREX Intérieur',
        category: 'car'
    },

    // QM3
    {
        id: 'car-qm3-1',
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'QM3 Compact',
        category: 'car'
    },
    {
        id: 'car-qm3-2',
        src: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'QM3 Citadine',
        category: 'car'
    },

    // CAMARO
    {
        id: 'car-camaro-1',
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'CAMARO Sport',
        category: 'car',
        featured: true
    },

    // LAND CRUISER
    {
        id: 'car-cruiser-1',
        src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'LAND CRUISER 4x4',
        category: 'car',
        featured: true
    },
    {
        id: 'car-cruiser-2',
        src: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'LAND CRUISER Premium',
        category: 'car'
    }
];
