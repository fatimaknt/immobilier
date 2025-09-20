'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Checkbox,
    FormControlLabel,
    Paper,
    useTheme,
    alpha,
    Fade,
    Grow,
    Chip,
} from '@mui/material';
import {
    FilterList as FilterIcon,
    DirectionsCar as CarIcon,
    Search as SearchIcon,
    Speed as SpeedIcon,
    Security as SecurityIcon,
    LocalGasStation as GasIcon,
    Smartphone as PhoneIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import CarCard from '@/components/cars/CarCard';
import { Car } from '@/types';

export default function CarsPage() {
    const theme = useTheme();
    const [cars, setCars] = useState<Car[]>([]);
    const [availableOnly, setAvailableOnly] = useState(false);
    const [transmissionFilter, setTransmissionFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [sortBy, setSortBy] = useState<'price' | 'year' | 'brand'>('price');

    // Charger les voitures depuis l'API
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('/api/cars');
                if (response.ok) {
                    const data = await response.json();
                    setCars(data);
                } else {
                    console.error('Erreur lors du chargement des voitures:', response.status);
                }
            } catch (error) {
                console.error('Erreur réseau:', error);
            }
        };

        fetchCars();
    }, []);

    const heroImages = [
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 3000); // Change toutes les 3 secondes

        return () => clearInterval(interval);
    }, [heroImages.length]);

    const carTypes = [...new Set(cars.map(car => car.type))];
    const transmissionTypes = [...new Set(cars.map(car => car.transmission))];

    const filteredCars = useMemo(() => {
        // Toujours afficher toutes les voitures par défaut
        let filtered = cars;

        // Appliquer les filtres seulement s'ils sont définis
        if (availableOnly || transmissionFilter || typeFilter) {
            filtered = cars.filter(car => {
                if (availableOnly && !car.available) return false;
                if (transmissionFilter && car.transmission !== transmissionFilter) return false;
                if (typeFilter && car.type !== typeFilter) return false;
                return true;
            });
        }

        // Tri
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price':
                    return a.price_per_day - b.price_per_day;
                case 'year':
                    return b.year - a.year; // Plus récent en premier
                case 'brand':
                    return a.brand.localeCompare(b.brand);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [cars, availableOnly, transmissionFilter, typeFilter, sortBy]);

    const features = [
        { icon: <SpeedIcon sx={{ fontSize: 40, color: '#4CAF50' }} />, title: 'Véhicules récents', desc: 'Flotte régulièrement renouvelée' },
        { icon: <SecurityIcon sx={{ fontSize: 40, color: '#FF9800' }} />, title: 'Assurance incluse', desc: 'Couverture complète' },
        { icon: <GasIcon sx={{ fontSize: 40, color: '#2196F3' }} />, title: 'Carburant flexible', desc: 'Essence, diesel, hybride' },
        { icon: <PhoneIcon sx={{ fontSize: 40, color: '#9C27B0' }} />, title: 'Réservation facile', desc: 'En ligne 24h/24' }
    ];


    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Hero Section avec carrousel */}
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
                {/* Carrousel d'images en arrière-plan */}
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

                {/* Overlay sombre */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(76,175,80,0.7) 0%, rgba(33,150,243,0.7) 100%)',
                        zIndex: 2,
                    }}
                />

                {/* Contenu texte */}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
                    <Fade in timeout={1000}>
                        <Box textAlign="center">
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: { xs: 2, md: 3 },
                                mb: 3,
                                flexDirection: { xs: 'column', sm: 'row' }
                            }}>
                                <CarIcon
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
                                        fontSize: { xs: '2.5rem', sm: '3rem', md: '4.5rem' },
                                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                        filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.5))',
                                    }}
                                >
                                    Nos Voitures
                                </Typography>
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    mb: 4,
                                    color: '#FFFFFF',
                                    maxWidth: 800,
                                    mx: 'auto',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                    textShadow: '0 3px 6px rgba(0,0,0,0.5)',
                                    fontWeight: 500,
                                }}
                            >
                                Véhicules fiables et récents pour tous vos déplacements à Dakar
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

            {/* Avantages */}
            <Box sx={{ py: 8, backgroundColor: 'white' }}>
                <Container maxWidth="lg">
                    <Fade in timeout={1200}>
                        <Box textAlign="center" sx={{ mb: 6 }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    mb: 2,
                                    color: theme.palette.text.primary,
                                }}
                            >
                                ⭐ Nos avantages
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Une flotte moderne et un service d'exception
                            </Typography>
                        </Box>
                    </Fade>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                        gap: 4,
                        justifyContent: 'center'
                    }}>
                        {features.map((feature, index) => (
                            <Fade in timeout={1000 + index * 200} key={index}>
                                <Card
                                    sx={{
                                        p: 4,
                                        textAlign: 'center',
                                        height: '100%',
                                        borderRadius: 4,
                                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                                        },
                                    }}
                                >
                                    <Box sx={{ mb: 3 }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.desc}
                                    </Typography>
                                </Card>
                            </Fade>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Filtres et résultats */}
            <Box sx={{ py: 6 }}>
                <Container maxWidth="lg">
                    {/* Barre de filtres */}
                    <Fade in timeout={1400}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 4,
                                mb: 4,
                                borderRadius: 4,
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <FilterIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Filtres de recherche
                                </Typography>
                            </Box>

                            <Grid container spacing={3} alignItems="flex-end">
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Type de véhicule</InputLabel>
                                        <Select
                                            value={typeFilter}
                                            label="Type de véhicule"
                                            onChange={(e) => setTypeFilter(e.target.value)}
                                            sx={{
                                                height: 56,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                minWidth: 150,
                                                '& .MuiSelect-select': {
                                                    py: 2,
                                                    px: 3,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600,
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontSize: '1.1rem',
                                                    left: 8,
                                                }
                                            }}
                                        >
                                            <MenuItem value="" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Tous les types</MenuItem>
                                            {carTypes.map(type => (
                                                <MenuItem key={type} value={type} sx={{ fontSize: '1.1rem', fontWeight: 600 }}>{type}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Transmission</InputLabel>
                                        <Select
                                            value={transmissionFilter}
                                            label="Transmission"
                                            onChange={(e) => setTransmissionFilter(e.target.value)}
                                            sx={{
                                                height: 56,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                minWidth: 150,
                                                '& .MuiSelect-select': {
                                                    py: 2,
                                                    px: 3,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600,
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontSize: '1.1rem',
                                                    left: 8,
                                                }
                                            }}
                                        >
                                            <MenuItem value="" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Toutes</MenuItem>
                                            {transmissionTypes.map(transmission => (
                                                <MenuItem key={transmission} value={transmission} sx={{ fontSize: '1.1rem', fontWeight: 600 }}>{transmission}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Trier par</InputLabel>
                                        <Select
                                            value={sortBy}
                                            label="Trier par"
                                            onChange={(e) => setSortBy(e.target.value as 'price' | 'year' | 'brand')}
                                            sx={{
                                                height: 56,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                minWidth: 150,
                                                '& .MuiSelect-select': {
                                                    py: 2,
                                                    px: 3,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600,
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontSize: '1.1rem',
                                                    left: 8,
                                                }
                                            }}
                                        >
                                            <MenuItem value="price" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Prix croissant</MenuItem>
                                            <MenuItem value="year" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Plus récent</MenuItem>
                                            <MenuItem value="brand" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Marque A-Z</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            py: 2,
                                            height: 56,
                                            fontSize: '1.1rem',
                                            fontWeight: 600
                                        }}
                                        onClick={() => {
                                            setAvailableOnly(false);
                                            setTransmissionFilter('');
                                            setTypeFilter('');
                                            setSortBy('price');
                                        }}
                                    >
                                        Réinitialiser
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* Checkbox "Disponibles uniquement" en dessous */}
                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={availableOnly}
                                            onChange={(e) => setAvailableOnly(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Disponibles uniquement"
                                    sx={{
                                        fontWeight: 600,
                                        '& .MuiFormControlLabel-label': {
                                            fontSize: '1.1rem',
                                            fontWeight: 600
                                        }
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Fade>

                    {/* Résultats */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                            <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                            {filteredCars.length} voiture{filteredCars.length > 1 ? 's' : ''} trouvée{filteredCars.length > 1 ? 's' : ''}
                        </Typography>
                        <Chip
                            label={`${filteredCars.filter(car => car.available).length} disponible${filteredCars.filter(car => car.available).length > 1 ? 's' : ''}`}
                            color="success"
                            sx={{ fontWeight: 600 }}
                        />
                    </Box>

                    {filteredCars.length > 0 ? (
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                            gap: 3,
                            justifyContent: 'center'
                        }}>
                            {filteredCars.map((car, index) => (
                                <Grow key={car.id} in timeout={1000 + index * 100}>
                                    <div style={{ width: '100%' }}>
                                        <CarCard car={car} />
                                    </div>
                                </Grow>
                            ))}
                        </Box>
                    ) : (
                        <Fade in timeout={1000}>
                            <Paper
                                elevation={2}
                                sx={{
                                    textAlign: 'center',
                                    py: 8,
                                    borderRadius: 4,
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                }}
                            >
                                <CarIcon sx={{ fontSize: 80, color: theme.palette.grey[400], mb: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
                                    Aucune voiture trouvée
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                    Essayez de modifier vos critères de recherche
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => {
                                        setAvailableOnly(false);
                                        setTransmissionFilter('');
                                        setTypeFilter('');
                                    }}
                                    sx={{
                                        px: 4,
                                        py: 2,
                                        borderRadius: 3,
                                    }}
                                >
                                    Voir toutes les voitures
                                </Button>
                            </Paper>
                        </Fade>
                    )}
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                sx={{
                    py: 8,
                    background: 'linear-gradient(135deg, #2196F3 0%, #4CAF50 100%)',
                    color: 'white',
                }}
            >
                <Container maxWidth="md">
                    <Fade in timeout={1600}>
                        <Box textAlign="center">
                            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
                                Besoin d'aide pour choisir ?
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                                Notre équipe vous accompagne dans le choix du véhicule parfait
                            </Typography>
                            <Grid container spacing={3} justifyContent="center">
                                <Grid item xs={12} sm={6} md={4}>
                                    <Button
                                        component="a"
                                        href="https://wa.me/221784929439?text=Bonjour,%20j'aimerais%20avoir%20des%20conseils%20pour%20choisir%20une%20voiture."
                                        target="_blank"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#25D366',
                                            color: 'white',
                                            py: 2,
                                            '&:hover': {
                                                backgroundColor: '#1DA851',
                                            },
                                        }}
                                    >
                                        💬 WhatsApp
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Button
                                        component="a"
                                        href="tel:+221784929439"
                                        variant="outlined"
                                        size="large"
                                        fullWidth
                                        sx={{
                                            borderColor: 'white',
                                            color: 'white',
                                            py: 2,
                                            '&:hover': {
                                                backgroundColor: 'white',
                                                color: theme.palette.primary.main,
                                            },
                                        }}
                                    >
                                        📞 Appeler
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Container>
            </Box>
        </Box>
    );
}
