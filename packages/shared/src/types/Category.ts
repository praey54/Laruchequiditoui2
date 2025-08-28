export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
  subcategories: Subcategory[];
  parentId?: string;
  imageUrl?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

// Catégories principales pour les produits locaux
export const DEFAULT_CATEGORIES = [
  {
    name: 'Fruits & Légumes',
    slug: 'fruits-legumes',
    icon: '🥕',
    color: '#10B981',
    subcategories: [
      'Légumes racines',
      'Légumes feuilles', 
      'Fruits d\'été',
      'Fruits d\'hiver',
      'Aromates & Herbes',
      'Champignons'
    ]
  },
  {
    name: 'Produits Laitiers',
    slug: 'produits-laitiers', 
    icon: '🧀',
    color: '#F59E0B',
    subcategories: [
      'Fromages',
      'Lait',
      'Yaourts',
      'Beurre & Crème',
      'Œufs'
    ]
  },
  {
    name: 'Viandes & Poissons',
    slug: 'viandes-poissons',
    icon: '🥩',
    color: '#DC2626',
    subcategories: [
      'Bœuf',
      'Porc', 
      'Volaille',
      'Agneau',
      'Poissons',
      'Fruits de mer'
    ]
  },
  {
    name: 'Céréales & Légumineuses',
    slug: 'cereales-legumineuses',
    icon: '🌾',
    color: '#92400E',
    subcategories: [
      'Blé & Farines',
      'Riz',
      'Avoine',
      'Légumineuses',
      'Graines & Noix'
    ]
  },
  {
    name: 'Produits Transformés',
    slug: 'produits-transformes',
    icon: '🍯',
    color: '#7C2D12',
    subcategories: [
      'Confitures & Miels',
      'Conserves',
      'Pains & Pâtisseries',
      'Boissons',
      'Huiles & Vinaigres'
    ]
  },
  {
    name: 'Plantes & Jardinage',
    slug: 'plantes-jardinage',
    icon: '🌱',
    color: '#059669',
    subcategories: [
      'Plants potagers',
      'Plantes aromatiques',
      'Fleurs',
      'Arbustes',
      'Graines',
      'Matériel jardinage'
    ]
  },
  {
    name: 'Artisanat Local',
    slug: 'artisanat-local',
    icon: '🎨',
    color: '#7C3AED',
    subcategories: [
      'Textiles',
      'Céramique',
      'Bois',
      'Cosmétiques naturels',
      'Savons',
      'Décoration'
    ]
  }
] as const;

export type CategorySlug = typeof DEFAULT_CATEGORIES[number]['slug'];