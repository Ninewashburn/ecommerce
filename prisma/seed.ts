import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Début du seeding...");

  // Nettoyer la base de données
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("Base de données nettoyée");

  // Créer un utilisateur admin
  const adminPassword = await hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: adminPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
    },
  });

  console.log("Utilisateur admin créé:", admin.email);

  // Créer un utilisateur client
  const userPassword = await hash("user123", 10);
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      password: userPassword,
      firstName: "Regular",
      lastName: "User",
      role: "CUSTOMER",
    },
  });

  console.log("Utilisateur client créé:", user.email);

  // Créer les catégories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Électronique",
        slug: "electronique",
        description: "Produits électroniques et gadgets",
      },
    }),
    prisma.category.create({
      data: {
        name: "Vêtements",
        slug: "vetements",
        description: "Vêtements et accessoires de mode",
      },
    }),
    prisma.category.create({
      data: {
        name: "Maison",
        slug: "maison",
        description: "Produits pour la maison et le jardin",
      },
    }),
    prisma.category.create({
      data: {
        name: "Sports",
        slug: "sports",
        description: "Équipements et vêtements de sport",
      },
    }),
    prisma.category.create({
      data: {
        name: "Livres",
        slug: "livres",
        description: "Livres, ebooks et publications",
      },
    }),
  ]);

  console.log(`${categories.length} catégories créées`);

  // Créer des produits
  const products = await Promise.all([
    // Produits Électronique
    prisma.product.create({
      data: {
        name: "Smartphone Pro Max",
        slug: "smartphone-pro-max",
        description:
          "Le dernier smartphone avec écran OLED, appareil photo 108MP et processeur ultra-rapide.",
        price: 999.99,
        comparePrice: 1099.99,
        categoryId: categories[0].id,
        sku: "ELEC-001",
        inventory: 50,
        isVisible: true,
        isNew: true,
        isFeatured: true,
        images: {
          create: [
            {
              url: "/images/products/smartphone-1.jpg",
              alt: "Smartphone Pro Max - Vue de face",
              position: 0,
            },
            {
              url: "/images/products/smartphone-2.jpg",
              alt: "Smartphone Pro Max - Vue arrière",
              position: 1,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Tablette Ultra",
        slug: "tablette-ultra",
        description:
          "Tablette légère et puissante avec écran 12 pouces et stylet inclus.",
        price: 649.99,
        comparePrice: 699.99,
        categoryId: categories[0].id,
        sku: "ELEC-002",
        inventory: 30,
        isVisible: true,
        isNew: true,
        isFeatured: false,
        images: {
          create: [
            {
              url: "/images/products/tablette-1.jpg",
              alt: "Tablette Ultra",
              position: 0,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Écouteurs sans fil",
        slug: "ecouteurs-sans-fil",
        description:
          "Écouteurs Bluetooth avec réduction de bruit active et autonomie de 24h.",
        price: 199.99,
        comparePrice: 249.99,
        categoryId: categories[0].id,
        sku: "ELEC-003",
        inventory: 100,
        isVisible: true,
        isNew: false,
        isFeatured: true,
        images: {
          create: [
            {
              url: "/images/products/ecouteurs-1.jpg",
              alt: "Écouteurs sans fil",
              position: 0,
            },
          ],
        },
      },
    }),

    // Produits Vêtements
    prisma.product.create({
      data: {
        name: "T-shirt Premium",
        slug: "t-shirt-premium",
        description: "T-shirt en coton bio de haute qualité, coupe régulière.",
        price: 29.99,
        comparePrice: null,
        categoryId: categories[1].id,
        sku: "VET-001",
        inventory: 200,
        isVisible: true,
        isNew: false,
        isFeatured: false,
        images: {
          create: [
            {
              url: "/images/products/t-shirt-1.jpg",
              alt: "T-shirt Premium",
              position: 0,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Jean Slim",
        slug: "jean-slim",
        description: "Jean slim en denim stretch confortable, lavage moyen.",
        price: 59.99,
        comparePrice: 79.99,
        categoryId: categories[1].id,
        sku: "VET-002",
        inventory: 150,
        isVisible: true,
        isNew: false,
        isFeatured: true,
        images: {
          create: [
            {
              url: "/images/products/jean-1.jpg",
              alt: "Jean Slim",
              position: 0,
            },
          ],
        },
      },
    }),

    // Produits Maison
    prisma.product.create({
      data: {
        name: "Lampe de bureau LED",
        slug: "lampe-bureau-led",
        description:
          "Lampe de bureau ajustable avec éclairage LED et port USB intégré.",
        price: 49.99,
        comparePrice: 59.99,
        categoryId: categories[2].id,
        sku: "MAIS-001",
        inventory: 75,
        isVisible: true,
        isNew: true,
        isFeatured: false,
        images: {
          create: [
            {
              url: "/images/products/lampe-1.jpg",
              alt: "Lampe de bureau LED",
              position: 0,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Ensemble de cuisine",
        slug: "ensemble-cuisine",
        description:
          "Ensemble de 5 ustensiles de cuisine en acier inoxydable avec support.",
        price: 39.99,
        comparePrice: null,
        categoryId: categories[2].id,
        sku: "MAIS-002",
        inventory: 60,
        isVisible: true,
        isNew: false,
        isFeatured: false,
        images: {
          create: [
            {
              url: "/images/products/ensemble-1.jpg",
              alt: "Ensemble de cuisine",
              position: 0,
            },
          ],
        },
      },
    }),

    // Produits Sports
    prisma.product.create({
      data: {
        name: "Ballon de football",
        slug: "ballon-football",
        description: "Ballon de football taille 5, qualité professionnelle.",
        price: 24.99,
        comparePrice: 29.99,
        categoryId: categories[3].id,
        sku: "SPORT-001",
        inventory: 120,
        isVisible: true,
        isNew: false,
        isFeatured: false,
        images: {
          create: [
            {
              url: "/images/products/ballon-1.jpg",
              alt: "Ballon de football",
              position: 0,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Tapis de yoga",
        slug: "tapis-yoga",
        description:
          "Tapis de yoga antidérapant, épaisseur 6mm, matériau écologique.",
        price: 34.99,
        comparePrice: null,
        categoryId: categories[3].id,
        sku: "SPORT-002",
        inventory: 80,
        isVisible: true,
        isNew: true,
        isFeatured: true,
        images: {
          create: [
            {
              url: "/images/products/tapis-1.jpg",
              alt: "Tapis de yoga",
              position: 0,
            },
          ],
        },
      },
    }),

    // Produits Livres
    prisma.product.create({
      data: {
        name: "Guide du développeur web",
        slug: "guide-developpeur-web",
        description:
          "Guide complet sur le développement web moderne avec JavaScript, React et Node.js.",
        price: 39.99,
        comparePrice: 45.99,
        categoryId: categories[4].id,
        sku: "LIVRE-001",
        inventory: 40,
        isVisible: true,
        isNew: false,
        isFeatured: true,
        images: {
          create: [
            {
              url: "/images/products/guide-1.jpg",
              alt: "Guide du développeur web",
              position: 0,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Roman bestseller",
        slug: "roman-bestseller",
        description:
          "Le dernier roman à succès de l'auteur renommé, une histoire captivante.",
        price: 19.99,
        comparePrice: null,
        categoryId: categories[4].id,
        sku: "LIVRE-002",
        inventory: 90,
        isVisible: true,
        isNew: true,
        isFeatured: false,
        images: {
          create: [
            {
              url: "/images/products/roman-1.jpg",
              alt: "Roman bestseller",
              position: 0,
            },
          ],
        },
      },
    }),
  ]);

  console.log(`${products.length} produits créés`);

  console.log("Seeding terminé !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
