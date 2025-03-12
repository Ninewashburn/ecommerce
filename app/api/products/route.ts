import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du produit
 *               description:
 *                 type: string
 *                 description: Description du produit
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Prix du produit
 *               comparePrice:
 *                 type: number
 *                 format: float
 *                 description: Prix de comparaison (ancien prix)
 *               categoryId:
 *                 type: integer
 *                 description: ID de la catégorie
 *               sku:
 *                 type: string
 *                 description: Code SKU du produit
 *               inventory:
 *                 type: integer
 *                 description: Quantité en stock
 *               isVisible:
 *                 type: boolean
 *                 description: Visibilité du produit
 *               isNew:
 *                 type: boolean
 *                 description: Indique si le produit est nouveau
 *               isFeatured:
 *                 type: boolean
 *                 description: Indique si le produit est mis en avant
 *               images:
 *                 type: array
 *                 description: Images du produit
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     alt:
 *                       type: string
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      description,
      price,
      comparePrice,
      categoryId,
      sku,
      inventory,
      isVisible,
      isNew,
      isFeatured,
      images,
    } = body;

    // Générer un slug à partir du nom
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Vérifier si le slug existe déjà
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: "Un produit avec ce nom existe déjà" },
        { status: 400 }
      );
    }

    // Créer le produit
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        categoryId,
        sku,
        inventory: parseInt(inventory),
        isVisible: Boolean(isVisible),
        isNew: Boolean(isNew),
        isFeatured: Boolean(isFeatured),
      },
    });

    // Ajouter les images si elles existent
    if (images && images.length > 0) {
      await prisma.productImage.createMany({
        data: images.map(
          (image: { url: string; alt?: string }, index: number) => ({
            url: image.url,
            alt: image.alt || `${name} image ${index + 1}`,
            position: index,
            productId: product.id,
          })
        ),
      });
    }

    // Récupérer le produit avec ses images
    const productWithImages = await prisma.product.findUnique({
      where: { id: product.id },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json(productWithImages, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du produit" },
      { status: 500 }
    );
  }
}
