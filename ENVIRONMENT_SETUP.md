# Configuration des Variables d'Environnement

## Fichier .env.local

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## Comment obtenir ces valeurs :

1. **NEXT_PUBLIC_SUPABASE_URL** : URL de votre projet Supabase
   - Exemple : `https://your-project.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** : Clé publique anonyme
   - Trouvée dans Settings > API > Project API keys

3. **SUPABASE_SERVICE_ROLE_KEY** : Clé de service (pour les opérations admin)
   - Trouvée dans Settings > API > Project API keys
   - ⚠️ **IMPORTANT** : Gardez cette clé secrète !

## Exemple complet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NjQzOTIwMCwiZXhwIjoxOTYyMDE1MjAwfQ.example
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQ2NDM5MjAwLCJleHAiOjE5NjIwMTUyMDB9.example
```

## Redémarrage requis

Après avoir créé le fichier `.env.local`, redémarrez le serveur de développement :

```bash
npm run dev
```
