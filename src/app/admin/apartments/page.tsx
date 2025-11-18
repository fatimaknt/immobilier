'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    useTheme,
    Fade,
    Fab,
    Avatar,
    Tooltip,
    ImageList,
    ImageListItem,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    Apartment as ApartmentIcon,
    ArrowBack as ArrowBackIcon,
    CloudUpload as UploadIcon,
    Delete as DeleteImageIcon,
    CheckCircle as CheckIcon,
    Cancel as CancelIcon,
    PhotoCamera as PhotoIcon,
    Build as BuildIcon,
    Business as BusinessIcon,
    Store as StoreIcon,
    Home as HomeIcon,
    Description as DescriptionIcon,
    LocationOn as LocationIcon,
    AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import Link from 'next/link';

interface Apartment {
    id: string;
    title: string;
    description: string;
    zone: 'Ouest-foire' | 'Cité Mixta' | 'Cité Kalia';
    address: string;
    rooms: number;
    bathrooms: number;
    surface: number;
    price_per_day: number;
    price_per_week: number;
    available: boolean;
    equipment: string[];
    images: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
    created_at: string;
    updated_at: string;
}

export default function AdminApartments() {
    const theme = useTheme();
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [viewingApartment, setViewingApartment] = useState<Apartment | null>(null);

    useEffect(() => {
        fetchApartments();
    }, []);

    const fetchApartments = async () => {
        try {
            console.log('Chargement des appartements...');
            const response = await fetch('/api/apartments');
            const data = await response.json();
            console.log('Réponse API appartements:', data);

            if (response.ok) {
                setApartments(data);
                console.log(`${data.length} appartements chargés`);
            } else {
                console.error('Erreur lors du chargement des appartements:', data.error || response.statusText);
                alert(`Erreur lors du chargement: ${data.error || response.statusText}`);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des appartements:', error);
            alert(`Erreur réseau lors du chargement: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (apartment: Apartment) => {
        setEditingApartment(apartment);
        setDialogOpen(true);
    };

    const handleView = (apartment: Apartment) => {
        setViewingApartment(apartment);
        setViewDialogOpen(true);
    };

    const handleInputChange = (field: keyof Apartment, value: string | number | boolean) => {
        if (editingApartment) {
            setEditingApartment({ ...editingApartment, [field]: value });
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || !editingApartment) return;

        const newImages: string[] = [...(editingApartment.images || [])];

        // Vérifier si on dépasse la limite de 5 images
        if (newImages.length + files.length > 5) {
            alert('Maximum 5 images autorisées');
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Vérifier la taille du fichier (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert(`L'image ${file.name} est trop grande (max 5MB)`);
                continue;
            }

            // Convertir l'image en base64 pour l'instant (en production, utilisez un service de stockage)
            const base64 = await convertToBase64(file);
            newImages.push(base64);
        }

        setEditingApartment({ ...editingApartment, images: newImages });

        // Réinitialiser l'input
        event.target.value = '';
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const removeImage = (index: number) => {
        if (editingApartment) {
            const newImages = editingApartment.images.filter((_, i) => i !== index);
            setEditingApartment({ ...editingApartment, images: newImages });
        }
    };

    const handleSave = async () => {
        if (!editingApartment) return;

        try {
            // Préparer les données pour l'API
            const apartmentData = {
                title: editingApartment.title,
                description: editingApartment.description,
                zone: editingApartment.zone,
                address: editingApartment.address,
                rooms: editingApartment.rooms,
                bathrooms: editingApartment.bathrooms,
                surface: editingApartment.surface,
                price_per_day: editingApartment.price_per_day,
                price_per_week: editingApartment.price_per_week,
                available: editingApartment.available,
                equipment: typeof editingApartment.equipment === 'string'
                    ? editingApartment.equipment.split(',').map(item => item.trim()).filter(item => item)
                    : editingApartment.equipment,
                images: editingApartment.images,
                coordinates: editingApartment.coordinates
            };

            if (editingApartment.id) {
                // Mise à jour
                console.log('Mise à jour de l\'appartement:', apartmentData);
                const response = await fetch(`/api/apartments/${editingApartment.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(apartmentData),
                });

                const result = await response.json();
                console.log('Réponse mise à jour:', result);

                if (response.ok) {
                    alert('Appartement modifié avec succès !');
                    fetchApartments(); // Recharger la liste
                    setDialogOpen(false);
                    setEditingApartment(null);
                } else {
                    alert(`Erreur lors de la modification: ${result.error || response.statusText}`);
                }
            } else {
                // Création
                console.log('Création de l\'appartement:', apartmentData);
                const response = await fetch('/api/apartments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(apartmentData),
                });

                const result = await response.json();
                console.log('Réponse création:', result);

                if (response.ok) {
                    alert('Appartement créé avec succès !');
                    fetchApartments(); // Recharger la liste
                    setDialogOpen(false);
                    setEditingApartment(null);
                } else {
                    alert(`Erreur lors de la création: ${result.error || response.statusText}`);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            alert(`Erreur réseau: ${error}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet appartement ?')) {
            try {
                console.log('Suppression de l\'appartement:', id);
                const response = await fetch(`/api/apartments/${id}`, {
                    method: 'DELETE',
                });

                const result = await response.json();
                console.log('Réponse suppression:', result);

                if (response.ok) {
                    alert('Appartement supprimé avec succès !');
                    fetchApartments(); // Recharger la liste
                } else {
                    alert(`Erreur lors de la suppression: ${result.error || response.statusText}`);
                }
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert(`Erreur réseau: ${error}`);
            }
        }
    };

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('fr-SN', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getZoneColor = (zone: string) => {
        switch (zone) {
            case 'Cité Mixta': return 'primary';
            case 'Ouest-foire': return 'secondary';
            case 'Cité Kalia': return 'success';
            default: return 'default';
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            py: 20
        }}>
            <Container maxWidth="lg" sx={{ pb: 6 }}>
                {/* Bouton Ajouter un Appartement */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 8 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setEditingApartment({
                                id: '',
                                title: '',
                                description: '',
                                zone: 'Cité Mixta',
                                address: '',
                                rooms: 1,
                                bathrooms: 1,
                                surface: 1,
                                price_per_day: 0,
                                price_per_week: 0,
                                available: true,
                                equipment: [],
                                images: [],
                                coordinates: { lat: 14.7167, lng: -17.4677 },
                                created_at: new Date().toISOString(),
                                updated_at: new Date().toISOString(),
                            });
                            setDialogOpen(true);
                        }}
                        sx={{
                            borderRadius: 3,
                            px: 4,
                            py: 2,
                            fontSize: '1rem',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                                transform: 'translateY(-1px)',
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Ajouter un Appartement
                    </Button>
                </Box>

                <Fade in timeout={1200}>
                    <TableContainer component={Paper} sx={{
                        borderRadius: 3,
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                                    <TableCell sx={{
                                        fontWeight: 700,
                                        color: '#374151',
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Titre
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 700,
                                        color: '#374151',
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Zone
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 700,
                                        color: '#374151',
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Pièces
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 700,
                                        color: '#374151',
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Prix/Jour
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 700,
                                        color: '#374151',
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Images
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 700,
                                        color: '#374151',
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Statut
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 700,
                                        color: '#374151',
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Date Création
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 700,
                                        color: '#374151',
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        textAlign: 'center'
                                    }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {apartments.map((apartment) => (
                                    <TableRow
                                        key={apartment.id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#f8fafc',
                                                '& .action-buttons': {
                                                    opacity: 1
                                                }
                                            }
                                        }}
                                    >
                                        <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>
                                            {apartment.title}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={apartment.zone}
                                                color={getZoneColor(apartment.zone) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                                                size="small"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ color: '#64748b' }}>
                                            {apartment.rooms} pièces
                                        </TableCell>
                                        <TableCell sx={{
                                            fontWeight: 700,
                                            color: '#059669',
                                            fontSize: '0.875rem'
                                        }}>
                                            {formatPrice(apartment.price_per_day)}
                                        </TableCell>
                                        <TableCell sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                                            {apartment.images?.length || 0} image{(apartment.images?.length || 0) > 1 ? 's' : ''}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={apartment.available ? 'Disponible' : 'Occupé'}
                                                color={apartment.available ? 'success' : 'error'}
                                                size="small"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                                            {new Date(apartment.created_at).toLocaleDateString('fr-FR')}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Box
                                                className="action-buttons"
                                                sx={{
                                                    display: 'flex',
                                                    gap: 1,
                                                    justifyContent: 'center',
                                                    opacity: 0.7,
                                                    transition: 'opacity 0.2s ease'
                                                }}
                                            >
                                                <Tooltip title="Voir les détails">
                                                    <IconButton
                                                        onClick={() => handleView(apartment)}
                                                        sx={{
                                                            color: '#10b981',
                                                            '&:hover': {
                                                                background: '#d1fae5',
                                                                transform: 'scale(1.1)'
                                                            },
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        <ViewIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Modifier">
                                                    <IconButton
                                                        onClick={() => handleEdit(apartment)}
                                                        sx={{
                                                            color: '#3b82f6',
                                                            '&:hover': {
                                                                background: '#dbeafe',
                                                                transform: 'scale(1.1)'
                                                            },
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Supprimer">
                                                    <IconButton
                                                        onClick={() => handleDelete(apartment.id)}
                                                        sx={{
                                                            color: '#ef4444',
                                                            '&:hover': {
                                                                background: '#fee2e2',
                                                                transform: 'scale(1.1)'
                                                            },
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Fade>

                {/* Dialog pour ajouter/éditer */}
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    maxWidth="lg"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 4,
                            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                            minHeight: '80vh'
                        }
                    }}
                >
                    <DialogTitle sx={{
                        fontWeight: 800,
                        fontSize: '2rem',
                        background: editingApartment?.id
                            ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                            : 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        py: 4,
                        textAlign: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {editingApartment?.id ? <><EditIcon /> Modifier l&apos;appartement</> : <><AddIcon /> Ajouter un appartement</>}
                        </Box>
                    </DialogTitle>
                    <DialogContent sx={{ p: 6, maxHeight: '75vh', overflowY: 'auto', backgroundColor: '#fafbfc' }}>
                        <Box sx={{ mt: 4, mb: 2 }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Titre de l'appartement"
                                        value={editingApartment?.title || ''}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        variant="outlined"
                                        required
                                        size="large"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1.1rem',
                                                minHeight: '56px',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description détaillée"
                                        multiline
                                        rows={4}
                                        value={editingApartment?.description || ''}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        variant="outlined"
                                        required
                                        placeholder="Décrivez l'appartement, ses équipements, ses avantages et ce qui le rend unique..."
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required size="large">
                                        <InputLabel sx={{ fontSize: '1rem', fontWeight: 600 }}>Zone géographique</InputLabel>
                                        <Select
                                            value={editingApartment?.zone || ''}
                                            onChange={(e) => handleInputChange('zone', e.target.value)}
                                            label="Zone géographique"
                                            sx={{
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                minHeight: '56px',
                                                fontSize: '1rem',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            }}
                                        >
                                            <MenuItem value="Cité Mixta" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <BusinessIcon fontSize="small" /> Cité Mixta
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="Ouest-foire" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <StoreIcon fontSize="small" /> Ouest-foire
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="Cité Kalia" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <HomeIcon fontSize="small" /> Cité Kalia
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Adresse complète"
                                        value={editingApartment?.address || ''}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        variant="outlined"
                                        required
                                        size="large"
                                        placeholder="Ex: 123 Rue de la Paix, Dakar, Sénégal"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '56px',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Nombre de pièces"
                                        type="number"
                                        value={editingApartment?.rooms || 1}
                                        onChange={(e) => handleInputChange('rooms', parseInt(e.target.value) || 1)}
                                        inputProps={{ min: 1 }}
                                        required
                                        size="large"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '56px',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Nombre de salles de bain"
                                        type="number"
                                        value={editingApartment?.bathrooms || 1}
                                        onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value) || 1)}
                                        inputProps={{ min: 1 }}
                                        required
                                        size="large"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '56px',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Surface (m²)"
                                        type="number"
                                        value={editingApartment?.surface || 1}
                                        onChange={(e) => handleInputChange('surface', parseInt(e.target.value) || 1)}
                                        inputProps={{ min: 1 }}
                                        size="large"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '56px',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Prix par jour (FCFA)"
                                        type="number"
                                        value={editingApartment?.price_per_day || 0}
                                        onChange={(e) => handleInputChange('price_per_day', parseInt(e.target.value) || 0)}
                                        inputProps={{ min: 0 }}
                                        required
                                        size="large"
                                        placeholder="Ex: 25000"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '56px',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Prix par semaine (FCFA)"
                                        type="number"
                                        value={editingApartment?.price_per_week || 0}
                                        onChange={(e) => handleInputChange('price_per_week', parseInt(e.target.value) || 0)}
                                        inputProps={{ min: 0 }}
                                        required
                                        size="large"
                                        placeholder="Ex: 150000"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '56px',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Latitude"
                                        type="number"
                                        step="0.000001"
                                        value={editingApartment?.coordinates?.lat || 0}
                                        onChange={(e) => handleInputChange('coordinates', {
                                            ...editingApartment?.coordinates,
                                            lat: parseFloat(e.target.value) || 0
                                        })}
                                        placeholder="Ex: 14.7167"
                                        size="large"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '56px',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Longitude"
                                        type="number"
                                        step="0.000001"
                                        value={editingApartment?.coordinates?.lng || 0}
                                        onChange={(e) => handleInputChange('coordinates', {
                                            ...editingApartment?.coordinates,
                                            lng: parseFloat(e.target.value) || 0
                                        })}
                                        placeholder="Ex: -17.4677"
                                        size="large"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '56px',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Équipements (séparés par des virgules)"
                                        placeholder="WiFi, Climatisation, Parking, Piscine, Balcon, Cuisine équipée..."
                                        value={typeof editingApartment?.equipment === 'string'
                                            ? editingApartment.equipment
                                            : Array.isArray(editingApartment?.equipment)
                                                ? editingApartment.equipment.join(', ')
                                                : ''}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Garder la valeur brute pour l'affichage, mais traiter les équipements seulement à la sauvegarde
                                            if (editingApartment) {
                                                setEditingApartment({ ...editingApartment, equipment: value });
                                            }
                                        }}
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PhotoIcon /> Images de l&apos;appartement
                                    </Typography>

                                    {/* Upload d'images */}
                                    <Box sx={{ mb: 3 }}>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            startIcon={<UploadIcon />}
                                            sx={{
                                                mb: 2,
                                                borderRadius: 3,
                                                py: 2,
                                                px: 4,
                                                borderStyle: 'dashed',
                                                borderWidth: 2,
                                                borderColor: '#3b82f6',
                                                color: '#3b82f6',
                                                backgroundColor: '#eff6ff',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    borderColor: '#2563eb',
                                                    color: '#2563eb',
                                                    backgroundColor: '#dbeafe',
                                                    transform: 'translateY(-1px)'
                                                },
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            📤 Télécharger des images
                                            <input
                                                type="file"
                                                hidden
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </Button>
                                        <Typography variant="caption" sx={{ display: 'block', color: '#6b7280' }}>
                                            Formats acceptés: JPG, PNG, GIF. Maximum 5 images.
                                        </Typography>
                                    </Box>

                                    {/* Aperçu des images */}
                                    {editingApartment?.images && editingApartment.images.length > 0 && (
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                                Images téléchargées ({editingApartment.images.length})
                                            </Typography>
                                            <ImageList sx={{ width: '100%', height: 200 }} cols={3} rowHeight={100}>
                                                {editingApartment.images.map((image, index) => (
                                                    <ImageListItem key={index}>
                                                        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                                            <img
                                                                src={image}
                                                                alt={`Image ${index + 1}`}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover',
                                                                    borderRadius: 8
                                                                }}
                                                            />
                                                            <IconButton
                                                                onClick={() => removeImage(index)}
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: 4,
                                                                    right: 4,
                                                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                                                    color: 'white',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(239, 68, 68, 0.8)'
                                                                    }
                                                                }}
                                                                size="small"
                                                            >
                                                                <DeleteImageIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </ImageListItem>
                                                ))}
                                            </ImageList>
                                        </Box>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required size="large">
                                        <InputLabel sx={{ fontSize: '1rem', fontWeight: 600 }}>Statut de disponibilité</InputLabel>
                                        <Select
                                            value={editingApartment?.available ? 'available' : 'unavailable'}
                                            onChange={(e) => handleInputChange('available', e.target.value === 'available')}
                                            label="Statut de disponibilité"
                                            sx={{
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                minHeight: '56px',
                                                fontSize: '1rem',
                                                '&:hover': {
                                                    backgroundColor: '#f8fafc',
                                                    borderColor: '#3b82f6'
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: '#ffffff',
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            }}
                                        >
                                            <MenuItem value="available" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CheckIcon fontSize="small" color="success" /> Disponible
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="unavailable" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CancelIcon fontSize="small" color="error" /> Occupé
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 4, justifyContent: 'space-between' }}>
                        <Button
                            onClick={() => setDialogOpen(false)}
                            sx={{
                                borderRadius: 3,
                                px: 4,
                                py: 1.5,
                                border: '2px solid #e2e8f0',
                                color: '#64748b',
                                '&:hover': {
                                    borderColor: '#d1d5db',
                                    backgroundColor: '#f9fafb'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CancelIcon /> Annuler
                            </Box>
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                                borderRadius: 3,
                                px: 6,
                                py: 1.5,
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                                fontWeight: 700,
                                fontSize: '1rem',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #059669, #047857)',
                                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {editingApartment?.id ? <><EditIcon /> Mettre à jour</> : <><CheckIcon /> Créer l&apos;appartement</>}
                            </Box>
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Dialog pour voir les détails */}
                <Dialog
                    open={viewDialogOpen}
                    onClose={() => setViewDialogOpen(false)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
                            boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                        }
                    }}
                >
                    <DialogTitle sx={{
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                        color: 'white',
                        py: 3
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <DescriptionIcon /> Détails de l&apos;appartement
                        </Box>
                    </DialogTitle>
                    <DialogContent sx={{ p: 4 }}>
                        {viewingApartment && (
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>
                                        {viewingApartment.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#64748b', mb: 3 }}>
                                        {viewingApartment.description}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        p: 3,
                                        borderRadius: 2,
                                        backgroundColor: '#f8fafc',
                                        border: '1px solid #e2e8f0'
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LocationIcon /> Informations générales
                                            </Box>
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Typography><strong>Zone:</strong> {viewingApartment.zone}</Typography>
                                            <Typography><strong>Adresse:</strong> {viewingApartment.address}</Typography>
                                            <Typography><strong>Pièces:</strong> {viewingApartment.rooms}</Typography>
                                            <Typography><strong>Salles de bain:</strong> {viewingApartment.bathrooms}</Typography>
                                            <Typography><strong>Surface:</strong> {viewingApartment.surface} m²</Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box sx={{
                                        p: 3,
                                        borderRadius: 2,
                                        backgroundColor: '#f8fafc',
                                        border: '1px solid #e2e8f0'
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <MoneyIcon /> Tarifs
                                            </Box>
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Typography><strong>Prix/jour:</strong> {formatPrice(viewingApartment.price_per_day)}</Typography>
                                            <Typography><strong>Prix/semaine:</strong> {formatPrice(viewingApartment.price_per_week)}</Typography>
                                            <Typography>
                                                <strong>Statut:</strong>
                                                <Chip
                                                    label={viewingApartment.available ? 'Disponible' : 'Occupé'}
                                                    color={viewingApartment.available ? 'success' : 'error'}
                                                    size="small"
                                                    sx={{ ml: 1 }}
                                                />
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                {viewingApartment.equipment && viewingApartment.equipment.length > 0 && (
                                    <Grid item xs={12}>
                                        <Box sx={{
                                            p: 3,
                                            borderRadius: 2,
                                            backgroundColor: '#f8fafc',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <BuildIcon /> Équipements
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {viewingApartment.equipment.map((item, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={item}
                                                        variant="outlined"
                                                        sx={{ backgroundColor: 'white' }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    </Grid>
                                )}

                                {viewingApartment.images && viewingApartment.images.length > 0 && (
                                    <Grid item xs={12}>
                                        <Box sx={{
                                            p: 3,
                                            borderRadius: 2,
                                            backgroundColor: '#f8fafc',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PhotoIcon /> Images ({viewingApartment.images.length})
                                            </Typography>
                                            <ImageList sx={{ width: '100%', height: 300 }} cols={3} rowHeight={150}>
                                                {viewingApartment.images.map((image, index) => (
                                                    <ImageListItem key={index}>
                                                        <img
                                                            src={image}
                                                            alt={`Image ${index + 1}`}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: 8
                                                            }}
                                                        />
                                                    </ImageListItem>
                                                ))}
                                            </ImageList>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
                        <Button
                            onClick={() => setViewDialogOpen(false)}
                            variant="contained"
                            sx={{
                                borderRadius: 3,
                                px: 4,
                                py: 1.5,
                                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                                }
                            }}
                        >
                            Fermer
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
