# 🚀 Configuration Dashboard Admin - Résidence Cedo

## 📋 Prérequis

1. **Compte Supabase** : Créez un projet sur [supabase.com](https://supabase.com)
2. **Node.js** : Version 18+ installée
3. **npm/yarn** : Gestionnaire de paquets

## 🗄️ Configuration Base de Données

### 1. Créer le projet Supabase
- Allez sur [supabase.com](https://supabase.com)
- Créez un nouveau projet
- Notez votre URL et clés API

### 2. Exécuter le schéma SQL
- Copiez le contenu de `supabase-schema.sql`
- Allez dans l'éditeur SQL de Supabase
- Exécutez le script pour créer toutes les tables

### 3. Configurer les variables d'environnement
Créez un fichier `.env.local` à la racine du projet :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role

# Email Configuration (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_app

# Admin Configuration
ADMIN_EMAIL=admin@residencecedo.sn
ADMIN_PASSWORD=votre_mot_de_passe_admin
```

## 📧 Configuration Email (Optionnel)

Pour recevoir les messages de contact par email :

1. **Gmail** :
   - Activez l'authentification à 2 facteurs
   - Générez un "mot de passe d'application"
   - Utilisez ce mot de passe dans `SMTP_PASS`

2. **Autres fournisseurs** :
   - Modifiez les paramètres SMTP dans `.env.local`

## 🚀 Installation et Démarrage

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## 🔐 Accès Dashboard Admin

- **URL** : `http://localhost:3000/admin`
- **Fonctionnalités** :
  - ✅ Gestion des appartements (CRUD)
  - ✅ Gestion des voitures (CRUD)
  - ✅ Suivi des réservations
  - ✅ Messages de contact
  - ✅ Modération des témoignages
  - ✅ Statistiques en temps réel

## 📊 Fonctionnalités Implémentées

### 🏠 Gestion Appartements
- ✅ Ajouter/Modifier/Supprimer
- ✅ Gestion des zones (Cité Mixta, Ouest-foire, Cité Kalia)
- ✅ Prix et disponibilité
- ✅ Équipements et coordonnées

### 🚗 Gestion Voitures
- ✅ Ajouter/Modifier/Supprimer
- ✅ Marques et modèles
- ✅ Tarifs et caractéristiques
- ✅ Statut de disponibilité

### 📋 Réservations
- ✅ Suivi des réservations
- ✅ Statuts (en attente, confirmée, annulée)
- ✅ Informations client
- ✅ Calcul des montants

### 📧 Contact
- ✅ Formulaire fonctionnel
- ✅ Upload de fichiers
- ✅ Envoi d'email automatique
- ✅ Base de données des messages

### ⭐ Témoignages
- ✅ Système d'approbation
- ✅ Modération des avis
- ✅ Affichage sur le site

## 🔧 Structure des Fichiers

```
src/
├── app/
│   ├── api/                    # API Routes
│   │   ├── apartments/         # CRUD appartements
│   │   ├── cars/              # CRUD voitures
│   │   ├── bookings/          # Gestion réservations
│   │   ├── contact/           # Messages contact
│   │   └── testimonials/      # Gestion témoignages
│   └── admin/                 # Dashboard admin
│       ├── page.tsx           # Accueil admin
│       ├── apartments/        # Gestion appartements
│       ├── cars/             # Gestion voitures
│       ├── bookings/         # Gestion réservations
│       └── messages/         # Messages contact
├── components/
│   └── forms/
│       └── ContactForm.tsx   # Formulaire contact
└── lib/
    ├── supabase.ts           # Configuration Supabase
    └── database.types.ts     # Types TypeScript
```

## 🛠️ Développement

### Ajouter de nouvelles fonctionnalités
1. Créer l'API route dans `src/app/api/`
2. Ajouter les types dans `database.types.ts`
3. Créer l'interface admin dans `src/app/admin/`
4. Mettre à jour le schéma SQL si nécessaire

### Tests
```bash
# Tester les API
curl http://localhost:3000/api/apartments

# Tester le formulaire contact
# Remplissez le formulaire sur /contact
```

## 📱 Responsive Design

Le dashboard admin est entièrement responsive :
- 📱 **Mobile** : Interface adaptée tactile
- 💻 **Desktop** : Tableaux et formulaires complets
- 📊 **Tablette** : Layout hybride optimisé

## 🔒 Sécurité

- ✅ Row Level Security (RLS) activé sur Supabase
- ✅ Validation des données côté serveur
- ✅ Gestion des erreurs
- ✅ Upload de fichiers sécurisé

## 🚀 Déploiement

1. **Vercel** (recommandé) :
   ```bash
   npm run build
   vercel --prod
   ```

2. **Autres plateformes** :
   - Configurez les variables d'environnement
   - Déployez avec `npm run build && npm start`

## 📞 Support

Pour toute question ou problème :
- 📧 Email : contact@residencecedo.sn
- 📱 Téléphone : +221 12 345 67 89
- 💬 WhatsApp : +221 12 345 67 89

---

**🎉 Félicitations ! Votre dashboard admin est maintenant prêt !**
