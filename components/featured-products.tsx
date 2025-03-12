"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProducts, Product } from "@/lib/api";

// Déplacer cette fonction en dehors du composant pour éviter qu'elle soit recréée à chaque rendu
const getDefaultImageUrl = (productName: string) => {
  return `/placeholder.svg?text=${encodeURIComponent(productName)}`;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Utiliser useCallback pour éviter de recréer cette fonction à chaque rendu
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const featuredProducts = await getFeaturedProducts();
      setProducts(featuredProducts);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des produits vedettes:",
        error
      );
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-muted animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Aucun produit vedette disponible pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
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
              priority={product.id === products[0]?.id}
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
