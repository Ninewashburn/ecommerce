"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <span className="text-6xl font-bold text-primary">404</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">Page non trouvée</h1>

        <p className="text-muted-foreground mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            className="flex items-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>

          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Accueil
            </Link>
          </Button>

          <Button
            variant="secondary"
            className="flex items-center gap-2"
            asChild
          >
            <Link href="/shop">
              <ShoppingBag className="h-4 w-4" />
              Boutique
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
