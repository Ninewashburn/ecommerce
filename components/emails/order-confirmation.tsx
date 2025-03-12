import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { FC } from "react";

interface OrderItem {
  id: number;
  product: {
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
  price: number;
}

interface OrderConfirmationEmailProps {
  orderNumber: string | number;
  orderDate: Date | string;
  orderItems: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerName: string;
  shippingAddress: string;
}

export const OrderConfirmationEmail: FC<OrderConfirmationEmailProps> = ({
  orderNumber,
  orderDate,
  orderItems,
  subtotal,
  shipping,
  total,
  customerName,
  shippingAddress,
}) => {
  const formattedDate = new Date(orderDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>Confirmation de votre commande #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* En-tête */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/logo.png`}
              width="120"
              height="40"
              alt="Logo"
              style={logo}
            />
          </Section>
          <Hr style={hr} />

          {/* Message principal */}
          <Section style={section}>
            <Heading style={heading}>
              Merci pour votre commande, {customerName}!
            </Heading>
            <Text style={paragraph}>
              Nous confirmons la réception de votre commande #{orderNumber}{" "}
              passée le {formattedDate}. Vous trouverez ci-dessous le
              récapitulatif de votre commande.
            </Text>
          </Section>

          {/* Détails de la commande */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Récapitulatif de votre commande
            </Heading>

            {orderItems.map((item) => (
              <Row key={item.id} style={productRow}>
                <Column>
                  <Text style={productName}>{item.product.name}</Text>
                  <Text style={productQuantity}>Quantité: {item.quantity}</Text>
                </Column>
                <Column style={priceColumn}>
                  <Text style={price}>{item.price.toFixed(2)} €</Text>
                </Column>
              </Row>
            ))}

            <Hr style={hr} />

            {/* Totaux */}
            <Row style={subtotalRow}>
              <Column>
                <Text style={subtotalLabel}>Sous-total</Text>
              </Column>
              <Column style={priceColumn}>
                <Text style={subtotalPrice}>{subtotal.toFixed(2)} €</Text>
              </Column>
            </Row>

            <Row style={subtotalRow}>
              <Column>
                <Text style={subtotalLabel}>Frais de livraison</Text>
              </Column>
              <Column style={priceColumn}>
                <Text style={subtotalPrice}>{shipping.toFixed(2)} €</Text>
              </Column>
            </Row>

            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Total</Text>
              </Column>
              <Column style={priceColumn}>
                <Text style={totalPrice}>{total.toFixed(2)} €</Text>
              </Column>
            </Row>
          </Section>

          {/* Adresse de livraison */}
          <Section style={addressSection}>
            <Heading as="h2" style={subheading}>
              Adresse de livraison
            </Heading>
            <Text style={address}>{shippingAddress}</Text>
          </Section>

          {/* Bouton pour voir la commande */}
          <Section style={buttonContainer}>
            <Button
              pX={20}
              pY={12}
              style={button}
              href={`${baseUrl}/account/orders/${orderNumber}`}
            >
              Voir ma commande
            </Button>
          </Section>

          {/* Message de fin */}
          <Section style={section}>
            <Text style={paragraph}>
              Si vous avez des questions concernant votre commande, n'hésitez
              pas à nous contacter via notre page de contact.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Pied de page */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} MARQUE. Tous droits réservés.
            </Text>
            <Text style={footerText}>
              123 Rue du Commerce, 75001 Paris, France
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
};

const header = {
  padding: "20px 30px",
};

const logo = {
  margin: "0 auto",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const section = {
  padding: "0 30px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "20px",
  textAlign: "center" as const,
};

const subheading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "15px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#444",
  margin: "0 0 20px",
};

const productRow = {
  padding: "10px 0",
  borderBottom: "1px solid #e6ebf1",
};

const productName = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333",
  margin: "0 0 5px",
};

const productQuantity = {
  fontSize: "14px",
  color: "#666",
  margin: "0",
};

const priceColumn = {
  textAlign: "right" as const,
};

const price = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333",
};

const subtotalRow = {
  padding: "5px 0",
};

const subtotalLabel = {
  fontSize: "14px",
  color: "#666",
};

const subtotalPrice = {
  fontSize: "14px",
  color: "#666",
};

const totalRow = {
  padding: "10px 0",
  marginTop: "5px",
};

const totalLabel = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333",
};

const totalPrice = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333",
};

const addressSection = {
  backgroundColor: "#f9f9f9",
  padding: "15px 30px",
  margin: "20px 0",
  borderRadius: "5px",
};

const address = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#666",
  margin: "0",
};

const buttonContainer = {
  padding: "20px 30px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5046e5",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const footer = {
  padding: "0 30px 20px",
};

const footerText = {
  fontSize: "13px",
  color: "#959595",
  textAlign: "center" as const,
  margin: "5px 0",
};

export default OrderConfirmationEmail;
