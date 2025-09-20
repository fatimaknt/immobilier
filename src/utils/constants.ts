export const COMPANY_INFO = {
    name: 'Location Pro',
    tagline: 'Votre partenaire de confiance pour la location',
    phone: '+221 78 492 94 39',
    email: 'contact@locationpro.sn',
    whatsapp: '+221784929439',
    address: 'Dakar, Sénégal'
};

export const ZONES = {
    OUEST_FOIRE: 'Ouest-foire',
    CITE_MIXTA: 'Cité Mixta',
    CITE_KALIA: 'Cité Kalia'
} as const;

export const BOOKING_STATUS = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    CANCELLED: 'Cancelled'
} as const;

export const TRANSMISSION_TYPES = {
    MANUAL: 'Manuelle',
    AUTOMATIC: 'Automatique'
} as const;

export const ITEM_TYPES = {
    APARTMENT: 'Apartment',
    CAR: 'Car'
} as const;

export const TESTIMONIAL_TYPES = {
    APARTMENT: 'Appartement',
    CAR: 'Voiture'
} as const;

export const DEFAULT_CENTER = {
    lat: 14.7167,
    lng: -17.4677
};
