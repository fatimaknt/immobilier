-- Script pour créer/corriger la table des réservations
-- Exécuter ce script si la table bookings n'existe pas ou a des erreurs

-- Supprimer la table si elle existe (ATTENTION: cela supprimera toutes les données)
-- DROP TABLE IF EXISTS bookings;

-- Créer la table des réservations
CREATE TABLE
IF NOT EXISTS bookings
(
    id UUID DEFAULT uuid_generate_v4
() PRIMARY KEY,
    type VARCHAR
(20) NOT NULL CHECK
(type IN
('apartment', 'car')),
    entity_id UUID NOT NULL,
    user_name VARCHAR
(255) NOT NULL,
    user_email VARCHAR
(255) NOT NULL,
    user_phone VARCHAR
(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_amount DECIMAL
(10,2) NOT NULL CHECK
(total_amount > 0),
    status VARCHAR
(20) DEFAULT 'pending' CHECK
(status IN
('pending', 'confirmed', 'cancelled')),
    payment_method VARCHAR
(100) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP
WITH TIME ZONE DEFAULT NOW
()
);

-- Créer les index pour améliorer les performances
CREATE INDEX
IF NOT EXISTS idx_bookings_status ON bookings
(status);
CREATE INDEX
IF NOT EXISTS idx_bookings_dates ON bookings
(start_date, end_date);
CREATE INDEX
IF NOT EXISTS idx_bookings_type ON bookings
(type);
CREATE INDEX
IF NOT EXISTS idx_bookings_created_at ON bookings
(created_at);

-- Insérer quelques données de test (optionnel)
-- INSERT INTO bookings (type, entity_id, user_name, user_email, user_phone, start_date, end_date, total_amount, payment_method, notes) VALUES
-- ('apartment', '123e4567-e89b-12d3-a456-426614174000', 'Jean Dupont', 'jean@example.com', '+221701234567', '2024-01-15', '2024-01-20', 50000, 'whatsapp', 'Réservation test'),
-- ('car', '123e4567-e89b-12d3-a456-426614174001', 'Marie Martin', 'marie@example.com', '+221701234568', '2024-01-16', '2024-01-18', 30000, 'whatsapp', 'Location voiture test');
