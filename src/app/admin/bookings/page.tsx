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
    useTheme,
    Tooltip,
    Card,
    CardContent,
    InputAdornment,
    Stack,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    BookOnline as BookingIcon,
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon,
    Refresh as RefreshIcon,
    CheckCircle as ConfirmIcon,
    Cancel as CancelIcon,
} from '@mui/icons-material';
import Link from 'next/link';
// import { Booking } from '@/types';

// Type temporaire pour correspondre à la structure de la base de données
interface BookingData {
    id: string;
    type: 'apartment' | 'car';
    entity_id: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    start_date: string;
    end_date: string;
    total_amount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    payment_method: string;
    notes?: string;
    created_at: string;
}

export default function AdminBookings() {
    const theme = useTheme();
    const [bookings, setBookings] = useState<BookingData[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [viewingBooking, setViewingBooking] = useState<BookingData | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchBookings();
        const interval = setInterval(fetchBookings, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/bookings');
            const data = await response.json();

            if (response.ok) {
                setBookings(data as BookingData[]);
            } else {
                console.error('Erreur lors du chargement des réservations:', data.error);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des réservations:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleView = (booking: BookingData) => {
        setViewingBooking(booking);
        setViewDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
            try {
                const response = await fetch(`/api/bookings/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setBookings(bookings.filter(booking => booking.id !== id));
                } else {
                    const errorData = await response.json();
                    alert(`Erreur lors de la suppression: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Erreur lors de la suppression de la réservation');
            }
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setBookings(bookings.map(booking =>
                    booking.id === id ? { ...booking, status: newStatus } : booking
                ));
            } else {
                const errorData = await response.json();
                alert(`Erreur lors de la mise à jour: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            alert('Erreur lors de la mise à jour du statut');
        }
    };




    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.user_phone?.includes(searchTerm);

        const matchesType = typeFilter === 'all' || booking.type?.toLowerCase() === typeFilter;
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Chargement des réservations...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Container maxWidth="xl" sx={{ py: 15 }}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Link href="/admin">
                            <IconButton>
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        <Box>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Gestion des Réservations
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Gérez et suivez toutes les réservations
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Button
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={fetchBookings}
                        >
                            Actualiser
                        </Button>
                    </Box>
                </Box>

                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
                            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Rechercher par nom, email ou téléphone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: '1 1 150px', minWidth: 150 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                        label="Type"
                                    >
                                        <MenuItem value="all">Tous les types</MenuItem>
                                        <MenuItem value="apartment">Appartements</MenuItem>
                                        <MenuItem value="car">Voitures</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ flex: '1 1 150px', minWidth: 150 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Statut</InputLabel>
                                    <Select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        label="Statut"
                                    >
                                        <MenuItem value="all">Tous les statuts</MenuItem>
                                        <MenuItem value="pending">En attente</MenuItem>
                                        <MenuItem value="confirmed">Confirmées</MenuItem>
                                        <MenuItem value="cancelled">Annulées</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ flex: '0 0 auto' }}>
                                <Typography variant="body2" color="text.secondary">
                                    {filteredBookings.length} réservation(s)
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Client</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Période</TableCell>
                                <TableCell>Montant</TableCell>
                                <TableCell>Statut</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredBookings.map((booking) => (
                                <TableRow key={booking.id} hover>
                                    <TableCell>
                                        <Box>
                                            <Typography variant="subtitle2">
                                                {booking.user_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {booking.user_email}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {booking.user_phone}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={booking.type === 'apartment' ? 'Appartement' : 'Voiture'}
                                            color={booking.type === 'apartment' ? 'primary' : 'secondary'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {formatDate(booking.start_date)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            au {formatDate(booking.end_date)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" color="primary">
                                            {formatPrice(booking.total_amount)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={booking.status === 'pending' ? 'En attente' :
                                                booking.status === 'confirmed' ? 'Confirmée' : 'Annulée'}
                                            color={booking.status === 'pending' ? 'warning' :
                                                booking.status === 'confirmed' ? 'success' : 'error'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {formatDate(booking.created_at)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center">
                                            <Tooltip title="Voir détails">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleView(booking)}
                                                >
                                                    <ViewIcon />
                                                </IconButton>
                                            </Tooltip>
                                            {booking.status === 'pending' && (
                                                <>
                                                    <Tooltip title="Confirmer">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                            color="success"
                                                        >
                                                            <ConfirmIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Annuler">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                            color="error"
                                                        >
                                                            <CancelIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </>
                                            )}
                                            <Tooltip title="Supprimer">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDelete(booking.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {filteredBookings.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <BookingIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Aucune réservation trouvée
                        </Typography>
                    </Box>
                )}
            </Container>

            <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Détails de la réservation</DialogTitle>
                <DialogContent>
                    {viewingBooking && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
                            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                                <Typography variant="subtitle2" gutterBottom>Client</Typography>
                                <Typography variant="body1" gutterBottom>
                                    {viewingBooking.user_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {viewingBooking.user_email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {viewingBooking.user_phone}
                                </Typography>
                            </Box>
                            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                                <Typography variant="subtitle2" gutterBottom>Réservation</Typography>
                                <Typography variant="body1" gutterBottom>
                                    {viewingBooking.type === 'apartment' ? 'Appartement' : 'Voiture'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ID: {viewingBooking.entity_id}
                                </Typography>
                            </Box>
                            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                                <Typography variant="subtitle2" gutterBottom>Période</Typography>
                                <Typography variant="body1">
                                    Du {formatDate(viewingBooking.start_date)}
                                </Typography>
                                <Typography variant="body1">
                                    Au {formatDate(viewingBooking.end_date)}
                                </Typography>
                            </Box>
                            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                                <Typography variant="subtitle2" gutterBottom>Montant</Typography>
                                <Typography variant="h6" color="primary">
                                    {formatPrice(viewingBooking.total_amount)}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)}>Fermer</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}
