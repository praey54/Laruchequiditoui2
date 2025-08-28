-- Script d'initialisation PostgreSQL pour La Ruche Qui Dit Oui
-- Ce script est exécuté automatiquement au premier démarrage du container

-- Créer une extension pour UUID (si nécessaire)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Créer une extension pour les fonctions de text search (pour la recherche)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Créer une base de données de test (si nécessaire)
-- CREATE DATABASE larucheqs_test;

-- Commentaire d'information
SELECT 'Database larucheqs_dev initialized successfully' AS status;