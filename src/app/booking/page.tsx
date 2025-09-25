'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
    CircularProgress,
} from '@mui/material';
import {
    BookOnline as ReserveIcon,
    LocationOn as LocationIcon,
    DirectionsCar as CarIcon,
    CheckCircle as CheckIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Celebration as CelebrationIcon,
} from '@mui/icons-material';
import { apartments } from '@/data/apartments';
import { cars } from '@/data/cars';
import { zones } from '@/data/zones';
import { formatPrice } from '@/utils/helpers';
import { COMPANY_INFO } from '@/utils/constants';
import { Apartment, Car } from '@/types';

export default function BookingPage() {
    const theme = useTheme();
    const searchParams = useSearchParams();
    const [bookingType, setBookingType] = useState<'apartment' | 'car'>('apartment');
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        message: '',
        paymentMethod: 'delivery'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const heroImages = [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Charger les données et gérer les paramètres URL
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Charger les appartements et voitures en parallèle
                const [apartmentsResponse, carsResponse] = await Promise.all([
                    fetch('/api/apartments'),
                    fetch('/api/cars')
                ]);

                if (apartmentsResponse.ok) {
                    const apartmentsData = await apartmentsResponse.json();
                    setApartments(apartmentsData);
                }

                if (carsResponse.ok) {
                    const carsData = await carsResponse.json();
                    setCars(carsData);
                }

                // Gérer les paramètres URL
                const type = searchParams.get('type');
                const id = searchParams.get('id');

                if (type === 'apartment' || type === 'car') {
                    setBookingType(type);
                }

                if (id) {
                    setSelectedItem(id);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [searchParams]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    const availableItems = bookingType === 'apartment'
        ? apartments.filter(apt => apt.available)
        : cars.filter(car => car.available);

    const selectedItemData = availableItems.find(item => item.id === selectedItem);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const calculateDaysBetween = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateTotal = () => {
        if (!selectedItemData || !formData.startDate || !formData.endDate) return 0;
        const days = calculateDaysBetween(formData.startDate, formData.endDate);
        return days * selectedItemData.price_per_day;
    };

    const getItemTitle = (item: Apartment | Car) => {
        if ('title' in item) {
            return item.title;
        }
        return `${item.brand} ${item.model}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Préparer les données pour l'API
            const bookingData = {
                type: bookingType,
                entity_id: selectedItem, // Utiliser l'ID de l'item sélectionné
                user_name: formData.customerName,
                user_email: formData.customerEmail,
                user_phone: formData.customerPhone,
                start_date: formData.startDate,
                end_date: formData.endDate,
                total_amount: calculateTotal(),
                payment_method: 'whatsapp', // Par défaut
                notes: formData.message || 'Réservation via site web'
            };

            console.log('📝 Envoi de la réservation:', bookingData);

            // Sauvegarder dans la base de données
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                const savedBooking = await response.json();
                console.log('✅ Réservation sauvegardée:', savedBooking);
                setSubmitSuccess(true);

                // Envoyer le message WhatsApp
                const itemName = getItemTitle(selectedItemData!);
                const whatsappMessage = `Nouvelle réservation:
${bookingType === 'apartment' ? 'Appartement' : 'Voiture'}: ${itemName}
Du: ${formData.startDate}
Au: ${formData.endDate}
Client: ${formData.customerName}
Email: ${formData.customerEmail}
Téléphone: ${formData.customerPhone}
Total: ${formatPrice(calculateTotal())}
Message: ${formData.message}`;

                setTimeout(() => {
                    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                }, 1000);
            } else {
                const errorData = await response.json();
                console.error('❌ Erreur lors de la sauvegarde:', errorData);
                alert('Erreur lors de la sauvegarde de la réservation. Veuillez réessayer.');
            }

        } catch (error) {
            console.error('❌ Erreur lors de la réservation:', error);
            alert('Erreur de connexion. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Fade in timeout={1000}>
                    <Paper
                        elevation={5}
                        sx={{
                            maxWidth: 500,
                            p: 6,
                            borderRadius: 4,
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        }}
                    >
                        <CelebrationIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 3 }} />
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: theme.palette.text.primary }}>
                            Réservation envoyée !
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                            Votre demande de réservation a été transmise. Nous vous contacterons dans les plus brefs délais.
                        </Typography>
                        <Stack spacing={2}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => window.location.reload()}
                                sx={{
                                    borderRadius: 3,
                                    py: 1.5,
                                    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                                }}
                            >
                                Nouvelle réservation
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                href="/"
                                sx={{
                                    borderRadius: 3,
                                    py: 1.5,
                                }}
                            >
                                Retour à l&apos;accueil
                            </Button>
                        </Stack>
                    </Paper>
                </Fade>
            </Box>
        );
    }

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
                        background: 'linear-gradient(135deg, rgba(25,118,210,0.8) 0%, rgba(76,175,80,0.8) 100%)',
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
                                Réservation en ligne
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
                                Réservez votre appartement ou voiture en quelques clics
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
            <Box sx={{ py: 6 }}>
                <Container maxWidth="lg">
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
                                    mb: 6,
                                    color: theme.palette.text.primary,
                                    textAlign: 'center',
                                }}
                            >
                                📅 Nouvelle réservation
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <Stack spacing={6}>
                                    {/* Type de réservation */}
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                            Type de réservation
                                        </Typography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6} component="div">
                                                <Card
                                                    sx={{
                                                        p: 4,
                                                        textAlign: 'center',
                                                        cursor: 'pointer',
                                                        border: bookingType === 'apartment' ? '2px solid #1976d2' : '2px solid #e0e0e0',
                                                        backgroundColor: bookingType === 'apartment' ? '#e3f2fd' : 'white',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                                        },
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                    onClick={() => {
                                                        setBookingType('apartment');
                                                        setSelectedItem('');
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: '3rem', mb: 2 }}>🏠</Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                                        Appartement
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Location courte/longue durée
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={6} component="div">
                                                <Card
                                                    sx={{
                                                        p: 4,
                                                        textAlign: 'center',
                                                        cursor: 'pointer',
                                                        border: bookingType === 'car' ? '2px solid #1976d2' : '2px solid #e0e0e0',
                                                        backgroundColor: bookingType === 'car' ? '#e3f2fd' : 'white',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                                        },
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                    onClick={() => {
                                                        setBookingType('car');
                                                        setSelectedItem('');
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: '3rem', mb: 2 }}>🚗</Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                                        Voiture
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Location journalière
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Grid container spacing={6}>
                                        {/* Sélection de l'item */}
                                        <Grid item xs={12} md={6} component="div">
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                                {bookingType === 'apartment' ? 'Choisir un appartement' : 'Choisir une voiture'}
                                            </Typography>

                                            {bookingType === 'apartment' && (
                                                <Box sx={{ mb: 4 }}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                                                        Zone préférée
                                                    </Typography>
                                                    <Grid container spacing={2}>
                                                        {zones.map(zone => (
                                                            <Grid item xs={4} key={zone.name} component="div">
                                                                <Button
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    size="small"
                                                                    onClick={() => {
                                                                        const firstApartmentInZone = apartments.find(apt => apt.zone === zone.name && apt.available);
                                                                        if (firstApartmentInZone) setSelectedItem(firstApartmentInZone.id);
                                                                    }}
                                                                    sx={{
                                                                        p: 2,
                                                                        flexDirection: 'column',
                                                                        height: 'auto',
                                                                        borderRadius: 2,
                                                                    }}
                                                                >
                                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                                        {zone.name}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        {zone.count} dispos
                                                                    </Typography>
                                                                </Button>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </Box>
                                            )}

                                            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                                                <Stack spacing={2}>
                                                    {availableItems.map((item) => (
                                                        <Card
                                                            key={item.id}
                                                            sx={{
                                                                p: 3,
                                                                cursor: 'pointer',
                                                                border: selectedItem === item.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                                                                backgroundColor: selectedItem === item.id ? '#e3f2fd' : 'white',
                                                                '&:hover': {
                                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                                },
                                                                transition: 'all 0.3s ease',
                                                            }}
                                                            onClick={() => setSelectedItem(item.id)}
                                                        >
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                                                <Box>
                                                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                                        {getItemTitle(item)}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {bookingType === 'apartment'
                                                                            ? `${'zone' in item ? item.zone : ''} • ${'rooms' in item ? item.rooms : ''} pièces • ${'surface' in item ? item.surface : ''}m²`
                                                                            : `${'type' in item ? item.type : ''} • ${'year' in item ? item.year : ''} • ${'seats' in item ? item.seats : ''} places`
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{ textAlign: 'right' }}>
                                                                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                                                                        {formatPrice(item.price_per_day)}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        par jour
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    ))}
                                                </Stack>
                                            </Box>
                                        </Grid>

                                        {/* Formulaire de contact */}
                                        <Grid item xs={12} md={6} component="div">
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                                👤 Vos informations
                                            </Typography>

                                            <Stack spacing={3}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6} component="div">
                                                        <TextField
                                                            fullWidth
                                                            label="Date de début"
                                                            type="date"
                                                            value={formData.startDate}
                                                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            inputProps={{ min: new Date().toISOString().split('T')[0] }}
                                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} component="div">
                                                        <TextField
                                                            fullWidth
                                                            label="Date de fin"
                                                            type="date"
                                                            value={formData.endDate}
                                                            onChange={(e) => handleInputChange('endDate', e.target.value)}
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            inputProps={{ min: formData.startDate || new Date().toISOString().split('T')[0] }}
                                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <TextField
                                                    fullWidth
                                                    label="Nom complet"
                                                    value={formData.customerName}
                                                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                                                    required
                                                    placeholder="Votre nom et prénom"
                                                    InputProps={{
                                                        startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                                    }}
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="Email"
                                                    type="email"
                                                    value={formData.customerEmail}
                                                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                                                    required
                                                    placeholder="votre@email.com"
                                                    InputProps={{
                                                        startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                                    }}
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="Téléphone"
                                                    type="tel"
                                                    value={formData.customerPhone}
                                                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                                                    required
                                                    placeholder="+221 XX XXX XX XX"
                                                    InputProps={{
                                                        startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                                    }}
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                                />

                                                <FormControl fullWidth>
                                                    <InputLabel>Mode de paiement</InputLabel>
                                                    <Select
                                                        value={formData.paymentMethod}
                                                        label="Mode de paiement"
                                                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                                    >
                                                        <MenuItem value="delivery">Paiement à la livraison</MenuItem>
                                                        <MenuItem value="online">Paiement en ligne</MenuItem>
                                                        <MenuItem value="transfer">Virement bancaire</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <TextField
                                                    fullWidth
                                                    label="Message (optionnel)"
                                                    multiline
                                                    rows={3}
                                                    value={formData.message}
                                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                                    placeholder="Précisions, demandes particulières..."
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    {/* Résumé de la commande */}
                                    {selectedItem && formData.startDate && formData.endDate && (
                                        <Paper
                                            elevation={2}
                                            sx={{
                                                p: 4,
                                                borderRadius: 3,
                                                backgroundColor: '#f8f9fa',
                                                border: '1px solid #e0e0e0',
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                                📋 Résumé de votre réservation
                                            </Typography>
                                            <Stack spacing={2}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography>Article sélectionné:</Typography>
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        {selectedItemData && getItemTitle(selectedItemData)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography>Période:</Typography>
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        {formData.startDate} au {formData.endDate}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography>Durée:</Typography>
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        {calculateDaysBetween(formData.startDate, formData.endDate)} jour(s)
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography>Prix par jour:</Typography>
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        {formatPrice(selectedItemData?.price_per_day || 0)}
                                                    </Typography>
                                                </Box>
                                                <Divider />
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                        Total:
                                                    </Typography>
                                                    <Chip
                                                        label={formatPrice(calculateTotal())}
                                                        color="primary"
                                                        sx={{
                                                            fontSize: '1.1rem',
                                                            fontWeight: 700,
                                                            px: 2,
                                                        }}
                                                    />
                                                </Box>
                                            </Stack>
                                        </Paper>
                                    )}

                                    {/* Bouton de soumission */}
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            disabled={!selectedItem || !formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.startDate || !formData.endDate || isSubmitting}
                                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <CheckIcon />}
                                            sx={{
                                                py: 2,
                                                px: 6,
                                                fontSize: '1.2rem',
                                                fontWeight: 700,
                                                borderRadius: 3,
                                                background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #45a049, #4CAF50)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(76,175,80,0.3)',
                                                },
                                                '&:disabled': {
                                                    opacity: 0.6,
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            {isSubmitting ? 'Envoi en cours...' : 'Envoyer la réservation'}
                                        </Button>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                            Votre réservation sera confirmée dans les 24h. Aucun paiement n&apos;est requis maintenant.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </form>
                        </Paper>
                    </Fade>
                </Container>
            </Box>
        </Box>
    );
}