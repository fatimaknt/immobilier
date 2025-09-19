-- Ajouter la colonne images à la table cars
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS images TEXT[] DEFAULT '{}';
