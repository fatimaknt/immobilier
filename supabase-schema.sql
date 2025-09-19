-- Script SQL pour initialiser la base de données Supabase
-- Résidence Cedo - Dashboard Admin

-- Extension pour UUID
CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";

-- Table des appartements
CREATE TABLE
IF NOT EXISTS apartments
(
    id UUID DEFAULT uuid_generate_v4
() PRIMARY KEY,
    title VARCHAR
(255) NOT NULL,
    description TEXT NOT NULL,
    zone VARCHAR
(50) NOT NULL CHECK
(zone IN
('Cité Mixta', 'Ouest-foire', 'Cité Kalia')),
    address TEXT NOT NULL,
    rooms INTEGER NOT NULL CHECK
(rooms > 0),
    bathrooms INTEGER NOT NULL CHECK
(bathrooms > 0),
    surface INTEGER NOT NULL CHECK
(surface > 0),
    price_per_day DECIMAL
(10,2) NOT NULL CHECK
(price_per_day > 0),
    price_per_week DECIMAL
(10,2) NOT NULL CHECK
(price_per_week > 0),
    available BOOLEAN DEFAULT true,
    equipment JSONB DEFAULT '[]'::jsonb,
    coordinates JSONB NOT NULL DEFAULT '{"lat": 0, "lng": 0}'::jsonb,
    created_at TIMESTAMP
WITH TIME ZONE DEFAULT NOW
(),
    updated_at TIMESTAMP
WITH TIME ZONE DEFAULT NOW
()
);

-- Table des voitures
CREATE TABLE
IF NOT EXISTS cars
(
    id UUID DEFAULT uuid_generate_v4
() PRIMARY KEY,
    brand VARCHAR
(100) NOT NULL,
    model VARCHAR
(100) NOT NULL,
    year INTEGER NOT NULL CHECK
(year > 1900),
    type VARCHAR
(100) NOT NULL,
    transmission VARCHAR
(50) NOT NULL CHECK
(transmission IN
('Manuel', 'Automatique')),
    seats INTEGER NOT NULL CHECK
(seats > 0),
    price_per_day DECIMAL
(10,2) NOT NULL CHECK
(price_per_day > 0),
    available BOOLEAN DEFAULT true,
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP
WITH TIME ZONE DEFAULT NOW
(),
    updated_at TIMESTAMP
WITH TIME ZONE DEFAULT NOW
()
);

-- Table des images
CREATE TABLE
IF NOT EXISTS images
(
    id UUID DEFAULT uuid_generate_v4
() PRIMARY KEY,
    entity_type VARCHAR
(20) NOT NULL CHECK
(entity_type IN
('apartment', 'car')),
    entity_id UUID NOT NULL,
    url TEXT NOT NULL,
    alt_text VARCHAR
(255) NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP
WITH TIME ZONE DEFAULT NOW
()
);

-- Table des réservations
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

-- Table des messages de contact
CREATE TABLE
IF NOT EXISTS contact_messages
(
    id UUID DEFAULT uuid_generate_v4
() PRIMARY KEY,
    name VARCHAR
(255) NOT NULL,
    email VARCHAR
(255) NOT NULL,
    phone VARCHAR
(50) NOT NULL,
    subject VARCHAR
(255) NOT NULL,
    message TEXT NOT NULL,
    attachment_url TEXT,
    status VARCHAR
(20) DEFAULT 'new' CHECK
(status IN
('new', 'read', 'replied')),
    created_at TIMESTAMP
WITH TIME ZONE DEFAULT NOW
()
);

-- Table des témoignages
CREATE TABLE
IF NOT EXISTS testimonials
(
    id UUID DEFAULT uuid_generate_v4
() PRIMARY KEY,
    name VARCHAR
(255) NOT NULL,
    comment TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK
(rating >= 1 AND rating <= 5),
    type VARCHAR
(20) NOT NULL CHECK
(type IN
('apartment', 'car')),
    date DATE NOT NULL,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP
WITH TIME ZONE DEFAULT NOW
()
);

-- Index pour améliorer les performances
CREATE INDEX
IF NOT EXISTS idx_apartments_zone ON apartments
(zone);
CREATE INDEX
IF NOT EXISTS idx_apartments_available ON apartments
(available);
CREATE INDEX
IF NOT EXISTS idx_cars_brand ON cars
(brand);
CREATE INDEX
IF NOT EXISTS idx_cars_available ON cars
(available);
CREATE INDEX
IF NOT EXISTS idx_images_entity ON images
(entity_type, entity_id);
CREATE INDEX
IF NOT EXISTS idx_bookings_status ON bookings
(status);
CREATE INDEX
IF NOT EXISTS idx_bookings_dates ON bookings
(start_date, end_date);
CREATE INDEX
IF NOT EXISTS idx_contact_status ON contact_messages
(status);
CREATE INDEX
IF NOT EXISTS idx_testimonials_approved ON testimonials
(approved);

