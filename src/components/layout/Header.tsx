'use client';

import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
    Slide,
    useScrollTrigger,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Apartment as ApartmentIcon,
    DirectionsCar as CarIcon,
    Info as InfoIcon,
    ContactMail as ContactIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface HideOnScrollProps {
    children: React.ReactElement;
}

function HideOnScroll({ children }: HideOnScrollProps) {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Header: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const pathname = usePathname();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const menuItems = [
        { name: 'Accueil', path: '/', icon: <HomeIcon /> },
        { name: 'Appartements', path: '/apartments', icon: <ApartmentIcon /> },
        { name: 'Voitures', path: '/cars', icon: <CarIcon /> },
        { name: 'À propos', path: '/about', icon: <InfoIcon /> },
        { name: 'Contact', path: '/contact', icon: <ContactIcon /> },
    ];

    return (
        <HideOnScroll>
            <AppBar position="fixed" elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 80 } }}>
                        {/* Logo Desktop */}
                        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                <Box
                                    sx={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        mr: 1.5,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                                        }
                                    }}
                                >
                                    <Image
                                        src="/assets/logos/logo.jpeg"
                                        alt="Logo"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        priority
                                    />
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    Résidence Cedo
                                </Typography>
                            </Box>
                        </Link>

                        {/* Menu Mobile */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="primary"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {menuItems.map((item) => (
                                    <MenuItem key={item.name} onClick={handleCloseNavMenu} component={Link} href={item.path}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {item.icon}
                                            <Typography textAlign="center">{item.name}</Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* Logo Mobile */}
                        <Typography
                            variant="h6"
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'block', sm: 'none' },
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                color: 'primary.main',
                                textAlign: 'center',
                            }}
                        >
                            Résidence Cedo
                        </Typography>

                        {/* Menu Desktop */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 1 }}>
                            {menuItems.map((item) => (
                                <Button
                                    key={item.name}
                                    component={Link}
                                    href={item.path}
                                    sx={{
                                        color: pathname === item.path ? 'primary.main' : 'text.primary',
                                        fontWeight: pathname === item.path ? 600 : 500,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        '&:hover': {
                                            backgroundColor: 'primary.50',
                                            color: 'primary.main',
                                            transform: 'translateY(-1px)',
                                        },
                                        '&::after': pathname === item.path ? {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '60%',
                                            height: 3,
                                            backgroundColor: 'primary.main',
                                            borderRadius: '2px 2px 0 0',
                                        } : {},
                                    }}
                                    startIcon={item.icon}
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </Box>

                        {/* CTA Button */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                component={Link}
                                href="/booking"
                                variant="contained"
                                sx={{
                                    borderRadius: 3,
                                    px: 3,
                                    py: 1.5,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                    boxShadow: '0 4px 15px rgba(25, 118, 210, 0.4)',
                                    '&:hover': {
                                        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.6)',
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                Réserver
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </HideOnScroll>
    );
};

export default Header;
