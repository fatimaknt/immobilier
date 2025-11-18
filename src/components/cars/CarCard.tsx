'use client';

import React from 'react';
import Link from 'next/link';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Button,
    useTheme,
    alpha,
} from '@mui/material';
import {
    DirectionsCar as CarIcon,
    LocalGasStation as GasIcon,
    Speed as SpeedIcon,
    CalendarToday as CalendarIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import { Car } from '../../types';
import { formatPrice } from '@/utils/helpers';

interface CarCardProps {
    car: Car;
    onClick?: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                height: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                },
            }}
            onClick={onClick}
        >
            {/* Image Section */}
            <Box sx={{ position: 'relative', height: 195 }}>
                {car.images && car.images.length > 0 ? (
                    <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
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

                {/* Availability Badge */}
                <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                    <Chip
                        label={car.available ? 'Disponible' : 'Indisponible'}
                        color={car.available ? 'success' : 'error'}
                        size="medium"
                        sx={{
                            fontWeight: 600,
                            color: 'white',
                            backgroundColor: car.available ? '#4CAF50' : '#f44336',
                        }}
                    />
                </Box>

                {/* Price Badge */}
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                    <Chip
                        label={`${formatPrice(car.price_per_day)}/jour`}
                        sx={{
                            backgroundColor: alpha('#ffffff', 0.95),
                            color: theme.palette.primary.main,
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            backdropFilter: 'blur(8px)',
                        }}
                    />
                </Box>

                {/* Unavailable Overlay */}
                {!car.available && (
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Chip
                            label="Indisponible"
                            color="error"
                            size="medium"
                            sx={{
                                fontWeight: 700,
                                fontSize: '1rem',
                                color: 'white',
                                backgroundColor: '#f44336',
                            }}
                        />
                    </Box>
                )}
            </Box>

            {/* Content Section */}
            <CardContent sx={{ p: 3, height: 285, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    {/* Title and Type */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" sx={{
                            fontWeight: 700,
                            mb: 0.5,
                            color: theme.palette.text.primary,
                            fontSize: '1.3rem'
                        }}>
                            {car.brand} {car.model}
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <CalendarIcon sx={{ fontSize: '1rem' }} />
                            {car.year} • {car.type}
                        </Typography>
                    </Box>

                    {/* Car Features */}
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 2,
                        mb: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SpeedIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500, fontSize: '0.85rem' }}>
                                {car.transmission}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PeopleIcon sx={{ fontSize: 18 }} />
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500, fontSize: '0.85rem' }}>
                                {car.seats} places
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GasIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500, fontSize: '0.85rem' }}>
                                {car.fuel_type}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CarIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500, fontSize: '0.85rem' }}>
                                {car.seats} places
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Price and Action */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 'auto'
                }}>
                    <Box>
                        <Typography variant="h4" sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            lineHeight: 1,
                            fontSize: '1.8rem'
                        }}>
                            {formatPrice(car.price_per_day)}
                        </Typography>
                        <Typography variant="body2" sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 500
                        }}>
                            par jour
                        </Typography>
                    </Box>
                    <Button
                        component={Link}
                        href={`/booking?type=car&id=${car.id}`}
                        variant={car.available ? "contained" : "outlined"}
                        size="medium"
                        disabled={!car.available}
                        sx={{
                            borderRadius: 3,
                            px: 3,
                            py: 1.5,
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '1rem',
                            minWidth: 110,
                            boxShadow: car.available ? '0 4px 12px rgba(25,118,210,0.3)' : 'none',
                            '&:hover': {
                                boxShadow: car.available ? '0 6px 20px rgba(25,118,210,0.4)' : 'none',
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {car.available ? 'Réserver' : 'Voir détails'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CarCard;
