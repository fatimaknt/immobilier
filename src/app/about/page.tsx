'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    Stack,
    useTheme,
    Fade,
    Grow,
} from '@mui/material';
import {
    Business as BusinessIcon,
    Group as TeamIcon,
    Star as StarIcon,
    Timeline as TimelineIcon,
    Handshake as HandshakeIcon,
    Security as SecurityIcon,
    SupportAgent as SupportIcon,
    Apartment as ApartmentIcon,
    DirectionsCar as CarIcon,
} from '@mui/icons-material';

export default function AboutPage() {
    const theme = useTheme();

    const heroImages = [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    const stats = [
        { number: '500+', label: 'Clients satisfaits', icon: <TeamIcon sx={{ fontSize: 40, color: '#4CAF50' }} /> },
        { number: '29', label: 'Appartements', icon: <ApartmentIcon sx={{ fontSize: 40, color: '#2196F3' }} /> },
        { number: '8', label: 'Véhicules', icon: <CarIcon sx={{ fontSize: 40, color: '#FF9800' }} /> },
        { number: '5+', label: 'Années d\'expérience', icon: <TimelineIcon sx={{ fontSize: 40, color: '#9C27B0' }} /> }
    ];

    const values = [
        {
            icon: <HandshakeIcon sx={{ fontSize: 50, color: '#4CAF50' }} />,
            title: 'Confiance',
            description: 'Relations durables basées sur la transparence et la fiabilité.'
        },
        {
            icon: <StarIcon sx={{ fontSize: 50, color: '#FFD700' }} />,
            title: 'Excellence',
            description: 'Nous dépassons les attentes de nos clients à chaque interaction.'
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 50, color: '#2196F3' }} />,
            title: 'Sécurité',
            description: 'La sécurité de nos clients est notre priorité absolue.'
        },
        {
            icon: <SupportIcon sx={{ fontSize: 50, color: '#9C27B0' }} />,
            title: 'Service',
            description: 'Service client exceptionnel disponible 24h/24.'
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '100vh',
                    minHeight: '600px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                }}
            >
                {/* Carrousel d'images */}
                {heroImages.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'opacity 1s ease-in-out',
                            opacity: currentImageIndex === index ? 1 : 0,
                            zIndex: 1,
                        }}
                    />
                ))}

                {/* Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(25,118,210,0.8) 0%, rgba(156,39,176,0.8) 100%)',
                        zIndex: 2,
                    }}
                />

                {/* Contenu */}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
                    <Fade in timeout={1000}>
                        <Box textAlign="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mb: 3 }}>
                                <BusinessIcon
                                    sx={{
                                        fontSize: { xs: '3rem', md: '4.5rem' },
                                        color: '#FFD700',
                                        filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.7))',
                                        animation: 'glow 2s ease-in-out infinite alternate',
                                        '@keyframes glow': {
                                            '0%': {
                                                filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.5))',
                                            },
                                            '100%': {
                                                filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.9))',
                                            },
                                        },
                                    }}
                                />
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontWeight: 900,
                                        fontSize: { xs: '3rem', md: '4.5rem' },
                                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                        filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.5))',
                                    }}
                                >
                                    À Propos
                                </Typography>
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    mb: 2,
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                    textShadow: '0 3px 6px rgba(0,0,0,0.5)',
                                    fontWeight: 500,
                                }}
                            >
                                Résidence Cedo
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 4,
                                    maxWidth: 900,
                                    mx: 'auto',
                                    opacity: 0.9,
                                    lineHeight: 1.6,
                                    textShadow: '0 3px 6px rgba(0,0,0,0.5)',
                                }}
                            >
                                Votre partenaire de confiance pour la location d'appartements et de véhicules à Dakar.
                                Excellence, fiabilité et service client exceptionnel depuis plus de 5 ans.
                            </Typography>

                            {/* Indicateurs de carrousel */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
                                {heroImages.map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 12,
                                            height: 12,
                                            borderRadius: '50%',
                                            backgroundColor: currentImageIndex === index ? '#FFD700' : 'rgba(255,255,255,0.5)',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: '#FFD700',
                                                transform: 'scale(1.2)',
                                            },
                                        }}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Fade>
                </Container>

                {/* Flèche vers le bas */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 30,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 3,
                        animation: 'bounce 2s infinite',
                        '@keyframes bounce': {
                            '0%, 20%, 50%, 80%, 100%': {
                                transform: 'translateX(-50%) translateY(0)',
                            },
                            '40%': {
                                transform: 'translateX(-50%) translateY(-10px)',
                            },
                            '60%': {
                                transform: 'translateX(-50%) translateY(-5px)',
                            },
                        },
                    }}
                >
                    <Typography variant="h3" sx={{ color: '#FFD700', opacity: 0.8 }}>
                        ↓
                    </Typography>
                </Box>
            </Box>

            {/* Statistiques */}
            <Box sx={{ py: 4, backgroundColor: 'white' }}>
                <Container maxWidth="lg">
                    <Fade in timeout={1200}>
                        <div>
                            <Typography
                                variant="h3"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 800,
                                    mb: 6,
                                    color: theme.palette.text.primary,
                                }}
                            >
                                📊 Nos Chiffres Clés
                            </Typography>
                        </div>
                    </Fade>

                    <Grid container spacing={4} justifyContent="center">
                        {stats.map((stat, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card
                                    sx={{
                                        p: 6,
                                        textAlign: 'center',
                                        height: '100%',
                                        borderRadius: 4,
                                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 25px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                >
                                    <Box sx={{ mb: 3, fontSize: '3rem' }}>{stat.icon}</Box>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 900,
                                            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            mb: 1,
                                        }}
                                    >
                                        {stat.number}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Notre Histoire */}
            <Box sx={{ py: 4, backgroundColor: '#f8f9fa' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Fade in timeout={1400}>
                                <div>
                                    <Box>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                fontWeight: 800,
                                                mb: 2,
                                                color: theme.palette.text.primary,
                                            }}
                                        >
                                            📖 Notre Histoire
                                        </Typography>
                                        <Typography variant="body1" sx={{ mb: 1.5, lineHeight: 1.6, fontSize: '1rem' }}>
                                            Fondée en 2019, <strong>Résidence Cedo</strong> est née de la vision d'offrir aux habitants et visiteurs de Dakar
                                            des solutions de logement et de transport de qualité supérieure.
                                        </Typography>
                                        <Typography variant="body1" sx={{ mb: 1.5, lineHeight: 1.6, fontSize: '1rem' }}>
                                            Depuis nos débuts, nous avons grandi pour devenir l'un des acteurs de référence dans la location
                                            d'appartements meublés et de véhicules à Dakar, en maintenant toujours nos valeurs fondamentales
                                            de transparence, fiabilité et excellence du service.
                                        </Typography>
                                        <Typography variant="body1" sx={{ mb: 0, lineHeight: 1.6, fontSize: '1rem' }}>
                                            Aujourd'hui, avec plus de 500 clients satisfaits, nous continuons d'innover pour vous offrir
                                            la meilleure expérience possible.
                                        </Typography>
                                    </Box>
                                </div>
                            </Fade>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    height: { xs: 200, md: 250 },
                                    borderRadius: 4,
                                    backgroundImage: 'url(https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Valeurs */}
            <Box sx={{ py: 4, backgroundColor: 'white' }}>
                <Container maxWidth="lg">
                    <Fade in timeout={1800}>
                        <div>
                            <Typography
                                variant="h3"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 800,
                                    mb: 6,
                                    color: theme.palette.text.primary,
                                }}
                            >
                                💎 Nos Valeurs
                            </Typography>
                        </div>
                    </Fade>

                    <Grid container spacing={8} justifyContent="center" sx={{ px: 4 }}>
                        {values.map((value, index) => (
                            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        p: 6,
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
                                            right: 0,
                                            height: 4,
                                            background: 'linear-gradient(135deg, #4CAF50, #81C784)',
                                            borderRadius: '4px 4px 0 0',
                                        },
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                            '&:before': {
                                                height: 6,
                                            },
                                        },
                                    }}
                                >
                                    <Box sx={{ mb: 3, fontSize: '3.5rem' }}>{value.icon}</Box>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 800,
                                            mb: 2,
                                            color: '#2c3e50',
                                        }}
                                    >
                                        {value.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            lineHeight: 1.7,
                                            fontSize: '1rem'
                                        }}
                                    >
                                        {value.description}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Call to Action */}
            <Box
                sx={{
                    py: 4,
                    background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Fade in timeout={2400}>
                        <div>
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                                Prêt à commencer avec nous ?
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                                Découvrez nos appartements et véhicules disponibles
                            </Typography>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={3}
                                justifyContent="center"
                            >
                                <Box
                                    component="a"
                                    href="/apartments"
                                    sx={{
                                        display: 'inline-block',
                                        px: 4,
                                        py: 2,
                                        backgroundColor: '#FFD700',
                                        color: '#000',
                                        fontWeight: 600,
                                        borderRadius: 3,
                                        textDecoration: 'none',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': { transform: 'translateY(-2px)' },
                                    }}
                                >
                                    Voir nos Appartements
                                </Box>
                                <Box
                                    component="a"
                                    href="/cars"
                                    sx={{
                                        display: 'inline-block',
                                        px: 4,
                                        py: 2,
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                        fontWeight: 600,
                                        borderRadius: 3,
                                        border: '2px solid white',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                            color: '#1976d2',
                                        },
                                    }}
                                >
                                    Découvrir nos Voitures
                                </Box>
                            </Stack>
                        </div>
                    </Fade>
                </Container>
            </Box>
        </Box>
    );
}
