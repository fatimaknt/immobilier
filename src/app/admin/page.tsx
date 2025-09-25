'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    useTheme,
    Fade,
    Button,
    Stack,
    Chip,
    Paper,
    LinearProgress,
    Avatar,
    IconButton,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Apartment as ApartmentIcon,
    DirectionsCar as CarIcon,
    BookOnline as BookingIcon,
    ContactMail as ContactIcon,
    Star as StarIcon,
    TrendingUp as TrendingUpIcon,
    AttachMoney as MoneyIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Menu as MenuIcon,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import Link from 'next/link';

interface DashboardStats {
    totalApartments: number;
    totalCars: number;
    totalBookings: number;
    pendingBookings: number;
    totalRevenue: number;
    totalMessages: number;
    newMessages: number;
    approvedTestimonials: number;
    pendingTestimonials: number;
    trends: {
        apartmentsThisMonth: number;
        carsThisMonth: number;
        revenueGrowth: number;
    };
}

export default function AdminDashboard() {
    const theme = useTheme();
    const [stats, setStats] = useState<DashboardStats>({
        totalApartments: 0,
        totalCars: 0,
        totalBookings: 0,
        pendingBookings: 0,
        totalRevenue: 0,
        totalMessages: 0,
        newMessages: 0,
        approvedTestimonials: 0,
        pendingTestimonials: 0,
        trends: {
            apartmentsThisMonth: 0,
            carsThisMonth: 0,
            revenueGrowth: 0,
        },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await fetch('/api/stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            } else {
                console.error('Erreur lors du chargement des statistiques');
            }
        } catch (error) {
            console.error('Erreur lors du chargement des statistiques:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('fr-SN', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const quickActions = [
        {
            title: 'Gérer les Appartements',
            description: 'Ajouter, modifier ou supprimer des appartements',
            icon: <ApartmentIcon sx={{ fontSize: 40 }} />,
            href: '/admin/apartments',
            color: '#1976d2',
        },
        {
            title: 'Gérer les Voitures',
            description: 'Gérer la flotte de véhicules',
            icon: <CarIcon sx={{ fontSize: 40 }} />,
            href: '/admin/cars',
            color: '#2e7d32',
        },
        {
            title: 'Réservations',
            description: 'Suivre et gérer les réservations',
            icon: <BookingIcon sx={{ fontSize: 40 }} />,
            href: '/admin/bookings',
            color: '#f57c00',
        },
        {
            title: 'Messages Contact',
            description: 'Répondre aux demandes clients',
            icon: <ContactIcon sx={{ fontSize: 40 }} />,
            href: '/admin/messages',
            color: '#7b1fa2',
        },
    ];

    const statCards = [
        {
            title: 'Appartements',
            value: stats.totalApartments,
            icon: <ApartmentIcon />,
            color: '#1976d2',
            trend: stats.trends.apartmentsThisMonth > 0 ? `+${stats.trends.apartmentsThisMonth} ce mois` : 'Aucun ce mois',
        },
        {
            title: 'Voitures',
            value: stats.totalCars,
            icon: <CarIcon />,
            color: '#2e7d32',
            trend: stats.trends.carsThisMonth > 0 ? `+${stats.trends.carsThisMonth} ce mois` : 'Aucune ce mois',
        },
        {
            title: 'Réservations',
            value: stats.totalBookings,
            icon: <BookingIcon />,
            color: '#f57c00',
            trend: `${stats.pendingBookings} en attente`,
        },
        {
            title: 'Revenus',
            value: formatPrice(stats.totalRevenue),
            icon: <MoneyIcon />,
            color: '#4caf50',
            trend: stats.trends.revenueGrowth > 0 ? `+${stats.trends.revenueGrowth}% ce mois` : stats.trends.revenueGrowth < 0 ? `${stats.trends.revenueGrowth}% ce mois` : 'Stable ce mois',
        },
        {
            title: 'Messages',
            value: stats.totalMessages,
            icon: <ContactIcon />,
            color: '#7b1fa2',
            trend: `${stats.newMessages} nouveaux`,
        },
        {
            title: 'Avis',
            value: stats.approvedTestimonials,
            icon: <StarIcon />,
            color: '#ff9800',
            trend: 'Approuvés',
        },
    ];

    if (loading) {
        return (
            <Box sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <LinearProgress />
                    <Typography sx={{ mt: 2 }}>Chargement du tableau de bord...</Typography>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: '#f0f9ff',
            py: 4
        }}>
            <Container maxWidth="xl" sx={{ pb: 6, pt: 8 }}>

                {/* Statistiques compactes */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {statCards.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Fade in timeout={1000 + index * 200}>
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        background: 'white',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        transition: 'all 0.3s ease',
                                        height: '100%',
                                        minHeight: 160,
                                        width: '100%',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                            borderColor: stat.color,
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 3, height: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    backgroundColor: `${stat.color}15`,
                                                    color: stat.color,
                                                    width: 48,
                                                    height: 48,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: `0 2px 8px ${stat.color}20`
                                                }}
                                            >
                                                {stat.icon}
                                            </Box>
                                            <Chip
                                                label={stat.trend}
                                                size="small"
                                                sx={{
                                                    backgroundColor: `${stat.color}20`,
                                                    color: stat.color,
                                                    fontWeight: 700,
                                                    fontSize: '0.75rem',
                                                    height: 24,
                                                    px: 1.5,
                                                    borderRadius: 2
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ textAlign: 'left' }}>
                                            <Typography variant="h3" sx={{
                                                fontWeight: 900,
                                                mb: 1,
                                                color: '#1e293b',
                                                lineHeight: 1,
                                                fontSize: '2.5rem'
                                            }}>
                                                {stat.value}
                                            </Typography>
                                            <Typography variant="h6" sx={{
                                                color: '#64748b',
                                                fontWeight: 700,
                                                fontSize: '1rem',
                                                letterSpacing: '0.02em'
                                            }}>
                                                {stat.title}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>

                {/* Actions rapides épurées */}
                <Fade in timeout={1200}>
                    <Box sx={{ mb: 6 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                color: '#1e293b',
                                textAlign: 'center'
                            }}
                        >
                            Actions Rapides
                        </Typography>
                        <Typography variant="h6" sx={{
                            color: '#64748b',
                            fontWeight: 500,
                            textAlign: 'center'
                        }}>
                            Gérez votre activité en un clic
                        </Typography>
                    </Box>
                </Fade>

                <Box sx={{
                    display: 'flex',
                    gap: { xs: 2, sm: 3 },
                    justifyContent: 'center',
                    flexWrap: 'nowrap',
                    mb: 8,
                    overflowX: 'auto',
                    pb: 1
                }}>
                    {quickActions.map((action, index) => (
                        <Fade in timeout={1400 + index * 200} key={index}>
                            <Button
                                component={Link}
                                href={action.href}
                                variant="contained"
                                startIcon={action.icon}
                                sx={{
                                    borderRadius: 3,
                                    px: { xs: 2, sm: 3, md: 4 },
                                    py: 2.5,
                                    minWidth: { xs: 140, sm: 160, md: 200 },
                                    flex: '1 1 auto',
                                    height: 'auto',
                                    background: 'white',
                                    color: '#1e293b',
                                    border: '2px solid #e2e8f0',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        background: `${action.color}10`,
                                        borderColor: action.color,
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        '& .MuiButton-startIcon': {
                                            color: action.color,
                                        }
                                    },
                                    '& .MuiButton-startIcon': {
                                        margin: 0,
                                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                                        mb: 1
                                    },
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                    <Typography variant="h6" sx={{
                                        fontWeight: 700,
                                        color: 'inherit',
                                        fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                                        textAlign: 'center'
                                    }}>
                                        {action.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{
                                        color: '#64748b',
                                        fontWeight: 500,
                                        fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                                        textAlign: 'center',
                                        lineHeight: 1.4
                                    }}>
                                        {action.description}
                                    </Typography>
                                </Box>
                            </Button>
                        </Fade>
                    ))}
                </Box>

                {/* Alertes et notifications épurées */}
               
            </Container>
        </Box >
    );
}
