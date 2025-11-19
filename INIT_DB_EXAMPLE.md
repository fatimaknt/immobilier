# 🗄️ Initialisation de la Base de Données MySQL

## 📋 Instructions

Vous devez remplacer les valeurs d'exemple par vos **vraies informations de connexion MySQL**.

## 🔧 Méthode 1 : Variables d'environnement en ligne de commande

```bash
DB_HOST=votre-vrai-host.com \
DB_USER=votre-vrai-username \
DB_PASSWORD=votre-vrai-password \
DB_NAME=location_site \
DB_PORT=3306 \
npm run init-db
```

### Exemple avec des vraies valeurs :

```bash
# Exemple avec PlanetScale
DB_HOST=aws.connect.psdb.cloud \
DB_USER=abc123xyz \
DB_PASSWORD=pscale_pw_xxxxx \
DB_NAME=location_site \
DB_PORT=3306 \
npm run init-db

# Exemple avec Railway
DB_HOST=containers-us-west-xxx.railway.app \
DB_USER=root \
DB_PASSWORD=xxxxx \
DB_NAME=railway \
DB_PORT=3306 \
npm run init-db

# Exemple avec MySQL local
DB_HOST=localhost \
DB_USER=root \
DB_PASSWORD=root \
DB_NAME=location_site \
DB_PORT=8889 \
npm run init-db
```

## 🔧 Méthode 2 : Fichier .env.local

Créez ou modifiez le fichier `.env.local` à la racine du projet :

```env
DB_HOST=votre-vrai-host.com
DB_USER=votre-vrai-username
DB_PASSWORD=votre-vrai-password
DB_NAME=location_site
DB_PORT=3306
```

Puis exécutez simplement :

```bash
npm run init-db
```

## 📝 Où trouver vos informations MySQL ?

### PlanetScale
1. Allez sur votre dashboard PlanetScale
2. Sélectionnez votre base de données
3. Cliquez sur "Connect"
4. Copiez les informations de connexion

### Railway
1. Allez sur votre projet Railway
2. Cliquez sur votre service MySQL
3. Allez dans l'onglet "Variables"
4. Copiez les valeurs des variables d'environnement

### MySQL Local (MAMP/XAMPP)
- **Host** : `localhost`
- **User** : `root`
- **Password** : `root` (ou votre mot de passe)
- **Port** : `8889` (MAMP) ou `3306` (XAMPP)

## ✅ Vérification

Après l'exécution, vous devriez voir :

```
🔌 Connexion à MySQL...
📦 Création de la base de données "location_site"...
🚀 Création des tables...
  ✓ Table apartments créée
  ✓ Table cars créée
  ✓ Table images créée
  ✓ Table bookings créée
  ✓ Table contact_messages créée
  ✓ Table testimonials créée
  ✓ Index supplémentaires créés

✅ Base de données initialisée avec succès!

📊 Tables créées:
  - apartments
  - bookings
  - cars
  - contact_messages
  - images
  - testimonials
```

## ⚠️ Erreurs courantes

### "getaddrinfo ENOTFOUND"
- Vérifiez que `DB_HOST` est correct
- Vérifiez votre connexion Internet
- Vérifiez que le host MySQL est accessible

### "Access denied"
- Vérifiez `DB_USER` et `DB_PASSWORD`
- Vérifiez que l'utilisateur a les permissions nécessaires

### "Unknown database"
- Vérifiez que `DB_NAME` est correct
- La base sera créée automatiquement si elle n'existe pas

