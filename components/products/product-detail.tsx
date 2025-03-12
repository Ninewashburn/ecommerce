"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { getProductById, Product } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import { toast } from "@/components/ui/use-toast";

interface ProductDetailProps {
  id: string;
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart, openCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productData = await getProductById(parseInt(id));
        if (productData) {
          setProduct(productData);
        } else {
          setError("Produit non trouvé");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
        setError("Erreur lors de la récupération du produit");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && (!product || value <= product.inventory)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      try {
        const result = await addToCart({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.images[0]?.url || "/placeholder.svg",
          quantity: quantity
        });
        
        // Même si l'ajout est limité par le stock, on considère que c'est un succès
        toast({
          title: "Produit ajouté au panier",
          description: `${quantity} x ${product.name} ajouté(s) à votre panier`,
          variant: "default"
        });
        
        // Ouvrir le panier après l'ajout
        openCart();
      } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'ajout au panier.",
          variant: "destructive",
        });
      }
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (loading) {
    return null; // Le squelette est géré par le composant parent
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <p className="text-muted-foreground mb-6">
            {error ||
              "Le produit que vous recherchez n'existe pas ou a été supprimé."}
          </p>
          <Button onClick={() => router.push("/shop")}>
            Retour à la boutique
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Galerie d'images */}
        <div className="md:w-1/2 space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[selectedImage]?.url || "/placeholder.svg"}
              alt={product.images[selectedImage]?.alt || product.name}
              fill
              className="object-cover object-center"
            />
            <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
              {product.isNew && <Badge>Nouveau</Badge>}
              {product.comparePrice && (
                <Badge variant="destructive">Promo</Badge>
              )}
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square overflow-hidden rounded-md border ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt || `${product.name} image ${index + 1}`}
                    fill
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informations produit */}
        <div className="md:w-1/2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.category.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-5 w-5 text-yellow-500"
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(12 avis)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">
              {Number(product.price).toFixed(2)} €
            </span>
            {product.comparePrice && (
              <span className="text-lg text-muted-foreground line-through">
                {Number(product.comparePrice).toFixed(2)} €
              </span>
            )}
            {product.comparePrice && (
              <Badge variant="destructive">
                -
                {Math.round(
                  ((Number(product.comparePrice) - Number(product.price)) /
                    Number(product.comparePrice)) *
                    100
                )}
                %
              </Badge>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {product.sku && (
              <div className="flex items-center gap-2">
                <span className="font-medium">SKU:</span>
                <span className="text-muted-foreground">{product.sku}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="font-medium">Disponibilité:</span>
              <span
                className={
                  product.inventory > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.inventory > 0
                  ? `En stock (${product.inventory} disponibles)`
                  : "Rupture de stock"}
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantité:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.inventory}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 flex items-center gap-2"
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
              >
                <ShoppingCart className="h-5 w-5" />
                Ajouter au panier
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleWishlist}
                className={isWishlisted ? "text-red-500" : ""}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets d'informations supplémentaires */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full border-b rounded-none justify-start">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-6">
            <div className="prose max-w-none">
              <h3>Caractéristiques du produit</h3>
              <p>{product.description}</p>
              <ul>
                <li>Caractéristique 1</li>
                <li>Caractéristique 2</li>
                <li>Caractéristique 3</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">4.8</div>
                <div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 text-yellow-500"
                        fill={star <= 4 ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-sm">Basé sur 12 avis</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">Client Satisfait</div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 text-yellow-500"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Excellent produit, je suis très satisfait de mon achat. La
                    qualité est au rendez-vous !
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">Acheteur Régulier</div>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 text-yellow-500"
                          fill="currentColor"
                        />
                      ))}
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Bon produit dans l'ensemble, mais quelques petits défauts.
                    Je recommande quand même.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
