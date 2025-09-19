'use client';

import { createTheme } from '@mui/material/styles';
import { Roboto, Poppins } from 'next/font/google';

// Fonts
const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Couleurs personnalisées
const colors = {
    primary: {
        50: '#e3f2fd',
        100: '#bbdefb',
        200: '#90caf9',
        300: '#64b5f6',
        400: '#42a5f5',
        500: '#2196f3',
        600: '#1e88e5',
        700: '#1976d2',
        800: '#1565c0',
        900: '#0d47a1',
    },
    secondary: {
        50: '#f3e5f5',
        100: '#e1bee7',
        200: '#ce93d8',
        300: '#ba68c8',
        400: '#ab47bc',
        500: '#9c27b0',
        600: '#8e24aa',
        700: '#7b1fa2',
        800: '#6a1b9a',
        900: '#4a148c',
    },
    success: {
        50: '#e8f5e8',
        100: '#c8e6c9',
        200: '#a5d6a7',
        300: '#81c784',
        400: '#66bb6a',
        500: '#4caf50',
        600: '#43a047',
        700: '#388e3c',
        800: '#2e7d32',
        900: '#1b5e20',
    },
    warning: {
        50: '#fff8e1',
        100: '#ffecb3',
        200: '#ffe082',
        300: '#ffd54f',
        400: '#ffca28',
        500: '#ffc107',
        600: '#ffb300',
        700: '#ffa000',
        800: '#ff8f00',
        900: '#ff6f00',
    },
    error: {
        50: '#ffebee',
        100: '#ffcdd2',
        200: '#ef9a9a',
        300: '#e57373',
        400: '#ef5350',
        500: '#f44336',
        600: '#e53935',
        700: '#d32f2f',
        800: '#c62828',
        900: '#b71c1c',
    }
};

// Créer le thème Material-UI
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: colors.primary[600],
            light: colors.primary[300],
            dark: colors.primary[800],
            contrastText: '#ffffff',
        },
        secondary: {
            main: colors.secondary[500],
            light: colors.secondary[300],
            dark: colors.secondary[700],
            contrastText: '#ffffff',
        },
        success: {
            main: colors.success[500],
            light: colors.success[300],
            dark: colors.success[700],
        },
        warning: {
            main: colors.warning[500],
            light: colors.warning[300],
            dark: colors.warning[700],
        },
        error: {
            main: colors.error[500],
            light: colors.error[300],
            dark: colors.error[700],
        },
        grey: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
        },
        background: {
            default: '#fafafa',
            paper: '#ffffff',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
        },
    },
    typography: {
        fontFamily: [
            poppins.style.fontFamily,
            roboto.style.fontFamily,
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontFamily: poppins.style.fontFamily,
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.2,
            letterSpacing: '-0.01562em',
        },
        h2: {
            fontFamily: poppins.style.fontFamily,
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: 1.2,
            letterSpacing: '-0.00833em',
        },
        h3: {
            fontFamily: poppins.style.fontFamily,
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.2,
            letterSpacing: '0em',
        },
        h4: {
            fontFamily: poppins.style.fontFamily,
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.2,
            letterSpacing: '0.00735em',
        },
        h5: {
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.2,
            letterSpacing: '0em',
        },
        h6: {
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: '1.125rem',
            lineHeight: 1.2,
            letterSpacing: '0.0075em',
        },
        body1: {
            fontFamily: roboto.style.fontFamily,
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
        },
        body2: {
            fontFamily: roboto.style.fontFamily,
            fontSize: '0.875rem',
            lineHeight: 1.43,
            letterSpacing: '0.01071em',
        },
        button: {
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.75,
            letterSpacing: '0.02857em',
            textTransform: 'none',
        },
    },
    shape: {
        borderRadius: 12,
    },
    spacing: 8,
    shadows: [
        'none',
        '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
        '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
        '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
        '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
        '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
        '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
        '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
        '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
        '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
        '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
        '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
        '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
        '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
        '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
        '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
        '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
        '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
        '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
        '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
        '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
        '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
        '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
        '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
        '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    padding: '12px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                        transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.3s ease-in-out',
                },
                containedPrimary: {
                    background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[700]} 100%)`,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[800]} 100%)`,
                    },
                },
                containedSecondary: {
                    background: `linear-gradient(135deg, ${colors.secondary[500]} 0%, ${colors.secondary[700]} 100%)`,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${colors.secondary[600]} 0%, ${colors.secondary[800]} 100%)`,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)',
                        transform: 'translateY(-4px)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: colors.primary[400],
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: colors.primary[600],
                            borderWidth: 2,
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    fontWeight: 500,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    color: colors.primary[800],
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
                },
            },
        },
    },
});

export default theme;
