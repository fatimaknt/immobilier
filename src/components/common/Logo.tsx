'use client';

import React from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showText?: boolean;
    variant?: 'default' | 'white' | 'gradient';
}

const Logo: React.FC<LogoProps> = ({
    size = 'md',
    showText = true,
    variant = 'default'
}) => {
    const theme = useTheme();

    const sizeConfig = {
        sm: {
            logoSize: 40,
            textSize: '1rem',
            subtextSize: '0.75rem',
            spacing: 1.5
        },
        md: {
            logoSize: 50,
            textSize: '1.25rem',
            subtextSize: '0.8rem',
            spacing: 2
        },
        lg: {
            logoSize: 60,
            textSize: '1.5rem',
            subtextSize: '0.85rem',
            spacing: 2.5
        },
        xl: {
            logoSize: 80,
            textSize: '2rem',
            subtextSize: '0.9rem',
            spacing: 3
        }
    };

    const config = sizeConfig[size];

    const getLogoContainerStyles = () => {
        const baseStyles = {
            width: config.logoSize,
            height: config.logoSize,
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative' as const,
            background: `linear-gradient(135deg, #1e88e5 0%, #9c27b0 100%)`,
            boxShadow: `0 8px 25px ${alpha('#1e88e5', 0.4)}`,
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: `0 12px 35px ${alpha('#1e88e5', 0.9)}`,
            }
        };

        switch (variant) {
            case 'white':
                return {
                    ...baseStyles,
                    border: `3px solid white`,
                    boxShadow: `0 8px 25px ${alpha('#ffffff', 0.3)}`,
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: `0 12px 35px ${alpha('#ffffff', 0.5)}`,
                    }
                };
            default:
                return baseStyles;
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'white':
                return 'white';
            default:
                return 'text.primary';
        }
    };

    return (
        <Link href="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: config.spacing }}>
                <Box sx={getLogoContainerStyles()}>
                    <Image
                        src="/assets/logos/logo.jpeg"
                        alt="Location Pro Logo"
                        fill
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                        priority
                    />
                </Box>
                {showText && (
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                fontSize: config.textSize,
                                color: getTextColor(),
                                lineHeight: 1.2,
                                letterSpacing: '-0.02em',
                                background: variant === 'gradient'
                                    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                                    : 'transparent',
                                backgroundClip: variant === 'gradient' ? 'text' : 'initial',
                                WebkitBackgroundClip: variant === 'gradient' ? 'text' : 'initial',
                                WebkitTextFillColor: variant === 'gradient' ? 'transparent' : 'inherit',
                            }}
                        >
                            Résidence Cedo
                        </Typography>
                        {(size === 'lg' || size === 'xl') && (
                            <Typography
                                sx={{
                                    fontSize: config.subtextSize,
                                    color: variant === 'white' ? alpha('#ffffff', 0.7) : 'text.secondary',
                                    fontWeight: 500,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    lineHeight: 1,
                                }}
                            >
                                Dakar Location Services
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
        </Link>
    );
};

export default Logo;
