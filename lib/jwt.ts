import jwt from "jsonwebtoken";

// Clé secrète pour signer les tokens JWT
// Dans un environnement de production, cette clé devrait être stockée dans des variables d'environnement
const JWT_SECRET = process.env.JWT_SECRET || "votre_cle_secrete_jwt";

// Durée de validité du token (en secondes)
const JWT_EXPIRES_IN = 60 * 60 * 24 * 30; // 30 jours

interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Génère un token JWT pour un utilisateur
 * @param payload Les données à inclure dans le token
 * @returns Le token JWT généré
 */
export function generateJwtToken(payload: JwtPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token as string);
        }
      }
    );
  });
}

/**
 * Vérifie et décode un token JWT
 * @param token Le token JWT à vérifier
 * @returns Les données décodées du token
 */
export function verifyJwtToken(token: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
}

/**
 * Décode un token JWT sans vérifier sa signature
 * Utile pour extraire des informations d'un token expiré
 * @param token Le token JWT à décoder
 * @returns Les données décodées du token
 */
export function decodeJwtToken(token: string): JwtPayload | null {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch (error) {
    console.error("Erreur lors du décodage du token JWT:", error);
    return null;
  }
}
