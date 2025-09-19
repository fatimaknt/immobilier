import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Location Site</h3>
                        <p>Votre partenaire de confiance pour la location d'appartements et de voitures.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Liens rapides</h4>
                        <ul>
                            <li><a href="/apartments">Appartements</a></li>
                            <li><a href="/cars">Voitures</a></li>
                            <li><a href="/about">À propos</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p>Email: contact@locationsite.com</p>
                        <p>Téléphone: +33 1 23 45 67 89</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Location Site. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
