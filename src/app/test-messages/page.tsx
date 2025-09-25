'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';

export default function TestMessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const testAPI = async () => {
        setLoading(true);
        setError('');

        try {
            console.log('🧪 Test de l\'API /api/contact...');
            const response = await fetch('/api/contact');
            console.log('📡 Réponse:', response.status, response.ok);

            if (response.ok) {
                const data = await response.json();
                console.log('📨 Données reçues:', data);
                setMessages(data);
            } else {
                const errorData = await response.json();
                console.error('❌ Erreur:', errorData);
                setError(`Erreur ${response.status}: ${errorData.error || 'Inconnue'}`);
            }
        } catch (err) {
            console.error('❌ Erreur de connexion:', err);
            setError('Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    const testSupabase = async () => {
        setLoading(true);
        setError('');

        try {
            console.log('🧪 Test direct de Supabase...');
            const response = await fetch('/api/test-supabase');
            console.log('📡 Réponse Supabase:', response.status, response.ok);

            if (response.ok) {
                const data = await response.json();
                console.log('📨 Données Supabase:', data);
            } else {
                const errorData = await response.json();
                console.error('❌ Erreur Supabase:', errorData);
                setError(`Erreur Supabase: ${errorData.error || 'Inconnue'}`);
            }
        } catch (err) {
            console.error('❌ Erreur Supabase:', err);
            setError('Erreur de connexion Supabase');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                🧪 Test des Messages
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Button
                    variant="contained"
                    onClick={testAPI}
                    disabled={loading}
                    sx={{ mr: 2 }}
                >
                    {loading ? <CircularProgress size={20} /> : 'Test API /api/contact'}
                </Button>

                <Button
                    variant="outlined"
                    onClick={testSupabase}
                    disabled={loading}
                >
                    Test Supabase
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ mb: 2 }}>
                <Typography variant="h6">
                    📊 Résultats ({messages.length} messages)
                </Typography>
            </Box>

            {messages.length > 0 ? (
                <Box>
                    {messages.map((message, index) => (
                        <Box key={message.id || index} sx={{ p: 2, border: '1px solid #ccc', mb: 2, borderRadius: 1 }}>
                            <Typography variant="body1">
                                <strong>Nom:</strong> {message.name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Email:</strong> {message.email}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Sujet:</strong> {message.subject}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Message:</strong> {message.message}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Date:</strong> {message.created_at}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography color="text.secondary">
                    Aucun message trouvé. Vérifiez la console pour les logs de débogage.
                </Typography>
            )}
        </Box>
    );
}
