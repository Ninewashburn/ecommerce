"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
  stock: number;
  isVisible: boolean;
  isFeatured: boolean;
}

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (productId: number) => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  onWishlistToggle,
  isWishlisted = false,
}: ProductCardProps) {
  const { addToCart, openCart } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock > 0) {
      try {
        await addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });

        toast({
          title: "Produit ajouté au panier",
          description: `${product.name} a été ajouté à votre panier.`,
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
    } else {
      toast({
        title: "Produit indisponible",
        description: "Ce produit est actuellement en rupture de stock.",
        variant: "destructive",
      });
    }
  };

  const getDefaultImageUrl = () => {
    return "/placeholder.svg";
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Link href={`/shop/${product.id}`}>
          <Image
            src={product.image || getDefaultImageUrl()}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {onWishlistToggle && (
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 rounded-full bg-background/80 ${
              isWishlisted ? "text-red-500" : "text-muted-foreground"
            }`}
            onClick={() => onWishlistToggle(product.id)}
          >
            <Heart
              className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
            />
            <span className="sr-only">
              {isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
            </span>
          </Button>
        )}

        {product.isFeatured && (
          <Badge className="absolute top-2 left-2">Populaire</Badge>
        )}
      </div>

      <CardContent className="flex-grow p-4">
        <Link href={`/shop/${product.id}`} className="block">
          <h3 className="font-medium line-clamp-1 hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-2">
          <div className="font-medium">{product.price.toFixed(2)} €</div>
          <div
            className={`text-sm ${
              product.stock > 0 ? "text-muted-foreground" : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `${product.stock} en stock`
              : "Rupture de stock"}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? "Ajouter au panier" : "Indisponible"}
        </Button>
      </CardFooter>
    </Card>
  );
}
