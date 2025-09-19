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
    Tooltip,
    Alert,
    Card,
    CardContent,
    InputAdornment,
    Stack,
    Badge,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Visibility as ViewIcon,
    BookOnline as BookingIcon,
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    CheckCircle as ConfirmIcon,
    Cancel as CancelIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { Booking } from '@/types';

export default function AdminBookings() {
    const theme = useTheme();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [newBookingsCount, setNewBookingsCount] = useState(0);

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
                setBookings(data);
                const newCount = data.filter((booking: Booking) =>
                    booking.status === 'pending' &&
                    new Date(booking.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                ).length;
                setNewBookingsCount(newCount);
            } else {
                console.error('Erreur lors du chargement des réservations:', data.error);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des réservations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (booking: Booking) => {
        setEditingBooking(booking);
        setDialogOpen(true);
    };

    const handleView = (booking: Booking) => {
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

    const handleInputChange = (field: keyof Booking, value: any) => {
        if (editingBooking) {
            setEditingBooking({ ...editingBooking, [field]: value });
        }
    };

    const handleSave = async () => {
        if (!editingBooking) return;

        try {
            const response = await fetch(`/api/bookings/${editingBooking.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingBooking),
            });

            if (response.ok) {
                setBookings(bookings.map(booking =>
                    booking.id === editingBooking.id ? editingBooking : booking
                ));
                setDialogOpen(false);
                setEditingBooking(null);
            } else {
                const errorData = await response.json();
                alert(`Erreur lors de la sauvegarde: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            alert('Erreur lors de la sauvegarde des modifications');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'warning';
            case 'confirmed': return 'success';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return 'En attente';
            case 'confirmed': return 'Confirmée';
            case 'cancelled': return 'Annulée';
            default: return status;
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
            booking.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.user_phone.includes(searchTerm);

        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        const matchesType = typeFilter === 'all' || booking.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
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
            <Container maxWidth="xl" sx={{ py: 4 }}>
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
                        {newBookingsCount > 0 && (
                            <Badge badgeContent={newBookingsCount} color="error">
                                <Alert severity="info" sx={{ mb: 0 }}>
                                    {newBookingsCount} nouvelle(s) réservation(s)
                                </Alert>
                            </Badge>
                        )}
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
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={4}>
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
                            </Grid>
                            <Grid item xs={12} md={3}>
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
                            </Grid>
                            <Grid item xs={12} md={3}>
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
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Typography variant="body2" color="text.secondary">
                                    {filteredBookings.length} réservation(s)
                                </Typography>
                            </Grid>
                        </Grid>
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
                                            label={getStatusLabel(booking.status)}
                                            color={getStatusColor(booking.status) as any}
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
                                            <Tooltip title="Modifier">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEdit(booking)}
                                                >
                                                    <EditIcon />
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
                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            <Grid item xs={12} md={6}>
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
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" gutterBottom>Réservation</Typography>
                                <Typography variant="body1" gutterBottom>
                                    {viewingBooking.type === 'apartment' ? 'Appartement' : 'Voiture'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ID: {viewingBooking.entity_id}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" gutterBottom>Période</Typography>
                                <Typography variant="body1">
                                    Du {formatDate(viewingBooking.start_date)}
                                </Typography>
                                <Typography variant="body1">
                                    Au {formatDate(viewingBooking.end_date)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" gutterBottom>Montant</Typography>
                                <Typography variant="h6" color="primary">
                                    {formatPrice(viewingBooking.total_amount)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" gutterBottom>Notes</Typography>
                                <Typography variant="body1">
                                    {viewingBooking.notes || 'Aucune note'}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)}>Fermer</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Modifier la réservation</DialogTitle>
                <DialogContent>
                    {editingBooking && (
                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Nom du client"
                                    value={editingBooking.user_name}
                                    onChange={(e) => handleInputChange('user_name', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={editingBooking.user_email}
                                    onChange={(e) => handleInputChange('user_email', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Téléphone"
                                    value={editingBooking.user_phone}
                                    onChange={(e) => handleInputChange('user_phone', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Statut</InputLabel>
                                    <Select
                                        value={editingBooking.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        label="Statut"
                                    >
                                        <MenuItem value="pending">En attente</MenuItem>
                                        <MenuItem value="confirmed">Confirmée</MenuItem>
                                        <MenuItem value="cancelled">Annulée</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Date de début"
                                    type="date"
                                    value={editingBooking.start_date}
                                    onChange={(e) => handleInputChange('start_date', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Date de fin"
                                    type="date"
                                    value={editingBooking.end_date}
                                    onChange={(e) => handleInputChange('end_date', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Montant total"
                                    type="number"
                                    value={editingBooking.total_amount}
                                    onChange={(e) => handleInputChange('total_amount', parseFloat(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Méthode de paiement"
                                    value={editingBooking.payment_method}
                                    onChange={(e) => handleInputChange('payment_method', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Notes"
                                    multiline
                                    rows={3}
                                    value={editingBooking.notes || ''}
                                    onChange={(e) => handleInputChange('notes', e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
                    <Button onClick={handleSave} variant="contained">Sauvegarder</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
