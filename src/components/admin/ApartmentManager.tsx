import React, { useState } from 'react';
import { Apartment } from '../../types';

interface ApartmentManagerProps {
    apartments: Apartment[];
    onAddApartment: (apartment: Omit<Apartment, 'id'>) => void;
    onUpdateApartment: (id: string, apartment: Partial<Apartment>) => void;
    onDeleteApartment: (id: string) => void;
}

const ApartmentManager: React.FC<ApartmentManagerProps> = ({
    apartments,
    onAddApartment,
    onUpdateApartment,
    onDeleteApartment
}) => {
    const [showForm, setShowForm] = useState(false);
    const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        size: '',
        images: [] as string[]
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const apartmentData = {
            ...formData,
            price: parseInt(formData.price),
            bedrooms: parseInt(formData.bedrooms),
            bathrooms: parseInt(formData.bathrooms),
            size: parseInt(formData.size)
        };

        if (editingApartment) {
            onUpdateApartment(editingApartment.id, apartmentData);
        } else {
            onAddApartment(apartmentData);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            location: '',
            price: '',
            bedrooms: '',
            bathrooms: '',
            size: '',
            images: []
        });
        setEditingApartment(null);
        setShowForm(false);
    };

    const handleEdit = (apartment: Apartment) => {
        setFormData({
            title: apartment.title,
            description: apartment.description,
            location: apartment.location,
            price: apartment.price.toString(),
            bedrooms: apartment.bedrooms.toString(),
            bathrooms: apartment.bathrooms.toString(),
            size: apartment.size.toString(),
            images: apartment.images
        });
        setEditingApartment(apartment);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet appartement ?')) {
            onDeleteApartment(id);
        }
    };

    return (
        <div className="apartment-manager">
            <div className="manager-header">
                <h2>Gestion des appartements</h2>
                <button
                    className="add-btn"
                    onClick={() => setShowForm(true)}
                >
                    Ajouter un appartement
                </button>
            </div>

            {showForm && (
                <div className="form-modal">
                    <div className="form-content">
                        <h3>{editingApartment ? 'Modifier' : 'Ajouter'} un appartement</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Titre</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Localisation</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="price">Prix (€/mois)</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="size">Surface (m²)</label>
                                    <input
                                        type="number"
                                        id="size"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="bedrooms">Chambres</label>
                                    <input
                                        type="number"
                                        id="bedrooms"
                                        name="bedrooms"
                                        value={formData.bedrooms}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="bathrooms">Salles de bain</label>
                                    <input
                                        type="number"
                                        id="bathrooms"
                                        name="bathrooms"
                                        value={formData.bathrooms}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="submit-btn">
                                    {editingApartment ? 'Mettre à jour' : 'Ajouter'}
                                </button>
                                <button type="button" onClick={resetForm} className="cancel-btn">
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="apartments-list">
                <div className="list-header">
                    <span>Appartements ({apartments.length})</span>
                </div>

                <div className="apartments-grid">
                    {apartments.map((apartment) => (
                        <div key={apartment.id} className="apartment-item">
                            <div className="apartment-info">
                                <h4>{apartment.title}</h4>
                                <p>{apartment.location}</p>
                                <p>{apartment.price}€/mois</p>
                            </div>
                            <div className="apartment-actions">
                                <button onClick={() => handleEdit(apartment)} className="edit-btn">
                                    Modifier
                                </button>
                                <button onClick={() => handleDelete(apartment.id)} className="delete-btn">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ApartmentManager;
