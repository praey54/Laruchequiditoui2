export interface Location {
  id?: string;
  address: string;
  city: string;
  postalCode: string;
  region: string;
  country: string;
  coordinates: Coordinates;
  timezone?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationWithDistance extends Location {
  distance?: number; // Distance en km depuis un point de référence
}

// Types pour la recherche géographique
export interface LocationFilter {
  coordinates: Coordinates;
  radius: number; // Rayon en kilomètres
}

export interface GeoBounds {
  northeast: Coordinates;
  southwest: Coordinates;
}

// Régions françaises pour le filtrage
export const FRENCH_REGIONS = [
  'Auvergne-Rhône-Alpes',
  'Bourgogne-Franche-Comté', 
  'Bretagne',
  'Centre-Val de Loire',
  'Corse',
  'Grand Est',
  'Hauts-de-France',
  'Île-de-France',
  'Normandie',
  'Nouvelle-Aquitaine',
  'Occitanie',
  'Pays de la Loire',
  'Provence-Alpes-Côte d\'Azur',
  'Guadeloupe',
  'Martinique',
  'Guyane',
  'La Réunion',
  'Mayotte'
] as const;

export type FrenchRegion = typeof FRENCH_REGIONS[number];

// Utilitaires pour les calculs de distance
export interface DistanceCalculation {
  from: Coordinates;
  to: Coordinates;
  unit?: 'km' | 'miles';
}

export interface LocationAutocomplete {
  description: string;
  placeId: string;
  types: string[];
  coordinates?: Coordinates;
}