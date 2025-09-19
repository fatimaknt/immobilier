-- Ajouter la colonne images à la table apartments
ALTER TABLE apartments ADD COLUMN
IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Vérifier que la colonne a été ajoutée
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'apartments' AND column_name = 'images';