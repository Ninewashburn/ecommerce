"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  BarChart3,
  Tag,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/use-toast";
import { notFound } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAdmin, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Vérifier si l'utilisateur est un administrateur
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      // Au lieu de rediriger, on affiche une page 404
      notFound();
    }
  }, [isLoading, isAdmin]);

  // Si en cours de chargement, afficher un spinner
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

  // Si l'utilisateur n'est pas admin, la page 404 sera affichée via notFound()
  // Cette partie ne sera donc jamais exécutée pour les non-admins
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold">Administration</h1>
          <p className="text-sm text-muted-foreground">
            Gestion de votre boutique
          </p>
        </div>
        <Separator />
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Link href="/admin">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Tableau de bord
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Package className="mr-2 h-4 w-4" />
                Produits
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Tag className="mr-2 h-4 w-4" />
                Catégories
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Commandes
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Users className="mr-2 h-4 w-4" />
                Utilisateurs
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Statistiques
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
            </Link>
          </div>
        </nav>
        <div className="p-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            size="sm"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-10">
        <div className="flex justify-around p-2">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <LayoutDashboard className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Package className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Users className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 pb-16 md:pb-6">{children}</div>
      </main>
    </div>
  );
}
