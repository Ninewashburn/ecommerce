"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { getCategories, Category } from "@/lib/api";

interface FilterSidebarProps {
  activeFilters: {
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
  onFilterChange: (filters: {
    categories: string[];
    priceRange: {
      min: number;
      max: number;
    };
    searchTerm?: string;
    isNew?: boolean;
    isFeatured?: boolean;
    isOnSale?: boolean;
  }) => void;
  onClose?: () => void;
}

export default function FilterSidebar({
  activeFilters,
  onFilterChange,
  onClose,
}: FilterSidebarProps) {
  const [categories, setCategories] = useState<string[]>(
    activeFilters.categories || []
  );
  const [priceRange, setPriceRange] = useState(
    activeFilters.priceRange || { min: 0, max: 1000 }
  );
  const [priceValues, setPriceValues] = useState<number[]>([
    priceRange.min,
    priceRange.max,
  ]);
  const [isNew, setIsNew] = useState(activeFilters.isNew || false);
  const [isFeatured, setIsFeatured] = useState(
    activeFilters.isFeatured || false
  );
  const [isOnSale, setIsOnSale] = useState(activeFilters.isOnSale || false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les catégories disponibles
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categoriesData = await getCategories();
        setAvailableCategories(categoriesData.map((category) => category.name));
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Mettre à jour le composant parent lorsque les filtres changent
  useEffect(() => {
    // Ne mettre à jour le parent que lorsque les valeurs changent réellement
    const newMin = priceValues[0];
    const newMax = priceValues[1];

    // Vérifier si les valeurs sont réellement différentes avant de mettre à jour
    if (
      categories.length !== activeFilters.categories?.length ||
      !categories.every((cat) => activeFilters.categories?.includes(cat)) ||
      newMin !== activeFilters.priceRange?.min ||
      newMax !== activeFilters.priceRange?.max ||
      isNew !== activeFilters.isNew ||
      isFeatured !== activeFilters.isFeatured ||
      isOnSale !== activeFilters.isOnSale
    ) {
      onFilterChange({
        categories,
        priceRange: {
          min: newMin,
          max: newMax,
        },
        searchTerm: activeFilters.searchTerm,
        isNew: isNew || undefined,
        isFeatured: isFeatured || undefined,
        isOnSale: isOnSale || undefined,
      });
    }
  }, [
    categories,
    priceValues,
    isNew,
    isFeatured,
    isOnSale,
    activeFilters,
    onFilterChange,
  ]);

  const handleCategoryChange = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handlePriceChange = (values: number[]) => {
    setPriceValues(values);
  };

  const handleClearFilters = () => {
    setCategories([]);
    setPriceValues([0, 1000]);
    setIsNew(false);
    setIsFeatured(false);
    setIsOnSale(false);
    // Conserver le terme de recherche lors de l'effacement des filtres
    onFilterChange({
      categories: [],
      priceRange: {
        min: 0,
        max: 1000,
      },
      searchTerm: activeFilters.searchTerm,
      isNew: undefined,
      isFeatured: undefined,
      isOnSale: undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtres</h3>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </Button>
        )}
      </div>

      {activeFilters.searchTerm && (
        <div>
          <h4 className="font-medium mb-3">Recherche</h4>
          <div className="flex items-center justify-between">
            <div className="text-sm">{activeFilters.searchTerm}</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onFilterChange({
                  ...activeFilters,
                  searchTerm: undefined,
                });
              }}
            >
              <X className="h-3 w-3 mr-1" />
              Effacer
            </Button>
          </div>
          <Separator className="my-3" />
        </div>
      )}

      <div>
        <h4 className="font-medium mb-3">Type de produit</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="filter-new"
              checked={isNew}
              onCheckedChange={(checked) => setIsNew(checked === true)}
            />
            <Label
              htmlFor="filter-new"
              className="text-sm font-normal cursor-pointer"
            >
              Nouveautés
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="filter-featured"
              checked={isFeatured}
              onCheckedChange={(checked) => setIsFeatured(checked === true)}
            />
            <Label
              htmlFor="filter-featured"
              className="text-sm font-normal cursor-pointer"
            >
              Meilleures ventes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="filter-sale"
              checked={isOnSale}
              onCheckedChange={(checked) => setIsOnSale(checked === true)}
            />
            <Label
              htmlFor="filter-sale"
              className="text-sm font-normal cursor-pointer"
            >
              Promotions
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-3">Catégories</h4>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {availableCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={categories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-4">Fourchette de Prix</h4>
        <Slider
          defaultValue={priceValues}
          min={0}
          max={1000}
          step={10}
          value={priceValues}
          onValueChange={handlePriceChange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <div className="bg-muted px-2 py-1 rounded text-sm">
            {priceValues[0]} €
          </div>
          <div className="bg-muted px-2 py-1 rounded text-sm">
            {priceValues[1]} €
          </div>
        </div>
      </div>

      <Separator />

      <Button variant="outline" className="w-full" onClick={handleClearFilters}>
        Effacer les Filtres
      </Button>
    </div>
  );
}
