import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <h1>Location Site</h1>
                </div>
                <nav className="nav">
                    <ul>
                        <li><Link href="/">Accueil</Link></li>
                        <li><Link href="/apartments">Appartements</Link></li>
                        <li><Link href="/cars">Voitures</Link></li>
                        <li><Link href="/about">À propos</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
