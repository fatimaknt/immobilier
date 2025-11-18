'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    Stack,
    useTheme,
    Fade,
    Paper,
    IconButton,
    Button,
} from '@mui/material';
import {
    ContactMail as ContactIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    WhatsApp as WhatsAppIcon,
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    LinkedIn as LinkedInIcon,
    Mail as MailIcon,
    AccessTime as AccessTimeIcon,
    Language as LanguageIcon,
} from '@mui/icons-material';
import ContactForm from '@/components/forms/ContactForm';

export default function ContactPage() {
    const theme = useTheme();

    const heroImages = [
        'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    const contactInfo = [
        {
            icon: <PhoneIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
            title: 'Téléphone',
            info: '+221 78 492 94 39',
            link: 'tel:+221784929439'
        },
        {
            icon: <EmailIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
            title: 'Email',
            info: 'contact@residencecedo.sn',
            link: 'mailto:contact@residencecedo.sn'
        },
        {
            icon: <LocationIcon sx={{ fontSize: 40, color: '#FF9800' }} />,
            title: 'Adresse',
            info: 'Dakar, Sénégal',
            link: null
        },
        {
            icon: <WhatsAppIcon sx={{ fontSize: 40, color: '#25D366' }} />,
            title: 'WhatsApp',
            info: '+221 78 492 94 39',
            link: 'https://wa.me/221784929439'
        }
    ];

    const socialLinks = [
        { icon: <FacebookIcon />, href: 'https://facebook.com/residencecedo', color: '#1877f2', name: 'Facebook' },
        { icon: <InstagramIcon />, href: 'https://instagram.com/residencecedo', color: '#E4405F', name: 'Instagram' },
        { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/residencecedo', color: '#0077b5', name: 'LinkedIn' },
        { icon: <WhatsAppIcon />, href: 'https://wa.me/221784929439', color: '#25D366', name: 'WhatsApp' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '100vh',
                    minHeight: '600px',
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
                                <ContactIcon
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
                                    Contact
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
                                Contactez-nous
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
                                Nous sommes là pour répondre à toutes vos questions sur nos appartements et véhicules.
                                Contactez-nous dès maintenant !
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

            {/* Informations de contact */}
            <Box sx={{ py: 4, backgroundColor: 'white' }}>
                <Container maxWidth="lg">
                    <Fade in timeout={1200}>
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 800,
                                    mb: 6,
                                    color: theme.palette.text.primary,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                                    <PhoneIcon /> Nos Coordonnées
                                </Box>
                            </Typography>
                        </Box>
                    </Fade>

                    <Grid container spacing={4} justifyContent="center">
                        {contactInfo.map((contact, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card
                                    sx={{
                                        p: 4,
                                        textAlign: 'center',
                                        height: '100%',
                                        borderRadius: 4,
                                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        transition: 'all 0.3s ease',
                                        cursor: contact.link ? 'pointer' : 'default',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 25px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                    onClick={() => contact.link && window.open(contact.link, '_blank')}
                                >
                                    <Box sx={{ mb: 3 }}>{contact.icon}</Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        {contact.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {contact.info}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Formulaire de contact */}
            <Box sx={{ py: 4, backgroundColor: '#f8f9fa' }}>
                <Container maxWidth="xl">
                    <Fade in timeout={1400}>
                        <Box>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: { xs: 4, sm: 6, md: 8 },
                                    py: { xs: 4, sm: 5, md: 6 },
                                    borderRadius: 4,
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                    minHeight: { xs: '400px', sm: '500px', md: '600px' },
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 800,
                                        mb: 4,
                                        color: theme.palette.text.primary,
                                        textAlign: 'center',
                                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <MailIcon /> Envoyez-nous un message
                                    </Box>
                                </Typography>

                                <ContactForm />
                            </Paper>
                        </Box>
                    </Fade>
                </Container>
            </Box>

            {/* Informations en bas - alignées horizontalement */}
            <Box sx={{ py: 4, backgroundColor: 'white' }}>
                <Container maxWidth="lg">
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 4,
                        justifyContent: 'center'
                    }}>
                        {/* Horaires */}
                        <Card
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                backgroundColor: 'white',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                border: '1px solid #e0e0e0',
                                '&:hover': {
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                },
                                transition: 'all 0.3s ease',
                                height: '100%',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, textAlign: 'center', color: theme.palette.text.primary }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AccessTimeIcon /> Horaires d&apos;ouverture
                                </Box>
                            </Typography>
                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Lundi - Vendredi</Typography>
                                    <Typography variant="body2" color="text.secondary">8h00 - 18h00</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Samedi</Typography>
                                    <Typography variant="body2" color="text.secondary">9h00 - 16h00</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Dimanche</Typography>
                                    <Typography variant="body2" color="error">Fermé</Typography>
                                </Box>
                            </Stack>
                        </Card>

                        {/* Réseaux sociaux */}
                        <Card
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                textAlign: 'center',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                border: '1px solid #e0e0e0',
                                '&:hover': {
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                },
                                transition: 'all 0.3s ease',
                                height: '100%',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: theme.palette.text.primary }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LanguageIcon /> Suivez-nous
                                </Box>
                            </Typography>
                            <Stack direction="row" spacing={2} justifyContent="center">
                                {socialLinks.map((social) => (
                                    <IconButton
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        sx={{
                                            color: 'white',
                                            backgroundColor: social.color,
                                            width: 45,
                                            height: 45,
                                            '&:hover': {
                                                backgroundColor: social.color,
                                                transform: 'translateY(-2px)',
                                                boxShadow: `0 6px 20px ${social.color}40`,
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {social.icon}
                                    </IconButton>
                                ))}
                            </Stack>
                        </Card>

                        {/* Contact WhatsApp */}
                        <Card
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                textAlign: 'center',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                border: '1px solid #e0e0e0',
                                '&:hover': {
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                },
                                transition: 'all 0.3s ease',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: theme.palette.text.primary }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                                    <WhatsAppIcon /> Contact Direct
                                </Box>
                            </Typography>
                            <Button
                                href="https://wa.me/221784929439"
                                target="_blank"
                                startIcon={<WhatsAppIcon />}
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    backgroundColor: '#25D366',
                                    py: { xs: 1.5, sm: 2 },
                                    borderRadius: 3,
                                    fontSize: { xs: '0.9rem', sm: '1rem' },
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#1DA851',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Contact WhatsApp
                            </Button>
                        </Card>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}