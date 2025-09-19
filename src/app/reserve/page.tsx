'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    useTheme,
    Fade,
    Paper,
    Chip,
    Divider,
    Alert,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
} from '@mui/material';
import {
    BookOnline as ReserveIcon,
    LocationOn as LocationIcon,
    DirectionsCar as CarIcon,
    CheckCircle as CheckIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material';
import { apartments } from '@/data/apartments';
import { cars } from '@/data/cars';
import { Apartment, Car } from '@/types';

export default function ReservePage() {
    const theme = useTheme();

    const heroImages = [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reservationType, setReservationType] = useState<'apartment' | 'car'>('apartment');
    const [selectedItem, setSelectedItem] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('delivery');
    const [clientInfo, setClientInfo] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    const handleInputChange = (field: string, value: string) => {
        setClientInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Réservation envoyée:', {
            type: reservationType,
            item: selectedItem,
            dates: { start: startDate, end: endDate },
            payment: paymentMethod,
            client: clientInfo
        });
        alert('Votre demande de réservation a été envoyée ! Nous vous contacterons rapidement.');
    };

    const getFilteredItems = (): (Apartment | Car)[] => {
        return reservationType === 'apartment' ? apartments : cars;
    };

    const getSelectedItemDetails = () => {
        const items = getFilteredItems();
        return items.find(item => item.id === selectedItem);
    };

    const getItemTitle = (item: Apartment | Car) => {
        if ('title' in item) {
            return item.title;
        }
        return `${item.brand} ${item.model}`;
    };

    const calculateDays = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateTotal = () => {
        const item = getSelectedItemDetails();
        const days = calculateDays();
        if (!item || days === 0) return 0;
        return item.pricePerDay * days;
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '80vh',
                    minHeight: '500px',
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
                                <ReserveIcon
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
                                    Réservation
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
                                Réservez en ligne
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
                                Choisissez votre appartement ou véhicule, sélectionnez vos dates et confirmez votre réservation en quelques clics !
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
            </Box>

            {/* Formulaire de réservation */}
            <Box sx={{ py: 6, backgroundColor: '#f8f9fa' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={8}>
                            <Fade in timeout={1400}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 6,
                                        borderRadius: 4,
                                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 800,
                                            mb: 4,
                                            color: theme.palette.text.primary,
                                            textAlign: 'center',
                                        }}
                                    >
                                        📅 Formulaire de réservation
                                    </Typography>

                                    <form onSubmit={handleSubmit}>
                                        <Stack spacing={4}>
                                            {/* Type de réservation */}
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend" sx={{ fontWeight: 600, mb: 2 }}>
                                                    Type de réservation
                                                </FormLabel>
                                                <RadioGroup
                                                    row
                                                    value={reservationType}
                                                    onChange={(e) => {
                                                        setReservationType(e.target.value as 'apartment' | 'car');
                                                        setSelectedItem('');
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value="apartment"
                                                        control={<Radio />}
                                                        label="Appartement"
                                                        sx={{ mr: 4 }}
                                                    />
                                                    <FormControlLabel
                                                        value="car"
                                                        control={<Radio />}
                                                        label="Véhicule"
                                                    />
                                                </RadioGroup>
                                            </FormControl>

                                            {/* Sélection de l'item */}
                                            <FormControl fullWidth>
                                                <InputLabel>
                                                    {reservationType === 'apartment' ? 'Choisir un appartement' : 'Choisir un véhicule'}
                                                </InputLabel>
                                                <Select
                                                    value={selectedItem}
                                                    label={reservationType === 'apartment' ? 'Choisir un appartement' : 'Choisir un véhicule'}
                                                    onChange={(e) => setSelectedItem(e.target.value)}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 3,
                                                        },
                                                    }}
                                                >
                                                    {getFilteredItems().map((item) => (
                                                        <MenuItem key={item.id} value={item.id}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                {reservationType === 'apartment' ? <LocationIcon /> : <CarIcon />}
                                                                <Box>
                                                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                                        {getItemTitle(item)}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {item.pricePerDay}€/jour
                                                                        {'zone' in item && ` - ${item.zone}`}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            {/* Dates */}
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                                    📅 Période de réservation
                                                </Typography>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            fullWidth
                                                            label="Date de début"
                                                            type="date"
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.target.value)}
                                                            required
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: 3,
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            fullWidth
                                                            label="Date de fin"
                                                            type="date"
                                                            value={endDate}
                                                            onChange={(e) => setEndDate(e.target.value)}
                                                            required
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: 3,
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                            {/* Informations client */}
                                            <Divider sx={{ my: 2 }} />
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                                👤 Vos informations
                                            </Typography>

                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Nom complet"
                                                        value={clientInfo.name}
                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                        required
                                                        InputProps={{
                                                            startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                                        }}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: 3,
                                                            },
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Téléphone"
                                                        value={clientInfo.phone}
                                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                                        required
                                                        InputProps={{
                                                            startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                                        }}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: 3,
                                                            },
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <TextField
                                                fullWidth
                                                label="Email"
                                                type="email"
                                                value={clientInfo.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                required
                                                InputProps={{
                                                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 3,
                                                    },
                                                }}
                                            />

                                            <TextField
                                                fullWidth
                                                label="Message ou demandes spéciales"
                                                multiline
                                                rows={4}
                                                value={clientInfo.message}
                                                onChange={(e) => handleInputChange('message', e.target.value)}
                                                placeholder="Ajoutez vos commentaires ou demandes particulières..."
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 3,
                                                    },
                                                }}
                                            />

                                            {/* Mode de paiement */}
                                            <Divider sx={{ my: 2 }} />
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend" sx={{ fontWeight: 600, mb: 2 }}>
                                                    💳 Mode de paiement
                                                </FormLabel>
                                                <RadioGroup
                                                    value={paymentMethod}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value="delivery"
                                                        control={<Radio />}
                                                        label="Paiement à la livraison / remise des clés"
                                                    />
                                                    <FormControlLabel
                                                        value="online"
                                                        control={<Radio />}
                                                        label="Paiement en ligne (bientôt disponible)"
                                                        disabled
                                                    />
                                                </RadioGroup>
                                            </FormControl>

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                startIcon={<CheckIcon />}
                                                sx={{
                                                    py: 2,
                                                    px: 4,
                                                    fontSize: '1.2rem',
                                                    fontWeight: 700,
                                                    borderRadius: 3,
                                                    background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, #45a049, #4CAF50)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 8px 25px rgba(76,175,80,0.3)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                Confirmer la réservation
                                            </Button>
                                        </Stack>
                                    </form>
                                </Paper>
                            </Fade>
                        </Grid>

                        {/* Résumé de la réservation */}
                        <Grid item xs={12} md={4}>
                            <Stack spacing={4}>
                                <Card
                                    sx={{
                                        p: 4,
                                        borderRadius: 3,
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        border: '1px solid #e0e0e0',
                                        position: 'sticky',
                                        top: 100,
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                                        📋 Résumé de la réservation
                                    </Typography>

                                    {selectedItem ? (
                                        <Stack spacing={3}>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                                    {reservationType === 'apartment' ? '🏠 Appartement' : '🚗 Véhicule'}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {getSelectedItemDetails() && getItemTitle(getSelectedItemDetails()!)}
                                                </Typography>
                                            </Box>

                                            {startDate && endDate && (
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                                        📅 Période
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Du {new Date(startDate).toLocaleDateString('fr-FR')} au{' '}
                                                        {new Date(endDate).toLocaleDateString('fr-FR')}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        ({calculateDays()} jour{calculateDays() > 1 ? 's' : ''})
                                                    </Typography>
                                                </Box>
                                            )}

                                            {calculateTotal() > 0 && (
                                                <Box>
                                                    <Divider sx={{ my: 2 }} />
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                            Total:
                                                        </Typography>
                                                        <Chip
                                                            label={`${calculateTotal()}€`}
                                                            color="primary"
                                                            sx={{
                                                                fontSize: '1.2rem',
                                                                fontWeight: 700,
                                                                px: 2,
                                                                py: 1,
                                                            }}
                                                        />
                                                    </Box>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                                                        {getSelectedItemDetails()?.pricePerDay}€/jour × {calculateDays()} jour{calculateDays() > 1 ? 's' : ''}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Stack>
                                    ) : (
                                        <Alert severity="info" sx={{ borderRadius: 2 }}>
                                            Sélectionnez un appartement ou véhicule pour voir le résumé
                                        </Alert>
                                    )}
                                </Card>

                                {/* Aide */}
                                <Card
                                    sx={{
                                        p: 4,
                                        borderRadius: 3,
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        border: '1px solid #e0e0e0',
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                                        ❓ Besoin d&apos;aide ?
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                                        Notre équipe est disponible pour vous accompagner dans votre réservation
                                    </Typography>
                                    <Button
                                        href="https://wa.me/221123456789"
                                        target="_blank"
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            borderColor: '#25D366',
                                            color: '#25D366',
                                            '&:hover': {
                                                backgroundColor: '#25D366',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        Contacter sur WhatsApp
                                    </Button>
                                </Card>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}