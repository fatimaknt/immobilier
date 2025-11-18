import React, { useState } from 'react';

interface ContactFormProps {
    onSubmit: (contactData: ContactData) => void;
}

interface ContactData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<ContactData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="contact-form">
            <h3>Nous contacter</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nom complet *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Téléphone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Sujet *</label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="apartment">Demande d&apos;appartement</option>
                        <option value="car">Demande de voiture</option>
                        <option value="general">Question générale</option>
                        <option value="complaint">Réclamation</option>
                        <option value="other">Autre</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder="Décrivez votre demande en détail..."
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Envoyer le message
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
