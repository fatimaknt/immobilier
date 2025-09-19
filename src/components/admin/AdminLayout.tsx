import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const router = useRouter();

    const menuItems = [
        { path: '/admin', label: 'Tableau de bord', icon: '📊' },
        { path: '/admin/apartments', label: 'Appartements', icon: '🏠' },
        { path: '/admin/cars', label: 'Voitures', icon: '🚗' },
        { path: '/admin/reservations', label: 'Réservations', icon: '📅' },
        { path: '/admin/users', label: 'Utilisateurs', icon: '👥' },
        { path: '/admin/settings', label: 'Paramètres', icon: '⚙️' },
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
                                    <span className="nav-icon">{item.icon}</span>
                                    <span className="nav-label">{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <span className="nav-icon">🚪</span>
                        <span className="nav-label">Déconnexion</span>
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-content">
                        <h1>Panneau d'administration</h1>
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
