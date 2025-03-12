"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  Plus,
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
import { useAuth } from "@/lib/auth-context";

// Données fictives pour la démonstration
const dashboardData = {
  stats: {
    revenue: 12580,
    orders: 156,
    customers: 89,
    products: 42,
  },
  recentOrders: [
    {
      id: 1,
      customer: "Jean Dupont",
      date: "2023-06-15",
      status: "Livré",
      total: 125.99,
    },
    {
      id: 2,
      customer: "Marie Martin",
      date: "2023-06-14",
      status: "En cours",
      total: 89.5,
    },
    {
      id: 3,
      customer: "Pierre Durand",
      date: "2023-06-14",
      status: "En attente",
      total: 245.0,
    },
    {
      id: 4,
      customer: "Sophie Petit",
      date: "2023-06-13",
      status: "Livré",
      total: 59.99,
    },
    {
      id: 5,
      customer: "Lucas Bernard",
      date: "2023-06-12",
      status: "Annulé",
      total: 149.9,
    },
  ],
  lowStock: [
    { id: 1, name: "Smartphone Pro Max", stock: 3, price: 999.99 },
    { id: 2, name: "Écouteurs sans fil", stock: 5, price: 129.99 },
    { id: 3, name: "Montre connectée", stock: 2, price: 249.99 },
  ],
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("matin");
    else if (hour < 18) setTimeOfDay("après-midi");
    else setTimeOfDay("soir");
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bon {timeOfDay}, {user?.firstName || "Admin"}. Voici un aperçu de
            votre boutique.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un produit
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chiffre d'affaires
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.revenue.toLocaleString()} €
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.orders}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.customers}
            </div>
            <p className="text-xs text-muted-foreground">
              +8.2% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.products}
            </div>
            <p className="text-xs text-muted-foreground">
              +4 nouveaux produits ce mois-ci
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="orders">Commandes récentes</TabsTrigger>
          <TabsTrigger value="stock">Stock faible</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Ventes mensuelles</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">
                    Graphique des ventes (données fictives)
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>
                  Les dernières actions effectuées
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Nouveau produit ajouté
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Il y a 2 heures
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ShoppingBag className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Nouvelle commande reçue
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Il y a 3 heures
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Nouvel utilisateur inscrit
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Il y a 5 heures
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commandes récentes</CardTitle>
              <CardDescription>
                Les 5 dernières commandes passées sur votre boutique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">ID</th>
                      <th className="text-left py-3 px-2 font-medium">
                        Client
                      </th>
                      <th className="text-left py-3 px-2 font-medium">Date</th>
                      <th className="text-left py-3 px-2 font-medium">
                        Statut
                      </th>
                      <th className="text-right py-3 px-2 font-medium">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-2">#{order.id}</td>
                        <td className="py-3 px-2">{order.customer}</td>
                        <td className="py-3 px-2">{order.date}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              order.status === "Livré"
                                ? "bg-green-100 text-green-800"
                                : order.status === "En cours"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "En attente"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          {order.total.toFixed(2)} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/admin/orders">
                <Button variant="outline">Voir toutes les commandes</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="stock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Produits à faible stock</CardTitle>
              <CardDescription>
                Produits dont le stock est inférieur à 5 unités
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">ID</th>
                      <th className="text-left py-3 px-2 font-medium">
                        Produit
                      </th>
                      <th className="text-left py-3 px-2 font-medium">Stock</th>
                      <th className="text-right py-3 px-2 font-medium">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.lowStock.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-3 px-2">#{product.id}</td>
                        <td className="py-3 px-2">{product.name}</td>
                        <td className="py-3 px-2">
                          <span className="inline-flex items-center gap-1 text-red-600">
                            <AlertTriangle className="h-3 w-3" />
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          {product.price.toFixed(2)} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/admin/products">
                <Button variant="outline">Gérer les stocks</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Raccourcis */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/products">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Gérer les produits
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Ajouter, modifier ou supprimer des produits
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/orders">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Gérer les commandes
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Voir et mettre à jour le statut des commandes
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/users">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Gérer les utilisateurs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Voir et gérer les comptes utilisateurs
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/analytics">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Voir les statistiques
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Analyser les performances de votre boutique
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
