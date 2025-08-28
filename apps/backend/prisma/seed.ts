import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create categories
  console.log('📦 Creating categories...');
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Fruits & Légumes',
        slug: 'fruits-legumes',
        description: 'Produits frais du jardin et des vergers',
        icon: '🥕',
        color: '#10B981',
        order: 1,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Produits Laitiers',
        slug: 'produits-laitiers',
        description: 'Fromages, lait, yaourts et œufs locaux',
        icon: '🧀',
        color: '#F59E0B',
        order: 2,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Plantes & Jardinage',
        slug: 'plantes-jardinage',
        description: 'Plants, graines et matériel de jardinage',
        icon: '🌱',
        color: '#059669',
        order: 3,
        isActive: true,
      },
    }),
  ]);

  // Create locations
  console.log('📍 Creating locations...');
  const locations = await Promise.all([
    prisma.location.create({
      data: {
        address: '123 Rue des Jardins',
        city: 'Lyon',
        postalCode: '69000',
        region: 'Auvergne-Rhône-Alpes',
        country: 'France',
        latitude: 45.7640,
        longitude: 4.8357,
      },
    }),
    prisma.location.create({
      data: {
        address: '456 Avenue de la Nature',
        city: 'Bordeaux',
        postalCode: '33000',
        region: 'Nouvelle-Aquitaine',
        country: 'France',
        latitude: 44.8378,
        longitude: -0.5792,
      },
    }),
  ]);

  // Create test users
  console.log('👥 Creating users...');
  const hashedPassword = await hash('password123', 12);
  
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'marie.jardinier@example.com',
        username: 'marie_jardinier',
        name: 'Marie Jardinier',
        firstName: 'Marie',
        lastName: 'Jardinier',
        role: 'SELLER',
        isVerified: true,
        rating: 4.8,
        reviewCount: 25,
        locationId: locations[0].id,
        profile: {
          create: {
            bio: 'Passionnée de jardinage depuis 15 ans, je cultive mes légumes bio dans mon potager lyonnais.',
            website: 'https://jardin-marie.fr',
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'pierre.producteur@example.com',
        username: 'pierre_producteur',
        name: 'Pierre Producteur',
        firstName: 'Pierre',
        lastName: 'Producteur',
        role: 'SELLER',
        isVerified: true,
        rating: 4.9,
        reviewCount: 42,
        locationId: locations[1].id,
        profile: {
          create: {
            bio: 'Producteur local de fruits et légumes bio près de Bordeaux.',
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'sophie.acheteur@example.com',
        username: 'sophie_acheteur',
        name: 'Sophie Martin',
        firstName: 'Sophie',
        lastName: 'Martin',
        role: 'USER',
        isVerified: true,
        rating: 4.7,
        reviewCount: 8,
        locationId: locations[0].id,
        profile: {
          create: {
            bio: 'Amatrice de produits locaux et de cuisine bio.',
          },
        },
      },
    }),
  ]);

  // Create shops for sellers
  console.log('🏪 Creating shops...');
  const shops = await Promise.all([
    prisma.shop.create({
      data: {
        name: 'Le Potager de Marie',
        slug: 'potager-marie',
        description: 'Légumes bio et de saison cultivés avec amour dans la région lyonnaise.',
        ownerId: users[0].id,
        locationId: locations[0].id,
        theme: {
          create: {
            name: 'Nature Pure',
            category: 'NATURE',
            colors: JSON.stringify({
              primary: '#059669',
              secondary: '#92400E',
              accent: '#F59E0B',
            }),
            fonts: JSON.stringify({
              heading: 'Inter',
              body: 'Inter',
            }),
            layout: JSON.stringify({
              headerStyle: 'CLASSIC',
              productCardStyle: 'CLASSIC',
            }),
            isCustom: false,
          },
        },
        customization: {
          create: {
            welcomeMessage: 'Bienvenue dans mon petit coin de verdure !',
            story: 'Depuis 2008, je cultive mes légumes en respectant la nature et les saisons. Chaque produit est cueilli à maturité pour vous offrir le meilleur de mon jardin.',
            specialties: ['Légumes bio', 'Aromates', 'Légumes anciens'],
            openingHours: JSON.stringify({
              tuesday: { isOpen: true, slots: [{ start: '14:00', end: '18:00' }] },
              wednesday: { isOpen: true, slots: [{ start: '9:00', end: '12:00' }, { start: '14:00', end: '18:00' }] },
              friday: { isOpen: true, slots: [{ start: '14:00', end: '19:00' }] },
              saturday: { isOpen: true, slots: [{ start: '8:00', end: '13:00' }] },
            }),
            deliveryInfo: JSON.stringify({
              methods: ['PICKUP', 'HOME_DELIVERY'],
              zones: [
                { name: 'Lyon Centre', radius: 5, price: 3, estimatedTime: '2-4h' },
                { name: 'Grand Lyon', radius: 15, price: 5, estimatedTime: '1 jour' },
              ],
              freeDeliveryThreshold: 25,
            }),
            socialMedia: JSON.stringify({
              instagram: '@potager_marie',
              facebook: 'potager.marie.lyon',
            }),
            customSections: JSON.stringify([]),
          },
        },
      },
    }),
    prisma.shop.create({
      data: {
        name: 'Ferme Pierre & Fils',
        slug: 'ferme-pierre-fils',
        description: 'Exploitation familiale bio depuis 3 générations près de Bordeaux.',
        ownerId: users[1].id,
        locationId: locations[1].id,
        theme: {
          create: {
            name: 'Campagne Authentique',
            category: 'RUSTIC',
            colors: JSON.stringify({
              primary: '#7C2D12',
              secondary: '#166534',
              accent: '#DC2626',
            }),
            fonts: JSON.stringify({
              heading: 'Inter',
              body: 'Inter',
            }),
            layout: JSON.stringify({
              headerStyle: 'CLASSIC',
              productCardStyle: 'MAGAZINE',
            }),
            isCustom: false,
          },
        },
        customization: {
          create: {
            welcomeMessage: 'Producteurs passionnés depuis 3 générations',
            story: 'Notre ferme familiale existe depuis 1952. Nous avons fait le choix du bio en 1998 pour préserver notre terre et votre santé.',
            specialties: ['Fruits de saison', 'Légumes bio', 'Produits transformés'],
            openingHours: JSON.stringify({
              monday: { isOpen: true, slots: [{ start: '14:00', end: '18:00' }] },
              wednesday: { isOpen: true, slots: [{ start: '9:00', end: '18:00' }] },
              friday: { isOpen: true, slots: [{ start: '9:00', end: '18:00' }] },
              saturday: { isOpen: true, slots: [{ start: '8:00', end: '15:00' }] },
            }),
            deliveryInfo: JSON.stringify({
              methods: ['PICKUP', 'PICKUP_POINT'],
              zones: [
                { name: 'Bordeaux et environs', radius: 20, price: 4, estimatedTime: '1-2 jours' },
              ],
              minimumOrder: 15,
            }),
            socialMedia: JSON.stringify({
              website: 'ferme-pierre-fils.com',
              instagram: '@fermepierre33',
            }),
            customSections: JSON.stringify([]),
          },
        },
      },
    }),
  ]);

  // Create sample products
  console.log('🥬 Creating products...');
  const products = await Promise.all([
    prisma.product.create({
      data: {
        title: 'Tomates cerises bio',
        description: 'Tomates cerises cultivées en pleine terre, variété ancienne "Rose de Berne". Goût authentique et sucré.',
        price: 4.50,
        originalPrice: 6.00,
        currency: 'EUR',
        status: 'ACTIVE',
        condition: 'NEW',
        quantity: 20,
        unit: 'BASKET',
        tags: ['bio', 'tomate', 'cerise', 'local', 'lyon'],
        image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
        isOrganic: true,
        isFresh: true,
        distance: '2 km',
        sellerId: users[0].id,
        shopId: shops[0].id,
        categoryId: categories[0].id,
        locationId: locations[0].id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800',
              alt: 'Tomates cerises bio dans un panier',
              order: 1,
              isMain: true,
            },
          ],
        },
        specifications: {
          create: {
            weight: 0.5,
            origin: 'Lyon, France',
            variety: 'Rose de Berne',
            season: ['SUMMER', 'AUTUMN'],
            certifications: ['ORGANIC', 'LOCAL'],
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Courgettes du jardin',
        description: 'Courgettes fraîches récoltées le matin même. Parfaites pour ratatouilles et gratins.',
        price: 2.80,
        currency: 'EUR',
        status: 'ACTIVE',
        condition: 'NEW',
        quantity: 15,
        unit: 'KG',
        tags: ['bio', 'courgette', 'local', 'frais'],
        image: 'https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=400&h=300&fit=crop',
        isOrganic: true,
        isFresh: true,
        distance: '4 km',
        sellerId: users[0].id,
        shopId: shops[0].id,
        categoryId: categories[0].id,
        locationId: locations[0].id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=800',
              alt: 'Courgettes fraîches du jardin',
              order: 1,
              isMain: true,
            },
          ],
        },
        specifications: {
          create: {
            origin: 'Lyon, France',
            season: ['SUMMER'],
            certifications: ['ORGANIC', 'LOCAL'],
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Pêches de Bordeaux',
        description: 'Pêches juteuses et parfumées, récoltées à parfaite maturité dans nos vergers bordelais.',
        price: 5.20,
        currency: 'EUR',
        status: 'ACTIVE',
        condition: 'NEW',
        quantity: 10,
        unit: 'KG',
        tags: ['bio', 'pêche', 'fruit', 'bordeaux', 'sucré'],
        image: 'https://images.unsplash.com/photo-1629828874514-e4faa9886eef?w=400&h=300&fit=crop',
        isOrganic: true,
        isFresh: true,
        distance: '8 km',
        harvestDate: new Date('2024-08-15'),
        expirationDate: new Date('2024-08-30'),
        sellerId: users[1].id,
        shopId: shops[1].id,
        categoryId: categories[0].id,
        locationId: locations[1].id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1629828874514-e4faa9886eef?w=800',
              alt: 'Pêches mûres de Bordeaux',
              order: 1,
              isMain: true,
            },
          ],
        },
        specifications: {
          create: {
            origin: 'Bordeaux, France',
            variety: 'Pêche de vigne',
            season: ['SUMMER'],
            certifications: ['ORGANIC', 'LOCAL'],
          },
        },
      },
    }),
  ]);

  console.log('✅ Database seeding completed!');
  console.log(`Created:`);
  console.log(`- ${categories.length} categories`);
  console.log(`- ${locations.length} locations`);
  console.log(`- ${users.length} users`);
  console.log(`- ${shops.length} shops`);
  console.log(`- ${products.length} products`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });