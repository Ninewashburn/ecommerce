import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnecter un utilisateur
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Déconnexion réussie
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function POST() {
  try {
    // Supprimer les cookies d'authentification de manière asynchrone
    const cookieStore = await cookies();

    // Supprimer le cookie auth_token
    cookieStore.set("auth_token", "", {
      expires: new Date(0), // Date dans le passé pour expirer immédiatement
      path: "/",
    });

    return NextResponse.json({
      message: "Déconnexion réussie",
    });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return NextResponse.json(
      { error: "Erreur lors de la déconnexion" },
      { status: 500 }
    );
  }
}
