import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/products/{id}/stock:
 *   get:
 *     summary: Récupérer le stock d'un produit
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
 *         description: Stock du produit récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stock:
 *                   type: integer
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Attendre que params soit résolu
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      select: { inventory: true }, // Utiliser inventory au lieu de stock
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Renvoyer inventory comme stock
    return NextResponse.json({ stock: product.inventory });
  } catch (error) {
    console.error("Erreur lors de la récupération du stock:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du stock" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/products/{id}/stock:
 *   put:
 *     summary: Mettre à jour le stock d'un produit
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
 *             required:
 *               - quantity
 *               - operation
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Quantité à ajouter ou soustraire
 *               operation:
 *                 type: string
 *                 enum: [increase, decrease, set]
 *                 description: Opération à effectuer (augmenter, diminuer ou définir)
 *     responses:
 *       200:
 *         description: Stock mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stock:
 *                   type: integer
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Attendre que params soit résolu
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const body = await request.json();
    const { quantity, operation } = body;

    if (
      typeof quantity !== "number" ||
      !["increase", "decrease", "set"].includes(operation)
    ) {
      return NextResponse.json(
        { error: "Paramètres invalides" },
        { status: 400 }
      );
    }

    // Récupérer le produit actuel
    const product = await prisma.product.findUnique({
      where: { id },
      select: { inventory: true }, // Utiliser inventory au lieu de stock
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Calculer le nouveau stock
    let newStock: number;
    switch (operation) {
      case "increase":
        newStock = product.inventory + quantity;
        break;
      case "decrease":
        newStock = Math.max(0, product.inventory - quantity);
        break;
      case "set":
        newStock = Math.max(0, quantity);
        break;
      default:
        newStock = product.inventory;
    }

    // Mettre à jour le stock
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { inventory: newStock }, // Utiliser inventory au lieu de stock
      select: { inventory: true }, // Utiliser inventory au lieu de stock
    });

    // Renvoyer inventory comme stock
    return NextResponse.json({ stock: updatedProduct.inventory });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du stock:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du stock" },
      { status: 500 }
    );
  }
}
