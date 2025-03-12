"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageUpload from "@/components/image-upload";
import { getCategories, Category } from "@/lib/api";
import { X } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);

  // État du formulaire
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    categoryId: "",
    sku: "",
    inventory: "0",
    isVisible: true,
    isNew: false,
    isFeatured: false,
  });

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Gérer les changements de champs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gérer les changements de checkbox
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Gérer les changements de select
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Ajouter une image
  const handleImageUpload = (url: string) => {
    if (url) {
      setProductImages((prev) => [...prev, url]);
    }
  };

  // Supprimer une image
  const handleRemoveImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          comparePrice: formData.comparePrice
            ? parseFloat(formData.comparePrice)
            : null,
          categoryId: parseInt(formData.categoryId),
          inventory: parseInt(formData.inventory),
          images: productImages.map((url, index) => ({
            url,
            alt: `${formData.name} image ${index + 1}`,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de la création du produit"
        );
      }

      // Rediriger vers la liste des produits
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Erreur lors de la création du produit"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Ajouter un produit</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informations de base */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
              <CardDescription>
                Informations essentielles du produit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryId">Catégorie *</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) =>
                    handleSelectChange("categoryId", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Prix et inventaire */}
          <Card>
            <CardHeader>
              <CardTitle>Prix et inventaire</CardTitle>
              <CardDescription>Gestion des prix et du stock</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (€) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comparePrice">Prix barré (€)</Label>
                  <Input
                    id="comparePrice"
                    name="comparePrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.comparePrice}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inventory">Stock *</Label>
                  <Input
                    id="inventory"
                    name="inventory"
                    type="number"
                    min="0"
                    value={formData.inventory}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isVisible"
                    checked={formData.isVisible}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("isVisible", checked as boolean)
                    }
                  />
                  <Label htmlFor="isVisible">Visible</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isNew"
                    checked={formData.isNew}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("isNew", checked as boolean)
                    }
                  />
                  <Label htmlFor="isNew">Nouveau</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("isFeatured", checked as boolean)
                    }
                  />
                  <Label htmlFor="isFeatured">Mis en avant</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Images du produit</CardTitle>
              <CardDescription>
                Ajoutez des images pour votre produit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ImageUpload onImageUpload={handleImageUpload} />

                {productImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                    {productImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-square overflow-hidden rounded-md border">
                          <img
                            src={url}
                            alt={`Image ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Création en cours..." : "Créer le produit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
