'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    Button,
    Stack,
    Chip,
    useTheme,
    Fade,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from '@mui/material';
import {
    LocationOn as LocationIcon,
    Visibility as ViewIcon,
    BookOnline as BookIcon,
    Close as CloseIcon,
    Home as HomeIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { Apartment } from '@/types';
import { formatPrice } from '@/utils/helpers';

interface InteractiveMapProps {
    apartments: Apartment[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ apartments }) => {
    const theme = useTheme();
    const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
    const [selectedZone, setSelectedZone] = useState<string>('all');

    // Grouper les appartements par zone
    const zones = ['all', 'Cité Mixta', 'Ouest-foire', 'Cité Kalia'];
    const filteredApartments = selectedZone === 'all'
        ? apartments
        : apartments.filter(apt => apt.zone === selectedZone);

    const handleApartmentClick = (apartment: Apartment) => {
        setSelectedApartment(apartment);
    };

    const handleCloseDialog = () => {
        setSelectedApartment(null);
    };

    return (
        <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
            <Container maxWidth="lg">
                <Fade in timeout={1000}>
                    <Box textAlign="center" sx={{ mb: 6 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                color: theme.palette.text.primary,
                            }}
                        >
                            🗺️ Carte Interactive des Appartements
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                            Découvrez l&apos;emplacement de nos appartements dans les différentes zones de Dakar
                        </Typography>

                        {/* Filtres par zone */}
                        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
                            {zones.map((zone) => (
                                <Chip
                                    key={zone}
                                    label={zone === 'all' ? 'Toutes les zones' : zone}
                                    onClick={() => setSelectedZone(zone)}
                                    variant={selectedZone === zone ? 'filled' : 'outlined'}
                                    color={selectedZone === zone ? 'primary' : 'default'}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>
                </Fade>

                {/* Carte simulée avec les appartements */}
                <Card
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                        border: '2px solid #2196f3',
                        position: 'relative',
                        minHeight: 500,
                        overflow: 'hidden',
                    }}
                >
                    {/* Fond de carte stylisé */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `
                                radial-gradient(circle at 20% 30%, rgba(33,150,243,0.1) 0%, transparent 50%),
                                radial-gradient(circle at 80% 70%, rgba(76,175,80,0.1) 0%, transparent 50%),
                                radial-gradient(circle at 40% 80%, rgba(255,193,7,0.1) 0%, transparent 50%)
                            `,
                            zIndex: 0,
                        }}
                    />

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            mb: 4,
                            textAlign: 'center',
                            color: theme.palette.primary.main,
                            position: 'relative',
                            zIndex: 1,
                        }}
                    >
                        🏙️ Plan de Dakar - Nos Emplacements
                    </Typography>

                    {/* Grille des appartements avec positions simulées */}
                    <Box
                        sx={{
                            position: 'relative',
                            height: 400,
                            width: '100%',
                            zIndex: 1,
                        }}
                    >
                        {filteredApartments.map((apartment, index) => {
                            // Positions simulées pour chaque zone
                            let position = { top: '50%', left: '50%' };

                            if (apartment.zone === 'Cité Mixta') {
                                const positions = [
                                    { top: '20%', left: '25%' },
                                    { top: '30%', left: '35%' },
                                    { top: '15%', left: '45%' },
                                    { top: '25%', left: '15%' },
                                    { top: '35%', left: '25%' },
                                ];
                                position = positions[index % positions.length];
                            } else if (apartment.zone === 'Ouest-foire') {
                                const positions = [
                                    { top: '60%', left: '60%' },
                                    { top: '70%', left: '70%' },
                                    { top: '65%', left: '50%' },
                                    { top: '75%', left: '65%' },
                                    { top: '55%', left: '75%' },
                                ];
                                position = positions[index % positions.length];
                            } else if (apartment.zone === 'Cité Kalia') {
                                const positions = [
                                    { top: '40%', left: '80%' },
                                    { top: '45%', left: '85%' },
                                ];
                                position = positions[index % positions.length];
                            }

                            return (
                                <Box
                                    key={apartment.id}
                                    onClick={() => handleApartmentClick(apartment)}
                                    sx={{
                                        position: 'absolute',
                                        top: position.top,
                                        left: position.left,
                                        transform: 'translate(-50%, -50%)',
                                        cursor: 'pointer',
                                        zIndex: 2,
                                        '&:hover': {
                                            transform: 'translate(-50%, -50%) scale(1.2)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <LocationIcon
                                            sx={{
                                                fontSize: 40,
                                                color: apartment.available ? '#4CAF50' : '#f44336',
                                                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                                                animation: 'pulse 2s infinite',
                                                '@keyframes pulse': {
                                                    '0%': {
                                                        transform: 'scale(1)',
                                                    },
                                                    '50%': {
                                                        transform: 'scale(1.1)',
                                                    },
                                                    '100%': {
                                                        transform: 'scale(1)',
                                                    },
                                                },
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: -8,
                                                right: -8,
                                                minWidth: 20,
                                                height: 20,
                                                borderRadius: '50%',
                                                backgroundColor: apartment.available ? '#4CAF50' : '#f44336',
                                                color: 'white',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                            }}
                                        >
                                            {apartment.rooms}
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>

                    {/* Légende */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 20,
                            right: 20,
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            p: 2,
                            borderRadius: 3,
                            backdropFilter: 'blur(10px)',
                            zIndex: 3,
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                            Légende
                        </Typography>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationIcon sx={{ fontSize: 20, color: '#4CAF50' }} />
                                <Typography variant="caption">Disponible</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationIcon sx={{ fontSize: 20, color: '#f44336' }} />
                                <Typography variant="caption">Occupé</Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                                Le chiffre indique le nombre de pièces
                            </Typography>
                        </Stack>
                    </Box>
                </Card>

                {/* Dialog pour afficher les détails de l'appartement */}
                <Dialog
                    open={!!selectedApartment}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        }
                    }}
                >
                    {selectedApartment && (
                        <>
                            <DialogTitle
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    pb: 2,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <HomeIcon sx={{ color: theme.palette.primary.main }} />
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        {selectedApartment.title}
                                    </Typography>
                                </Box>
                                <IconButton onClick={handleCloseDialog}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <Stack spacing={3}>
                                    {/* Image de l'appartement */}
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            height: 250,
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <Image
                                            src={selectedApartment.images[0]}
                                            alt={selectedApartment.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <Chip
                                            label={selectedApartment.zone}
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                left: 16,
                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                                fontWeight: 600,
                                            }}
                                        />
                                        <Chip
                                            label={selectedApartment.available ? 'Disponible' : 'Occupé'}
                                            color={selectedApartment.available ? 'success' : 'error'}
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                fontWeight: 600,
                                            }}
                                        />
                                    </Box>

                                    {/* Détails */}
                                    <Box>
                                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                            📍 {selectedApartment.address}
                                        </Typography>

                                        <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
                                            <Typography variant="body2">
                                                🏠 <strong>{selectedApartment.rooms}</strong> pièces
                                            </Typography>
                                            <Typography variant="body2">
                                                🚿 <strong>{selectedApartment.bathrooms}</strong> SDB
                                            </Typography>
                                            <Typography variant="body2">
                                                📐 <strong>{selectedApartment.surface}</strong> m²
                                            </Typography>
                                        </Stack>

                                        <Typography variant="body1" sx={{ mb: 3 }}>
                                            {selectedApartment.description}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                                            <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                                                {formatPrice(selectedApartment.pricePerDay)}/jour
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {formatPrice(selectedApartment.pricePerWeek)}/semaine
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </DialogContent>
                            <DialogActions sx={{ p: 3, pt: 0 }}>
                                <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                                    <Button
                                        component={Link}
                                        href={`/apartments/${selectedApartment.id}`}
                                        variant="outlined"
                                        startIcon={<ViewIcon />}
                                        fullWidth
                                        sx={{ borderRadius: 3 }}
                                    >
                                        Voir détails
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/booking"
                                        variant="contained"
                                        startIcon={<BookIcon />}
                                        fullWidth
                                        disabled={!selectedApartment.available}
                                        sx={{
                                            borderRadius: 3,
                                            background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                                        }}
                                    >
                                        Réserver
                                    </Button>
                                </Stack>
                            </DialogActions>
                        </>
                    )}
                </Dialog>
            </Container>
        </Box>
    );
};

export default InteractiveMap;
