import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <h1>Location Site</h1>
                </div>
                <nav className="nav">
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/apartments">Appartements</a></li>
                        <li><a href="/cars">Voitures</a></li>
                        <li><a href="/about">À propos</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
