# Guide des Assets - Location Pro

## Structure des dossiers

```
public/assets/
├── logos/           # Logos et éléments de branding
├── icons/           # Icônes diverses
└── images/          # Images du contenu
    ├── apartments/  # Photos d'appartements
    ├── cars/        # Photos de voitures
    └── zones/       # Images des zones/quartiers
```

## 📁 Logos (`/assets/logos/`)

### Fichiers recommandés :
- `logo.png` - Logo principal (fond transparent)
- `logo-light.png` - Logo pour fond sombre
- `logo-dark.png` - Logo pour fond clair
- `logo.svg` - Version vectorielle du logo
- `favicon.ico` - Icône du site (16x16, 32x32, 48x48px)
- `apple-touch-icon.png` - Icône iOS (180x180px)

### Spécifications techniques :
- **Format** : PNG avec transparence ou SVG
- **Taille recommandée** : 200x200px minimum
- **Ratio** : Préférable carré ou rectangle 2:1

## 🎨 Icônes (`/assets/icons/`)

### Catégories d'icônes :
- **Social** : Facebook, Instagram, WhatsApp, Twitter, etc.
- **Fonctionnalités** : bed, bath, wifi, parking, car, etc.
- **Navigation** : arrow, close, menu, search, etc.

### Formats :
- **SVG** : Préféré pour la scalabilité
- **PNG** : 24x24px, 32x32px, 48x48px

## 🏠 Images d'appartements (`/assets/images/apartments/`)

### Convention de nommage :
```
apartment-{id}-{type}.jpg
```

Exemples :
- `apartment-1-main.jpg` - Photo principale
- `apartment-1-living.jpg` - Salon
- `apartment-1-kitchen.jpg` - Cuisine
- `apartment-1-bedroom.jpg` - Chambre
- `apartment-1-bathroom.jpg` - Salle de bain

### Spécifications :
- **Format** : JPEG ou WebP
- **Résolution** : 1200x800px minimum
- **Qualité** : 80-90%
- **Poids** : < 500KB par image

## 🚗 Images de voitures (`/assets/images/cars/`)

### Convention de nommage :
```
car-{id}-{view}.jpg
```

Exemples :
- `car-1-exterior.jpg` - Vue extérieure
- `car-1-interior.jpg` - Intérieur
- `car-1-dashboard.jpg` - Tableau de bord
- `car-1-trunk.jpg` - Coffre

## 🏘️ Images des zones (`/assets/images/zones/`)

### Fichiers par zone :
- `cite-mixta.jpg` - Vue de Cité Mixta
- `ouest-foire.jpg` - Vue de Ouest-foire
- `cite-kalia.jpg` - Vue de Cité Kalia

## 🔧 Utilisation dans le code

### Pour les logos :
```tsx
import Logo from '@/components/common/Logo';

// Utilisation simple
<Logo />

// Avec options
<Logo size="lg" variant="light" showText={false} />
```

### Pour les images statiques :
```tsx
import Image from 'next/image';

<Image 
  src="/assets/images/apartments/apartment-1-main.jpg"
  alt="Appartement moderne"
  width={400}
  height={300}
/>
```

### Pour les icônes :
```tsx
<Image 
  src="/assets/icons/bed.svg"
  alt="Chambres"
  width={24}
  height={24}
/>
```

## 📱 Optimisation

### Conseils pour les performances :
1. **Utilisez WebP** quand possible
2. **Compressez vos images** avant upload
3. **Utilisez les tailles appropriées** selon l'usage
4. **Optimisez avec Next.js Image** pour le lazy loading

### Outils recommandés :
- **TinyPNG** - Compression PNG/JPEG
- **SVGO** - Optimisation SVG
- **ImageOptim** - Optimisation multiple formats

## 🚀 Déploiement

Assurez-vous que tous les assets sont :
- ✅ Optimisés en taille
- ✅ Correctement nommés
- ✅ Testés sur différents appareils
- ✅ Avec les bonnes permissions

---

*Pour toute question sur les assets, consultez la documentation Next.js ou contactez l'équipe de développement.*
