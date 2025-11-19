# Migration de Supabase vers MySQL

Ce document explique comment migrer de Supabase vers MySQL pour déployer sur Vercel.

## 📋 Prérequis

1. **Base de données MySQL hébergée** (obligatoire pour Vercel)
   - Options recommandées :
     - [PlanetScale](https://planetscale.com) - Gratuit pour commencer
     - [Railway](https://railway.app) - MySQL disponible
     - [Aiven](https://aiven.io) - MySQL géré
     - [DigitalOcean](https://www.digitalocean.com) - Managed MySQL
     - Toute autre instance MySQL cloud

2. **Node.js** : Version 18+ installée
3. **npm/yarn** : Gestionnaire de paquets

## 🗄️ Configuration Base de Données

### 1. Créer votre base MySQL

Créez une base de données MySQL sur votre fournisseur cloud préféré et notez les informations de connexion :
- Host
- Port (généralement 3306)
- Database name
- Username
- Password

### 2. Exécuter le schéma SQL

1. Connectez-vous à votre base MySQL (via l'interface de votre fournisseur ou un client MySQL)
2. Copiez le contenu de `mysql-schema.sql`
3. Exécutez le script pour créer toutes les tables

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# MySQL Configuration
DB_HOST=votre-host-mysql.com
DB_USER=votre_username
DB_PASSWORD=votre_mot_de_passe
DB_NAME=location_site
DB_PORT=3306

# Email Configuration (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_app

# Admin Configuration
ADMIN_EMAIL=admin@residencecedo.sn
ADMIN_PASSWORD=votre_mot_de_passe_admin
```

**Pour Vercel :**
1. Allez dans votre projet Vercel
2. Settings > Environment Variables
3. Ajoutez toutes les variables ci-dessus

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## 🔄 Changements effectués

### Fichiers créés :
- `src/lib/mysql.ts` - Configuration et utilitaires MySQL
- `mysql-schema.sql` - Schéma de base de données MySQL
- `MYSQL_MIGRATION.md` - Ce fichier

### Fichiers modifiés :
- `package.json` - Ajout de `mysql2`
- Toutes les routes API dans `src/app/api/` - Migration de Supabase vers MySQL

### Routes API migrées :
- ✅ `/api/apartments` - GET, POST
- ✅ `/api/apartments/[id]` - GET, PUT, DELETE
- ✅ `/api/cars` - GET, POST
- ✅ `/api/cars/[id]` - GET, PUT, DELETE
- ✅ `/api/bookings` - GET, POST
- ✅ `/api/bookings/[id]` - PATCH, DELETE
- ✅ `/api/contact` - GET, POST
- ✅ `/api/contact/[id]` - GET, PATCH, DELETE
- ✅ `/api/stats` - GET

## 🚀 Déploiement sur Vercel

1. **Pousser votre code sur GitHub/GitLab/Bitbucket**

2. **Connecter votre repo à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Importez votre projet
   - Configurez les variables d'environnement (voir section 3 ci-dessus)

3. **Déployer**
   - Vercel détectera automatiquement Next.js
   - Le déploiement se fera automatiquement

## ⚠️ Notes importantes

### Différences entre Supabase et MySQL

1. **UUID** : 
   - Supabase générait automatiquement les UUID
   - MySQL : Les UUID sont générés par l'application avec `randomUUID()` de Node.js

2. **JSON** :
   - Supabase utilisait JSONB (PostgreSQL)
   - MySQL utilise JSON natif (depuis MySQL 5.7+)

3. **Types de données** :
   - Les types ont été adaptés pour MySQL
   - Les timestamps utilisent `CURRENT_TIMESTAMP` au lieu de `NOW()`

4. **Pool de connexions** :
   - Un pool de connexions MySQL est utilisé pour de meilleures performances
   - Le pool est automatiquement géré

## 🔍 Vérification

Pour vérifier que tout fonctionne :

1. **Testez localement** :
   ```bash
   npm run dev
   ```
   Visitez `http://localhost:3000` et testez les fonctionnalités

2. **Vérifiez les logs** :
   - Les erreurs MySQL apparaîtront dans la console
   - Vérifiez les logs Vercel pour les erreurs de production

## 🆘 Dépannage

### Erreur de connexion MySQL
- Vérifiez que les variables d'environnement sont correctement définies
- Vérifiez que votre base MySQL est accessible depuis l'extérieur (pour Vercel)
- Vérifiez les credentials (username, password, database name)

### Erreur "Table doesn't exist"
- Assurez-vous d'avoir exécuté le script `mysql-schema.sql`
- Vérifiez que le nom de la base de données est correct dans `.env.local`

### Erreur de timeout
- Vérifiez que votre base MySQL accepte les connexions externes
- Certains fournisseurs nécessitent d'ajouter des IPs à une whitelist

## 📚 Ressources

- [Documentation mysql2](https://github.com/sidorares/node-mysql2)
- [Documentation Vercel](https://vercel.com/docs)
- [PlanetScale Documentation](https://planetscale.com/docs)

