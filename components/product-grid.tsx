"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProducts, Product } from "@/lib/api";

interface ProductGridProps {
  filters: {
    categories: string[];
    priceRange: {
      min: number;
      max: number;
    };
    searchTerm?: string;
    isNew?: boolean;
    isFeatured?: boolean;
    isOnSale?: boolean;
  };
  sortOption: string;
}

// Déplacer cette fonction en dehors du composant pour éviter qu'elle soit recréée à chaque rendu
const getDefaultImageUrl = (productName: string) => {
  return `/placeholder.svg?text=${encodeURIComponent(productName)}`;
};

export default function ProductGrid({ filters, sortOption }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Utiliser useCallback pour éviter de recréer cette fonction à chaque rendu
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Utiliser useCallback pour éviter de recréer cette fonction à chaque rendu
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      fetchProducts();
    }
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchProducts, handleVisibilityChange]);

  // Utiliser useMemo pour calculer les produits filtrés uniquement lorsque les dépendances changent
  const filteredProducts = useMemo(() => {
    if (products.length === 0) return [];

    let result = [...products];

    // Ne montrer que les produits visibles
    result = result.filter((product) => product.isVisible);

    // Filtrer par terme de recherche
    if (filters.searchTerm && filters.searchTerm.trim() !== "") {
      const searchTermLower = filters.searchTerm.toLowerCase();
      result = result.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTermLower) ||
          product.description.toLowerCase().includes(searchTermLower) ||
          product.category.name.toLowerCase().includes(searchTermLower) ||
          (product.sku && product.sku.toLowerCase().includes(searchTermLower))
        );
      });
    }

    // Filtrer par nouveautés
    if (filters.isNew) {
      result = result.filter((product) => product.isNew);
    }

    // Filtrer par produits en vedette
    if (filters.isFeatured) {
      result = result.filter((product) => product.isFeatured);
    }

    // Filtrer par produits en promotion
    if (filters.isOnSale) {
      result = result.filter(
        (product) =>
          product.comparePrice !== null && product.comparePrice > product.price
      );
    }

    // Filtrer par catégorie
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter((product) => {
        // Vérifier si la catégorie correspond par nom
        const categoryNameMatch = filters.categories.includes(
          product.category.name
        );

        // Vérifier si la catégorie correspond par slug
        const categorySlugMatch = filters.categories.includes(
          product.category.slug
        );

        return categoryNameMatch || categorySlugMatch;
      });
    }

    // Filtrer par prix
    if (filters.priceRange) {
      result = result.filter(
        (product) =>
          Number(product.price) >= filters.priceRange.min &&
          Number(product.price) <= filters.priceRange.max
      );
    }

    // Appliquer le tri
    switch (sortOption) {
      case "price-low":
        return [...result].sort((a, b) => Number(a.price) - Number(b.price));
      case "price-high":
        return [...result].sort((a, b) => Number(b.price) - Number(a.price));
      case "newest":
        return [...result].sort((a, b) =>
          a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
        );
      case "featured":
      default:
        return [...result].sort((a, b) =>
          a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1
        );
    }
  }, [products, filters, sortOption]);

  // Utiliser useCallback pour éviter de recréer cette fonction à chaque rendu
  const toggleWishlist = useCallback((productId: number) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-muted animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {filters.searchTerm
            ? `Aucun produit ne correspond à votre recherche "${filters.searchTerm}".`
            : "Aucun produit ne correspond à vos critères de recherche."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="group relative">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
            <Image
              src={
                product.images[0]?.url && product.images[0].url !== "string"
                  ? product.images[0].url
                  : getDefaultImageUrl(product.name)
              }
              alt={
                product.images[0]?.alt && product.images[0].alt !== "string"
                  ? product.images[0].alt
                  : product.name
              }
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 z-10"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart
                className={`h-5 w-5 ${
                  wishlist.includes(product.id)
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
              />
              <span className="sr-only">Ajouter aux favoris</span>
            </Button>
            <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
              {product.isNew && <Badge>Nouveau</Badge>}
              {product.comparePrice && (
                <Badge variant="destructive">Promo</Badge>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm font-medium">
                <Link href={`/shop/${product.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.category.name}
              </p>
            </div>
            <div className="text-sm font-medium">
              {product.comparePrice ? (
                <div className="flex flex-col items-end">
                  <span className="text-destructive">
                    {Number(product.price).toFixed(2)} €
                  </span>
                  <span className="line-through text-muted-foreground text-xs">
                    {Number(product.comparePrice).toFixed(2)} €
                  </span>
                </div>
              ) : (
                <span>{Number(product.price).toFixed(2)} €</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
