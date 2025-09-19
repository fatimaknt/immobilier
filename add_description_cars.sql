-- Ajouter la colonne description à la table cars
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS description TEXT;

-- Ajouter la colonne images à la table cars si elle n'existe pas
ALTER TABLE cars ADD COLUMN
IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Mettre à jour les voitures existantes avec une description par défaut
UPDATE cars SET description = 'Voiture de qualité supérieure avec tous les équipements modernes' WHERE description IS NULL;
