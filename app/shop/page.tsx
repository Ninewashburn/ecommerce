"use client";

import { useState, useCallback, useEffect } from "react";
import { Filter, RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductGrid from "@/components/product-grid";
import FilterSidebar from "@/components/filter-sidebar";
import SortDropdown from "@/components/sort-dropdown";
import { getProducts } from "@/lib/api";

interface FilterState {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  searchTerm?: string;
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const filterParam = searchParams.get("filter");

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    searchTerm: searchQuery || undefined,
    isNew: filterParam === "new" || undefined,
    isFeatured: filterParam === "featured" || undefined,
    isOnSale: filterParam === "sale" || undefined,
  });
  const [sortOption, setSortOption] = useState("featured");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mettre à jour les filtres lorsque les paramètres d'URL changent
  useEffect(() => {
    setActiveFilters((prev) => ({
      ...prev,
      searchTerm: searchQuery || undefined,
      isNew: filterParam === "new" || undefined,
      isFeatured: filterParam === "featured" || undefined,
      isOnSale: filterParam === "sale" || undefined,
    }));
  }, [searchQuery, filterParam]);

  const handleFilterChange = useCallback(
    (filters: FilterState) => {
      // Ne mettre à jour l'état que si les filtres ont réellement changé
      if (
        filters.categories.length !== activeFilters.categories.length ||
        !filters.categories.every((cat: string) =>
          activeFilters.categories.includes(cat)
        ) ||
        filters.priceRange.min !== activeFilters.priceRange.min ||
        filters.priceRange.max !== activeFilters.priceRange.max ||
        filters.searchTerm !== activeFilters.searchTerm ||
        filters.isNew !== activeFilters.isNew ||
        filters.isFeatured !== activeFilters.isFeatured ||
        filters.isOnSale !== activeFilters.isOnSale
      ) {
        setActiveFilters(filters);
      }
    },
    [activeFilters]
  );

  const handleSortChange = useCallback((option: string) => {
    setSortOption(option);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Forcer un rafraîchissement des données sans utiliser le cache
      await getProducts(true);
      // Incrémenter la clé pour forcer le rafraîchissement du composant ProductGrid
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des produits:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Déterminer le titre de la page en fonction des filtres
  const getPageTitle = () => {
    if (activeFilters.isNew) return "Nouveautés";
    if (activeFilters.isFeatured) return "Meilleures Ventes";
    if (activeFilters.isOnSale) return "Promotions";
    if (activeFilters.searchTerm)
      return `Résultats pour: ${activeFilters.searchTerm}`;
    return "Tous les Produits";
  };

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
        <p className="text-muted-foreground mb-8">
          Parcourez notre collection de produits premium
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Barre latérale de filtres pour ordinateur */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Bouton de filtre pour mobile */}
          <div className="lg:hidden mb-4">
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <FilterSidebar
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    onClose={() => setFilterOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex-1">
            {/* Contrôles de tri et de filtrage */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">
                Affichage des produits
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  title="Rafraîchir les produits"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                </Button>
                <SortDropdown
                  value={sortOption}
                  onValueChange={handleSortChange}
                />
              </div>
            </div>

            {/* Grille de produits */}
            <ProductGrid
              key={refreshKey}
              filters={activeFilters}
              sortOption={sortOption}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
