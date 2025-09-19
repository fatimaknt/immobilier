-- Script complet pour mettre à jour la table cars avec toutes les colonnes nécessaires

-- Ajouter la colonne description
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS description TEXT;

-- Ajouter la colonne images
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Ajouter la colonne fuel_type
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS fuel_type VARCHAR
(50) DEFAULT 'Essence';

-- Ajouter la colonne transmission
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS transmission VARCHAR
(50) DEFAULT 'Manuelle';

-- Ajouter la colonne seats
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS seats INTEGER DEFAULT 4;

-- Ajouter la colonne year
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS year INTEGER DEFAULT 2023;

-- Ajouter la colonne mileage
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS mileage INTEGER DEFAULT 0;

-- Ajouter la colonne features
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS features TEXT[] DEFAULT '{}';

-- Ajouter la colonne price_per_week
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS price_per_week INTEGER DEFAULT 0;

-- Mettre à jour les voitures existantes avec des valeurs par défaut
UPDATE cars SET 
    description = COALESCE(description, 'Voiture de qualité supérieure avec tous les équipements modernes'),
    fuel_type = COALESCE(fuel_type, 'Essence'),
    transmission = COALESCE(transmission, 'Manuelle'),
    seats = COALESCE(seats, 4),
    year = COALESCE(year, 2023),
    mileage = COALESCE(mileage, 0),
    price_per_week = COALESCE(price_per_week, price_per_day * 7),
    images = COALESCE(images, '{}'),
    features = COALESCE(features, '{}')
WHERE description IS NULL
    OR fuel_type IS NULL
    OR transmission IS NULL
    OR seats IS NULL
    OR year IS NULL
    OR mileage IS NULL
    OR price_per_week IS NULL
    OR images IS NULL
    OR features IS NULL;
