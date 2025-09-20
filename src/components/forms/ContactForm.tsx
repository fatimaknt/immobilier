'use client';

import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    LinearProgress,
    useTheme,
    Snackbar,
} from '@mui/material';
import {
    Send as SendIcon,
    AttachFile as AttachFileIcon,
} from '@mui/icons-material';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    file?: File | null;
}

export default function ContactForm() {
    const theme = useTheme();
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({
            ...prev,
            file
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Sauvegarder en base de données
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setSuccess(true);

                // Préparer le message WhatsApp
                const whatsappMessage = `📧 Nouveau message de contact:\n\n👤 Nom: ${formData.name}\n📧 Email: ${formData.email}\n📞 Téléphone: ${formData.phone}\n📋 Sujet: ${formData.subject}\n\n💬 Message:\n${formData.message}`;

                // Ouvrir WhatsApp avec le message
                setTimeout(() => {
                    const whatsappUrl = `https://wa.me/221784929439?text=${encodeURIComponent(whatsappMessage)}`;
                    window.open(whatsappUrl, '_blank');
                }, 1000);

                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                    file: null,
                });
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Erreur lors de l\'envoi du message');
            }
        } catch (err) {
            setError('Erreur de connexion. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSuccess = () => {
        setSuccess(false);
    };

    const handleCloseError = () => {
        setError('');
    };

    return (
        <Box sx={{ maxWidth: { xs: '100%', sm: 800, md: 600 }, mx: 'auto' }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 4,
                    textAlign: 'center',
                    color: theme.palette.text.primary,
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                }}
            >
                📝 Nous Contacter
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 3,
                    p: { xs: 3, sm: 4 },
                    borderRadius: 4,
                    backgroundColor: 'white',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    '& > *:nth-of-type(5)': { // Message field spans full width
                        gridColumn: '1 / -1',
                    },
                    '& > *:nth-of-type(6)': { // File upload spans full width
                        gridColumn: '1 / -1',
                    },
                    '& > *:nth-of-type(7)': { // Submit button spans full width
                        gridColumn: '1 / -1',
                    },
                }}
            >
                <TextField
                    name="name"
                    label="Nom complet"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                        },
                    }}
                />

                <TextField
                    name="email"
                    label="Adresse email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                        },
                    }}
                />

                <TextField
                    name="phone"
                    label="Numéro de téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                        },
                    }}
                />

                <TextField
                    name="subject"
                    label="Sujet"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                        },
                    }}
                />

                <TextField
                    name="message"
                    label="Message"
                    multiline
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    placeholder="Décrivez votre demande en détail..."
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                        },
                    }}
                />

                <Box>
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload">
                        <Button
                            component="span"
                            variant="outlined"
                            startIcon={<AttachFileIcon />}
                            size="small"
                            sx={{
                                borderRadius: 3,
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                                py: { xs: 1, sm: 1.5 },
                                px: { xs: 2, sm: 3 },
                                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                '&:hover': {
                                    borderColor: theme.palette.primary.dark,
                                    backgroundColor: `${theme.palette.primary.main}10`,
                                },
                            }}
                        >
                            {formData.file ? formData.file.name : 'Joindre un fichier (optionnel)'}
                        </Button>
                    </label>
                    {formData.file && (
                        <Typography variant="caption" sx={{ ml: 2, color: theme.palette.primary.main }}>
                            Fichier sélectionné: {formData.file.name}
                        </Typography>
                    )}
                </Box>

                {loading && <LinearProgress sx={{ borderRadius: 2 }} />}

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={<SendIcon />}
                    sx={{
                        width: '100%',
                        borderRadius: 3,
                        py: { xs: 1.5, sm: 2, md: 3 },
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(25,118,210,0.3)',
                        },
                        '&:disabled': {
                            background: '#e0e0e0',
                            color: '#9e9e9e',
                        },
                    }}
                >
                    {loading ? 'Envoi en cours...' : 'Envoyer le Message'}
                </Button>
            </Box>

            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleCloseSuccess}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ borderRadius: 3 }}>
                    Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleCloseError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseError} severity="error" sx={{ borderRadius: 3 }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
}
