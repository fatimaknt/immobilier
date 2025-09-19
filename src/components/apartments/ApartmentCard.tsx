'use client';

import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Box,
    Button,
    Stack,
    Paper,
    useTheme,
    alpha,
} from '@mui/material';
import {
    LocationOn as LocationIcon,
    Home as HomeIcon,
    Bathtub as BathroomIcon,
    AspectRatio as SizeIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { Apartment } from '../../types';
import { formatPrice } from '@/utils/helpers';

interface ApartmentCardProps {
    apartment: Apartment;
    onClick?: () => void;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, onClick }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                height: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.25)}`,
                },
            }}
            onClick={onClick}
        >
            <Box sx={{ position: 'relative', height: 195 }}>
                {apartment.images && apartment.images.length > 0 ? (
                    <img
                        src={apartment.images[0]}
                        alt={apartment.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '12px 12px 0 0'
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#666'
                        }}
                    >
                        <Typography variant="body2">Aucune image</Typography>
                    </Box>
                )}

                {/* Zone badge */}
                <Chip
                    label={apartment.zone}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                        color: '#000',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                    }}
                />

                {/* Prix badge */}
                <Paper
                    elevation={2}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                        {formatPrice(apartment.price_per_day)}/jour
                    </Typography>
                </Paper>

                {/* Overlay indisponible */}
                {!apartment.available && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Chip
                            label="Indisponible"
                            sx={{
                                backgroundColor: '#f44336',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                            }}
                        />
                    </Box>
                )}

                {/* Gradient overlay bottom */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 60,
                        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)',
                    }}
                />
            </Box>

            <CardContent sx={{ p: 3 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: theme.palette.text.primary,
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                    }}
                >
                    {apartment.title}
                </Typography>

                {/* Adresse */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon sx={{ fontSize: 18, color: theme.palette.grey[500], mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {apartment.address}
                    </Typography>
                </Box>

                {/* Caractéristiques */}
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <HomeIcon sx={{ fontSize: 16, color: theme.palette.grey[500], mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            {apartment.rooms} pièces
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BathroomIcon sx={{ fontSize: 16, color: theme.palette.grey[500], mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            {apartment.bathrooms} SDB
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SizeIcon sx={{ fontSize: 16, color: theme.palette.grey[500], mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            {apartment.surface}m²
                        </Typography>
                    </Box>
                </Stack>

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.4,
                    }}
                >
                    {apartment.description}
                </Typography>

                {/* Équipements */}
                <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                    {apartment.equipment.slice(0, 3).map((equipment, index) => (
                        <Chip
                            key={index}
                            label={equipment}
                            size="small"
                            sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                fontSize: '0.7rem',
                                height: 24,
                            }}
                        />
                    ))}
                    {apartment.equipment.length > 3 && (
                        <Typography variant="caption" color="text.secondary">
                            +{apartment.equipment.length - 3} autres
                        </Typography>
                    )}
                </Stack>

                {/* Prix et bouton */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                color: theme.palette.text.primary,
                                fontSize: '1.5rem',
                            }}
                        >
                            {formatPrice(apartment.price_per_day)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            par jour
                        </Typography>
                    </Box>

                    <Button
                        component={Link}
                        href={`/booking?type=apartment&id=${apartment.id}`}
                        variant="contained"
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            borderRadius: 3,
                            px: 3,
                            py: 1,
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Réserver
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ApartmentCard;
