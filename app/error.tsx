"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionnel : enregistrer l'erreur dans un service d'analyse
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-5xl font-bold text-red-600">!</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">Une erreur est survenue</h1>

        <p className="text-muted-foreground mb-8">
          Nous sommes désolés, mais quelque chose s'est mal passé. Veuillez
          réessayer ou revenir à la page d'accueil.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            className="flex items-center gap-2"
            onClick={() => reset()}
          >
            <RefreshCcw className="h-4 w-4" />
            Réessayer
          </Button>

          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
