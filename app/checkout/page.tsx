"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import PaymentMethods from "@/components/payment/payment-methods";
import { useAuth } from "@/lib/auth-context";

export default function CheckoutPage() {
  const { cart, clearCart, totalPrice } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">(
    "shipping"
  );
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Pré-remplir les informations si l'utilisateur est connecté
  useEffect(() => {
    if (user && user.firstName) {
      setShippingInfo((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address:
          user.addresses && user.addresses.length > 0
            ? user.addresses[0].street
            : "",
        city:
          user.addresses && user.addresses.length > 0
            ? user.addresses[0].city
            : "",
        postalCode:
          user.addresses && user.addresses.length > 0
            ? user.addresses[0].postalCode
            : "",
        country:
          user.addresses && user.addresses.length > 0
            ? user.addresses[0].country
            : "France",
      }));
    }
  }, [user]);

  // Rediriger vers la page d'accueil si le panier est vide
  useEffect(() => {
    if (cart.length === 0 && !isProcessing) {
      router.push("/");
    }
  }, [cart, router, isProcessing]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSuccess = async () => {
    setIsProcessing(true);

    try {
      // Simuler une requête API pour créer une commande
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mettre à jour les stocks (dans un environnement réel, cela serait fait côté serveur)
      const updateStockPromises = cart.map((item) =>
        fetch(`/api/products/${item.id}/stock`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: item.quantity,
            operation: "decrease",
          }),
        })
      );

      await Promise.all(updateStockPromises);

      // Vider le panier
      clearCart();

      // Passer à l'étape de confirmation
      setStep("confirmation");

      toast({
        title: "Commande confirmée",
        description: "Votre commande a été traitée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors du traitement de votre commande.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (step === "confirmation") {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Commande confirmée</CardTitle>
            <CardDescription>
              Merci pour votre achat ! Votre commande a été traitée avec succès.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <h3 className="text-xl font-medium mb-2">Numéro de commande</h3>
              <p className="text-2xl font-bold">{`ORD-${Date.now()
                .toString()
                .substring(5)}`}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Détails de livraison</h3>
              <p>{`${shippingInfo.firstName} ${shippingInfo.lastName}`}</p>
              <p>{shippingInfo.address}</p>
              <p>{`${shippingInfo.postalCode} ${shippingInfo.city}`}</p>
              <p>{shippingInfo.country}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">
                Récapitulatif de la commande
              </h3>
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{`${item.quantity}x ${item.name}`}</span>
                    <span>{`${(item.price * item.quantity).toFixed(
                      2
                    )} €`}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{`${totalPrice.toFixed(2)} €`}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/")} className="w-full">
              Retour à la boutique
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Finaliser votre commande</CardTitle>
              <CardDescription>
                {step === "shipping"
                  ? "Étape 1 : Informations de livraison"
                  : "Étape 2 : Paiement"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === "shipping" ? (
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Pays</Label>
                      <Input
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Continuer vers le paiement
                  </Button>
                </form>
              ) : (
                <PaymentMethods
                  amount={totalPrice}
                  onSuccess={handlePaymentSuccess}
                />
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        x{item.quantity}
                      </div>
                    </div>
                    <div>{(item.price * item.quantity).toFixed(2)} €</div>
                  </li>
                ))}
              </ul>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
