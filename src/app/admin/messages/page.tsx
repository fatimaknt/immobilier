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
    Home as HomeIcon,
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

    const fetchMessages = async () => {
        try {
            console.log('🔄 Début du chargement des messages...');
            setLoading(true);
            setError('');

            const response = await fetch('/api/contact');
            console.log('📡 Réponse API:', response.status, response.ok);

            if (response.ok) {
                const data = await response.json();
                console.log('📨 Messages reçus:', data);
                console.log('📊 Nombre de messages:', data.length);
                setMessages(data);
            } else {
                const errorData = await response.json();
                console.error('❌ Erreur API:', errorData);
                setError(`Erreur lors du chargement des messages: ${errorData.error || 'Erreur inconnue'}`);
            }
        } catch (err) {
            console.error('❌ Erreur lors du chargement des messages:', err);
            setError('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
            console.log('✅ Chargement terminé');
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

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        filterMessages();
    }, [filterMessages]);

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

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
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
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '25%' } }}>
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
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '25%' } }}>
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
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <Chip
                        icon={<FilterIcon />}
                        label={`Total: ${messages.length} messages`}
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
                    <Chip
                        label={`Affichés: ${filteredMessages.length}`}
                        color="info"
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
                        <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Debug: Total messages: {messages.length} | Filtres: {filteredMessages.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Status: {loading ? 'Chargement...' : 'Terminé'} | Erreur: {error || 'Aucune'}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
                    {filteredMessages.map((message) => (
                        <Box key={message.id}>
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
                        </Box>
                    ))}
                </Box>
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
                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PersonIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                            <Typography variant="body1">
                                                <strong>Nom:</strong> {selectedMessage.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EmailIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                            <Typography variant="body1">
                                                <strong>Email:</strong> {selectedMessage.email}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PhoneIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                            <Typography variant="body1">
                                                <strong>Téléphone:</strong> {selectedMessage.phone}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <SubjectIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                            <Typography variant="body1">
                                                <strong>Sujet:</strong> {selectedMessage.subject}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
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

                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    💰 Tarifs disponibles
                                </Typography>
                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
                                    <Box>
                                        <Box sx={{ p: 2, backgroundColor: 'primary.50', borderRadius: 2, border: '1px solid', borderColor: 'primary.200' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <HomeIcon /> Appartements
                                                </Box>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                • Studio: 15,000 - 20,000 FCFA/jour
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                • 2-3 pièces: 18,000 - 30,000 FCFA/jour
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                • 4+ pièces: 30,000 - 60,000 FCFA/jour
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box sx={{ p: 2, backgroundColor: 'secondary.50', borderRadius: 2, border: '1px solid', borderColor: 'secondary.200' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'secondary.main', mb: 1 }}>
                                                🚗 Voitures
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                • Compact: 25,000 - 30,000 FCFA/jour
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                • SUV: 30,000 - 50,000 FCFA/jour
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                • Premium: 50,000 - 65,000 FCFA/jour
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Typography variant="caption" color="text.secondary">
                                Reçu le {formatDate(selectedMessage.created_at)}
                            </Typography>
                        </Stack>
                    )
                    }
                </DialogContent >
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog >
        </Container >
    );
}
