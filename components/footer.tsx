import Link from "next/link";
import { Facebook, Instagram, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">MARQUE</h3>
            <p className="text-muted-foreground mb-4">
              Produits premium pour un mode de vie moderne. Qualité, style et
              innovation dans chaque article.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">X</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Boutique</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-muted-foreground hover:text-primary"
                >
                  Tous les Produits
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?filter=new"
                  className="text-muted-foreground hover:text-primary"
                >
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?filter=sale"
                  className="text-muted-foreground hover:text-primary"
                >
                  Promotions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  À Propos de Nous
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contactez-Nous
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-muted-foreground hover:text-primary"
                >
                  Mentions Légales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Service Client</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/livraison-retours"
                  className="text-muted-foreground hover:text-primary"
                >
                  Aide & FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary"
                >
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/conditions-generales"
                  className="text-muted-foreground hover:text-primary"
                >
                  Conditions Générales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MARQUE. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2">
              <img
                src="/placeholder.svg?height=30&width=40"
                alt="Visa"
                className="h-8"
              />
              <img
                src="/placeholder.svg?height=30&width=40"
                alt="Mastercard"
                className="h-8"
              />
              <img
                src="/placeholder.svg?height=30&width=40"
                alt="PayPal"
                className="h-8"
              />
              <img
                src="/placeholder.svg?height=30&width=40"
                alt="Apple Pay"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
