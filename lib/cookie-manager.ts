// Types de consentement aux cookies
export type ConsentType = "all" | "essential" | "none";

// Interface pour les options de cookies
interface CookieOptions {
  path?: string;
  domain?: string;
  expires?: Date | number;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

/**
 * Définir un cookie dans le navigateur
 * @param name Nom du cookie
 * @param value Valeur du cookie
 * @param options Options du cookie
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  if (typeof window === "undefined") return;

  const cookieOptions: CookieOptions = {
    path: "/",
    ...options,
  };

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (cookieOptions.path) {
    cookieString += `; path=${cookieOptions.path}`;
  }

  if (cookieOptions.domain) {
    cookieString += `; domain=${cookieOptions.domain}`;
  }

  if (cookieOptions.expires) {
    const expirationDate =
      typeof cookieOptions.expires === "number"
        ? new Date(Date.now() + cookieOptions.expires * 1000)
        : cookieOptions.expires;
    cookieString += `; expires=${expirationDate.toUTCString()}`;
  }

  if (cookieOptions.secure) {
    cookieString += "; secure";
  }

  if (cookieOptions.sameSite) {
    cookieString += `; samesite=${cookieOptions.sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * Récupérer un cookie par son nom
 * @param name Nom du cookie
 * @returns Valeur du cookie ou null si non trouvé
 */
export function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) =>
    c.startsWith(`${encodeURIComponent(name)}=`)
  );

  if (!cookie) return null;

  return decodeURIComponent(cookie.split("=")[1]);
}

/**
 * Supprimer un cookie
 * @param name Nom du cookie
 * @param options Options du cookie
 */
export function deleteCookie(name: string, options: CookieOptions = {}) {
  setCookie(name, "", {
    ...options,
    expires: new Date(0),
  });
}

/**
 * Vérifier si l'utilisateur a donné son consentement pour un type de cookie
 * @param type Type de consentement à vérifier
 * @returns true si l'utilisateur a donné son consentement, false sinon
 */
export function hasConsent(
  type: "analytics" | "marketing" | "essential"
): boolean {
  if (typeof window === "undefined") return false;

  const consent = localStorage.getItem("cookie-consent") as ConsentType | null;

  if (!consent) return false;
  if (consent === "all") return true;
  if (consent === "essential" && type === "essential") return true;

  return false;
}

/**
 * Définir le consentement aux cookies
 * @param type Type de consentement
 */
export function setConsent(type: ConsentType) {
  if (typeof window === "undefined") return;

  localStorage.setItem("cookie-consent", type);

  // Si l'utilisateur refuse tous les cookies, supprimer les cookies non essentiels
  if (type === "none" || type === "essential") {
    // Liste des cookies non essentiels à supprimer
    const nonEssentialCookies = ["_ga", "_gid", "_gat", "_fbp"];
    nonEssentialCookies.forEach((cookie) => deleteCookie(cookie));
  }
}

/**
 * Récupérer le type de consentement actuel
 * @returns Type de consentement ou null si non défini
 */
export function getConsent(): ConsentType | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("cookie-consent") as ConsentType | null;
}
