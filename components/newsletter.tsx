"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Veuillez saisir votre adresse email");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Veuillez saisir une adresse email valide");
      return;
    }

    // Simuler un appel API
    setTimeout(() => {
      setIsSubmitted(true);
      setError("");
    }, 500);
  };

  return (
    <div className="bg-muted rounded-lg p-8 text-center">
      <h3 className="text-2xl font-bold mb-2">
        Abonnez-vous à Notre Newsletter
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Restez informé de nos derniers produits, offres exclusives et conseils
        de style.
      </p>

      {isSubmitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-md max-w-md mx-auto">
          <p className="font-medium">Merci de vous être abonné !</p>
          <p className="text-sm">
            Vous recevrez notre prochaine newsletter dans votre boîte de
            réception.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={error ? "border-red-500" : ""}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1 text-left">{error}</p>
            )}
          </div>
          <Button type="submit">
            S'abonner
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
}
