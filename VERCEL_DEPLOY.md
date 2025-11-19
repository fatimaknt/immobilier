# 🚀 Guide de Déploiement sur Vercel

## 📋 Prérequis

1. **Compte Vercel** : Créez un compte sur [vercel.com](https://vercel.com)
2. **Base MySQL hébergée** : Vous devez avoir une base MySQL accessible depuis Internet
   - Options recommandées : PlanetScale, Railway, Aiven, DigitalOcean
3. **GitHub/GitLab/Bitbucket** : Votre code doit être sur un dépôt Git

## 🔧 Configuration de la Base de Données

### Option 1 : PlanetScale (Recommandé - Gratuit pour commencer)

1. Créez un compte sur [planetscale.com](https://planetscale.com)
2. Créez une nouvelle base de données
3. Notez les informations de connexion :
   - Host
   - Username
   - Password
   - Database name
   - Port (généralement 3306)

### Option 2 : Railway

1. Créez un compte sur [railway.app](https://railway.app)
2. Créez un nouveau projet
3. Ajoutez un service MySQL
4. Récupérez les variables d'environnement

## 📦 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandé)

1. **Connecter votre dépôt Git**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Add New Project"
   - Importez votre dépôt GitHub/GitLab/Bitbucket

2. **Configurer le projet**
   - Framework Preset : Next.js (détecté automatiquement)
   - Root Directory : `location-site` (si votre repo est à la racine, laissez vide)
   - Build Command : `npm run build` (par défaut)
   - Output Directory : `.next` (par défaut)
   - Install Command : `npm install` (par défaut)

3. **Ajouter les variables d'environnement**
   - Dans "Environment Variables", ajoutez :
     ```
     DB_HOST=votre-host-mysql.com
     DB_USER=votre_username
     DB_PASSWORD=votre_mot_de_passe
     DB_NAME=location_site
     DB_PORT=3306
     ```
   - ⚠️ **Important** : Ajoutez ces variables pour **Production**, **Preview**, et **Development**

4. **Déployer**
   - Cliquez sur "Deploy"
   - Vercel va automatiquement :
     - Installer les dépendances
     - Builder le projet
     - Déployer l'application

### Méthode 2 : Via la CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
cd location-site
vercel

# Ajouter les variables d'environnement
vercel env add DB_HOST
vercel env add DB_USER
vercel env add DB_PASSWORD
vercel env add DB_NAME
vercel env add DB_PORT
```

## 🗄️ Initialiser la Base de Données sur Vercel

Après le déploiement, vous devez initialiser la base de données :

### Option 1 : Via un script Node.js (Recommandé)

1. Connectez-vous à votre base MySQL via un client (MySQL Workbench, TablePlus, etc.)
2. Exécutez le script `scripts/init-db-simple.ts` localement avec vos credentials de production :
   ```bash
   DB_HOST=votre-host DB_USER=votre-user DB_PASSWORD=votre-password DB_NAME=location_site DB_PORT=3306 npm run init-db
   ```

### Option 2 : Via l'interface de votre fournisseur MySQL

1. Connectez-vous à votre base MySQL
2. Exécutez le contenu du fichier `mysql-schema.sql` (sans les lignes CREATE DATABASE et USE)

## ✅ Vérification du Déploiement

1. **Vérifiez l'URL de déploiement**
   - Vercel vous donnera une URL comme : `https://votre-projet.vercel.app`

2. **Testez les endpoints**
   - `https://votre-projet.vercel.app/api/apartments`
   - `https://votre-projet.vercel.app/api/cars`
   - `https://votre-projet.vercel.app/api/stats`

3. **Vérifiez les logs**
   - Allez dans votre projet Vercel
   - Cliquez sur "Logs" pour voir les erreurs éventuelles

## 🔍 Dépannage

### Erreur "Table doesn't exist"
- Vérifiez que vous avez bien initialisé la base de données
- Vérifiez que les variables d'environnement sont correctement définies

### Erreur de connexion MySQL
- Vérifiez que votre base MySQL accepte les connexions externes
- Vérifiez que l'IP de Vercel est autorisée (si nécessaire)
- Certains fournisseurs nécessitent d'ajouter des IPs à une whitelist

### Build échoue
- Vérifiez les logs de build dans Vercel
- Assurez-vous que toutes les dépendances sont dans `package.json`
- Vérifiez que le build fonctionne localement : `npm run build`

## 📝 Variables d'Environnement Requises

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DB_HOST` | Host MySQL | `xxx.mysql.database.azure.com` |
| `DB_USER` | Username MySQL | `admin` |
| `DB_PASSWORD` | Password MySQL | `votre_mot_de_passe` |
| `DB_NAME` | Nom de la base | `location_site` |
| `DB_PORT` | Port MySQL | `3306` |

## 🔐 Sécurité

- ⚠️ **Ne commitez JAMAIS** le fichier `.env.local`
- Utilisez les variables d'environnement de Vercel pour les secrets
- Activez HTTPS (automatique sur Vercel)
- Configurez les CORS si nécessaire

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js sur Vercel](https://vercel.com/docs/frameworks/nextjs)
- [PlanetScale Documentation](https://planetscale.com/docs)
- [Railway Documentation](https://docs.railway.app)

