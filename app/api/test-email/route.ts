import { NextResponse } from "next/server";
import { Resend } from "resend";
import OrderConfirmationEmail from "@/components/emails/order-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, type } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Adresse email requise" },
        { status: 400 }
      );
    }

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

    let emailData;

    switch (type) {
      case "order_confirmation":
        emailData = {
          from: process.env.EMAIL_FROM || "noreply@votreboutique.com",
          to: email,
          subject: `Confirmation de votre commande #${mockOrder.orderNumber}`,
          react: OrderConfirmationEmail(mockOrder),
        };
        break;

      default:
        return NextResponse.json(
          { error: "Type d'email non reconnu" },
          { status: 400 }
        );
    }

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Échec de l'envoi d'email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
