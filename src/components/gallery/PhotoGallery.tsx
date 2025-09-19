'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    Dialog,
    DialogContent,
    IconButton,
    useTheme,
    Chip,
    Stack,
    Fade,
    Grow,
    useMediaQuery,
} from '@mui/material';
import {
    Close as CloseIcon,
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    PhotoLibrary as PhotoIcon,
    ZoomIn as ZoomIcon,
} from '@mui/icons-material';
import Image from 'next/image';

interface Photo {
    id: string;
    src: string;
    title: string;
    category: 'apartment' | 'car';
    location?: string;
    featured?: boolean;
}

interface PhotoGalleryProps {
    photos: Photo[];
    title?: string;
    description?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
    photos,
    title = "Galerie Photos HD",
    description = "Découvrez nos appartements et véhicules en haute qualité"
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [filter, setFilter] = useState<'all' | 'apartment' | 'car'>('all');

    const filteredPhotos = photos.filter(photo =>
        filter === 'all' || photo.category === filter
    );

    const handlePhotoClick = (index: number) => {
        setSelectedPhoto(index);
    };

    const handleClose = () => {
        setSelectedPhoto(null);
    };

    const handleNext = () => {
        if (selectedPhoto !== null) {
            setSelectedPhoto((selectedPhoto + 1) % filteredPhotos.length);
        }
    };

    const handlePrev = () => {
        if (selectedPhoto !== null) {
            setSelectedPhoto(selectedPhoto === 0 ? filteredPhotos.length - 1 : selectedPhoto - 1);
        }
    };

    const currentPhoto = selectedPhoto !== null ? filteredPhotos[selectedPhoto] : null;

    return (
        <Box sx={{ py: 8, backgroundColor: 'white' }}>
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
                            📸 {title}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                            {description}
                        </Typography>

                        {/* Filtres */}
                        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
                            <Chip
                                label="Toutes les photos"
                                onClick={() => setFilter('all')}
                                variant={filter === 'all' ? 'filled' : 'outlined'}
                                color={filter === 'all' ? 'primary' : 'default'}
                                icon={<PhotoIcon />}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    '&:hover': { transform: 'translateY(-2px)' },
                                    transition: 'all 0.3s ease',
                                }}
                            />
                            <Chip
                                label="🏠 Appartements"
                                onClick={() => setFilter('apartment')}
                                variant={filter === 'apartment' ? 'filled' : 'outlined'}
                                color={filter === 'apartment' ? 'primary' : 'default'}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    '&:hover': { transform: 'translateY(-2px)' },
                                    transition: 'all 0.3s ease',
                                }}
                            />
                            <Chip
                                label="🚗 Voitures"
                                onClick={() => setFilter('car')}
                                variant={filter === 'car' ? 'filled' : 'outlined'}
                                color={filter === 'car' ? 'primary' : 'default'}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    '&:hover': { transform: 'translateY(-2px)' },
                                    transition: 'all 0.3s ease',
                                }}
                            />
                        </Stack>
                    </Box>
                </Fade>

                {/* Grille de photos */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                    },
                    gap: 4,
                    justifyItems: 'center'
                }}>
                    {filteredPhotos.map((photo, index) => (
                        <Box key={photo.id} sx={{ width: '100%', maxWidth: 400 }}>
                            <Grow in timeout={1000 + index * 100}>
                                <Card
                                    sx={{
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        '&:hover': {
                                            transform: 'translateY(-8px) scale(1.02)',
                                            boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                                        },
                                    }}
                                    onClick={() => handlePhotoClick(index)}
                                >
                                    <Box sx={{ position: 'relative', height: 350, width: '100%' }}>
                                        <Image
                                            src={photo.src}
                                            alt={photo.title}
                                            fill
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />

                                        {/* Overlay avec icône zoom */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                opacity: 0,
                                                transition: 'opacity 0.3s ease',
                                                '&:hover': {
                                                    opacity: 1,
                                                },
                                            }}
                                        >
                                            <ZoomIcon
                                                sx={{
                                                    fontSize: 40,
                                                    color: 'white',
                                                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
                                                }}
                                            />
                                        </Box>

                                        {/* Badge catégorie */}
                                        <Chip
                                            label={photo.category === 'apartment' ? '🏠 Appartement' : '🚗 Voiture'}
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                left: 12,
                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                                fontWeight: 600,
                                                fontSize: '0.75rem',
                                            }}
                                        />

                                        {/* Badge featured */}
                                        {photo.featured && (
                                            <Chip
                                                label="⭐ Premium"
                                                size="small"
                                                color="primary"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    right: 12,
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem',
                                                }}
                                            />
                                        )}
                                    </Box>

                                    {/* Titre de la photo */}
                                    <Box sx={{ p: 2, textAlign: 'center', mt: 'auto' }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            {photo.title}
                                        </Typography>
                                        {photo.location && (
                                            <Typography variant="body2" color="text.secondary">
                                                📍 {photo.location}
                                            </Typography>
                                        )}
                                    </Box>
                                </Card>
                            </Grow>
                        </Box>
                    ))}
                </Box>

                {/* Message si aucune photo */}
                {filteredPhotos.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" color="text.secondary">
                            Aucune photo disponible pour cette catégorie
                        </Typography>
                    </Box>
                )}

                {/* Dialog pour affichage en grand */}
                <Dialog
                    open={selectedPhoto !== null}
                    onClose={handleClose}
                    maxWidth="lg"
                    fullWidth
                    PaperProps={{
                        sx: {
                            backgroundColor: 'rgba(0,0,0,0.9)',
                            borderRadius: 4,
                        }
                    }}
                >
                    <DialogContent sx={{ p: 0, position: 'relative' }}>
                        {currentPhoto && (
                            <>
                                {/* Bouton fermer */}
                                <IconButton
                                    onClick={handleClose}
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        zIndex: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                        },
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>

                                {/* Navigation précédent */}
                                {filteredPhotos.length > 1 && (
                                    <IconButton
                                        onClick={handlePrev}
                                        sx={{
                                            position: 'absolute',
                                            left: 16,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                            color: 'white',
                                            zIndex: 2,
                                            '&:hover': {
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                            },
                                        }}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>
                                )}

                                {/* Navigation suivant */}
                                {filteredPhotos.length > 1 && (
                                    <IconButton
                                        onClick={handleNext}
                                        sx={{
                                            position: 'absolute',
                                            right: 16,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                            color: 'white',
                                            zIndex: 2,
                                            '&:hover': {
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                            },
                                        }}
                                    >
                                        <ArrowForwardIcon />
                                    </IconButton>
                                )}

                                {/* Image en grand */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: { xs: '60vh', md: '80vh' },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Image
                                        src={currentPhoto.src}
                                        alt={currentPhoto.title}
                                        fill
                                        style={{
                                            objectFit: 'contain',
                                        }}
                                        sizes="100vw"
                                        priority
                                    />
                                </Box>

                                {/* Informations de la photo */}
                                <Box sx={{ p: 3, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                        {currentPhoto.title}
                                    </Typography>
                                    {currentPhoto.location && (
                                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                                            📍 {currentPhoto.location}
                                        </Typography>
                                    )}
                                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.6 }}>
                                        {selectedPhoto !== null ? selectedPhoto + 1 : 0} / {filteredPhotos.length}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </Container>
        </Box>
    );
};

export default PhotoGallery;