-- Triggers pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column
()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW
();
RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_apartments_updated_at BEFORE
UPDATE ON apartments
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column
();

CREATE TRIGGER update_cars_updated_at BEFORE
UPDATE ON cars
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column
();

-- Données d'exemple pour les appartements
INSERT INTO apartments
    (title, description, zone, address, rooms, bathrooms, surface, price_per_day, price_per_week, available, equipment, coordinates)
VALUES
    ('Appartement moderne Cité Mixta', 'Bel appartement moderne avec vue sur la mer', 'Cité Mixta', '123 Avenue de la République, Cité Mixta', 2, 1, 65, 25000, 150000, true, '["WiFi", "Climatisation", "TV", "Cuisine équipée"]', '{"lat": 14.716677, "lng": -17.467686}'),
    ('Studio confortable Ouest-foire', 'Studio récemment rénové en centre-ville', 'Ouest-foire', '456 Rue de la Paix, Ouest-foire', 1, 1, 35, 20000, 120000, true, '["WiFi", "Climatisation", "TV", "Kitchenette"]', '{"lat": 14.715677, "lng": -17.475686}'),
    ('Appartement familial Cité Kalia', 'Grand appartement parfait pour les familles', 'Cité Kalia', '789 Boulevard du Centenaire, Cité Kalia', 3, 2, 85, 35000, 210000, true, '["WiFi", "Climatisation", "TV", "Cuisine équipée", "Balcon"]', '{"lat": 14.720677, "lng": -17.460686}')
ON CONFLICT DO NOTHING;

-- Données d'exemple pour les voitures
INSERT INTO cars
    (brand, model, year, type, transmission, seats, price_per_day, available, features)
VALUES
    ('KIA', 'CARNIVAL LIMOUSINE', 2023, 'Minibus', 'Automatique', 8, 75000, true, '["Climatisation", "GPS", "Bluetooth", "Sièges en cuir"]'),
    ('KIA', 'CARNIVAL SIMPLE', 2022, 'Minibus', 'Automatique', 7, 65000, true, '["Climatisation", "GPS", "Bluetooth"]'),
    ('HYUNDAI', 'STEREX', 2023, 'Minibus', 'Automatique', 9, 70000, true, '["Climatisation", "GPS", "Bluetooth", "Sièges en cuir"]'),
    ('Renault', 'QM3', 2022, 'SUV', 'Manuel', 5, 45000, true, '["Climatisation", "GPS", "Bluetooth"]'),
    ('Chevrolet', 'CAMARO', 2023, 'Sport', 'Automatique', 4, 85000, true, '["Climatisation", "GPS", "Bluetooth", "Sièges sport"]'),
    ('Toyota', 'LAND CRUISER', 2022, 'SUV', 'Automatique', 7, 80000, true, '["Climatisation", "GPS", "Bluetooth", "4x4"]')
ON CONFLICT DO NOTHING;

-- Données d'exemple pour les témoignages
INSERT INTO testimonials
    (name, comment, rating, type, date, approved)
VALUES
    ('Aminata Diallo', 'Excellent service ! L''appartement était parfait, propre et bien équipé. Je recommande vivement.', 5, 'apartment', '2024-01-15', true),
    ('Moussa Sall', 'Location de voiture très pratique. Véhicule en bon état et service client réactif.', 4, 'car', '2024-01-20', true),
    ('Fatou Ba', 'Séjour magnifique dans l''appartement de Cité Mixta. Très bien situé et confortable.', 5, 'apartment', '2024-02-01', true),
    ('Ibrahima Ndiaye', 'Service professionnel pour la location de voiture. Aucun problème pendant tout le séjour.', 4, 'car', '2024-02-10', true),
    ('Aissatou Kane', 'L''équipe est très accueillante et les appartements sont exactement comme sur les photos.', 5, 'apartment', '2024-02-15', true)
ON CONFLICT DO NOTHING;

-- Politique RLS (Row Level Security) pour Supabase
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Politiques pour permettre la lecture publique
CREATE POLICY "Public read access" ON apartments FOR
SELECT USING (true);
CREATE POLICY "Public read access" ON cars FOR
SELECT USING (true);
CREATE POLICY "Public read access" ON images FOR
SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR
SELECT USING (approved = true);

-- Politiques pour les insertions publiques
CREATE POLICY "Public insert access" ON bookings FOR
INSERT WITH CHECK
    (true)
;
CREATE POLICY "Public insert access" ON contact_messages FOR
INSERT WITH CHECK
    (true)
;
CREATE POLICY "Public insert access" ON testimonials FOR
INSERT WITH CHECK
    (true)
;

-- Note: Pour les opérations admin (UPDATE, DELETE), vous devrez configurer
-- les politiques RLS selon votre système d'authentification Supabase
