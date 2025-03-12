import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyJwtToken } from "@/lib/jwt";

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Utilisateur non trouvé
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
export async function GET(request: Request) {
  try {
    // Récupérer le token d'authentification depuis les headers
    const authHeader = request.headers.get("authorization");
    let userId: number | null = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Extraire le token du header
      const token = authHeader.substring(7);
      try {
        // Vérifier et décoder le token
        const decoded = await verifyJwtToken(token);
        userId = decoded.userId;
      } catch (error) {
        console.error("Erreur de vérification du token:", error);
      }
    }

    // Si pas de token valide dans les headers, essayer avec les cookies
    if (!userId) {
      try {
        // Utilisation correcte de l'API cookies() dans les API routes (asynchrone)
        const cookieStore = await cookies();
        // Récupérer directement le cookie auth_token
        const authToken = cookieStore.get("auth_token");

        if (authToken?.value) {
          try {
            const decoded = await verifyJwtToken(authToken.value);
            userId = decoded.userId;
          } catch (error) {
            console.error("Erreur de vérification du cookie token:", error);
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'accès aux cookies:", error);
      }
    }

    // Si toujours pas d'ID utilisateur, renvoyer une erreur d'authentification
    if (!userId) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Récupérer l'utilisateur depuis la base de données
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Retourner les informations de l'utilisateur sans le mot de passe
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'utilisateur" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Mettre à jour les informations de l'utilisateur connecté
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *               lastName:
 *                 type: string
 *                 description: Nom de famille de l'utilisateur
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de l'utilisateur
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     description: Rue
 *                   city:
 *                     type: string
 *                     description: Ville
 *                   postalCode:
 *                     type: string
 *                     description: Code postal
 *                   country:
 *                     type: string
 *                     description: Pays
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur mises à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Utilisateur non trouvé
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
export async function PUT(request: Request) {
  try {
    // Récupérer le token d'authentification depuis les headers
    const authHeader = request.headers.get("authorization");
    let userId: number | null = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Extraire le token du header
      const token = authHeader.substring(7);
      try {
        // Vérifier et décoder le token
        const decoded = await verifyJwtToken(token);
        userId = decoded.userId;
      } catch (error) {
        console.error("Erreur de vérification du token:", error);
      }
    }

    // Si pas de token valide dans les headers, essayer avec les cookies
    if (!userId) {
      try {
        // Utilisation correcte de l'API cookies() dans les API routes (asynchrone)
        const cookieStore = await cookies();
        // Récupérer directement le cookie auth_token
        const authToken = cookieStore.get("auth_token");

        if (authToken?.value) {
          try {
            const decoded = await verifyJwtToken(authToken.value);
            userId = decoded.userId;
          } catch (error) {
            console.error("Erreur de vérification du cookie token:", error);
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'accès aux cookies:", error);
      }
    }

    // Si toujours pas d'ID utilisateur, renvoyer une erreur d'authentification
    if (!userId) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Récupérer les données du corps de la requête
    const body = await request.json();
    const { firstName, lastName, email, address } = body;

    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email && email !== existingUser.email) {
      const userWithEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (userWithEmail && userWithEmail.id !== existingUser.id) {
        return NextResponse.json(
          { error: "Cet email est déjà utilisé par un autre utilisateur" },
          { status: 400 }
        );
      }
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        email: email || undefined,
      },
      include: {
        addresses: true,
      },
    });

    // Gérer l'adresse
    if (
      address &&
      (address.street || address.city || address.postalCode || address.country)
    ) {
      // Vérifier si l'utilisateur a déjà une adresse par défaut
      const defaultAddress = existingUser.addresses.find(
        (addr) => addr.isDefault
      );

      if (defaultAddress) {
        // Mettre à jour l'adresse existante
        await prisma.address.update({
          where: { id: defaultAddress.id },
          data: {
            street: address.street || defaultAddress.street,
            city: address.city || defaultAddress.city,
            postalCode: address.postalCode || defaultAddress.postalCode,
            country: address.country || defaultAddress.country,
          },
        });
      } else {
        // Créer une nouvelle adresse
        await prisma.address.create({
          data: {
            street: address.street || "",
            city: address.city || "",
            postalCode: address.postalCode || "",
            country: address.country || "",
            isDefault: true,
            userId: existingUser.id,
          },
        });
      }
    }

    // Récupérer l'utilisateur mis à jour avec ses adresses
    const refreshedUser = await prisma.user.findUnique({
      where: { id: existingUser.id },
      include: {
        addresses: true,
      },
    });

    if (!refreshedUser) {
      throw new Error("Impossible de récupérer l'utilisateur mis à jour");
    }

    // Retourner les informations de l'utilisateur sans le mot de passe
    const { password, ...userWithoutPassword } = refreshedUser;

    return NextResponse.json({
      message: "Profil mis à jour avec succès",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'utilisateur" },
      { status: 500 }
    );
  }
}
