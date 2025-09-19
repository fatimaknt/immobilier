'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    Avatar,
    Rating,
    IconButton,
    useTheme,
    alpha,
    Stack,
    Fade,
    Grow,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { Testimonial } from '../../types';

interface TestimonialsProps {
    testimonials: Testimonial[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

const Testimonials: React.FC<TestimonialsProps> = ({
    testimonials,
    autoPlay = true,
    autoPlayInterval = 5000
}) => {
    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!autoPlay || testimonials.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, testimonials.length]);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToTestimonial = (index: number) => {
        setCurrentIndex(index);
    };

    if (testimonials.length === 0) {
        return null;
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
        <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
            <Container maxWidth="lg">
                <Fade in timeout={1000}>
                    <Box textAlign="center" sx={{ mb: 6 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                color: theme.palette.text.primary,
                            }}
                        >
                            ⭐ Ce que disent nos clients
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Découvrez les témoignages de nos clients satisfaits
                        </Typography>
                    </Box>
                </Fade>

                <Box sx={{ position: 'relative', maxWidth: 800, mx: 'auto' }}>
                    <Grow in timeout={1200} key={currentIndex}>
                        <Card
                            sx={{
                                p: 6,
                                borderRadius: 4,
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '"\u201C"',
                                    position: 'absolute',
                                    top: 20,
                                    left: 30,
                                    fontSize: '4rem',
                                    color: alpha(theme.palette.primary.main, 0.1),
                                    fontFamily: 'serif',
                                    fontWeight: 700,
                                },
                            }}
                        >
                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontStyle: 'italic',
                                        fontWeight: 500,
                                        lineHeight: 1.6,
                                        color: theme.palette.text.primary,
                                        mb: 3,
                                        position: 'relative',
                                        zIndex: 1,
                                    }}
                                >
                                    &ldquo;{currentTestimonial.comment}&rdquo;
                                </Typography>

                                <Rating
                                    value={currentTestimonial.rating}
                                    readOnly
                                    size="large"
                                    icon={<StarIcon sx={{ color: '#FFD700' }} />}
                                    emptyIcon={<StarIcon sx={{ color: '#E0E0E0' }} />}
                                    sx={{ mb: 3 }}
                                />
                            </Box>

                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                                <Avatar
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: theme.palette.primary.main,
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                    }}
                                >
                                    {currentTestimonial.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                        {currentTestimonial.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {currentTestimonial.type} • {new Date(currentTestimonial.date).toLocaleDateString('fr-FR')}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Card>
                    </Grow>

                    {/* Navigation */}
                    {testimonials.length > 1 && (
                        <>
                            <IconButton
                                onClick={prevTestimonial}
                                sx={{
                                    position: 'absolute',
                                    left: { xs: -20, md: -60 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'white',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.main,
                                        color: 'white',
                                        transform: 'translateY(-50%) scale(1.1)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <IconButton
                                onClick={nextTestimonial}
                                sx={{
                                    position: 'absolute',
                                    right: { xs: -20, md: -60 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'white',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.main,
                                        color: 'white',
                                        transform: 'translateY(-50%) scale(1.1)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <ArrowForwardIcon />
                            </IconButton>
                        </>
                    )}
                </Box>

                {/* Indicateurs */}
                {testimonials.length > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
                        {testimonials.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => goToTestimonial(index)}
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: index === currentIndex ? theme.palette.primary.main : '#E0E0E0',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.main,
                                        transform: 'scale(1.2)',
                                    },
                                }}
                            />
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Testimonials;