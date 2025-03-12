// Types
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  categoryId: number;
  category: Category;
  sku: string | null;
  inventory: number;
  isVisible: boolean;
  isNew: boolean;
  isFeatured: boolean;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: number;
  url: string;
  alt: string | null;
  position: number;
  productId: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

// Cache pour les requêtes API
interface Cache<T> {
  data: T | null;
  timestamp: number;
  expiresIn: number; // en millisecondes
}

const cache = {
  products: { data: null, timestamp: 0, expiresIn: 60000 } as Cache<Product[]>, // 1 minute
  categories: { data: null, timestamp: 0, expiresIn: 300000 } as Cache<
    Category[]
  >, // 5 minutes
};

// Fonction utilitaire pour vérifier si le cache est valide
const isCacheValid = <T>(cache: Cache<T>): boolean => {
  if (!cache.data) return false;
  const now = Date.now();
  return now - cache.timestamp < cache.expiresIn;
};

// Fonctions API
export async function getProducts(forceFresh = false) {
  try {
    // Vérifier le cache si on ne force pas un rafraîchissement
    if (!forceFresh && isCacheValid(cache.products)) {
      return cache.products.data as Product[];
    }

    // Ajouter un paramètre timestamp pour éviter la mise en cache du navigateur
    const timestamp = Date.now();
    const response = await fetch(`/api/products?t=${timestamp}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits");
    }
    const data = await response.json();

    // Mettre à jour le cache
    cache.products = {
      data,
      timestamp: Date.now(),
      expiresIn: cache.products.expiresIn,
    };

    return data as Product[];
  } catch (error) {
    console.error("Erreur API:", error);
    // En cas d'erreur, retourner les données en cache si disponibles
    return cache.products.data || [];
  }
}

export async function getFeaturedProducts() {
  try {
    const products = await getProducts();
    return products.filter((product) => product.isFeatured);
  } catch (error) {
    console.error("Erreur API:", error);
    return [];
  }
}

export async function getProductById(id: number) {
  try {
    // Pour les détails d'un produit spécifique, toujours faire une requête fraîche
    const response = await fetch(`/api/products/${id}?t=${Date.now()}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du produit");
    }
    const data = await response.json();
    return data as Product;
  } catch (error) {
    console.error("Erreur API:", error);
    return null;
  }
}

export async function getCategories(forceFresh = false) {
  try {
    // Vérifier le cache si on ne force pas un rafraîchissement
    if (!forceFresh && isCacheValid(cache.categories)) {
      return cache.categories.data as Category[];
    }

    const response = await fetch(`/api/categories?t=${Date.now()}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des catégories");
    }
    const data = await response.json();

    // Mettre à jour le cache
    cache.categories = {
      data,
      timestamp: Date.now(),
      expiresIn: cache.categories.expiresIn,
    };

    return data as Category[];
  } catch (error) {
    console.error("Erreur API:", error);
    // En cas d'erreur, retourner les données en cache si disponibles
    return cache.categories.data || [];
  }
}

export async function getCategoryById(id: number) {
  try {
    // Pour les détails d'une catégorie spécifique, toujours faire une requête fraîche
    const response = await fetch(`/api/categories/${id}?t=${Date.now()}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de la catégorie");
    }
    const data = await response.json();
    return data as Category;
  } catch (error) {
    console.error("Erreur API:", error);
    return null;
  }
}

export async function getProductsByCategory(categoryId: number) {
  try {
    const products = await getProducts();
    return products.filter((product) => product.categoryId === categoryId);
  } catch (error) {
    console.error("Erreur API:", error);
    return [];
  }
}

export async function deleteProduct(id: number) {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du produit");
    }

    // Invalider le cache des produits pour forcer un rechargement
    cache.products = {
      data: null,
      timestamp: 0,
      expiresIn: cache.products.expiresIn,
    };

    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
}
