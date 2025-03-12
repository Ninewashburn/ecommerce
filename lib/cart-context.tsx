"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => Promise<boolean>;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => Promise<boolean>;
  clearCart: () => void;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Charger le panier depuis le localStorage au chargement
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error);
      }
    }
  }, []);

  // Sauvegarder le panier dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Calculer le prix total du panier
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  // Ajouter un produit au panier
  const addToCart = async (product: CartItem): Promise<boolean> => {
    // Vérifier le stock disponible
    try {
      const response = await fetch(`/api/products/${product.id}/stock`);

      if (!response.ok) {
        // Si l'API n'est pas disponible, ajouter quand même au panier
        console.warn(
          "Impossible de vérifier le stock, ajout au panier sans vérification"
        );

        const existingItemIndex = cart.findIndex(
          (item) => item.id === product.id
        );

        if (existingItemIndex !== -1) {
          const existingItem = cart[existingItemIndex];
          const updatedCart = [...cart];
          updatedCart[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + product.quantity,
          };
          setCart(updatedCart);
        } else {
          setCart([...cart, product]);
        }

        return true;
      }

      const data = await response.json();

      // Vérifier si la réponse contient une erreur
      if (data.error) {
        console.warn("Erreur lors de la vérification du stock:", data.error);
        // En cas d'erreur, ajouter quand même au panier
        const existingItemIndex = cart.findIndex(
          (item) => item.id === product.id
        );

        if (existingItemIndex !== -1) {
          const existingItem = cart[existingItemIndex];
          const updatedCart = [...cart];
          updatedCart[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + product.quantity,
          };
          setCart(updatedCart);
        } else {
          setCart([...cart, product]);
        }

        return true;
      }

      // Utiliser une valeur par défaut de 10 si le stock n'est pas disponible
      const availableStock = data.stock !== undefined ? data.stock : 10;

      // Vérifier si le produit est déjà dans le panier
      const existingItemIndex = cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Le produit est déjà dans le panier
        const existingItem = cart[existingItemIndex];
        const newQuantity = existingItem.quantity + product.quantity;

        // Vérifier si la nouvelle quantité dépasse le stock disponible
        if (newQuantity > availableStock) {
          // Si oui, limiter à la quantité disponible
          const updatedCart = [...cart];
          updatedCart[existingItemIndex] = {
            ...existingItem,
            quantity: availableStock,
          };
          setCart(updatedCart);
          return false; // Indiquer que l'ajout a été limité
        } else {
          // Sinon, mettre à jour la quantité
          const updatedCart = [...cart];
          updatedCart[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
          };
          setCart(updatedCart);
          return true; // Indiquer que l'ajout a réussi
        }
      } else {
        // Le produit n'est pas encore dans le panier
        // Vérifier si la quantité demandée est disponible
        if (product.quantity > availableStock) {
          // Si non, ajouter avec la quantité disponible
          setCart([...cart, { ...product, quantity: availableStock }]);
          return false; // Indiquer que l'ajout a été limité
        } else {
          // Sinon, ajouter normalement
          setCart([...cart, product]);
          return true; // Indiquer que l'ajout a réussi
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      // En cas d'erreur, ajouter quand même au panier
      const existingItemIndex = cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        const existingItem = cart[existingItemIndex];
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + product.quantity,
        };
        setCart(updatedCart);
      } else {
        setCart([...cart, product]);
      }

      return true; // Indiquer que l'ajout a réussi
    }
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = async (
    productId: number,
    quantity: number
  ): Promise<boolean> => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return true;
    }

    try {
      // Vérifier le stock disponible
      const response = await fetch(`/api/products/${productId}/stock`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de la vérification du stock"
        );
      }

      const availableStock = data.stock;

      // Limiter la quantité au stock disponible
      const newQuantity = Math.min(quantity, availableStock);

      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      return newQuantity === quantity; // Indiquer si la mise à jour a été limitée
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la quantité:", error);

      // En cas d'erreur, mettre à jour quand même
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );

      return true; // Indiquer que la mise à jour a réussi
    }
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Ouvrir le panier
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Fermer le panier
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Nombre d'articles dans le panier
  const itemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
