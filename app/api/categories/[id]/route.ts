import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie par son ID
 *     tags: [Catégories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Catégorie non trouvée
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
    // Attendre les paramètres avant d'y accéder
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de catégorie invalide" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        products: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Catégorie non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Erreur lors de la récupération de la catégorie:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la catégorie" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/categories/{id}:
 *   patch:
 *     summary: Mettre à jour une catégorie
 *     tags: [Catégories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la catégorie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de la catégorie
 *               description:
 *                 type: string
 *                 description: Description de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Catégorie non trouvée
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
    const body = await request.json();

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de catégorie invalide" },
        { status: 400 }
      );
    }

    const { name, description, image, parentId } = body;

    // Vérifier si la catégorie existe
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Catégorie non trouvée" },
        { status: 404 }
      );
    }

    // Générer un slug à partir du nom si le nom a changé
    let slug = existingCategory.slug;
    if (name && name !== existingCategory.name) {
      slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Vérifier si le nouveau slug existe déjà pour une autre catégorie
      const categoryWithSlug = await prisma.category.findFirst({
        where: {
          slug,
          id: { not: id },
        },
      });

      if (categoryWithSlug) {
        return NextResponse.json(
          { error: "Une catégorie avec ce nom existe déjà" },
          { status: 400 }
        );
      }
    }

    // Vérifier que la catégorie ne devient pas son propre parent
    if (parentId === id) {
      return NextResponse.json(
        { error: "Une catégorie ne peut pas être son propre parent" },
        { status: 400 }
      );
    }

    // Vérifier que le parent n'est pas un enfant de cette catégorie (éviter les cycles)
    if (parentId) {
      const children = await prisma.category.findMany({
        where: {
          parentId: id,
        },
      });

      const childIds = children.map((child) => child.id);
      if (childIds.includes(parentId)) {
        return NextResponse.json(
          { error: "Création d'un cycle de parenté impossible" },
          { status: 400 }
        );
      }
    }

    // Mettre à jour la catégorie
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: name || undefined,
        slug: slug || undefined,
        description: description || undefined,
        image: image || undefined,
        parentId: parentId === null ? null : parentId || undefined,
      },
      include: {
        parent: true,
        children: true,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la catégorie" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     tags: [Catégories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Catégorie non trouvée
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
    // Attendre les paramètres avant d'y accéder
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de catégorie invalide" },
        { status: 400 }
      );
    }

    // Vérifier si la catégorie existe
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
        children: true,
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Catégorie non trouvée" },
        { status: 404 }
      );
    }

    // Vérifier si la catégorie a des produits
    if (existingCategory.products.length > 0) {
      return NextResponse.json(
        {
          error: "Impossible de supprimer une catégorie contenant des produits",
        },
        { status: 400 }
      );
    }

    // Vérifier si la catégorie a des sous-catégories
    if (existingCategory.children.length > 0) {
      return NextResponse.json(
        {
          error:
            "Impossible de supprimer une catégorie contenant des sous-catégories",
        },
        { status: 400 }
      );
    }

    // Supprimer la catégorie
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la catégorie" },
      { status: 500 }
    );
  }
}
