'use client';

import React from 'react';
import { Fab, Tooltip, useTheme, alpha, Zoom } from '@mui/material';
import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';

const WhatsAppFab: React.FC = () => {
    const theme = useTheme();

    const handleWhatsAppClick = () => {
        const phoneNumber = '+221784929439';
        const message = encodeURIComponent('Bonjour, je souhaite obtenir plus d\'informations sur vos services de location.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Zoom in timeout={1000}>
            <Tooltip title="Contactez-nous sur WhatsApp" placement="left">
                <Fab
                    onClick={handleWhatsAppClick}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        backgroundColor: '#25D366',
                        color: 'white',
                        width: 64,
                        height: 64,
                        boxShadow: `0 8px 25px ${alpha('#25D366', 0.4)}`,
                        animation: 'pulse 2s infinite',
                        zIndex: 1000,
                        '&:hover': {
                            backgroundColor: '#1DA851',
                            boxShadow: `0 12px 35px ${alpha('#25D366', 0.6)}`,
                            transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                        '@keyframes pulse': {
                            '0%': {
                                boxShadow: `0 0 0 0 ${alpha('#25D366', 0.7)}`,
                            },
                            '70%': {
                                boxShadow: `0 0 0 10px ${alpha('#25D366', 0)}`,
                            },
                            '100%': {
                                boxShadow: `0 0 0 0 ${alpha('#25D366', 0)}`,
                            },
                        },
                    }}
                    aria-label="Contacter via WhatsApp"
                >
                    <WhatsAppIcon sx={{ fontSize: 32 }} />
                </Fab>
            </Tooltip>
        </Zoom>
    );
};

export default WhatsAppFab;