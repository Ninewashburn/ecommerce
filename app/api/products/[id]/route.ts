import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Récupérer un produit par son ID
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
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
export async function GET(request: Request, { params }: Params) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de produit invalide" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du produit" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Mettre à jour un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
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
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
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
 *       404:
 *         description: Produit non trouvé
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
export async function PUT(request: Request, { params }: Params) {
  try {
    // Attendre les paramètres avant d'y accéder
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de produit invalide" },
        { status: 400 }
      );
    }

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

    // Vérifier si le produit existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Générer un slug à partir du nom si le nom a changé
    let slug = existingProduct.slug;
    if (name && name !== existingProduct.name) {
      slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Vérifier si le nouveau slug existe déjà pour un autre produit
      const productWithSlug = await prisma.product.findFirst({
        where: {
          slug,
          id: { not: id },
        },
      });

      if (productWithSlug) {
        return NextResponse.json(
          { error: "Un produit avec ce nom existe déjà" },
          { status: 400 }
        );
      }
    }

    // Mettre à jour le produit
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name || undefined,
        slug: slug || undefined,
        description: description || undefined,
        price: price ? parseFloat(price) : undefined,
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        categoryId: categoryId || undefined,
        sku: sku || undefined,
        inventory: inventory ? parseInt(inventory) : undefined,
        isVisible: isVisible !== undefined ? Boolean(isVisible) : undefined,
        isNew: isNew !== undefined ? Boolean(isNew) : undefined,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
      },
    });

    // Mettre à jour les images si elles sont fournies
    if (images && images.length > 0) {
      // Supprimer les images existantes
      await prisma.productImage.deleteMany({
        where: { productId: id },
      });

      // Ajouter les nouvelles images
      await prisma.productImage.createMany({
        data: images.map(
          (image: { url: string; alt?: string }, index: number) => ({
            url: image.url,
            alt: image.alt || `${updatedProduct.name} image ${index + 1}`,
            position: index,
            productId: id,
          })
        ),
      });
    }

    // Récupérer le produit mis à jour avec ses images
    const productWithImages = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json(productWithImages);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du produit" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Produit non trouvé
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
export async function DELETE(request: Request, { params }: Params) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de produit invalide" },
        { status: 400 }
      );
    }

    // Vérifier si le produit existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Supprimer les images associées
    await prisma.productImage.deleteMany({
      where: { productId: id },
    });

    // Supprimer le produit
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du produit" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const body = await request.json();

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de produit invalide" },
        { status: 400 }
      );
    }

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

    // Vérifier si le produit existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Générer un slug à partir du nom si le nom a changé
    let slug = existingProduct.slug;
    if (name && name !== existingProduct.name) {
      slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Vérifier si le nouveau slug existe déjà pour un autre produit
      const productWithSlug = await prisma.product.findFirst({
        where: {
          slug,
          id: { not: id },
        },
      });

      if (productWithSlug) {
        return NextResponse.json(
          { error: "Un produit avec ce nom existe déjà" },
          { status: 400 }
        );
      }
    }

    // Mettre à jour le produit
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name || undefined,
        slug: slug || undefined,
        description: description || undefined,
        price: price ? parseFloat(price) : undefined,
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        categoryId: categoryId || undefined,
        sku: sku || undefined,
        inventory: inventory ? parseInt(inventory) : undefined,
        isVisible: isVisible !== undefined ? Boolean(isVisible) : undefined,
        isNew: isNew !== undefined ? Boolean(isNew) : undefined,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
      },
    });

    // Mettre à jour les images si elles sont fournies
    if (images && images.length > 0) {
      // Supprimer les images existantes
      await prisma.productImage.deleteMany({
        where: { productId: id },
      });

      // Ajouter les nouvelles images
      await prisma.productImage.createMany({
        data: images.map(
          (image: { url: string; alt?: string }, index: number) => ({
            url: image.url,
            alt: image.alt || `${updatedProduct.name} image ${index + 1}`,
            position: index,
            productId: id,
          })
        ),
      });
    }

    // Récupérer le produit mis à jour avec ses images
    const productWithImages = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json(productWithImages);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du produit" },
      { status: 500 }
    );
  }
}
