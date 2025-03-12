"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur lorsque l'utilisateur tape
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubjectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }));

    // Effacer l'erreur lorsque l'utilisateur sélectionne
    if (errors.subject) {
      setErrors((prev) => ({
        ...prev,
        subject: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email est invalide";
    }

    if (!formData.subject) {
      newErrors.subject = "Le sujet est requis";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simuler l'envoi du formulaire
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Message envoyé !",
          description: "Nous vous répondrons dès que possible.",
        });

        // Réinitialiser le formulaire
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 1500);
    }
  };

  return (
    <main className="flex-1">
      {/* Section Héro */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div
          className="h-[30vh] bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1920')",
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-20">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Contactez-Nous
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Informations de Contact */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Entrez en Contact</h2>
                <p className="text-muted-foreground mb-8">
                  Vous avez des questions ou des commentaires ? Nous serions
                  ravis de vous entendre. Remplissez le formulaire ou
                  contactez-nous directement en utilisant les informations
                  ci-dessous.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Adresse</h3>
                      <p className="text-muted-foreground">
                        123 Rue du Commerce
                        <br />
                        Suite 456
                        <br />
                        Paris, 75001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Téléphone</h3>
                      <p className="text-muted-foreground">01 23 45 67 89</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">info@exemple.com</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">Heures d'Ouverture</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Lundi - Vendredi :</span>
                      <span>9h00 - 18h00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Samedi :</span>
                      <span>10h00 - 16h00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Dimanche :</span>
                      <span>Fermé</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Formulaire de Contact */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Envoyez-Nous un Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Votre adresse email"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={handleSubjectChange}
                    >
                      <SelectTrigger
                        id="subject"
                        className={errors.subject ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">
                          Demande Générale
                        </SelectItem>
                        <SelectItem value="support">Support Client</SelectItem>
                        <SelectItem value="feedback">
                          Retour sur Produit
                        </SelectItem>
                        <SelectItem value="partnership">
                          Opportunité de Partenariat
                        </SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Votre message"
                      rows={6}
                      spellCheck="false"
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </main>
  );
}
