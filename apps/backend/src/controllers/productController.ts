import { Request, Response } from 'express';
import { db } from '../lib/db';

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: 'Product ID is required'
      });
    }

    // Mock data for testing until database is fully set up
    const mockProducts: { [key: string]: any } = {
      '1': {
        id: '1',
        title: 'Tomates cerises bio du jardin',
        description: 'Tomates cerises cultivées en pleine terre, variété ancienne "Rose de Berne". Goût authentique et sucré, parfaites pour vos salades et apéritifs. Récoltées à maturité pour vous offrir le meilleur de notre jardin.',
        price: 4.50,
        originalPrice: 6.00,
        images: [
          'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'
        ],
        seller: {
          id: 'seller1',
          name: 'Marie Jardinier',
          location: 'Lyon 3e',
          rating: 4.8,
          reviewCount: 25,
          avatar: null
        },
        category: 'fruits & légumes',
        isOrganic: true,
        isFresh: true,
        distance: '2 km',
        timeAgo: '2h',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      '2': {
        id: '2',
        title: 'Fromage de chèvre fermier',
        description: 'Fromage de chèvre artisanal fabriqué dans notre ferme selon des méthodes traditionnelles. Lait de chèvres élevées en plein air sur nos prairies. Goût crémeux et authentique.',
        price: 8.50,
        images: [
          'https://images.unsplash.com/photo-1486297678162-eb2a19b2a6cf?w=400&h=300&fit=crop'
        ],
        seller: {
          id: 'seller2',
          name: 'Ferme du Soleil',
          location: 'Villeurbanne',
          rating: 4.9,
          reviewCount: 42,
          avatar: null
        },
        category: 'produits laitiers',
        isOrganic: true,
        isFresh: false,
        distance: '5 km',
        timeAgo: '1h',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      '3': {
        id: '3',
        title: 'Plants de basilic en pot',
        description: 'Plants de basilic grand vert cultivés en serre. Parfaits pour vos cuisines méditerranéennes. Livrés en pots biodégradables prêts à planter ou à garder en intérieur.',
        price: 3.20,
        images: [
          'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=300&fit=crop'
        ],
        seller: {
          id: 'seller3',
          name: 'Pépinière Verte',
          location: 'Caluire',
          rating: 4.7,
          reviewCount: 18,
          avatar: null
        },
        category: 'plantes & jardinage',
        isOrganic: true,
        isFresh: false,
        distance: '3 km',
        timeAgo: '4h',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };

    const product = mockProducts[id];

    if (!product) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    res.json(product);

  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { 
      page = '1', 
      limit = '20', 
      category, 
      search,
      minPrice,
      maxPrice,
      isOrganic,
      isFresh
    } = req.query;

    // Mock data for testing until database is fully set up
    const allMockProducts = [
      {
        id: '1',
        title: 'Tomates cerises bio du jardin',
        price: 4.50,
        originalPrice: 6.00,
        image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
        seller: {
          name: 'Marie Jardinier',
          location: 'Lyon 3e',
          rating: 4.8
        },
        category: 'fruits & légumes',
        isOrganic: true,
        isFresh: true,
        distance: '2 km',
        timeAgo: '2h'
      },
      {
        id: '2',
        title: 'Fromage de chèvre fermier',
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b2a6cf?w=400&h=300&fit=crop',
        seller: {
          name: 'Ferme du Soleil',
          location: 'Villeurbanne',
          rating: 4.9
        },
        category: 'produits laitiers',
        isOrganic: true,
        isFresh: false,
        distance: '5 km',
        timeAgo: '1h'
      },
      {
        id: '3',
        title: 'Plants de basilic en pot',
        price: 3.20,
        image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=300&fit=crop',
        seller: {
          name: 'Pépinière Verte',
          location: 'Caluire',
          rating: 4.7
        },
        category: 'plantes & jardinage',
        isOrganic: true,
        isFresh: false,
        distance: '3 km',
        timeAgo: '4h'
      },
      {
        id: '4',
        title: 'Courgettes fraîches du matin',
        price: 2.80,
        image: 'https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=400&h=300&fit=crop',
        seller: {
          name: 'Potager de Paul',
          location: 'Bron',
          rating: 4.6
        },
        category: 'fruits & légumes',
        isOrganic: true,
        isFresh: true,
        distance: '4 km',
        timeAgo: '30min'
      },
      {
        id: '5',
        title: 'Miel de lavande artisanal',
        price: 12.00,
        originalPrice: 15.00,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
        seller: {
          name: 'Rucher des Collines',
          location: 'Meyzieu',
          rating: 5.0
        },
        category: 'artisanat local',
        isOrganic: true,
        isFresh: false,
        distance: '8 km',
        timeAgo: '3h'
      }
    ];

    // Apply filters to mock data
    let filteredProducts = [...allMockProducts];

    if (category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase().includes((category as string).toLowerCase())
      );
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice as string));
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice as string));
    }

    if (isOrganic === 'true') {
      filteredProducts = filteredProducts.filter(p => p.isOrganic);
    }

    if (isFresh === 'true') {
      filteredProducts = filteredProducts.filter(p => p.isFresh);
    }

    // Apply pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    const paginatedProducts = filteredProducts.slice(skip, skip + limitNum);

    const totalCount = filteredProducts.length;
    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      products: paginatedProducts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
    });
  }
};

// Helper function to calculate time ago
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}j`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}sem`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mois`;
}