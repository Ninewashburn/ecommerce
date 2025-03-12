import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h2 className="text-xl font-medium">Chargement en cours...</h2>
        <p className="text-muted-foreground mt-2">
          Veuillez patienter pendant que nous préparons votre contenu
        </p>
      </div>
    </div>
  );
} 