'use client';

import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    IconButton,
    Divider,
    useTheme,
    alpha,
    Stack,
    Paper,
    Chip,
    useMediaQuery,
} from '@mui/material';
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    WhatsApp as WhatsAppIcon,
    LocationOn as LocationIcon,
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    LinkedIn as LinkedInIcon,
    Apartment as ApartmentIcon,
    DirectionsCar as CarIcon,
    BookOnline as BookingIcon,
    Info as InfoIcon,
    ContactMail as ContactIcon,
    Verified as VerifiedIcon,
    Star as StarIcon,
    ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Logo from '@/components/common/Logo';

const Footer: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const services = [
        { name: 'Appartements', href: '/apartments' },
        { name: 'Voitures', href: '/cars' },
        { name: 'Réservation', href: '/booking' },
    ];

    const socialLinks = [
        { icon: <FacebookIcon />, href: 'https://facebook.com/residencecedo', color: '#1877f2', name: 'Facebook' },
        { icon: <InstagramIcon />, href: 'https://instagram.com/residencecedo', color: '#E4405F', name: 'Instagram' },
        { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/residencecedo', color: '#0077b5', name: 'LinkedIn' },
    ];

    return (
        <Box
            component="footer"
            sx={{
                position: 'relative',
                background: `linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)`,
                color: 'white',
                mt: 'auto',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    zIndex: 1,
                },
            }}
        >
            {/* Vague décorative en haut */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #FFD700, #FFA500, #FF6B6B, #4ECDC4, #45B7D1)',
                    zIndex: 3,
                }}
            />

            <Container maxWidth="lg">
                {/* Contenu principal du footer */}
                <Box sx={{ py: 6 }}>
                    <Grid container spacing={6} justifyContent="space-between">
                        {/* Logo et description */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{ mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
                                <Logo size="md" showText variant="white" />
                            </Box>
                            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6, textAlign: { xs: 'center', md: 'left' } }}>
                                Résidence Cedo, votre partenaire de confiance pour la location d'appartements et de voitures à Dakar.
                                Service professionnel, prix transparents, satisfaction garantie.
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                {socialLinks.map((social) => (
                                    <IconButton
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: alpha(social.color, 0.2),
                                                color: social.color
                                            }
                                        }}
                                    >
                                        {social.icon}
                                    </IconButton>
                                ))}
                            </Stack>
                        </Grid>

                        {/* Services */}
                        <Grid item xs={12} sm={4} md={2}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: { xs: 'center', md: 'left' } }}>
                                Services
                            </Typography>
                            <Stack spacing={1} sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
                                <Button
                                    component={Link}
                                    href="/apartments"
                                    startIcon={<ApartmentIcon />}
                                    sx={{
                                        justifyContent: { xs: 'center', md: 'flex-start' },
                                        color: 'white',
                                        opacity: 0.8,
                                        textTransform: 'none',
                                        px: 0,
                                        '&:hover': {
                                            opacity: 1,
                                            backgroundColor: 'transparent',
                                            color: theme.palette.primary.light,
                                        },
                                    }}
                                >
                                    Appartements
                                </Button>
                                <Button
                                    component={Link}
                                    href="/cars"
                                    startIcon={<CarIcon />}
                                    sx={{
                                        justifyContent: { xs: 'center', md: 'flex-start' },
                                        color: 'white',
                                        opacity: 0.8,
                                        textTransform: 'none',
                                        px: 0,
                                        '&:hover': {
                                            opacity: 1,
                                            backgroundColor: 'transparent',
                                            color: theme.palette.primary.light,
                                        },
                                    }}
                                >
                                    Voitures
                                </Button>
                                <Button
                                    component={Link}
                                    href="/booking"
                                    startIcon={<BookingIcon />}
                                    sx={{
                                        justifyContent: { xs: 'center', md: 'flex-start' },
                                        color: 'white',
                                        opacity: 0.8,
                                        textTransform: 'none',
                                        px: 0,
                                        '&:hover': {
                                            opacity: 1,
                                            backgroundColor: 'transparent',
                                            color: theme.palette.primary.light,
                                        },
                                    }}
                                >
                                    Réservation
                                </Button>
                            </Stack>
                        </Grid>

                        {/* Entreprise */}
                        <Grid item xs={12} sm={4} md={2}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: { xs: 'center', md: 'center' } }}>
                                Entreprise
                            </Typography>
                            <Stack spacing={1} sx={{ alignItems: { xs: 'center', md: 'center' } }}>
                                {[
                                    { name: 'À propos', href: '/about', icon: <InfoIcon /> },
                                    { name: 'Contact', href: '/contact', icon: <ContactIcon /> },
                                    { name: 'FAQ', href: '/#faq', icon: null },
                                ].map((link) => (
                                    <Button
                                        key={link.name}
                                        component={Link}
                                        href={link.href}
                                        startIcon={link.icon}
                                        sx={{
                                            justifyContent: { xs: 'center', md: 'center' },
                                            color: 'white',
                                            opacity: 0.8,
                                            textTransform: 'none',
                                            px: 0,
                                            '&:hover': {
                                                opacity: 1,
                                                backgroundColor: 'transparent',
                                                color: theme.palette.primary.light,
                                            },
                                        }}
                                    >
                                        {link.name}
                                    </Button>
                                ))}
                            </Stack>
                        </Grid>

                        {/* Contact */}
                        <Grid item xs={12} sm={4} md={4}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: { xs: 'center', md: 'right' } }}>
                                Contactez-nous
                            </Typography>
                            <Stack spacing={2} sx={{ alignItems: { xs: 'center', md: 'flex-end' } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                                    <PhoneIcon sx={{ fontSize: 20, color: theme.palette.primary.light }} />
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        +221 12 345 67 89
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                                    <EmailIcon sx={{ fontSize: 20, color: theme.palette.primary.light }} />
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        contact@residencecedo.sn
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                                    <LocationIcon sx={{ fontSize: 20, color: theme.palette.primary.light }} />
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Dakar, Sénégal
                                    </Typography>
                                </Box>
                                <Button
                                    href="https://wa.me/221123456789"
                                    target="_blank"
                                    startIcon={<WhatsAppIcon />}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#25D366',
                                        color: 'white',
                                        mt: 2,
                                        borderRadius: 2,
                                        '&:hover': {
                                            backgroundColor: '#1DA851',
                                        },
                                    }}
                                >
                                    WhatsApp
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                {/* Séparateur avec dégradé */}
                <Box
                    sx={{
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        my: 4,
                    }}
                />

                {/* Copyright moderne */}
                <Box
                    sx={{
                        py: 4,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 3,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            © 2024 Résidence Cedo. Tous droits réservés.
                        </Typography>
                        <Chip
                            label="Made with ❤️ in Dakar"
                            size="small"
                            sx={{
                                background: 'rgba(255,107,107,0.1)',
                                color: '#FF6B6B',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                display: { xs: 'none', sm: 'flex' },
                            }}
                        />
                    </Box>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                        <Button
                            component={Link}
                            href="/privacy"
                            sx={{
                                color: 'white',
                                opacity: 0.6,
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                '&:hover': {
                                    opacity: 1,
                                    color: '#FFD700',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Confidentialité
                        </Button>
                        <Box sx={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)', display: { xs: 'none', sm: 'block' } }} />
                        <Button
                            component={Link}
                            href="/terms"
                            sx={{
                                color: 'white',
                                opacity: 0.6,
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                '&:hover': {
                                    opacity: 1,
                                    color: '#FFD700',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Conditions
                        </Button>
                    </Stack>
                </Box>

                {/* Section Développeur */}
                <Box
                    sx={{
                        py: 2,
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body2" sx={{ opacity: 0.6, fontSize: '0.8rem' }}>
                        Développé par{' '}
                        <Box
                            component="a"
                            href="tel:+221770874619"
                            sx={{
                                color: '#FFD700',
                                textDecoration: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    textDecoration: 'underline',
                                    opacity: 0.8,
                                },
                            }}
                        >
                            +221 77 087 46 19
                        </Box>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;