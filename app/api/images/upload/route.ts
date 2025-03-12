import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";

/**
 * @swagger
 * /api/images/upload:
 *   post:
 *     summary: Télécharger une image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Fichier image à télécharger
 *     responses:
 *       200:
 *         description: Image téléchargée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL de l'image téléchargée
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
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Type de fichier non pris en charge. Utilisez JPG, PNG, WEBP ou GIF.",
        },
        { status: 400 }
      );
    }

    // Limiter la taille du fichier (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Le fichier est trop volumineux. Taille maximale: 5MB." },
        { status: 400 }
      );
    }

    // Générer un nom de fichier unique
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Chemin où sauvegarder le fichier
    const publicDir = path.join(process.cwd(), "public");
    const uploadDir = path.join(publicDir, "images", "products");
    const filePath = path.join(uploadDir, fileName);

    // Convertir le fichier en buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Écrire le fichier
    await writeFile(filePath, buffer);

    // URL relative pour accéder à l'image
    const imageUrl = `/images/products/${fileName}`;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image:", error);
    return NextResponse.json(
      { error: "Erreur lors du téléchargement de l'image" },
      { status: 500 }
    );
  }
}
