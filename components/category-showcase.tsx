"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories, getProductsByCategory, Category } from "@/lib/api";

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<
    (Category & { count: number })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesWithCount = async () => {
      setLoading(true);
      try {
        const categoriesData = await getCategories();

        // Pour chaque catégorie, compter le nombre de produits
        const categoriesWithCount = await Promise.all(
          categoriesData.map(async (category) => {
            const products = await getProductsByCategory(category.id);
            return {
              ...category,
              count: products.length,
            };
          })
        );

        setCategories(categoriesWithCount);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithCount();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-square bg-muted animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Aucune catégorie disponible pour le moment.
        </p>
      </div>
    );
  }

  // Limiter à 3 catégories pour l'affichage
  const displayCategories = categories.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {displayCategories.map((category) => (
        <Link
          key={category.id}
          href={`/shop?category=${category.slug}`}
          className="group relative overflow-hidden rounded-lg"
        >
          <div className="aspect-square relative">
            {/* Utiliser une image par défaut car les catégories n'ont pas d'images dans notre modèle */}
            <Image
              src={`/placeholder.svg?height=600&width=600&text=${category.name}`}
              alt={category.name}
              fill
              priority={category.id === displayCategories[0]?.id}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <p className="text-sm">{category.count} produits</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
