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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Fade,
    Tooltip,
    ImageList,
    ImageListItem,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    DirectionsCar as CarIcon,
    CloudUpload as UploadIcon,
    Delete as DeleteImageIcon,
    CheckCircle as CheckIcon,
    Cancel as CancelIcon,
    PhotoCamera as PhotoIcon,
    Build as BuildIcon,
    Settings as SettingsIcon,
    SmartToy as AutoIcon,
    Description as DescriptionIcon,
    Bolt as BoltIcon,
    LocalGasStation as LocalGasStationIcon,
    BatteryChargingFull as BatteryIcon,
    AttachMoney as MoneyIcon,
} from '@mui/icons-material';

interface Car {
    id: string;
    brand: string;
    model: string;
    type: string;
    price_per_day: number;
    price_per_week: number;
    available: boolean;
    images: string[];
    description: string;
    fuel_type: string;
    transmission: string;
    seats: number;
    year: number;
    mileage: number;
    features: string[];
    created_at: string;
    updated_at: string;
}

export default function AdminCars() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [viewingCar, setViewingCar] = useState<Car | null>(null);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            console.log('Chargement des voitures...');
            const response = await fetch('/api/cars');
            const data = await response.json();
            console.log('Réponse API voitures:', data);

            if (response.ok) {
                setCars(data);
                console.log(`${data.length} voitures chargées`);
            } else {
                console.error('Erreur lors du chargement des voitures:', data.error || response.statusText);
                alert(`Erreur lors du chargement: ${data.error || response.statusText}`);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des voitures:', error);
            alert(`Erreur réseau lors du chargement: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (car: Car) => {
        setEditingCar(car);
        setDialogOpen(true);
    };

    const handleView = (car: Car) => {
        setViewingCar(car);
        setViewDialogOpen(true);
    };

    const handleInputChange = (field: keyof Car, value: string | number | boolean | string[]) => {
        if (editingCar) {
            setEditingCar({ ...editingCar, [field]: value });
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || !editingCar) return;

        const newImages: string[] = [...(editingCar.images || [])];

        // Vérifier si on dépasse la limite de 5 images
        if (newImages.length + files.length > 5) {
            alert('Maximum 5 images autorisées');
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Vérifier la taille du fichier (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert(`L&apos;image ${file.name} est trop grande (max 5MB)`);
                continue;
            }

            // Convertir en base64
            const base64 = await convertToBase64(file);
            newImages.push(base64);
        }

        setEditingCar({ ...editingCar, images: newImages });
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
        if (editingCar) {
            const newImages = editingCar.images.filter((_, i) => i !== index);
            setEditingCar({ ...editingCar, images: newImages });
        }
    };

    const handleSave = async () => {
        if (!editingCar) return;

        try {
            // Préparer les données pour l'API
            const carData = {
                brand: editingCar.brand,
                model: editingCar.model,
                type: editingCar.type,
                price_per_day: editingCar.price_per_day,
                price_per_week: editingCar.price_per_week,
                available: editingCar.available,
                images: editingCar.images,
                description: editingCar.description,
                fuel_type: editingCar.fuel_type,
                transmission: editingCar.transmission,
                seats: editingCar.seats,
                year: editingCar.year,
                mileage: editingCar.mileage,
                features: typeof editingCar.features === 'string'
                    ? editingCar.features.split(',').map(item => item.trim()).filter(item => item)
                    : editingCar.features
            };

            if (editingCar.id) {
                // Mise à jour
                console.log('Mise à jour de la voiture:', carData);
                const response = await fetch(`/api/cars/${editingCar.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(carData),
                });

                let result;
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.includes('application/json')) {
                    result = await response.json();
                    console.log('Réponse mise à jour:', result);
                } else {
                    const text = await response.text();
                    console.error('Réponse non-JSON:', text);
                    result = { error: `Erreur serveur: ${response.status} ${response.statusText}` };
                }

                if (response.ok) {
                    alert('Voiture modifiée avec succès !');
                    fetchCars(); // Recharger la liste
                    setDialogOpen(false);
                    setEditingCar(null);
                } else {
                    alert(`Erreur lors de la modification: ${result.error || response.statusText}`);
                }
            } else {
                // Création
                console.log('Création de la voiture:', carData);
                const response = await fetch('/api/cars', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(carData),
                });

                let result;
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.includes('application/json')) {
                    result = await response.json();
                    console.log('Réponse création:', result);
                } else {
                    const text = await response.text();
                    console.error('Réponse non-JSON:', text);
                    result = { error: `Erreur serveur: ${response.status} ${response.statusText}` };
                }

                if (response.ok) {
                    alert('Voiture créée avec succès !');
                    fetchCars(); // Recharger la liste
                    setDialogOpen(false);
                    setEditingCar(null);
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
        if (confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
            try {
                console.log('Suppression de la voiture:', id);
                const response = await fetch(`/api/cars/${id}`, {
                    method: 'DELETE',
                });

                let result;
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.includes('application/json')) {
                    result = await response.json();
                    console.log('Réponse suppression:', result);
                } else {
                    const text = await response.text();
                    console.error('Réponse non-JSON:', text);
                    result = { error: `Erreur serveur: ${response.status} ${response.statusText}` };
                }

                if (response.ok) {
                    alert('Voiture supprimée avec succès !');
                    fetchCars(); // Recharger la liste
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

    if (loading) {
        return (
            <Box sx={{
                minHeight: '100vh',
                backgroundColor: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant="h5">Chargement des voitures...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            py: 20
        }}>
            <Container maxWidth="lg" sx={{ pb: 6 }}>
                {/* Bouton Ajouter une Voiture */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 8 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setEditingCar({
                                id: '',
                                brand: '',
                                model: '',
                                type: 'Berline',
                                price_per_day: 0,
                                price_per_week: 0,
                                available: true,
                                images: [],
                                description: '',
                                fuel_type: 'Essence',
                                transmission: 'Manuel',
                                seats: 4,
                                year: new Date().getFullYear(),
                                mileage: 0,
                                features: [],
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
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #059669, #047857)',
                                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CarIcon /> Ajouter une Voiture
                        </Box>
                    </Button>
                </Box>

                {/* Tableau des voitures */}
                <Fade in timeout={1000}>
                    <TableContainer
                        component={Paper}
                        sx={{
                            borderRadius: 4,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            overflow: 'hidden'
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Marque/Modèle</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Type</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Prix/Jour</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Statut</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '1rem', textAlign: 'center' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cars.map((car) => (
                                    <TableRow
                                        key={car.id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#f8fafc',
                                                '& .action-buttons': {
                                                    opacity: 1
                                                }
                                            },
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <CarIcon sx={{ color: '#3b82f6', fontSize: 32 }} />
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                        {car.brand} {car.model}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                                                        {car.year} • {car.seats} places
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={car.type}
                                                variant="outlined"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#059669' }}>
                                                {formatPrice(car.price_per_day)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={car.available ? 'Disponible' : 'Occupée'}
                                                color={car.available ? 'success' : 'error'}
                                                variant="filled"
                                                sx={{ fontWeight: 600 }}
                                            />
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
                                                        onClick={() => handleView(car)}
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
                                                        onClick={() => handleEdit(car)}
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
                                                        onClick={() => handleDelete(car.id)}
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
                        background: editingCar?.id
                            ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                            : 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        py: 4,
                        textAlign: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {editingCar?.id ? <><EditIcon /> Modifier la voiture</> : <><CarIcon /> Ajouter une voiture</>}
                        </Box>
                    </DialogTitle>
                    <DialogContent sx={{ p: 6, maxHeight: '75vh', overflowY: 'auto', backgroundColor: '#fafbfc' }}>
                        <Box sx={{ mt: 4, mb: 2 }}>
                            <Grid container spacing={4}>
                                {/* Marque */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Marque"
                                        value={editingCar?.brand || ''}
                                        onChange={(e) => handleInputChange('brand', e.target.value)}
                                        variant="outlined"
                                        required
                                        size="medium"
                                        placeholder="Ex: Toyota, BMW, Mercedes..."
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '70px',
                                                fontSize: '1.1rem',
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
                                                fontSize: '1.1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Modèle */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Modèle"
                                        value={editingCar?.model || ''}
                                        onChange={(e) => handleInputChange('model', e.target.value)}
                                        variant="outlined"
                                        required
                                        size="medium"
                                        placeholder="Ex: Camry, X5, C-Class..."
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '70px',
                                                fontSize: '1.1rem',
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
                                                fontSize: '1.1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Type */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required size="medium">
                                        <InputLabel sx={{ fontSize: '1rem', fontWeight: 600 }}>Type de véhicule</InputLabel>
                                        <Select
                                            value={editingCar?.type || ''}
                                            onChange={(e) => handleInputChange('type', e.target.value)}
                                            label="Type de véhicule"
                                            sx={{
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                minHeight: '70px',
                                                fontSize: '1.1rem',
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
                                            <MenuItem value="Berline" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CarIcon fontSize="small" /> Berline
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="SUV" sx={{ fontSize: '1rem', py: 1.5 }}>SUV</MenuItem>
                                            <MenuItem value="Break" sx={{ fontSize: '1rem', py: 1.5 }}>Break</MenuItem>
                                            <MenuItem value="Cabriolet" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CarIcon fontSize="small" /> Cabriolet
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="Monospace" sx={{ fontSize: '1rem', py: 1.5 }}>Monospace</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Année */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Année"
                                        type="number"
                                        value={editingCar?.year || new Date().getFullYear()}
                                        onChange={(e) => handleInputChange('year', parseInt(e.target.value) || new Date().getFullYear())}
                                        inputProps={{ min: 2000, max: new Date().getFullYear() + 1 }}
                                        required
                                        size="medium"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '70px',
                                                fontSize: '1.1rem',
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
                                                fontSize: '1.1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Prix par jour */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Prix par jour (FCFA)"
                                        type="number"
                                        value={editingCar?.price_per_day || 0}
                                        onChange={(e) => handleInputChange('price_per_day', parseInt(e.target.value) || 0)}
                                        inputProps={{ min: 0 }}
                                        required
                                        size="medium"
                                        placeholder="Ex: 25000"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '70px',
                                                fontSize: '1.1rem',
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
                                                fontSize: '1.1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Prix par semaine */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Prix par semaine (FCFA)"
                                        type="number"
                                        value={editingCar?.price_per_week || 0}
                                        onChange={(e) => handleInputChange('price_per_week', parseInt(e.target.value) || 0)}
                                        inputProps={{ min: 0 }}
                                        required
                                        size="medium"
                                        placeholder="Ex: 150000"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '70px',
                                                fontSize: '1.1rem',
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
                                                fontSize: '1.1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Statut */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required size="medium">
                                        <InputLabel sx={{ fontSize: '1rem', fontWeight: 600 }}>Statut de disponibilité</InputLabel>
                                        <Select
                                            value={editingCar?.available ? 'available' : 'unavailable'}
                                            onChange={(e) => handleInputChange('available', e.target.value === 'available')}
                                            label="Statut de disponibilité"
                                            sx={{
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                minHeight: '70px',
                                                fontSize: '1.1rem',
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
                                                    <CancelIcon fontSize="small" color="error" /> Occupée
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Places */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Nombre de places"
                                        type="number"
                                        value={editingCar?.seats || 4}
                                        onChange={(e) => handleInputChange('seats', parseInt(e.target.value) || 4)}
                                        inputProps={{ min: 2, max: 9 }}
                                        required
                                        size="medium"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '70px',
                                                fontSize: '1.1rem',
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
                                                fontSize: '1.1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Carburant */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required size="medium">
                                        <InputLabel sx={{ fontSize: '1rem', fontWeight: 600 }}>Type de carburant</InputLabel>
                                        <Select
                                            value={editingCar?.fuel_type || 'Essence'}
                                            onChange={(e) => handleInputChange('fuel_type', e.target.value)}
                                            label="Type de carburant"
                                            sx={{
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                minHeight: '70px',
                                                fontSize: '1.1rem',
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
                                            <MenuItem value="Essence" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <LocalGasStationIcon fontSize="small" /> Essence
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="Diesel" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <LocalGasStationIcon fontSize="small" /> Diesel
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="Hybride" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <BatteryIcon fontSize="small" /> Hybride
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="Électrique" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <BoltIcon fontSize="small" /> Électrique
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Transmission */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required size="medium">
                                        <InputLabel sx={{ fontSize: '1rem', fontWeight: 600 }}>Transmission</InputLabel>
                                        <Select
                                            value={editingCar?.transmission || 'Manuel'}
                                            onChange={(e) => handleInputChange('transmission', e.target.value)}
                                            label="Transmission"
                                            sx={{
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                minHeight: '70px',
                                                fontSize: '1.1rem',
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
                                            <MenuItem value="Manuel" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <SettingsIcon fontSize="small" /> Manuel
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="Automatique" sx={{ fontSize: '1rem', py: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <AutoIcon fontSize="small" /> Automatique
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Kilométrage */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Kilométrage (km)"
                                        type="number"
                                        value={editingCar?.mileage || 0}
                                        onChange={(e) => handleInputChange('mileage', parseInt(e.target.value) || 0)}
                                        inputProps={{ min: 0 }}
                                        size="medium"
                                        placeholder="Ex: 50000"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1rem',
                                                minHeight: '70px',
                                                fontSize: '1.1rem',
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
                                                fontSize: '1.1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Équipements */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Équipements (séparés par des virgules)"
                                        placeholder="Climatisation, GPS, Bluetooth, Sièges en cuir, Toit ouvrant..."
                                        value={typeof editingCar?.features === 'string'
                                            ? editingCar.features
                                            : Array.isArray(editingCar?.features)
                                                ? editingCar.features.join(', ')
                                                : ''}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (editingCar) {
                                                setEditingCar({ ...editingCar, features: value });
                                            }
                                        }}
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1.1rem',
                                                minHeight: '120px',
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
                                                fontSize: '1.1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Description */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description détaillée"
                                        multiline
                                        rows={6}
                                        value={editingCar?.description || ''}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        variant="outlined"
                                        placeholder="Décrivez la voiture, ses équipements et ses avantages..."
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                                backgroundColor: '#ffffff',
                                                fontSize: '1.1rem',
                                                minHeight: '150px',
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
                                                fontSize: '1.1rem',
                                                fontWeight: 600
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Section Images */}
                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#374151' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PhotoIcon /> Images de la voiture
                                        </Box>
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
                                    {editingCar?.images && editingCar.images.length > 0 && (
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                                Images téléchargées ({editingCar.images.length})
                                            </Typography>
                                            <ImageList sx={{ width: '100%', height: 200 }} cols={3} rowHeight={100}>
                                                {editingCar.images.map((image, index) => (
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
                                fontWeight: 600,
                                '&:hover': {
                                    borderColor: '#d1d5db',
                                    backgroundColor: '#f9fafb',
                                    transform: 'translateY(-1px)'
                                },
                                transition: 'all 0.2s ease'
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
                                {editingCar?.id ? <><EditIcon /> Mettre à jour</> : <><CarIcon /> Créer la voiture</>}
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
                            <DescriptionIcon /> Détails de la voiture
                        </Box>
                    </DialogTitle>
                    <DialogContent sx={{ p: 4 }}>
                        {viewingCar && (
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>
                                        {viewingCar.brand} {viewingCar.model}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#64748b', mb: 3 }}>
                                        {viewingCar.description}
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
                                                <CarIcon /> Informations générales
                                            </Box>
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Typography><strong>Type:</strong> {viewingCar.type}</Typography>
                                            <Typography><strong>Année:</strong> {viewingCar.year}</Typography>
                                            <Typography><strong>Places:</strong> {viewingCar.seats}</Typography>
                                            <Typography><strong>Kilométrage:</strong> {viewingCar.mileage?.toLocaleString()} km</Typography>
                                            <Typography><strong>Carburant:</strong> {viewingCar.fuel_type}</Typography>
                                            <Typography><strong>Transmission:</strong> {viewingCar.transmission}</Typography>
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
                                            <Typography><strong>Prix/jour:</strong> {formatPrice(viewingCar.price_per_day)}</Typography>
                                            <Typography><strong>Prix/semaine:</strong> {formatPrice(viewingCar.price_per_week)}</Typography>
                                            <Typography>
                                                <strong>Statut:</strong>
                                                <Chip
                                                    label={viewingCar.available ? 'Disponible' : 'Occupée'}
                                                    color={viewingCar.available ? 'success' : 'error'}
                                                    size="small"
                                                    sx={{ ml: 1 }}
                                                />
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                {/* Équipements */}
                                {viewingCar.features && viewingCar.features.length > 0 && (
                                    <Grid item xs={12}>
                                        <Box sx={{
                                            p: 3,
                                            borderRadius: 2,
                                            backgroundColor: '#f8fafc',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <BuildIcon /> Équipements
                                                </Box>
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {viewingCar.features.map((feature, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={feature}
                                                        variant="outlined"
                                                        sx={{
                                                            backgroundColor: '#eff6ff',
                                                            borderColor: '#3b82f6',
                                                            color: '#1e40af',
                                                            fontWeight: 500
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    </Grid>
                                )}

                                <Grid item xs={12}>
                                    <Box sx={{
                                        p: 3,
                                        borderRadius: 2,
                                        backgroundColor: '#f8fafc',
                                        border: '1px solid #e2e8f0'
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PhotoIcon /> Images ({viewingCar.images?.length || 0})
                                            </Box>
                                        </Typography>
                                        {viewingCar.images && viewingCar.images.length > 0 ? (
                                            <ImageList sx={{ width: '100%', height: 300 }} cols={3} rowHeight={150}>
                                                {viewingCar.images.map((image, index) => (
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
                                                            onError={(e) => {
                                                                console.error('Erreur de chargement de l\'image:', image);
                                                                e.currentTarget.style.display = 'none';
                                                            }}
                                                        />
                                                    </ImageListItem>
                                                ))}
                                            </ImageList>
                                        ) : (
                                            <Box sx={{
                                                textAlign: 'center',
                                                py: 4,
                                                color: '#64748b'
                                            }}>
                                                <Typography variant="body1">
                                                    Aucune image disponible pour cette voiture
                                                </Typography>
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    Utilisez le bouton &quot;Modifier&quot; pour ajouter des images
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
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
                                    transform: 'translateY(-1px)',
                                },
                                transition: 'all 0.2s ease'
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
