'use client';

import React from 'react';

interface StructuredDataProps {
    type: 'organization' | 'homepage' | 'apartments' | 'cars' | 'contact';
    data?: Record<string, unknown>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
    const getStructuredData = () => {
        const baseUrl = 'https://residencecedo.sn';

        switch (type) {
            case 'organization':
                return {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Résidence Cedo",
                    "url": baseUrl,
                    "logo": `${baseUrl}/assets/logos/logo.jpeg`,
                    "description": "Service de location d'appartements meublés et voitures premium à Dakar, Sénégal.",
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "SN",
                        "addressLocality": "Dakar",
                        "addressRegion": "Dakar"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 14.6928,
                        "longitude": -17.4467
                    },
                    "contactPoint": [
                        {
                            "@type": "ContactPoint",
                            "telephone": "+221-12-345-67-89",
                            "contactType": "customer service",
                            "availableLanguage": ["French", "English"]
                        }
                    ],
                    "sameAs": [
                        "https://facebook.com/residencecedo",
                        "https://instagram.com/residencecedo",
                        "https://linkedin.com/company/residencecedo"
                    ],
                    "founder": {
                        "@type": "Person",
                        "name": "Résidence Cedo"
                    },
                    "foundingDate": "2024",
                    "slogan": "Votre partenaire de confiance pour la location à Dakar"
                };

            case 'homepage':
                return {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Résidence Cedo",
                    "url": baseUrl,
                    "description": "Location d'appartements meublés et voitures premium à Dakar. Service professionnel, réservation en ligne 24h/24.",
                    "publisher": {
                        "@type": "Organization",
                        "name": "Résidence Cedo"
                    },
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": `${baseUrl}/apartments?search={search_term_string}`
                        },
                        "query-input": "required name=search_term_string"
                    },
                    "mainEntity": {
                        "@type": "Service",
                        "name": "Location d'appartements et voitures",
                        "description": "Service de location d'appartements meublés et véhicules à Dakar",
                        "provider": {
                            "@type": "Organization",
                            "name": "Résidence Cedo"
                        },
                        "areaServed": {
                            "@type": "City",
                            "name": "Dakar"
                        },
                        "serviceType": "Real Estate Rental"
                    }
                };

            case 'apartments':
                return {
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "name": "Appartements à louer - Résidence Cedo",
                    "description": "Collection d'appartements meublés disponibles à la location à Dakar",
                    "numberOfItems": 29,
                    "itemListElement": [
                        {
                            "@type": "Place",
                            "name": "Appartements Cité Mixta",
                            "description": "14 appartements disponibles à Cité Mixta",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Cité Mixta",
                                "addressRegion": "Dakar",
                                "addressCountry": "SN"
                            }
                        },
                        {
                            "@type": "Place",
                            "name": "Appartements Ouest-foire",
                            "description": "13 appartements disponibles à Ouest-foire",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Ouest-foire",
                                "addressRegion": "Dakar",
                                "addressCountry": "SN"
                            }
                        },
                        {
                            "@type": "Place",
                            "name": "Appartements Cité Kalia",
                            "description": "2 appartements disponibles à Cité Kalia",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Cité Kalia",
                                "addressRegion": "Dakar",
                                "addressCountry": "SN"
                            }
                        }
                    ]
                };

            case 'cars':
                return {
                    "@context": "https://schema.org",
                    "@type": "AutoRental",
                    "name": "Location de Voitures - Résidence Cedo",
                    "description": "Service de location de véhicules premium à Dakar",
                    "provider": {
                        "@type": "Organization",
                        "name": "Résidence Cedo"
                    },
                    "areaServed": {
                        "@type": "City",
                        "name": "Dakar"
                    },
                    "offers": {
                        "@type": "Offer",
                        "description": "Location de véhicules avec assurance incluse",
                        "priceRange": "25000-75000 FCFA",
                        "priceCurrency": "XOF"
                    }
                };

            case 'contact':
                return {
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contact - Résidence Cedo",
                    "description": "Contactez-nous pour vos besoins de location d'appartements et voitures à Dakar",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "Résidence Cedo",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+221-12-345-67-89",
                            "email": "contact@residencecedo.sn",
                            "contactType": "customer service",
                            "availableLanguage": ["French"]
                        }
                    }
                };

            default:
                return null;
        }
    };

    const structuredData = getStructuredData();

    if (!structuredData) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData, null, 2),
            }}
        />
    );
};

export default StructuredData;
