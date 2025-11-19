-- Script SQL pour initialiser la base de données MySQL
-- Résidence Cedo - Dashboard Admin
-- Compatible avec Vercel et bases MySQL hébergées (PlanetScale, Railway, etc.)

-- Créer la base de données (si elle n'existe pas déjà)
CREATE DATABASE IF NOT EXISTS location_site CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE location_site;

-- Table des appartements
CREATE TABLE IF NOT EXISTS apartments (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    zone VARCHAR(50) NOT NULL CHECK (zone IN ('Cité Mixta', 'Ouest-foire', 'Cité Kalia')),
    address TEXT NOT NULL,
    rooms INT NOT NULL CHECK (rooms > 0),
    bathrooms INT NOT NULL CHECK (bathrooms > 0),
    surface INT NOT NULL CHECK (surface > 0),
    price_per_day DECIMAL(10,2) NOT NULL CHECK (price_per_day > 0),
    price_per_week DECIMAL(10,2) NOT NULL CHECK (price_per_week > 0),
    available BOOLEAN DEFAULT TRUE,
    equipment JSON,
    coordinates JSON NOT NULL,
    images JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des voitures
CREATE TABLE IF NOT EXISTS cars (
    id VARCHAR(36) PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL CHECK (year > 1900),
    type VARCHAR(100) NOT NULL,
    transmission VARCHAR(50) NOT NULL CHECK (transmission IN ('Manuel', 'Automatique')),
    seats INT NOT NULL CHECK (seats > 0),
    price_per_day DECIMAL(10,2) NOT NULL CHECK (price_per_day > 0),
    price_per_week DECIMAL(10,2) DEFAULT NULL,
    fuel_type VARCHAR(50) DEFAULT NULL,
    mileage INT DEFAULT NULL,
    available BOOLEAN DEFAULT TRUE,
    features JSON,
    images JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des images (optionnel, si vous voulez séparer les images)
CREATE TABLE IF NOT EXISTS images (
    id VARCHAR(36) PRIMARY KEY,
    entity_type VARCHAR(20) NOT NULL CHECK (entity_type IN ('apartment', 'car')),
    entity_id VARCHAR(36) NOT NULL,
    url TEXT NOT NULL,
    alt_text VARCHAR(255) NOT NULL,
    order_index INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_entity (entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des réservations
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(36) PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('apartment', 'car')),
    entity_id VARCHAR(36) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phone VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount > 0),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    payment_method VARCHAR(100) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des messages de contact
CREATE TABLE IF NOT EXISTS contact_messages (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    attachment_url TEXT,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des témoignages
CREATE TABLE IF NOT EXISTS testimonials (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    type VARCHAR(20) NOT NULL CHECK (type IN ('apartment', 'car')),
    date DATE NOT NULL,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_approved (approved)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Index supplémentaires pour améliorer les performances
-- Note: MySQL ne supporte pas IF NOT EXISTS pour CREATE INDEX, donc on les crée directement
-- Si les index existent déjà, une erreur sera ignorée par le script d'initialisation
CREATE INDEX idx_apartments_zone ON apartments(zone);
CREATE INDEX idx_apartments_available ON apartments(available);
CREATE INDEX idx_cars_brand ON cars(brand);
CREATE INDEX idx_cars_available ON cars(available);

-- Données d'exemple pour les appartements
-- Note: Les IDs sont générés par l'application avec randomUUID()
INSERT IGNORE INTO apartments 
    (id, title, description, zone, address, rooms, bathrooms, surface, price_per_day, price_per_week, available, equipment, coordinates, images)
VALUES
    (REPLACE(UUID(), '-', ''), 'Appartement moderne Cité Mixta', 'Bel appartement moderne avec vue sur la mer', 'Cité Mixta', '123 Avenue de la République, Cité Mixta', 2, 1, 65, 25000, 150000, TRUE, 
     JSON_ARRAY('WiFi', 'Climatisation', 'TV', 'Cuisine équipée'), 
     JSON_OBJECT('lat', 14.716677, 'lng', -17.467686),
     JSON_ARRAY()),
    (REPLACE(UUID(), '-', ''), 'Studio confortable Ouest-foire', 'Studio récemment rénové en centre-ville', 'Ouest-foire', '456 Rue de la Paix, Ouest-foire', 1, 1, 35, 20000, 120000, TRUE,
     JSON_ARRAY('WiFi', 'Climatisation', 'TV', 'Kitchenette'),
     JSON_OBJECT('lat', 14.715677, 'lng', -17.475686),
     JSON_ARRAY()),
    (REPLACE(UUID(), '-', ''), 'Appartement familial Cité Kalia', 'Grand appartement parfait pour les familles', 'Cité Kalia', '789 Boulevard du Centenaire, Cité Kalia', 3, 2, 85, 35000, 210000, TRUE,
     JSON_ARRAY('WiFi', 'Climatisation', 'TV', 'Cuisine équipée', 'Balcon'),
     JSON_OBJECT('lat', 14.720677, 'lng', -17.460686),
     JSON_ARRAY());

-- Données d'exemple pour les voitures
INSERT IGNORE INTO cars 
    (id, brand, model, year, type, transmission, seats, price_per_day, price_per_week, available, features, images)
VALUES
    (REPLACE(UUID(), '-', ''), 'KIA', 'CARNIVAL LIMOUSINE', 2023, 'Minibus', 'Automatique', 8, 75000, NULL, TRUE, 
     JSON_ARRAY('Climatisation', 'GPS', 'Bluetooth', 'Sièges en cuir'), JSON_ARRAY()),
    (REPLACE(UUID(), '-', ''), 'KIA', 'CARNIVAL SIMPLE', 2022, 'Minibus', 'Automatique', 7, 65000, NULL, TRUE,
     JSON_ARRAY('Climatisation', 'GPS', 'Bluetooth'), JSON_ARRAY()),
    (REPLACE(UUID(), '-', ''), 'HYUNDAI', 'STEREX', 2023, 'Minibus', 'Automatique', 9, 70000, NULL, TRUE,
     JSON_ARRAY('Climatisation', 'GPS', 'Bluetooth', 'Sièges en cuir'), JSON_ARRAY()),
    (REPLACE(UUID(), '-', ''), 'Renault', 'QM3', 2022, 'SUV', 'Manuel', 5, 45000, NULL, TRUE,
     JSON_ARRAY('Climatisation', 'GPS', 'Bluetooth'), JSON_ARRAY()),
    (REPLACE(UUID(), '-', ''), 'Chevrolet', 'CAMARO', 2023, 'Sport', 'Automatique', 4, 85000, NULL, TRUE,
     JSON_ARRAY('Climatisation', 'GPS', 'Bluetooth', 'Sièges sport'), JSON_ARRAY()),
    (REPLACE(UUID(), '-', ''), 'Toyota', 'LAND CRUISER', 2022, 'SUV', 'Automatique', 7, 80000, NULL, TRUE,
     JSON_ARRAY('Climatisation', 'GPS', 'Bluetooth', '4x4'), JSON_ARRAY());

-- Données d'exemple pour les témoignages
INSERT IGNORE INTO testimonials 
    (id, name, comment, rating, type, date, approved)
VALUES
    (REPLACE(UUID(), '-', ''), 'Aminata Diallo', 'Excellent service ! L''appartement était parfait, propre et bien équipé. Je recommande vivement.', 5, 'apartment', '2024-01-15', TRUE),
    (REPLACE(UUID(), '-', ''), 'Moussa Sall', 'Location de voiture très pratique. Véhicule en bon état et service client réactif.', 4, 'car', '2024-01-20', TRUE),
    (REPLACE(UUID(), '-', ''), 'Fatou Ba', 'Séjour magnifique dans l''appartement de Cité Mixta. Très bien situé et confortable.', 5, 'apartment', '2024-02-01', TRUE),
    (REPLACE(UUID(), '-', ''), 'Ibrahima Ndiaye', 'Service professionnel pour la location de voiture. Aucun problème pendant tout le séjour.', 4, 'car', '2024-02-10', TRUE),
    (REPLACE(UUID(), '-', ''), 'Aissatou Kane', 'L''équipe est très accueillante et les appartements sont exactement comme sur les photos.', 5, 'apartment', '2024-02-15', TRUE);

