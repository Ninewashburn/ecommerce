"use client";

import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

// Remplacer par votre clé publique Stripe
const stripePromise = loadStripe("pk_test_votre_cle_publique_stripe");

// Composant pour le paiement par carte bancaire
const CardPaymentForm = ({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Dans un environnement réel, vous feriez une requête à votre API pour créer une intention de paiement
      // et récupérer un client_secret
      const clientSecret = await createPaymentIntent(amount);

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Élément de carte non trouvé");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              // Ces détails seraient normalement récupérés du formulaire
              name: "Client Test",
            },
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        toast({
          title: "Paiement réussi",
          description: "Votre paiement a été traité avec succès.",
        });
        onSuccess();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors du paiement"
      );
      toast({
        title: "Erreur de paiement",
        description:
          err instanceof Error
            ? err.message
            : "Une erreur est survenue lors du paiement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction simulée pour créer une intention de paiement
  // Dans un environnement réel, cette fonction ferait une requête à votre API
  const createPaymentIntent = async (amount: number): Promise<string> => {
    // Simulation d'une requête API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("pi_test_client_secret");
      }, 1000);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={!stripe || isLoading} className="w-full">
        {isLoading ? "Traitement en cours..." : `Payer ${amount.toFixed(2)} €`}
      </Button>
    </form>
  );
};

// Composant wrapper pour PayPal Buttons
const PayPalButtonWrapper = ({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) => {
  const { toast } = useToast();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Attendre que le script PayPal soit complètement chargé
    const checkPayPalScript = () => {
      if (
        typeof window !== "undefined" &&
        window.paypal &&
        window.paypal.Buttons
      ) {
        setIsScriptLoaded(true);
        return true;
      }
      return false;
    };

    // Vérifier immédiatement
    if (checkPayPalScript()) return;

    // Sinon, vérifier toutes les 500ms pendant 10 secondes
    let attempts = 0;
    const maxAttempts = 20; // 10 secondes au total

    const intervalId = setInterval(() => {
      attempts++;
      if (checkPayPalScript() || attempts >= maxAttempts) {
        clearInterval(intervalId);
        if (attempts >= maxAttempts && !isScriptLoaded) {
          setScriptError(true);
          console.error(
            "Impossible de charger le script PayPal après plusieurs tentatives"
          );
        }
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  // Gestionnaire de succès pour PayPal
  const handlePayPalSuccess = (details: any) => {
    toast({
      title: "Paiement PayPal réussi",
      description: `Transaction complétée avec succès`,
    });
    onSuccess();
  };

  // Fonction pour simuler un paiement PayPal
  const handleSimulatedPayment = () => {
    setIsProcessing(true);

    // Simuler un délai de traitement
    setTimeout(async () => {
      try {
        // Enregistrer la commande dans la base de données
        // Ici, vous feriez normalement un appel API pour enregistrer la commande
        const orderResponse = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Simulons les données de la commande
            items: cart,
            total: amount,
            // Autres détails nécessaires
          }),
        });

        if (!orderResponse.ok) {
          throw new Error("Erreur lors de l'enregistrement de la commande");
        }

        const orderData = await orderResponse.json();

        // Envoyer l'email de confirmation
        await fetch("/api/send-order-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderData.id }),
        });

        setIsProcessing(false);
        toast({
          title: "Paiement PayPal réussi",
          description:
            "Transaction complétée avec succès. Un email de confirmation vous a été envoyé.",
        });
        onSuccess();

        // Rediriger vers la page de confirmation
        router.push(`/checkout/success?orderId=${orderData.id}`);
      } catch (error) {
        console.error("Erreur lors de la finalisation du paiement:", error);
        setIsProcessing(false);
        toast({
          title: "Erreur",
          description:
            "Une erreur est survenue lors du traitement du paiement.",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  // Si le script PayPal ne se charge pas, afficher un bouton de secours
  if (scriptError) {
    return (
      <div className="space-y-4">
        <div className="p-4 text-center border border-yellow-300 rounded-md bg-yellow-50">
          <p className="text-yellow-700 font-medium mb-2">
            Mode de secours PayPal
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Le service PayPal n'est pas disponible pour le moment. Vous pouvez
            utiliser notre option de secours pour simuler un paiement PayPal.
          </p>
        </div>

        <Button
          className="w-full bg-[#0070ba] hover:bg-[#003087] flex items-center justify-center gap-2"
          onClick={handleSimulatedPayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Traitement en cours...</span>
            </>
          ) : (
            <>
              <span className="font-bold">Pay</span>
              <span className="font-bold text-[#0070ba] bg-white px-1">
                Pal
              </span>
              <span className="ml-2">Payer {amount.toFixed(2)} €</span>
            </>
          )}
        </Button>
      </div>
    );
  }

  if (!isScriptLoaded) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Chargement de PayPal...
        </p>
        <div className="animate-pulse h-10 bg-muted rounded-md"></div>
      </div>
    );
  }

  return (
    <PayPalButtons
      forceReRender={[amount]}
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: amount.toString(),
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        if (actions.order) {
          return actions.order.capture().then((details) => {
            handlePayPalSuccess(details);
          });
        }
        return Promise.resolve();
      }}
      onError={(err) => {
        console.error("Erreur PayPal:", err);
        toast({
          title: "Erreur PayPal",
          description:
            "Une erreur est survenue avec PayPal. Veuillez réessayer.",
          variant: "destructive",
        });
        // Passer en mode de secours en cas d'erreur
        setScriptError(true);
      }}
      style={{ layout: "vertical" }}
    />
  );
};

