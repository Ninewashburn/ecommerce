"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h2 className="text-lg font-semibold">Votre Panier</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
          <span className="sr-only">Fermer</span>
        </Button>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">Votre panier est vide</p>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Ajoutez des produits à votre panier pour commencer vos achats.
          </p>
          <Button
            onClick={() => {
              onClose();
              router.push("/shop");
            }}
          >
            Continuer mes achats
          </Button>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 p-4">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {(item.price || 0).toFixed(2)} €
                    </div>
                    <div className="flex items-center mt-auto">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        <span>-</span>
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <span>+</span>
                      </Button>
                      <div className="ml-auto font-medium">
                        {((item.price || 0) * item.quantity).toFixed(2)} €
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex justify-between mb-2">
              <span>Sous-total</span>
              <span>{(totalPrice || 0).toFixed(2)} €</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Livraison</span>
              <span>Gratuite</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold mb-6">
              <span>Total</span>
              <span>{(totalPrice || 0).toFixed(2)} €</span>
            </div>
            <div className="space-y-2">
              <Button
                className="w-full"
                onClick={() => {
                  onClose();
                  router.push("/checkout");
                }}
              >
                Passer commande
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  onClose();
                  router.push("/shop");
                }}
              >
                Continuer mes achats
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
