'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Chip,
    Paper,
    useTheme,
    alpha,
    Fade,
    Grow,
} from '@mui/material';
import {
    FilterList as FilterIcon,
    Home as HomeIcon,
    Search as SearchIcon,
    Wifi as WifiIcon,
    AcUnit as AcIcon,
    LocalParking as ParkingIcon,
    Security as SecurityIcon,
    Apartment as ApartmentIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import { zones } from '@/data/zones';
import ApartmentCard from '@/components/apartments/ApartmentCard';
import { Apartment } from '@/types';

export default function ApartmentsPage() {
    const theme = useTheme();
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [selectedZone, setSelectedZone] = useState<string>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
    const [roomsFilter, setRoomsFilter] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<'price' | 'rooms' | 'surface'>('price');

    // Charger les appartements depuis l'API
    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await fetch('/api/apartments');
                if (response.ok) {
                    const data = await response.json();
                    setApartments(data);
                } else {
                    console.error('Erreur lors du chargement des appartements:', response.status);
                }
            } catch (error) {
                console.error('Erreur réseau:', error);
            }
        };

        fetchApartments();
    }, []);


    // Images pour le carrousel
    const heroImages = [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Carrousel automatique
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 3000); // Change toutes les 3 secondes

        return () => clearInterval(interval);
    }, [heroImages.length]);

    const features = [
        { icon: <WifiIcon sx={{ fontSize: 40, color: '#2196F3' }} />, title: 'WiFi gratuit', desc: 'Internet haut débit inclus' },
        { icon: <AcIcon sx={{ fontSize: 40, color: '#00BCD4' }} />, title: 'Climatisation', desc: 'Confort garanti toute l\'année' },
        { icon: <ParkingIcon sx={{ fontSize: 40, color: '#4CAF50' }} />, title: 'Parking sécurisé', desc: 'Places de stationnement privées' },
        { icon: <SecurityIcon sx={{ fontSize: 40, color: '#FF9800' }} />, title: 'Sécurité 24h/7j', desc: 'Surveillance et gardiennage' }
    ];

    const filteredApartments = useMemo(() => {
        // Toujours afficher tous les appartements par défaut
        let filtered = apartments;

        // Appliquer les filtres seulement s'ils sont définis
        if (selectedZone || roomsFilter || priceRange[0] > 0 || priceRange[1] < 1000000) {
            filtered = apartments.filter(apartment => {
                if (selectedZone && apartment.zone !== selectedZone) return false;
                if (apartment.price_per_day < priceRange[0] || apartment.price_per_day > priceRange[1]) return false;
                if (roomsFilter && apartment.rooms !== roomsFilter) return false;
                return true;
            });
        }

        // Tri
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price':
                    return a.price_per_day - b.price_per_day;
                case 'rooms':
                    return a.rooms - b.rooms;
                case 'surface':
                    return a.surface - b.surface;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [apartments, selectedZone, priceRange, roomsFilter, sortBy]);


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
                        background: 'linear-gradient(135deg, rgba(25,118,210,0.7) 0%, rgba(156,39,176,0.7) 100%)',
                        zIndex: 2,
                    }}
                />

                {/* Contenu texte */}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
                    <Fade in timeout={1000}>
                        <Box textAlign="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mb: 3 }}>
                                <ApartmentIcon
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
                                    Nos Appartements
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
                                Découvrez notre sélection d'appartements modernes dans les meilleurs quartiers de Dakar
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

            {/* Zones en vedette */}
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
                                📍 Explorez par zone
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                {selectedZone
                                    ? `Zone sélectionnée: ${selectedZone} ✓`
                                    : 'Choisissez votre quartier préféré'
                                }
                            </Typography>
                        </Box>
                    </Fade>


                    <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {zones && zones.length > 0 ? zones.map((zone, index) => (
                            <Box
                                key={zone.name}
                                sx={{
                                    width: { xs: '100%', md: 300 },
                                    height: 280,
                                    backgroundColor: selectedZone === zone.name ? '#e3f2fd' : 'white',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    border: selectedZone === zone.name ? '3px solid #1976d2' : '1px solid #e0e0e0',
                                    transition: 'all 0.3s ease',
                                    boxShadow: selectedZone === zone.name
                                        ? '0 8px 25px rgba(25,118,210,0.3)'
                                        : '0 4px 12px rgba(0,0,0,0.1)',
                                    transform: selectedZone === zone.name ? 'translateY(-4px)' : 'none',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                                    },
                                }}
                                onClick={() => setSelectedZone(selectedZone === zone.name ? '' : zone.name)}
                            >
                                {/* Partie image */}
                                <Box
                                    sx={{
                                        height: 180,
                                        position: 'relative',
                                        background: `linear-gradient(135deg, #1976d2, #42a5f5)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Image
                                        src={zone.image}
                                        alt={zone.name}
                                        fill
                                        style={{
                                            objectFit: 'cover',
                                            opacity: 0.8
                                        }}
                                    />

                                    {/* Overlay avec nom */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'rgba(25,118,210,0.3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                color: 'white',
                                                fontWeight: 700,
                                                textAlign: 'center',
                                                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                            }}
                                        >
                                            {zone.name}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Partie informations */}
                                <Box sx={{ p: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                                        {zone.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                                        Quartier résidentiel moderne à Dakar
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'inline-block',
                                            backgroundColor: '#e3f2fd',
                                            color: '#1976d2',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 2,
                                            fontSize: '0.875rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        {zone.count} appartements disponibles
                                    </Box>
                                </Box>
                            </Box>
                        )) : (
                            <Typography variant="h6" color="error" textAlign="center">
                                Aucune zone trouvée. Problème d'import.
                            </Typography>
                        )}
                    </Box>
                </Container>
            </Box>

            {/* Avantages */}
            <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
                <Container maxWidth="lg">
                    <Fade in timeout={1400}>
                        <Box textAlign="center" sx={{ mb: 6 }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    mb: 2,
                                    color: theme.palette.text.primary,
                                }}
                            >
                                ⭐ Nos équipements premium
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Tous nos appartements incluent ces services
                            </Typography>
                        </Box>
                    </Fade>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Grow in timeout={1200 + index * 200}>
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
                                </Grow>
                            </Grid>
                        ))}
                    </Grid>
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

                            <Grid container spacing={3} alignItems="flex-end" justifyContent="center">
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Zone</InputLabel>
                                        <Select
                                            value={selectedZone}
                                            label="Zone"
                                            onChange={(e) => setSelectedZone(e.target.value)}
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
                                            <MenuItem value="" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Toutes les zones</MenuItem>
                                            {zones.map(zone => (
                                                <MenuItem key={zone.name} value={zone.name} sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                                                    {zone.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Nombre de pièces</InputLabel>
                                        <Select
                                            value={roomsFilter || ''}
                                            label="Nombre de pièces"
                                            onChange={(e) => setRoomsFilter(e.target.value ? parseInt(e.target.value as string) : null)}
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
                                            <MenuItem value="" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Tous</MenuItem>
                                            <MenuItem value={1} sx={{ fontSize: '1.1rem', fontWeight: 600 }}>1 pièce</MenuItem>
                                            <MenuItem value={2} sx={{ fontSize: '1.1rem', fontWeight: 600 }}>2 pièces</MenuItem>
                                            <MenuItem value={3} sx={{ fontSize: '1.1rem', fontWeight: 600 }}>3 pièces</MenuItem>
                                            <MenuItem value={4} sx={{ fontSize: '1.1rem', fontWeight: 600 }}>4+ pièces</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Trier par</InputLabel>
                                        <Select
                                            value={sortBy}
                                            label="Trier par"
                                            onChange={(e) => setSortBy(e.target.value as 'price' | 'rooms' | 'surface')}
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
                                            <MenuItem value="rooms" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Nombre de pièces</MenuItem>
                                            <MenuItem value="surface" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Surface</MenuItem>
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
                                            setSelectedZone('');
                                            setPriceRange([0, 100000]);
                                            setRoomsFilter(null);
                                            setSortBy('price');
                                        }}
                                    >
                                        Réinitialiser
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Fade>

                    {/* Résultats */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                            <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                            {filteredApartments.length} appartement{filteredApartments.length > 1 ? 's' : ''} trouvé{filteredApartments.length > 1 ? 's' : ''}
                        </Typography>
                    </Box>

                    {filteredApartments.length > 0 ? (
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                            gap: 3,
                            justifyContent: 'center'
                        }}>
                            {filteredApartments.map((apartment, index) => (
                                <Grow key={apartment.id} in timeout={1000 + index * 100}>
                                    <div style={{ width: '100%' }}>
                                        <ApartmentCard apartment={apartment} />
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
                                <HomeIcon sx={{ fontSize: 80, color: theme.palette.grey[400], mb: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
                                    Aucun appartement trouvé
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                    Essayez de modifier vos critères de recherche
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => {
                                        setSelectedZone('');
                                        setPriceRange([0, 100000]);
                                        setRoomsFilter(null);
                                    }}
                                    sx={{
                                        px: 4,
                                        py: 2,
                                        borderRadius: 3,
                                    }}
                                >
                                    Voir tous les appartements
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
                    background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                    color: 'white',
                }}
            >
                <Container maxWidth="md">
                    <Fade in timeout={1800}>
                        <Box textAlign="center">
                            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
                                Trouvez votre appartement idéal !
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                                Notre équipe vous aide à choisir le logement parfait selon vos besoins
                            </Typography>
                            <Grid container spacing={3} justifyContent="center">
                                <Grid item xs={12} sm={6} md={4}>
                                    <Button
                                        component="a"
                                        href="https://wa.me/221770874619?text=Bonjour,%20j'aimerais%20des%20informations%20sur%20vos%20appartements."
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
                                        href="tel:+221770874619"
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
