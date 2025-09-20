'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Paper,
    Stack,
    useTheme,
    alpha,
    Grow,
    Fade,
    IconButton,
} from '@mui/material';
import {
    SupportAgent as SupportIcon,
    WhatsApp as WhatsAppIcon,
    Phone as PhoneIcon,
    VerifiedUser as VerifiedIcon,
    Speed as SpeedIcon,
    AttachMoney as MoneyIcon,
    ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
// import { cars } from '@/data/cars'; // Remplacé par l'API
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
// import { formatPrice } from '@/utils/helpers'; // Non utilisé
import { Apartment, Car } from '@/types';
import Testimonials from '@/components/common/Testimonials';
import FAQSection from '@/components/common/FAQSection';
import InteractiveMap from '@/components/maps/InteractiveMap';
import StructuredData from '@/components/seo/StructuredData';
import PhotoGallery from '@/components/gallery/PhotoGallery';
import { galleryPhotos } from '@/data/gallery';

export default function HomePage() {
    const theme = useTheme();
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [cars, setCars] = useState<Car[]>([]);

    // Charger les données depuis l'API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Charger les appartements et voitures en parallèle
                const [apartmentsResponse, carsResponse] = await Promise.all([
                    fetch('/api/apartments'),
                    fetch('/api/cars')
                ]);

                if (apartmentsResponse.ok) {
                    const apartmentsData = await apartmentsResponse.json();
                    setApartments(apartmentsData);
                } else {
                    console.error('Erreur lors du chargement des appartements');
                }

                if (carsResponse.ok) {
                    const carsData = await carsResponse.json();
                    setCars(carsData);
                } else {
                    console.error('Erreur lors du chargement des voitures');
                }
            } catch (error) {
                console.error('Erreur réseau:', error);
            }
        };

        fetchData();
    }, []);

    const featuredApartments = apartments.slice(0, 3);
    const featuredCars = cars.filter(car => car.available).slice(0, 3);

    // Debug logs
    console.log('Appartements dans le state:', apartments.length);
    console.log('Voitures dans le state:', cars.length);
    console.log('Appartements featured:', featuredApartments.length);
    console.log('Voitures featured:', featuredCars.length);

    // Zones data with correct counts
    const zones = [
        {
            name: 'Cité Mixta',
            count: 14,
            image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
            description: 'Quartier résidentiel moderne avec toutes commodités',
            price: '25,000 FCFA/jour'
        },
        {
            name: 'Ouest-foire',
            count: 13,
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
            description: 'Zone dynamique avec centres commerciaux',
            price: '30,000 FCFA/jour'
        },
        {
            name: 'Cité Kalia',
            count: 2,
            image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
            description: 'Quartier calme et sécurisé',
            price: '35,000 FCFA/jour'
        }
    ];

    const stats = [
        { number: '29+', label: 'Appartements', icon: '🏢' },
        { number: '8+', label: 'Véhicules', icon: '🚗' },
        { number: '500+', label: 'Clients satisfaits', icon: '⭐' },
        { number: '24/7', label: 'Support', icon: '👨‍💼' },
    ];

    const features = [
        {
            icon: <VerifiedIcon sx={{ fontSize: 40, color: 'success.main' }} />,
            title: 'Qualité garantie',
            description: 'Tous nos biens sont vérifiés et de haute qualité'
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Réservation rapide',
            description: 'Réservez en quelques clics, disponibilité immédiate'
        },
        {
            icon: <MoneyIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
            title: 'Prix compétitifs',
            description: 'Tarifs transparents et les plus attractifs du marché'
        },
        {
            icon: <SupportIcon sx={{ fontSize: 40, color: 'info.main' }} />,
            title: 'Service client',
            description: 'Accompagnement personnalisé 24h/24 et 7j/7'
        }
    ];


    return (
        <>
            <StructuredData type="organization" />
            <StructuredData type="homepage" />
            <Box>
                {/* Hero Section Spectaculaire */}
                <Box
                    sx={{
                        position: 'relative',
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        background: `
            linear-gradient(135deg, 
              ${alpha(theme.palette.primary.main, 0.9)} 0%, 
              ${alpha(theme.palette.secondary.main, 0.8)} 100%
            ),
            url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')
          `,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        color: 'white',
                        overflow: 'hidden',
                        pt: { xs: 8, md: 10 },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.3)',
                            zIndex: 1,
                        }
                    }}
                >
                    <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
                        <Grid container spacing={4} alignItems="center" sx={{ minHeight: '80vh' }}>
                            {/* Contenu principal - centré mais équilibré */}
                            <Grid item xs={12} lg={8}>
                                <Fade in timeout={1000}>
                                    <Box sx={{ textAlign: { xs: 'center', lg: 'left' }, pl: { lg: 4 } }}>
                                        <Typography
                                            variant="h1"
                                            sx={{
                                                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                                                fontWeight: 900,
                                                lineHeight: 1.1,
                                                mb: 3,
                                                background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                textShadow: '0 0 30px rgba(255,255,255,0.5)',
                                            }}
                                        >
                                            Trouvez votre
                                            <Box component="span" sx={{ color: '#FFD700', display: 'block' }}>
                                                location idéale
                                            </Box>
                                            à Dakar
                                        </Typography>

                                        <Typography
                                            variant="h5"
                                            sx={{
                                                mb: 4,
                                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                                                lineHeight: 1.6,
                                                opacity: 0.95,
                                                maxWidth: '600px',
                                                mx: { xs: 'auto', lg: 0 },
                                            }}
                                        >
                                            🏠 Appartements premium • 🚗 Véhicules de luxe
                                            <br />
                                            Dans les meilleurs quartiers de Dakar
                                        </Typography>

                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            spacing={3}
                                            sx={{
                                                mb: 4,
                                                justifyContent: { xs: 'center', lg: 'flex-start' },
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <Button
                                                component={Link}
                                                href="/apartments"
                                                variant="contained"
                                                size="large"
                                                sx={{
                                                    px: 5,
                                                    py: 2.5,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600,
                                                    borderRadius: 4,
                                                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                                                    color: '#000',
                                                    boxShadow: '0 8px 25px rgba(255,215,0,0.4)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #FFA500, #FFD700)',
                                                        boxShadow: '0 12px 35px rgba(255,215,0,0.6)',
                                                        transform: 'translateY(-3px) scale(1.02)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                🏠 Voir les appartements
                                            </Button>

                                            <Button
                                                component={Link}
                                                href="/cars"
                                                variant="outlined"
                                                size="large"
                                                sx={{
                                                    px: 5,
                                                    py: 2.5,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600,
                                                    borderRadius: 4,
                                                    borderColor: 'white',
                                                    color: 'white',
                                                    borderWidth: 2,
                                                    background: 'rgba(255,255,255,0.1)',
                                                    backdropFilter: 'blur(10px)',
                                                    '&:hover': {
                                                        borderWidth: 2,
                                                        background: 'rgba(255,255,255,0.2)',
                                                        transform: 'translateY(-3px) scale(1.02)',
                                                        boxShadow: '0 12px 35px rgba(255,255,255,0.3)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                🚗 Louer une voiture
                                            </Button>
                                        </Stack>

                                        {/* Contact aligné avec les boutons */}
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            sx={{
                                                justifyContent: { xs: 'center', lg: 'flex-start' },
                                                mb: { xs: 4, lg: 0 }
                                            }}
                                        >
                                            <IconButton
                                                href="https://wa.me/221784929439"
                                                target="_blank"
                                                sx={{
                                                    backgroundColor: '#25D366',
                                                    color: 'white',
                                                    width: 50,
                                                    height: 50,
                                                    '&:hover': {
                                                        backgroundColor: '#1DA851',
                                                        transform: 'scale(1.1)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                <WhatsAppIcon />
                                            </IconButton>
                                            <IconButton
                                                href="tel:+221784929439"
                                                sx={{
                                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                                    color: 'white',
                                                    width: 50,
                                                    height: 50,
                                                    backdropFilter: 'blur(10px)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255,255,255,0.3)',
                                                        transform: 'scale(1.1)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                <PhoneIcon />
                                            </IconButton>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                📞 +221 78 492 94 39
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Fade>
                            </Grid>

                            {/* Stats à droite - design équilibré */}
                            <Grid item xs={12} lg={4} sx={{
                                display: 'flex',
                                alignItems: { xs: 'flex-start', lg: 'center' },
                                mt: { xs: -4, lg: 0 }
                            }}>
                                <Fade in timeout={1500}>
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', lg: '1fr' },
                                        gap: { xs: 2, lg: 3 },
                                        justifyItems: 'center',
                                        pr: { lg: 4 },
                                        width: '100%'
                                    }}>
                                        {stats.map((stat, index) => (
                                            <Grow in timeout={1000 + index * 200} key={index}>
                                                <div>
                                                    <Paper
                                                        elevation={0}
                                                        sx={{
                                                            p: { xs: 2, md: 3 },
                                                            textAlign: 'center',
                                                            background: 'rgba(255,255,255,0.15)',
                                                            backdropFilter: 'blur(20px)',
                                                            border: '1px solid rgba(255,255,255,0.2)',
                                                            borderRadius: 3,
                                                            color: 'white',
                                                            transition: 'all 0.3s ease',
                                                            minWidth: { xs: '140px', lg: '180px' },
                                                            width: '100%',
                                                            maxWidth: { xs: '140px', lg: '180px' },
                                                            '&:hover': {
                                                                transform: 'translateY(-5px) scale(1.02)',
                                                                background: 'rgba(255,255,255,0.25)',
                                                            }
                                                        }}
                                                    >
                                                        <Box sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                                                            {stat.icon}
                                                        </Box>
                                                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                                                            {stat.number}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ opacity: 0.9, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                                                            {stat.label}
                                                        </Typography>
                                                    </Paper>
                                                </div>
                                            </Grow>
                                        ))}
                                    </Box>
                                </Fade>
                            </Grid>
                        </Grid>
                    </Container>

                    {/* Scroll indicator */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 30,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 2,
                            animation: 'bounce 2s infinite',
                            '@keyframes bounce': {
                                '0%, 20%, 50%, 80%, 100%': { transform: 'translateX(-50%) translateY(0)' },
                                '40%': { transform: 'translateX(-50%) translateY(-10px)' },
                                '60%': { transform: 'translateX(-50%) translateY(-5px)' },
                            }
                        }}
                    >
                        <IconButton sx={{ color: 'white', fontSize: '2rem' }}>
                            <ExpandMoreIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Box>

                {/* Zones populaires avec design moderne */}
                <Box sx={{ py: 10, background: 'linear-gradient(180deg, #f8f9fa 0%, #fff 100%)' }}>
                    <Container maxWidth="lg">
                        <Box textAlign="center" sx={{ mb: 8 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    mb: 2,
                                    fontWeight: 800,
                                    color: theme.palette.primary.main,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 2,
                                }}
                            >
                                🏠 Nos quartiers premium
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                                Découvrez nos logements dans les zones les plus prisées de Dakar,
                                soigneusement sélectionnées pour votre confort
                            </Typography>
                        </Box>

                        {/* 3 cartes alignées sur une seule ligne */}
                        <Grid container spacing={6} justifyContent="center" sx={{ px: { md: 6 } }}>
                            {zones.map((zone, index) => (
                                <Grid item xs={12} sm={10} md={4.2} key={zone.name}>
                                    <Grow in timeout={1000 + index * 200}>
                                        <div>
                                            <Card
                                                sx={{
                                                    height: '100%',
                                                    borderRadius: 4,
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.4s ease',
                                                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                                    '&:hover': {
                                                        transform: 'translateY(-10px) scale(1.02)',
                                                        boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.25)}`,
                                                    },
                                                }}
                                            >
                                                <Box sx={{ position: 'relative', height: 320 }}>
                                                    <Image
                                                        src={zone.image}
                                                        alt={zone.name}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                                                        }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 15,
                                                            left: 15,
                                                            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                                                            color: '#000',
                                                            px: 2,
                                                            py: 1,
                                                            borderRadius: 20,
                                                            fontWeight: 700,
                                                            fontSize: '0.8rem',
                                                            boxShadow: '0 4px 15px rgba(255,215,0,0.4)',
                                                        }}
                                                    >
                                                        {zone.count} logements
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 20,
                                                            left: 20,
                                                            right: 20,
                                                            color: 'white',
                                                        }}
                                                    >
                                                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontSize: '1.3rem' }}>
                                                            {zone.name}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ opacity: 0.95, mb: 1.5, fontSize: '0.9rem' }}>
                                                            {zone.description}
                                                        </Typography>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                color: '#FFD700',
                                                                fontWeight: 700,
                                                                fontSize: '1rem',
                                                            }}
                                                        >
                                                            À partir de {zone.price}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <CardContent sx={{ p: 4, backgroundColor: '#fff' }}>
                                                    <Button
                                                        component={Link}
                                                        href={`/apartments?zone=${zone.name}`}
                                                        variant="contained"
                                                        fullWidth
                                                        sx={{
                                                            py: 2,
                                                            fontSize: '0.95rem',
                                                            fontWeight: 600,
                                                            borderRadius: 20,
                                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                                            boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                                            '&:hover': {
                                                                transform: 'translateY(-2px)',
                                                                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.5)}`,
                                                            },
                                                            transition: 'all 0.3s ease',
                                                        }}
                                                    >
                                                        📍 Découvrir la zone
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </Grow>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Section Features avec design moderne */}
                <Box sx={{ py: 10, backgroundColor: '#f8f9fa' }}>
                    <Container maxWidth="xl">
                        <Box textAlign="center" sx={{ mb: 8 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    mb: 2,
                                    fontWeight: 800,
                                    color: theme.palette.text.primary,
                                    fontSize: { xs: '2rem', md: '2.5rem' }
                                }}
                            >
                                ⭐ Pourquoi nous choisir ?
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                                Une expérience de location unique avec des services premium
                                pour votre satisfaction totale
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                lg: 'repeat(4, 1fr)'
                            },
                            gap: { xs: 3, md: 4 },
                            px: { xs: 2, md: 4 },
                            justifyItems: 'center',
                            maxWidth: '1200px',
                            mx: 'auto'
                        }}>
                            {features.map((feature, index) => (
                                <Box key={index} sx={{ width: '100%', maxWidth: 280 }}>
                                    <Grow in timeout={1000 + index * 200}>
                                        <div>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    p: 8,
                                                    textAlign: 'center',
                                                    height: '100%',
                                                    borderRadius: 4,
                                                    background: 'white',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    border: 'none',
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                                    transition: 'all 0.3s ease',
                                                    '&:before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '6px',
                                                        background: index === 0 ? 'linear-gradient(90deg, #4CAF50, #2E7D32)' :
                                                            index === 1 ? 'linear-gradient(90deg, #2196F3, #1976D2)' :
                                                                index === 2 ? 'linear-gradient(90deg, #FF9800, #F57C00)' :
                                                                    'linear-gradient(90deg, #00BCD4, #0097A7)',
                                                    },
                                                    '&:hover': {
                                                        transform: 'translateY(-8px)',
                                                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                                    },
                                                }}
                                            >
                                                {/* Icône avec cercle de fond */}
                                                <Box
                                                    sx={{
                                                        mb: 4,
                                                        display: 'flex',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 80,
                                                            height: 80,
                                                            borderRadius: '50%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: index === 0 ? alpha('#4CAF50', 0.1) :
                                                                index === 1 ? alpha('#2196F3', 0.1) :
                                                                    index === 2 ? alpha('#FF9800', 0.1) :
                                                                        alpha('#00BCD4', 0.1),
                                                        }}
                                                    >
                                                        {feature.icon}
                                                    </Box>
                                                </Box>

                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        mb: 3,
                                                        fontWeight: 700,
                                                        color: theme.palette.text.primary,
                                                        fontSize: '1.4rem'
                                                    }}
                                                >
                                                    {feature.title}
                                                </Typography>

                                                <Typography
                                                    variant="body1"
                                                    color="text.secondary"
                                                    sx={{
                                                        lineHeight: 1.7,
                                                        fontSize: '1rem'
                                                    }}
                                                >
                                                    {feature.description}
                                                </Typography>
                                            </Paper>
                                        </div>
                                    </Grow>
                                </Box>
                            ))}
                        </Box>
                    </Container>
                </Box>

                {/* CTA Final très attractif */}
                <Box
                    sx={{
                        py: 10,
                        background: `
            linear-gradient(135deg, 
              ${theme.palette.primary.main} 0%, 
              ${theme.palette.secondary.main} 100%
            )
          `,
                        color: 'white',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            opacity: 0.5,
                        }
                    }}
                >
                    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                mb: 3,
                                fontWeight: 900,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                            }}
                        >
                            🚀  Prêt à commencer ?
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 6,
                                opacity: 0.95,
                                fontSize: { xs: '1.2rem', md: '1.4rem' },
                                maxWidth: 600,
                                mx: 'auto',
                                lineHeight: 1.6,
                            }}
                        >
                            Rejoignez des centaines de clients satisfaits et trouvez
                            votre location idéale dès aujourd&apos;hui !
                        </Typography>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={3}
                            justifyContent="center"
                            sx={{ mb: 4 }}
                        >
                            <Button
                                component={Link}
                                href="/contact"
                                variant="contained"
                                size="large"
                                sx={{
                                    px: 6,
                                    py: 3,
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    borderRadius: 4,
                                    backgroundColor: '#FFD700',
                                    color: '#000',
                                    '&:hover': {
                                        backgroundColor: '#FFA500',
                                        transform: 'translateY(-3px) scale(1.05)',
                                        boxShadow: '0 15px 35px rgba(255,215,0,0.4)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                📞 Nous contacter
                            </Button>
                            <Button
                                component={Link}
                                href="/booking"
                                variant="outlined"
                                size="large"
                                sx={{
                                    px: 6,
                                    py: 3,
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    borderRadius: 4,
                                    borderColor: 'white',
                                    color: 'white',
                                    borderWidth: 2,
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': {
                                        borderWidth: 2,
                                        background: 'rgba(255,255,255,0.2)',
                                        transform: 'translateY(-3px) scale(1.05)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Réserver maintenant
                            </Button>
                        </Stack>

                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                            ⚡ Réponse garantie sous 30 minutes • 🛡️ Service sécurisé et fiable
                        </Typography>
                    </Container>
                </Box>

                {/* Carte Interactive */}
                <InteractiveMap apartments={apartments} />

                {/* Galerie Photos HD */}
                <PhotoGallery
                    photos={galleryPhotos}
                    title="🏠 Galerie Photos HD & Vidéos"
                    description="Découvrez nos appartements et véhicules en haute qualité avec zoom"
                />

                {/* Section Témoignages */}
                <Testimonials testimonials={testimonials} />

                {/* Section FAQ */}
                <FAQSection faqs={faqs} />
            </Box>
        </>
    );
}