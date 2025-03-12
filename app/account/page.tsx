"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  CreditCard,
  LogOut,
  Settings,
  ShoppingBag,
  Save,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/use-toast";

export default function AccountPage() {
  const { user, isLoading, logout, isAuthenticated, isAdmin, refreshUserData } =
    useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // État du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  // Initialiser le formulaire avec les données de l'utilisateur
  useEffect(() => {
    if (user) {
      // Récupérer l'adresse par défaut si elle existe
      const defaultAddress =
        user.addresses?.find((addr) => addr.isDefault) || null;

      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email,
        address: {
          street: defaultAddress?.street || "",
          city: defaultAddress?.city || "",
          postalCode: defaultAddress?.postalCode || "",
          country: defaultAddress?.country || "",
        },
      });
    }
  }, [user]);

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à cette page.",
        variant: "destructive",
      });
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router, toast]);

  // Gérer les changements dans le formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Sauvegarder les modifications
  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Appel à l'API pour mettre à jour les informations de l'utilisateur
      const response = await fetch("/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(formData),
        credentials: "include", // Important pour inclure les cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de la mise à jour du profil"
        );
      }

      // Rafraîchir les données utilisateur dans le contexte d'authentification
      await refreshUserData();

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });

      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de la mise à jour de votre profil.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Annuler les modifications
  const handleCancel = () => {
    // Réinitialiser le formulaire avec les données de l'utilisateur
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email,
        address: {
          street: "",
          city: "",
          postalCode: "",
          country: "",
        },
      });
    }

    setIsEditing(false);
  };

  // Afficher un message de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, ne rien afficher (la redirection se fera via useEffect)
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <main className="flex-1 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Mon compte</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Button
                    variant="ghost"
                    className="justify-start rounded-none h-12"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start rounded-none h-12"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Commandes
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start rounded-none h-12"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Paiements
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start rounded-none h-12"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start rounded-none h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Bienvenue, {user.firstName || user.email.split("@")[0]}
                </CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles et suivez vos commandes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profile">
                  <TabsList className="mb-4">
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="orders">Commandes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="profile" className="space-y-4">
                    {isEditing ? (
                      // Formulaire d'édition
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="firstName">Prénom</Label>
                              <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Votre prénom"
                              />
                            </div>
                            <div>
                              <Label htmlFor="lastName">Nom</Label>
                              <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Votre nom"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="votre@email.com"
                              />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="address.street">Adresse</Label>
                              <Input
                                id="address.street"
                                name="address.street"
                                value={formData.address.street}
                                onChange={handleChange}
                                placeholder="Numéro et nom de rue"
                              />
                            </div>
                            <div>
                              <Label htmlFor="address.city">Ville</Label>
                              <Input
                                id="address.city"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleChange}
                                placeholder="Ville"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor="address.postalCode">
                                  Code postal
                                </Label>
                                <Input
                                  id="address.postalCode"
                                  name="address.postalCode"
                                  value={formData.address.postalCode}
                                  onChange={handleChange}
                                  placeholder="Code postal"
                                />
                              </div>
                              <div>
                                <Label htmlFor="address.country">Pays</Label>
                                <Input
                                  id="address.country"
                                  name="address.country"
                                  value={formData.address.country}
                                  onChange={handleChange}
                                  placeholder="Pays"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isSaving}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Annuler
                          </Button>
                          <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? (
                              <>
                                <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                                Enregistrement...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Enregistrer
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Affichage des informations
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Informations personnelles
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Nom:
                              </span>
                              <span>{user.lastName || "Non renseigné"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Prénom:
                              </span>
                              <span>{user.firstName || "Non renseigné"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Email:
                              </span>
                              <span>{user.email}</span>
                            </div>
                            {/* Afficher le type de compte uniquement pour les administrateurs */}
                            {isAdmin && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Type de compte:
                                </span>
                                <span>
                                  {user.role === "ADMIN"
                                    ? "Administrateur"
                                    : "Client"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Adresse de livraison
                          </h3>
                          {user.addresses &&
                          user.addresses.length > 0 &&
                          user.addresses.find((addr) => addr.isDefault) ? (
                            <div className="space-y-2">
                              {(() => {
                                const defaultAddress = user.addresses.find(
                                  (addr) => addr.isDefault
                                );
                                return (
                                  <>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Rue:
                                      </span>
                                      <span>
                                        {defaultAddress?.street ||
                                          "Non renseigné"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Ville:
                                      </span>
                                      <span>
                                        {defaultAddress?.city ||
                                          "Non renseigné"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Code postal:
                                      </span>
                                      <span>
                                        {defaultAddress?.postalCode ||
                                          "Non renseigné"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Pays:
                                      </span>
                                      <span>
                                        {defaultAddress?.country ||
                                          "Non renseigné"}
                                      </span>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">
                              Aucune adresse de livraison enregistrée.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="mt-6">
                      {!isEditing && (
                        <Button onClick={() => setIsEditing(true)}>
                          Modifier mes informations
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="orders">
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="text-lg font-medium mt-4">
                        Aucune commande
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        Vous n'avez pas encore passé de commande.
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => router.push("/shop")}
                      >
                        Commencer vos achats
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
