import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import {
    Dashboard as DashboardIcon,
    Apartment as ApartmentIcon,
    DirectionsCar as CarIcon,
    CalendarToday as CalendarIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    ExitToApp as LogoutIcon,
} from '@mui/icons-material';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const router = useRouter();

    const menuItems = [
        { path: '/admin', label: 'Tableau de bord', icon: <DashboardIcon /> },
        { path: '/admin/apartments', label: 'Appartements', icon: <ApartmentIcon /> },
        { path: '/admin/cars', label: 'Voitures', icon: <CarIcon /> },
        { path: '/admin/reservations', label: 'Réservations', icon: <CalendarIcon /> },
        { path: '/admin/users', label: 'Utilisateurs', icon: <PeopleIcon /> },
        { path: '/admin/settings', label: 'Paramètres', icon: <SettingsIcon /> },
    ];

    const isActivePath = (path: string) => {
        return router.pathname === path;
    };

    const handleLogout = () => {
        // Implement logout logic
        console.log('Logout');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>Administration</h2>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <a
                                    href={item.path}
                                    className={`nav-item ${isActivePath(item.path) ? 'active' : ''}`}
                                >
                                    <span className="nav-icon" style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                                    <span className="nav-label">{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <span className="nav-icon" style={{ display: 'flex', alignItems: 'center' }}><LogoutIcon /></span>
                        <span className="nav-label">Déconnexion</span>
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-content">
                        <h1>Panneau d&apos;administration</h1>
                        <div className="header-actions">
                            <span className="admin-user">Admin User</span>
                        </div>
                    </div>
                </header>

                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
