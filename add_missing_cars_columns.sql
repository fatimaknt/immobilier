-- Ajouter seulement les colonnes manquantes à la table cars

-- Ajouter la colonne fuel_type si elle n'existe pas
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS fuel_type VARCHAR
(50) DEFAULT 'Essence';

-- Ajouter la colonne mileage si elle n'existe pas
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS mileage INTEGER DEFAULT 0;

-- Ajouter la colonne price_per_week si elle n'existe pas
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS price_per_week INTEGER DEFAULT 0;

-- Mettre à jour les voitures existantes avec des valeurs par défaut pour les nouvelles colonnes
UPDATE cars SET 
    fuel_type = COALESCE(fuel_type, 'Essence'),
    mileage = COALESCE(mileage, 0),
    price_per_week = COALESCE(price_per_week, price_per_day * 7)
WHERE fuel_type IS NULL
    OR mileage IS NULL
    OR price_per_week IS NULL;
