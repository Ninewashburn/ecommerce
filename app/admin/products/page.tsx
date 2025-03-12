"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { getProducts, Product, deleteProduct } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  // Filtrer les produits en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.category.name.toLowerCase().includes(term) ||
          (product.sku && product.sku.toLowerCase().includes(term))
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedProducts.length === 0) return;

    try {
      // Supprimer chaque produit sélectionné
      const deletePromises = selectedProducts.map((productId) =>
        deleteProduct(productId)
      );

      await Promise.all(deletePromises);

      // Mettre à jour l'état local après la suppression réussie
      const updatedProducts = products.filter(
        (product) => !selectedProducts.includes(product.id)
      );
      setProducts(updatedProducts);

      toast({
        title: "Produits supprimés",
        description: `${selectedProducts.length} produit(s) ont été supprimés avec succès.`,
      });

      setSelectedProducts([]);
    } catch (error) {
      console.error("Erreur lors de la suppression multiple:", error);
      toast({
        title: "Erreur",
        description:
          "Impossible de supprimer certains produits. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (
    productId: number,
    productName: string
  ) => {
    try {
      await deleteProduct(productId);

      // Mettre à jour l'état local après la suppression réussie
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);

      toast({
        title: "Produit supprimé",
        description: `Le produit "${productName}" a été supprimé avec succès.`,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const getDefaultImageUrl = (productName: string) => {
    return `/placeholder.svg?text=${encodeURIComponent(productName)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produits</h1>
          <p className="text-muted-foreground">
            Gérez les produits de votre boutique
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un produit
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des produits</CardTitle>
          <CardDescription>
            {filteredProducts.length} produits trouvés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des produits..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {selectedProducts.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Supprimer ({selectedProducts.length})
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucun produit trouvé</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedProducts.length === filteredProducts.length &&
                          filteredProducts.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                        aria-label="Sélectionner tous les produits"
                      />
                    </TableHead>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={(checked) =>
                            handleSelectProduct(product.id, checked === true)
                          }
                          aria-label={`Sélectionner ${product.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="relative h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={
                              product.images[0]?.url &&
                              product.images[0].url !== "string"
                                ? product.images[0].url
                                : getDefaultImageUrl(product.name)
                            }
                            alt={product.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.category.name}</TableCell>
                      <TableCell>
                        {product.comparePrice ? (
                          <div>
                            <span className="text-destructive">
                              {Number(product.price).toFixed(2)} €
                            </span>
                            <span className="text-xs text-muted-foreground line-through ml-2">
                              {Number(product.comparePrice).toFixed(2)} €
                            </span>
                          </div>
                        ) : (
                          <span>{Number(product.price).toFixed(2)} €</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            product.inventory <= 0
                              ? "text-destructive"
                              : product.inventory < 5
                              ? "text-amber-500"
                              : "text-green-500"
                          }
                        >
                          {product.inventory}
                        </span>
                      </TableCell>
                      <TableCell>
                        {!product.isVisible ? (
                          <Badge variant="outline">Masqué</Badge>
                        ) : product.isNew ? (
                          <Badge>Nouveau</Badge>
                        ) : product.isFeatured ? (
                          <Badge variant="secondary">En vedette</Badge>
                        ) : (
                          <Badge variant="outline">Visible</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(`/shop/${product.id}`, "_blank")
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Voir
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                (window.location.href = `/admin/products/edit/${product.id}`)
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() =>
                                handleDeleteProduct(product.id, product.name)
                              }
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
