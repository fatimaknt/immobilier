'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Chip,
    Button,
    TextField,
    InputAdornment,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    CircularProgress,
    useTheme,
    Divider,
    Stack,
} from '@mui/material';
import {
    Search as SearchIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Person as PersonIcon,
    Subject as SubjectIcon,
    Delete as DeleteIcon,
    FilterList as FilterIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    created_at: string;
}

export default function MessagesPage() {
    const theme = useTheme();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        filterMessages();
    }, [filterMessages]);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/contact');
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                setError('Erreur lors du chargement des messages');
            }
        } catch (err) {
            setError('Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    const filterMessages = useCallback(() => {
        let filtered = messages;

        if (searchTerm) {
            filtered = filtered.filter(message =>
                message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                message.message.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(message => message.status === statusFilter);
        }

        setFilteredMessages(filtered);
    }, [messages, searchTerm, statusFilter]);

    const markAsRead = async (messageId: string) => {
        try {
            const response = await fetch(`/api/contact/${messageId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'read' }),
            });

            if (response.ok) {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === messageId ? { ...msg, status: 'read' as const } : msg
                    )
                );
            }
        } catch (err) {
            console.error('Erreur lors de la mise à jour:', err);
        }
    };

    const deleteMessage = async (messageId: string) => {
        try {
            const response = await fetch(`/api/contact/${messageId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessages(prev => prev.filter(msg => msg.id !== messageId));
                setOpenDialog(false);
                setSelectedMessage(null);
            }
        } catch (err) {
            console.error('Erreur lors de la suppression:', err);
        }
    };

    const openMessageDialog = (message: ContactMessage) => {
        setSelectedMessage(message);
        setOpenDialog(true);
        if (message.status === 'new') {
            markAsRead(message.id);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'error';
            case 'read': return 'warning';
            case 'replied': return 'success';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'new': return 'Nouveau';
            case 'read': return 'Lu';
            case 'replied': return 'Répondu';
            default: return 'Inconnu';
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: theme.palette.text.primary }}>
                    📧 Messages de Contact
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                    Gérez les messages reçus via le formulaire de contact
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6} component="div">
                        <TextField
                            fullWidth
                            placeholder="Rechercher dans les messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} component="div">
                        <TextField
                            fullWidth
                            select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'new' | 'read' | 'replied')}
                            SelectProps={{
                                native: true,
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                },
                            }}
                        >
                            <option value="all">Tous les messages</option>
                            <option value="new">Nouveaux</option>
                            <option value="read">Lus</option>
                            <option value="replied">Répondus</option>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={3} component="div">
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={fetchMessages}
                            sx={{
                                borderRadius: 3,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                            }}
                        >
                            Actualiser
                        </Button>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <Chip
                        icon={<FilterIcon />}
                        label={`Total: ${filteredMessages.length}`}
                        color="primary"
                        variant="outlined"
                    />
                    <Chip
                        label={`Nouveaux: ${messages.filter(m => m.status === 'new').length}`}
                        color="error"
                        variant="outlined"
                    />
                    <Chip
                        label={`Lus: ${messages.filter(m => m.status === 'read').length}`}
                        color="warning"
                        variant="outlined"
                    />
                    <Chip
                        label={`Répondus: ${messages.filter(m => m.status === 'replied').length}`}
                        color="success"
                        variant="outlined"
                    />
                </Box>
            </Box>

            {filteredMessages.length === 0 ? (
                <Card sx={{ textAlign: 'center', py: 6 }}>
                    <CardContent>
                        <EmailIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h5" color="text.secondary">
                            Aucun message trouvé
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {searchTerm || statusFilter !== 'all'
                                ? 'Aucun message ne correspond à vos critères de recherche.'
                                : 'Aucun message de contact reçu pour le moment.'}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Grid container spacing={3}>
                    {filteredMessages.map((message) => (
                        <Grid item xs={12} md={6} lg={4} key={message.id} component="div">
                            <Card
                                sx={{
                                    height: '100%',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: message.status === 'new' ? '2px solid' : '1px solid',
                                    borderColor: message.status === 'new' ? 'error.main' : 'divider',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                    },
                                }}
                                onClick={() => openMessageDialog(message)}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                                            {message.name}
                                        </Typography>
                                        <Chip
                                            label={getStatusLabel(message.status)}
                                            color={getStatusColor(message.status)}
                                            size="small"
                                        />
                                    </Box>

                                    <Stack spacing={1} sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {message.email}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {message.phone}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <SubjectIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {message.subject}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Divider sx={{ my: 2 }} />

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            mb: 2,
                                        }}
                                    >
                                        {message.message}
                                    </Typography>

                                    <Typography variant="caption" color="text.secondary">
                                        {formatDate(message.created_at)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Dialog pour afficher le message complet */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Message de {selectedMessage?.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                onClick={() => selectedMessage && deleteMessage(selectedMessage.id)}
                                color="error"
                                size="small"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {selectedMessage && (
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    Informations du contact
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} component="div">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PersonIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                            <Typography variant="body1">
                                                <strong>Nom:</strong> {selectedMessage.name}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} component="div">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EmailIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                            <Typography variant="body1">
                                                <strong>Email:</strong> {selectedMessage.email}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} component="div">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PhoneIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                            <Typography variant="body1">
                                                <strong>Téléphone:</strong> {selectedMessage.phone}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} component="div">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <SubjectIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                            <Typography variant="body1">
                                                <strong>Sujet:</strong> {selectedMessage.subject}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider />

                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Message
                                </Typography>
                                <Box sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {selectedMessage.message}
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography variant="caption" color="text.secondary">
                                Reçu le {formatDate(selectedMessage.created_at)}
                            </Typography>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
