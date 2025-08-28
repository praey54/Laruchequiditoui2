# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Vision

**La Ruche Qui Dit Oui 2.0** - Marketplace de produits locaux inspirée du modèle Vinted avec une direction artistique Erewhon.

**Objectif** : Plateforme spécialisée pour produits locaux (fruits/légumes, plantes, produits fermiers) avec boutiques vendeurs personnalisables.

**Public cible** :
- Particuliers : Réduire le gâchis, arrondir fins de mois
- Producteurs/Fermiers : Obtenir plus de visibilité  
- Différenciation vs LeBonCoin : Spécialisation + customisation boutiques

## Architecture Technique

### Multi-plateforme (Monorepo)
- **Web** : Next.js 14 + Tailwind (Mobile-first + PWA)
- **Mobile** : React Native + Expo (iOS/Android)  
- **Backend** : Node.js + Express + PostgreSQL + Prisma
- **Code partagé** : TypeScript interfaces, hooks, services

### Structure des dossiers
```
packages/
├── shared/           # Types, hooks, services partagés
└── ui-components/    # Composants UI abstraits

apps/
├── web/             # App Next.js responsive
├── mobile/          # App React Native
└── backend/         # API Node.js + Prisma
```

## Commandes de Développement

### Installation initiale
```bash
npm run install:all    # Install toutes les dépendances
```

### Développement
```bash
npm run dev            # Web + API en parallèle
npm run dev:web        # Web uniquement (Next.js)
npm run dev:mobile     # Mobile (Expo)
npm run dev:api        # Backend uniquement
```

### Base de données  
```bash
npm run db:generate    # Génère le client Prisma
npm run db:migrate     # Lance les migrations
npm run db:seed        # Seed la base de données
```

### Build & Tests
```bash
npm run build          # Build toutes les apps
npm run test           # Run tous les tests
npm run lint           # Lint toutes les apps
```

## Fonctionnalités Clés

### Système de boutiques personnalisables
- **Thèmes prédéfinis** : Nature, Moderne, Rustique, Élégant
- **Customisation** : Couleurs, polices, layouts par vendeur
- **Cohérence** : Design system global maintenu

### Modèle économique Vinted
- **Commission** : Sur chaque vente via Stripe Connect
- **Paiements** : Sécurisés, argent libéré après livraison
- **Frais vendeur** : Transparents et compétitifs

### Spécificités produits locaux
- **Géolocalisation** : Recherche par proximité
- **Fraîcheur** : Gestion dates récolte/expiration
- **Saisonnalité** : Disponibilité par saison
- **Certifications** : Bio, AOC, local, etc.

## Technologies & Services

### Stack principale
- **Frontend** : Next.js 14, TypeScript, Tailwind CSS
- **Mobile** : React Native, Expo, React Navigation
- **Backend** : Node.js, Express, Prisma, PostgreSQL
- **Auth** : JWT + bcrypt
- **Paiements** : Stripe Connect
- **Images** : Cloudinary + Sharp
- **Maps** : Google Maps API
- **Email** : Resend
- **Cache** : Redis

### Développement
- **Monorepo** : NPM Workspaces
- **Types** : TypeScript partagé
- **Forms** : React Hook Form + Zod
- **State** : TanStack Query
- **Animations** : Framer Motion

## Base de Données

### Modèles principaux
- **User** : Utilisateurs (acheteurs/vendeurs)
- **Shop** : Boutiques personnalisées
- **Product** : Produits avec spécificités locales
- **Order** : Commandes avec workflow Vinted
- **Location** : Géolocalisation
- **Category** : Catégories spécialisées

### Relations clés
- User 1:1 Shop (optionnel)
- Product N:1 Category, User, Location  
- Order N:M Product (via OrderItem)
- Shop 1:1 ShopTheme + ShopCustomization

## Responsive & Mobile

### Approche Mobile-First
- **Tailwind** : Configuration mobile-first
- **Composants** : Versions web/mobile spécifiques
- **PWA** : App-like experience navigateurs
- **Navigation** : Adaptative selon device

### App Mobile Native
- **Features natives** : Camera, géoloc, push notifications
- **Performance** : Optimisée pour marketplace
- **Offline** : Cache intelligent produits locaux

## Thèmes & Customisation

### Système de thèmes
- **Prédéfinis** : 6 catégories (Nature, Moderne, etc.)
- **Personnalisation** : Couleurs, polices, layouts
- **Preview** : Temps réel dans l'éditeur
- **Cohérence** : Design tokens globaux

### Inspiration Erewhon
- **Esthétique** : Premium, naturel, épuré
- **Couleurs** : Tons terreux, verts naturels
- **Typographie** : Moderne mais chaleureuse
- **Photos** : Haute qualité, mise en valeur produits

## Déploiement

### Environnements
- **Development** : Local avec Docker Compose
- **Staging** : Vercel (web) + Railway (API)
- **Production** : À définir selon besoins

### CI/CD
- **Tests** : Automatisés sur PR
- **Build** : Multi-plateforme  
- **Deploy** : Automatique après merge

## Sécurité

- **Auth** : JWT sécurisé + refresh tokens
- **Paiements** : Stripe (PCI compliant)  
- **Images** : Upload sécurisé + modération
- **API** : Rate limiting + validation Zod
- **HTTPS** : SSL/TLS obligatoire

## Performance

### Web
- **Next.js** : SSR/SSG optimisé
- **Images** : Optimisation automatique
- **Cache** : Redis + CDN
- **Bundle** : Code splitting

### Mobile  
- **React Native** : Performance native
- **Images** : Cache intelligent
- **Offline** : Fonctionnalités essentielles

Cette architecture support la vision d'une marketplace moderne, performante et personnalisable pour les produits locaux.