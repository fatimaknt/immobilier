import React, { useState } from 'react';
import { Car } from '../../types';

interface CarManagerProps {
    cars: Car[];
    onAddCar: (car: Omit<Car, 'id'>) => void;
    onUpdateCar: (id: string, car: Partial<Car>) => void;
    onDeleteCar: (id: string) => void;
}

const CarManager: React.FC<CarManagerProps> = ({
    cars,
    onAddCar,
    onUpdateCar,
    onDeleteCar
}) => {
    const [showForm, setShowForm] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        fuelType: '',
        transmission: '',
        seats: '',
        pricePerDay: '',
        description: '',
        available: true,
        images: [] as string[]
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const carData = {
            ...formData,
            year: parseInt(formData.year),
            seats: parseInt(formData.seats),
            pricePerDay: parseInt(formData.pricePerDay)
        };

        if (editingCar) {
            onUpdateCar(editingCar.id, carData);
        } else {
            onAddCar(carData);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            brand: '',
            model: '',
            year: '',
            fuelType: '',
            transmission: '',
            seats: '',
            pricePerDay: '',
            description: '',
            available: true,
            images: []
        });
        setEditingCar(null);
        setShowForm(false);
    };

    const handleEdit = (car: Car) => {
        setFormData({
            brand: car.brand,
            model: car.model,
            year: car.year.toString(),
            fuelType: car.fuelType,
            transmission: car.transmission,
            seats: car.seats.toString(),
            pricePerDay: car.pricePerDay.toString(),
            description: car.description,
            available: car.available,
            images: car.images
        });
        setEditingCar(car);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
            onDeleteCar(id);
        }
    };

    return (
        <div className="car-manager">
            <div className="manager-header">
                <h2>Gestion des voitures</h2>
                <button
                    className="add-btn"
                    onClick={() => setShowForm(true)}
                >
                    Ajouter une voiture
                </button>
            </div>

            {showForm && (
                <div className="form-modal">
                    <div className="form-content">
                        <h3>{editingCar ? 'Modifier' : 'Ajouter'} une voiture</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="brand">Marque</label>
                                    <input
                                        type="text"
                                        id="brand"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="model">Modèle</label>
                                    <input
                                        type="text"
                                        id="model"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="year">Année</label>
                                    <input
                                        type="number"
                                        id="year"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                        min="1900"
                                        max="2024"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seats">Nombre de places</label>
                                    <input
                                        type="number"
                                        id="seats"
                                        name="seats"
                                        value={formData.seats}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="9"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="fuelType">Type de carburant</label>
                                    <select
                                        id="fuelType"
                                        name="fuelType"
                                        value={formData.fuelType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Sélectionner</option>
                                        <option value="Essence">Essence</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Électrique">Électrique</option>
                                        <option value="Hybride">Hybride</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="transmission">Transmission</label>
                                    <select
                                        id="transmission"
                                        name="transmission"
                                        value={formData.transmission}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Sélectionner</option>
                                        <option value="Manuelle">Manuelle</option>
                                        <option value="Automatique">Automatique</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="pricePerDay">Prix par jour (€)</label>
                                <input
                                    type="number"
                                    id="pricePerDay"
                                    name="pricePerDay"
                                    value={formData.pricePerDay}
                                    onChange={handleInputChange}
                                    min="0"
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
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="available"
                                        checked={formData.available}
                                        onChange={handleInputChange}
                                    />
                                    Disponible
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="submit-btn">
                                    {editingCar ? 'Mettre à jour' : 'Ajouter'}
                                </button>
                                <button type="button" onClick={resetForm} className="cancel-btn">
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="cars-list">
                <div className="list-header">
                    <span>Voitures ({cars.length})</span>
                </div>

                <div className="cars-grid">
                    {cars.map((car) => (
                        <div key={car.id} className="car-item">
                            <div className="car-info">
                                <h4>{car.brand} {car.model}</h4>
                                <p>Année: {car.year}</p>
                                <p>{car.pricePerDay}€/jour</p>
                                <span className={`status ${car.available ? 'available' : 'unavailable'}`}>
                                    {car.available ? 'Disponible' : 'Indisponible'}
                                </span>
                            </div>
                            <div className="car-actions">
                                <button onClick={() => handleEdit(car)} className="edit-btn">
                                    Modifier
                                </button>
                                <button onClick={() => handleDelete(car.id)} className="delete-btn">
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

export default CarManager;
