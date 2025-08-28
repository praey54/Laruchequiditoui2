// Système de thèmes pour les boutiques personnalisables

export interface ShopThemeConfig {
  id: string;
  name: string;
  category: ThemeCategory;
  isPremium: boolean;
  colors: ThemeColorPalette;
  typography: ThemeTypography;
  layout: ThemeLayoutConfig;
  components: ThemeComponentStyles;
  customCSS?: string;
  previewImage: string;
}

export enum ThemeCategory {
  NATURE = 'NATURE',         // Tons verts, bois, naturel
  MODERN = 'MODERN',         // Design épuré, minimaliste
  RUSTIC = 'RUSTIC',        // Style campagne, authentique
  ELEGANT = 'ELEGANT',       // Sophistiqué, premium
  COLORFUL = 'COLORFUL',     // Vif, énergique
  MINIMALIST = 'MINIMALIST'  // Ultra-clean, simple
}

export interface ThemeColorPalette {
  primary: string;           // Couleur principale
  primaryLight: string;      // Variant clair
  primaryDark: string;       // Variant foncé
  secondary: string;         // Couleur secondaire
  accent: string;           // Couleur d'accentuation
  background: string;       // Arrière-plan principal
  backgroundAlt: string;    // Arrière-plan alternatif
  surface: string;          // Surface des cartes/composants
  text: {
    primary: string;        // Texte principal
    secondary: string;      // Texte secondaire
    muted: string;         // Texte atténué
    inverse: string;       // Texte inversé (sur foncé)
  };
  border: string;          // Couleur des bordures
  success: string;         // Couleur succès
  warning: string;         // Couleur avertissement
  error: string;          // Couleur erreur
  info: string;           // Couleur information
}

export interface ThemeTypography {
  fontFamilies: {
    heading: string;        // Police des titres
    body: string;          // Police du texte
    accent: string;        // Police décorative
  };
  fontSizes: {
    xs: string;           // Extra small
    sm: string;           // Small
    base: string;         // Base
    lg: string;           // Large
    xl: string;           // Extra large
    '2xl': string;        // 2X large
    '3xl': string;        // 3X large
    '4xl': string;        // 4X large
  };
  fontWeights: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeLayoutConfig {
  containerMaxWidth: string;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  headerStyle: HeaderStyle;
  productCardStyle: ProductCardStyle;
  navigationStyle: NavigationStyle;
}

export enum HeaderStyle {
  CLASSIC = 'CLASSIC',     // Header traditionnel avec logo centré
  MODERN = 'MODERN',       // Header moderne avec navigation horizontale
  MINIMAL = 'MINIMAL',     // Header minimaliste
  SPLIT = 'SPLIT'         // Header divisé logo/navigation
}

export enum ProductCardStyle {
  CLASSIC = 'CLASSIC',     // Carte classique avec image + infos
  MODERN = 'MODERN',       // Carte moderne avec overlay
  MINIMAL = 'MINIMAL',     // Carte minimaliste
  MAGAZINE = 'MAGAZINE'    // Style magazine avec grandes images
}

export enum NavigationStyle {
  HORIZONTAL = 'HORIZONTAL',  // Navigation horizontale
  SIDEBAR = 'SIDEBAR',       // Barre latérale
  HAMBURGER = 'HAMBURGER',   // Menu burger
  TABS = 'TABS'             // Onglets
}

export interface ThemeComponentStyles {
  button: ComponentVariants;
  card: ComponentVariants;
  input: ComponentVariants;
  badge: ComponentVariants;
  navigation: ComponentVariants;
}

export interface ComponentVariants {
  default: ComponentStyle;
  variants?: {
    [key: string]: ComponentStyle;
  };
}

export interface ComponentStyle {
  className?: string;
  styles?: Record<string, any>;
}

// Thèmes prédéfinis inspirés d'Erewhon
export const PREDEFINED_THEMES: Partial<ShopThemeConfig>[] = [
  {
    name: 'Nature Pure',
    category: ThemeCategory.NATURE,
    colors: {
      primary: '#059669',      // Vert émeraude
      secondary: '#92400E',    // Brun terre
      accent: '#F59E0B',      // Ambre
      background: '#FEFEFE',   // Blanc cassé
      surface: '#F9FAFB'      // Gris très clair
    }
  },
  {
    name: 'Élégance Moderne',
    category: ThemeCategory.ELEGANT,
    colors: {
      primary: '#1F2937',      // Gris anthracite
      secondary: '#6B7280',    // Gris moyen
      accent: '#D97706',      // Orange brûlé
      background: '#FFFFFF',   // Blanc pur
      surface: '#F8FAFC'      // Gris glacier
    }
  },
  {
    name: 'Campagne Authentique',
    category: ThemeCategory.RUSTIC,
    colors: {
      primary: '#7C2D12',      // Brun roux
      secondary: '#166534',    // Vert forêt
      accent: '#DC2626',      // Rouge cardinal
      background: '#FEF7ED',   // Crème
      surface: '#FEF3C7'      // Jaune pâle
    }
  }
];

// Configuration responsive pour les thèmes
export interface ResponsiveThemeConfig {
  mobile: Partial<ThemeLayoutConfig>;
  tablet: Partial<ThemeLayoutConfig>;
  desktop: Partial<ThemeLayoutConfig>;
}

// Customisation avancée
export interface ThemeCustomization {
  shopId: string;
  themeId: string;
  customColors?: Partial<ThemeColorPalette>;
  customTypography?: Partial<ThemeTypography>;
  customLayout?: Partial<ThemeLayoutConfig>;
  customCSS?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}