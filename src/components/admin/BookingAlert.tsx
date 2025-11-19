'use client';

import React, { useState, useEffect } from 'react';
import {
    Alert,
    Snackbar,
    Box,
    Typography,
    Button,
    Chip,
    Stack,
    Card,
    CardContent,
    IconButton,
    Collapse,
} from '@mui/material';
import {
    Notifications as NotificationIcon,
    Close as CloseIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    BookOnline as BookingIcon,
} from '@mui/icons-material';
import { Booking } from '@/types';

interface BookingAlertProps {
    onViewBookings: () => void;
}

export default function BookingAlert({ onViewBookings }: BookingAlertProps) {
    const [newBookings, setNewBookings] = useState<Booking[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [lastCheck, setLastCheck] = useState<Date>(new Date());

    useEffect(() => {
        const checkNewBookings = async () => {
            try {
                const response = await fetch('/api/bookings');
                const data = await response.json();

                if (response.ok) {
                    const now = new Date();
                    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

                    const recentBookings = data.filter((booking: Booking) =>
                        booking.status === 'pending' &&
                        new Date(booking.createdAt) > oneHourAgo
                    );

                    if (recentBookings.length > 0) {
                        setNewBookings(recentBookings);
                        setShowAlert(true);
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la vérification des nouvelles réservations:', error);
            }
        };

        checkNewBookings();
        const interval = setInterval(checkNewBookings, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleClose = () => {
        setShowAlert(false);
        setNewBookings([]);
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'À l\'instant';
        if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        return `Il y a ${diffInHours}h`;
    };

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    if (!showAlert || newBookings.length === 0) {
        return null;
    }

    return (
        <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, maxWidth: 400 }}>
            <Card elevation={8} sx={{ backgroundColor: '#fff3e0' }}>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <NotificationIcon color="warning" />
                            <Typography variant="h6" color="warning.main">
                                Nouvelles réservations
                            </Typography>
                            <Chip
                                label={newBookings.length}
                                color="warning"
                                size="small"
                            />
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <IconButton
                                size="small"
                                onClick={() => setExpanded(!expanded)}
                            >
                                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                            <IconButton size="small" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    </Stack>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {newBookings.length} nouvelle(s) réservation(s) en attente
                    </Typography>

                    <Collapse in={expanded}>
                        <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                            {newBookings.map((booking) => (
                                <Box
                                    key={booking.id}
                                    sx={{
                                        p: 2,
                                        mb: 1,
                                        backgroundColor: 'white',
                                        borderRadius: 1,
                                        border: '1px solid #e0e0e0'
                                    }}
                                >
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom>
                                                {booking.customerName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {booking.type === 'Apartment' ? 'Appartement' : 'Voiture'}
                                            </Typography>
                                            <Typography variant="body2" color="primary" fontWeight="bold">
                                                {formatPrice(booking.totalPrice)}
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                            {formatTime(booking.createdAt)}
                                        </Typography>
                                    </Stack>
                                </Box>
                            ))}
                        </Box>
                    </Collapse>

                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="warning"
                            startIcon={<BookingIcon />}
                            onClick={onViewBookings}
                            size="small"
                        >
                            Voir toutes les réservations
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            size="small"
                        >
                            Marquer comme lu
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
