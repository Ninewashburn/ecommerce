"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { setConsent, getConsent, ConsentType } from "@/lib/cookie-manager";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = getConsent();
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (type: ConsentType) => {
    setConsent(type);
    setIsVisible(false);
  };

  // Ne rien rendre pendant le montage côté client pour éviter les erreurs d'hydratation
  if (!mounted) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Politique de cookies</h3>
            <p className="text-sm text-muted-foreground">
              Nous utilisons des cookies pour améliorer votre expérience sur
              notre site. En continuant à naviguer, vous acceptez notre
              utilisation des cookies conformément à notre{" "}
              <Link href="/privacy" className="underline hover:text-primary">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleConsent("none")}
            >
              Refuser
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleConsent("essential")}
            >
              Cookies essentiels uniquement
            </Button>
            <Button size="sm" onClick={() => handleConsent("all")}>
              Accepter tous les cookies
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => handleConsent("none")}
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
