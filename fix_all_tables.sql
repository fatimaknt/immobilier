-- Script complet pour corriger toutes les tables

-- =============================================
-- TABLE APARTMENTS
-- =============================================

-- Ajouter la colonne images à la table apartments
ALTER TABLE apartments ADD COLUMN
IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- =============================================
-- TABLE CARS  
-- =============================================

-- Ajouter la colonne images à la table cars
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Ajouter les autres colonnes manquantes pour cars
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS fuel_type VARCHAR
(50) DEFAULT 'Essence';
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS mileage INTEGER DEFAULT 0;
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS price_per_week INTEGER DEFAULT 0;

-- Mettre à jour les voitures existantes
UPDATE cars SET 
    fuel_type = COALESCE(fuel_type, 'Essence'),
    mileage = COALESCE(mileage, 0),
    price_per_week = COALESCE(price_per_week, price_per_day * 7)
WHERE fuel_type IS NULL
    OR mileage IS NULL
    OR price_per_week IS NULL;

-- =============================================
-- VÉRIFICATION
-- =============================================

-- Vérifier la structure des tables
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name IN ('apartments', 'cars')
ORDER BY table_name, ordinal_position;
