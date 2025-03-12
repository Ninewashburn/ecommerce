"use client";

import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartDrawer } from "./cart-drawer";
import { useCart } from "@/lib/cart-context";
import { Badge } from "@/components/ui/badge";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function CartSheet() {
  const { cart, isCartOpen, openCart, closeCart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => (open ? openCart() : closeCart())}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={openCart}
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {itemCount}
            </Badge>
          )}
          <span className="sr-only">Ouvrir le panier</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0" hideCloseButton>
        <VisuallyHidden>
          <SheetTitle>Votre panier</SheetTitle>
        </VisuallyHidden>
        <CartDrawer open={isCartOpen} onClose={closeCart} />
      </SheetContent>
    </Sheet>
  );
}