// Composant principal pour les méthodes de paiement
export default function PaymentMethods({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessingPayPal, setIsProcessingPayPal] = useState(false);

  // Configuration PayPal
  const paypalOptions = {
    clientId:
      "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R", // Sandbox client ID
    currency: "EUR",
    intent: "capture",
    components: "buttons",
    disableFunding: "credit,card",
    debug: true,
  };

  // Fonction pour simuler un paiement PayPal
  const handleSimulatedPayPal = () => {
    setIsProcessingPayPal(true);

    // Simuler un délai de traitement
    setTimeout(async () => {
      try {
        // Enregistrer la commande dans la base de données
        // Ici, vous feriez normalement un appel API pour enregistrer la commande
        const orderResponse = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Simulons les données de la commande
            total: amount,
            // Autres détails nécessaires
          }),
        });

        if (!orderResponse.ok) {
          throw new Error("Erreur lors de l'enregistrement de la commande");
        }

        const orderData = await orderResponse.json();

        // Envoyer l'email de confirmation
        const emailResponse = await fetch("/api/send-order-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderData.id }),
        });

        if (!emailResponse.ok) {
          console.warn("L'email de confirmation n'a pas pu être envoyé");
        }

        setIsProcessingPayPal(false);
        toast({
          title: "Paiement réussi",
          description:
            "Transaction complétée avec succès. Un email de confirmation vous a été envoyé.",
        });
        onSuccess();

        // Rediriger vers la page de confirmation
        router.push(`/checkout/success?orderId=${orderData.id}`);
      } catch (error) {
        console.error("Erreur lors de la finalisation du paiement:", error);
        setIsProcessingPayPal(false);
        toast({
          title: "Erreur",
          description:
            "Une erreur est survenue lors du traitement du paiement.",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Méthode de paiement</h2>

      <RadioGroup
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value as "card" | "paypal")}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center gap-2">
            <span>Carte bancaire</span>
            <div className="flex gap-1">
              <span className="text-blue-600 font-bold text-xs border border-blue-600 rounded px-1">
                VISA
              </span>
              <span className="text-red-600 font-bold text-xs border border-red-600 rounded px-1">
                MC
              </span>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal" className="flex items-center gap-2">
            <span>PayPal</span>
            <span className="font-bold text-[#0070ba]">
              Pay<span className="text-[#003087]">Pal</span>
            </span>
          </Label>
        </div>
      </RadioGroup>

      <div className="mt-6">
        {paymentMethod === "card" ? (
          <Elements stripe={stripePromise}>
            <CardPaymentForm amount={amount} onSuccess={onSuccess} />
          </Elements>
        ) : (
          <div className="space-y-4">
            <div className="p-4 text-center border border-blue-100 rounded-md bg-blue-50">
              <p className="text-sm text-muted-foreground">
                Payer en toute sécurité avec votre compte PayPal ou en tant
                qu'invité avec une carte bancaire.
              </p>
            </div>

            <Button
              className="w-full bg-[#0070ba] hover:bg-[#003087] flex items-center justify-center gap-2"
              onClick={handleSimulatedPayPal}
              disabled={isProcessingPayPal}
            >
              {isProcessingPayPal ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Traitement en cours...</span>
                </>
              ) : (
                <>
                  <span className="font-bold">Pay</span>
                  <span className="font-bold text-[#0070ba] bg-white px-1">
                    Pal
                  </span>
                  <span className="ml-2">Payer {amount.toFixed(2)} €</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
