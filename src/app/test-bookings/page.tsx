'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Card, CardContent } from '@mui/material';
import {
    Science as ScienceIcon,
    Send as SendIcon,
    Inbox as InboxIcon,
    Error as ErrorIcon,
    CheckCircle as CheckIcon,
    BarChart as BarChartIcon,
} from '@mui/icons-material';

interface BookingData {
    id?: string;
    type: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    start_date: string;
    end_date: string;
    total_amount?: number;
    status?: string;
    payment_method?: string;
    notes?: string;
    created_at?: string;
}

export default function TestBookingsPage() {
    const [bookings, setBookings] = useState<BookingData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const testBookingsAPI = async () => {
        setLoading(true);
        setError('');

        try {
            console.log('Test de l\'API /api/bookings...');
            const response = await fetch('/api/bookings');
            console.log('Réponse:', response.status, response.ok);

            if (response.ok) {
                const data = await response.json();
                console.log('Données reçues:', data);
                setBookings(data);
            } else {
                const errorData = await response.json();
                console.error('Erreur:', errorData);
                setError(`Erreur ${response.status}: ${errorData.error || 'Inconnue'}`);
            }
        } catch (err) {
            console.error('Erreur de connexion:', err);
            setError('Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    const createTestBooking = async () => {
        setLoading(true);
        setError('');

        try {
            console.log('Création d\'une réservation de test...');
            const testBooking = {
                type: 'apartment',
                entity_id: 'test-apartment-id',
                user_name: 'Test User',
                user_email: 'test@example.com',
                user_phone: '123456789',
                start_date: '2024-12-01',
                end_date: '2024-12-03',
                total_amount: 50000,
                payment_method: 'whatsapp',
                notes: 'Réservation de test'
            };

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testBooking)
            });

            console.log('Réponse création:', response.status, response.ok);

            if (response.ok) {
                const data = await response.json();
                console.log('Réservation créée:', data);
                // Recharger la liste
                testBookingsAPI();
            } else {
                const errorData = await response.json();
                console.error('Erreur création:', errorData);
                setError(`Erreur création: ${errorData.error || 'Inconnue'}`);
            }
        } catch (err) {
            console.error('Erreur création:', err);
            setError('Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScienceIcon /> Test des Réservations
            </Typography>

            <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    onClick={testBookingsAPI}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={20} /> : 'Test API /api/bookings'}
                </Button>

                <Button
                    variant="outlined"
                    onClick={createTestBooking}
                    disabled={loading}
                >
                    Créer réservation test
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BarChartIcon /> Résultats ({bookings.length} réservations)
                </Typography>
            </Box>

            {bookings.length > 0 ? (
                <Box>
                    {bookings.map((booking, index) => (
                        <Card key={booking.id || index} sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Réservation #{booking.id?.slice(0, 8) || index + 1}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Type:</strong> {booking.type}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Client:</strong> {booking.user_name} ({booking.user_email})
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Téléphone:</strong> {booking.user_phone}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Période:</strong> {booking.start_date} au {booking.end_date}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Montant:</strong> {booking.total_amount?.toLocaleString()} FCFA
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Statut:</strong> {booking.status}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Paiement:</strong> {booking.payment_method}
                                </Typography>
                                {booking.notes && (
                                    <Typography variant="body1">
                                        <strong>Notes:</strong> {booking.notes}
                                    </Typography>
                                )}
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    <strong>Créé le:</strong> {new Date(booking.created_at).toLocaleString('fr-FR')}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Typography color="text.secondary">
                    Aucune réservation trouvée. Vérifiez la console pour les logs de débogage.
                </Typography>
            )}
        </Box>
    );
}
