"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import { toast } from "@/components/ui/use-toast";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = items.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simuler un traitement de commande
    setTimeout(() => {
      toast({
        title: "Commande passée avec succès",
        description: "Merci pour votre achat !",
      });
      clearCart();
      router.push("/");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Retour</span>
          </Button>
          <h1 className="text-2xl font-bold">Votre Panier</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Votre panier est vide
            </h2>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas encore ajouté de produits à votre panier.
            </p>
            <Button onClick={() => router.push("/shop")}>
              Continuer vos achats
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Articles ({items.length})
                  </h2>
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image
                            src={
                              item.product.images[0]?.url || "/placeholder.svg"
                            }
                            alt={item.product.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">
                                <Link
                                  href={`/shop/${item.id}`}
                                  className="hover:underline"
                                >
                                  {item.product.name}
                                </Link>
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {item.product.category.name}
                              </p>
                            </div>
                            <p className="font-medium">
                              {(item.product.price * item.quantity).toFixed(2)}{" "}
                              €
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Diminuer</span>
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                disabled={
                                  item.quantity >= item.product.inventory
                                }
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Augmenter</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Supprimer</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm p-6 space-y-4 sticky top-20">
                <h2 className="text-lg font-semibold">Récapitulatif</h2>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Livraison</span>
                    <span>{shipping.toFixed(2)} €</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "Traitement en cours..."
                    : "Passer la commande"}
                </Button>

                <div className="text-center">
                  <Button
                    variant="link"
                    className="text-sm"
                    onClick={() => router.push("/shop")}
                  >
                    Continuer vos achats
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
