# 🌱 La Ruche Qui Dit Oui 2.0

> Marketplace de produits locaux - Multi-plateforme (Web + Mobile)

Une plateforme moderne inspirée de Vinted, dédiée aux produits locaux avec des boutiques vendeurs personnalisables et une direction artistique premium inspirée d'Erewhon.

## 🎯 Vision du Projet

**Objectif** : Créer une marketplace spécialisée pour les produits locaux (fruits, légumes, plantes, produits fermiers) qui se démarque de LeBonCoin par sa spécialisation et ses boutiques personnalisables.

**Public cible** :
- 🏠 **Particuliers** : Réduire le gâchis, arrondir leurs fins de mois
- 🚜 **Producteurs/Fermiers** : Obtenir plus de visibilité
- 🌿 **Consommateurs** : Acheter local et de qualité

## 🏗️ Architecture Technique

### Multi-plateforme (Monorepo)
- **Web** : Next.js 14 + Tailwind CSS (Mobile-first + PWA)
- **Mobile** : React Native + Expo (iOS/Android)  
- **Backend** : Node.js + Express + PostgreSQL + Prisma
- **Code partagé** : TypeScript interfaces, hooks, services

### Structure du projet
```
LaRucheQuiDitOui2/
├── packages/
│   ├── shared/           # Types, hooks, services partagés
│   └── ui-components/    # Composants UI abstraits
├── apps/
│   ├── web/             # Application web Next.js
│   ├── mobile/          # Application mobile React Native
│   └── backend/         # API Node.js + Prisma
└── docs/                # Documentation
```

## 🚀 Installation & Développement

### Prérequis
- Node.js 18+
- npm 9+
- PostgreSQL 14+
- Redis (optionnel, pour le cache)

### Installation
```bash
# Cloner le repository
git clone [repository-url]
cd LaRucheQuiDitOui2

# Installer toutes les dépendances
npm run install:all

# Copier et configurer les variables d'environnement
cp .env.example .env
# Éditez .env avec vos configurations

# Initialiser la base de données
npm run db:migrate
npm run db:seed
```

### Développement

#### Démarrer tous les services
```bash
npm run dev  # Web + API en parallèle
```

#### Ou démarrer individuellement
```bash
npm run dev:web      # Next.js (http://localhost:3000)
npm run dev:mobile   # Expo (scan QR code avec l'app Expo)
npm run dev:api      # API Express (http://localhost:3001)
```

#### Base de données
```bash
npm run db:generate  # Génère le client Prisma
npm run db:migrate   # Lance les migrations
npm run db:seed      # Seed avec des données de test
npm run db:studio    # Interface Prisma Studio
```

## 🎨 Fonctionnalités Clés

### 🏪 Boutiques Personnalisables
- **Thèmes prédéfinis** : Nature, Moderne, Rustique, Élégant, Coloré, Minimaliste
- **Customisation** : Couleurs, polices, layouts personnalisables
- **Cohérence** : Design system global maintenu
- **Preview** : Prévisualisation temps réel

### 💰 Modèle Économique Vinted
- **Commission** : Pourcentage sur chaque vente
- **Paiements sécurisés** : Via Stripe Connect
- **Libération de l'argent** : Après confirmation de livraison
- **Frais transparents** : Pas de frais cachés

### 🌍 Spécificités Produits Locaux
- **Géolocalisation** : Recherche par proximité
- **Fraîcheur** : Gestion dates de récolte/expiration
- **Saisonnalité** : Disponibilité par saison
- **Certifications** : Bio, AOC, IGP, local
- **Catégories spécialisées** : Fruits/légumes, produits laitiers, etc.

### 📱 Multi-plateforme
- **Responsive Web** : Design mobile-first
- **PWA** : Installation comme app native
- **App Mobile** : React Native avec fonctionnalités natives
- **Synchronisation** : Données synchronisées entre plateformes

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 14** - Framework React avec SSR/SSG
- **TypeScript** - Langage typé
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations fluides
- **React Hook Form + Zod** - Gestion formulaires + validation
- **TanStack Query** - Gestion état serveur

### Mobile
- **React Native** - Framework mobile multi-plateforme  
- **Expo** - Plateforme de développement
- **React Navigation** - Navigation native
- **Expo Camera/Location** - APIs natives

### Backend
- **Node.js + Express** - API RESTful
- **TypeScript** - Cohérence avec le frontend
- **Prisma** - ORM moderne type-safe
- **PostgreSQL** - Base de données relationnelle
- **Redis** - Cache et sessions
- **Socket.io** - Communication temps réel

### Services Externes
- **Stripe** - Paiements sécurisés
- **Cloudinary** - Optimisation images
- **Google Maps** - Géolocalisation
- **Resend** - Emails transactionnels

## 🎨 Design System

### Inspiration Erewhon
- **Esthétique** : Premium, naturel, épuré
- **Couleurs** : Tons terreux, verts naturels
- **Typographie** : Moderne mais chaleureuse
- **Photos** : Haute qualité, mise en valeur des produits

### Thèmes Prédéfinis
- **Nature Pure** : Verts émeraude, tons terre
- **Élégance Moderne** : Gris anthracite, orange brûlé
- **Campagne Authentique** : Bruns roux, verts forêt

## 📊 Base de Données

### Modèles Principaux
- **User** : Utilisateurs (acheteurs/vendeurs)
- **Shop** : Boutiques avec thèmes personnalisés
- **Product** : Produits avec spécificités locales
- **Order** : Commandes avec workflow marketplace
- **Location** : Géolocalisation
- **Category** : Catégories spécialisées produits locaux

## 🧪 Tests & Qualité

```bash
npm run test         # Tests unitaires + intégration
npm run test:watch   # Tests en mode watch
npm run lint         # Linting de tout le code
npm run build        # Build de production
```

## 🚀 Déploiement

### Environnements
- **Development** : Local
- **Staging** : Vercel (web) + Railway (API)
- **Production** : À définir

### Scripts de Build
```bash
npm run build          # Build toutes les applications
npm run build:web      # Build web uniquement
npm run build:mobile   # Build mobile
npm run build:api      # Build API
```

## 📝 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre web + API en parallèle |
| `npm run dev:web` | Démarre uniquement le web |
| `npm run dev:mobile` | Démarre l'app mobile |
| `npm run dev:api` | Démarre uniquement l'API |
| `npm run build` | Build toutes les apps |
| `npm run test` | Lance tous les tests |
| `npm run lint` | Lint tout le code |
| `npm run db:migrate` | Migrations base de données |
| `npm run db:seed` | Seed données de test |

## 🤝 Contribution

Ce projet utilise une architecture monorepo avec des packages partagés. Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)  
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous license MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- Inspiration design : [Erewhon](https://erewhon.com)
- Modèle économique : [Vinted](https://vinted.com)
- Communauté open source

---

**La Ruche Qui Dit Oui 2.0** - *Consommons local, vendons mieux* 🌱