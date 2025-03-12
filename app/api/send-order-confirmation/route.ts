import { Resend } from "resend";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import OrderConfirmationEmail from "@/components/emails/order-confirmation";

// Initialiser Resend avec votre clé API
// Pour tester, utilisez la clé test fournie par Resend ou créez un compte gratuit sur resend.com
const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "ID de commande requis" },
        { status: 400 }
      );
    }

    // Récupérer les détails de la commande depuis la base de données
    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) },
      include: {
        orderItems: {
          include: { product: true },
        },
        user: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Commande introuvable" },
        { status: 404 }
      );
    }

    // Préparer l'adresse de livraison pour l'affichage
    const shippingAddress =
      order.shippingAddress ||
      `${order.user.firstName} ${order.user.lastName}
${order.shippingStreet || ""}
${order.shippingCity || ""} ${order.shippingPostalCode || ""}
${order.shippingCountry || ""}`;

    // Envoyer l'email
    const { data, error } = await resend.emails.send({
      from: "Boutique <noreply@votredomaine.com>",
      to: [order.user.email],
      subject: `Confirmation de votre commande #${order.id}`,
      react: OrderConfirmationEmail({
        orderNumber: order.id,
        orderDate: order.createdAt,
        orderItems: order.orderItems,
        subtotal: order.subtotal || 0,
        shipping: order.shipping || 0,
        total: order.total || 0,
        customerName: `${order.user.firstName} ${order.user.lastName}`,
        shippingAddress,
      }),
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    // Mettre à jour la commande pour indiquer que l'email a été envoyé
    await prisma.order.update({
      where: { id: Number(orderId) },
      data: { emailSent: true },
    });

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      message: "Email de confirmation envoyé avec succès",
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email de confirmation" },
      { status: 500 }
    );
  }
}
