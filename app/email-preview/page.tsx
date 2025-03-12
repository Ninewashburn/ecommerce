"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderConfirmationEmail from "@/components/emails/order-confirmation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Données de test pour la prévisualisation
const mockOrder = {
  orderNumber: "12345",
  orderDate: new Date(),
  orderItems: [
    {
      id: 1,
      product: {
        name: "T-shirt Premium",
        price: 29.99,
        image: "/placeholder.svg",
      },
      quantity: 2,
      price: 29.99,
    },
    {
      id: 2,
      product: {
        name: "Pantalon Classic",
        price: 49.99,
        image: "/placeholder.svg",
      },
      quantity: 1,
      price: 49.99,
    },
  ],
  subtotal: 109.97,
  shipping: 4.99,
  total: 114.96,
  customerName: "Jean Dupont",
  shippingAddress: "123 Rue de la République\n75001 Paris\nFrance",
};

export default function EmailPreviewPage() {
  const [showPreview, setShowPreview] = useState(true);
  const [testEmail, setTestEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleSendTestEmail = async () => {
    if (!testEmail) {
      setSendResult({
        success: false,
        message: "Veuillez entrer une adresse email valide",
      });
      return;
    }

    setIsSending(true);
    setSendResult({});

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: testEmail,
          type: "order_confirmation",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSendResult({
          success: true,
          message: "Email envoyé avec succès !",
        });
      } else {
        setSendResult({
          success: false,
          message: data.error || "Erreur lors de l'envoi de l'email",
        });
      }
    } catch (error) {
      setSendResult({
        success: false,
        message: "Erreur lors de l'envoi de l'email",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Prévisualisation des Emails</h1>

      <div className="grid md:grid-cols-[350px_1fr] gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Options</CardTitle>
              <CardDescription>
                Prévisualisez ou envoyez un email de test
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Mode</label>
                  <div className="flex space-x-4">
                    <Button
                      variant={showPreview ? "default" : "outline"}
                      onClick={() => setShowPreview(true)}
                    >
                      Prévisualisation
                    </Button>
                    <Button
                      variant={!showPreview ? "default" : "outline"}
                      onClick={() => setShowPreview(false)}
                    >
                      Envoi de test
                    </Button>
                  </div>
                </div>

                {!showPreview && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium mb-1 block">
                      Email de test
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="email"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="px-3 py-2 border rounded-md w-full"
                      />
                      <Button
                        onClick={handleSendTestEmail}
                        disabled={isSending}
                      >
                        {isSending ? "Envoi..." : "Envoyer"}
                      </Button>
                    </div>
                    {sendResult.message && (
                      <p
                        className={`text-sm ${
                          sendResult.success ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {sendResult.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="preview-container">
          <Tabs defaultValue="order-confirmation">
            <TabsList className="mb-4">
              <TabsTrigger value="order-confirmation">
                Confirmation de Commande
              </TabsTrigger>
              {/* Ajoutez d'autres types d'emails ici si nécessaire */}
            </TabsList>

            <TabsContent value="order-confirmation">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-4 text-sm text-gray-600 border-b">
                  <span className="font-medium">Sujet: </span>
                  Confirmation de votre commande #{mockOrder.orderNumber}
                </div>
                <div className="p-4 bg-white">
                  {showPreview ? (
                    <div className="email-preview">
                      <OrderConfirmationEmail {...mockOrder} />
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      <p>
                        Utilisez le formulaire à gauche pour envoyer un email de
                        test.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
