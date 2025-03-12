"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Printer,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Données fictives pour la démonstration
const initialOrders = [
  {
    id: 1,
    orderNumber: "ORD-001",
    customer: "Jean Dupont",
    email: "jean.dupont@example.com",
    date: "2023-06-15",
    status: "DELIVERED",
    paymentStatus: "PAID",
    total: 125.99,
    items: 3,
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    customer: "Marie Martin",
    email: "marie.martin@example.com",
    date: "2023-06-14",
    status: "PROCESSING",
    paymentStatus: "PAID",
    total: 89.5,
    items: 2,
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    customer: "Pierre Durand",
    email: "pierre.durand@example.com",
    date: "2023-06-14",
    status: "PENDING",
    paymentStatus: "PENDING",
    total: 245.0,
    items: 5,
  },
  {
    id: 4,
    orderNumber: "ORD-004",
    customer: "Sophie Petit",
    email: "sophie.petit@example.com",
    date: "2023-06-13",
    status: "DELIVERED",
    paymentStatus: "PAID",
    total: 59.99,
    items: 1,
  },
  {
    id: 5,
    orderNumber: "ORD-005",
    customer: "Lucas Bernard",
    email: "lucas.bernard@example.com",
    date: "2023-06-12",
    status: "CANCELLED",
    paymentStatus: "REFUNDED",
    total: 149.9,
    items: 4,
  },
  {
    id: 6,
    orderNumber: "ORD-006",
    customer: "Emma Leroy",
    email: "emma.leroy@example.com",
    date: "2023-06-11",
    status: "SHIPPED",
    paymentStatus: "PAID",
    total: 79.95,
    items: 2,
  },
  {
    id: 7,
    orderNumber: "ORD-007",
    customer: "Thomas Moreau",
    email: "thomas.moreau@example.com",
    date: "2023-06-10",
    status: "DELIVERED",
    paymentStatus: "PAID",
    total: 199.99,
    items: 3,
  },
  {
    id: 8,
    orderNumber: "ORD-008",
    customer: "Camille Dubois",
    email: "camille.dubois@example.com",
    date: "2023-06-09",
    status: "PROCESSING",
    paymentStatus: "PAID",
    total: 129.5,
    items: 2,
  },
];

const statusMap = {
  PENDING: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  PROCESSING: { label: "En cours", color: "bg-blue-100 text-blue-800" },
  SHIPPED: { label: "Expédiée", color: "bg-indigo-100 text-indigo-800" },
  DELIVERED: { label: "Livrée", color: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Annulée", color: "bg-red-100 text-red-800" },
};

const paymentStatusMap = {
  PENDING: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  PAID: { label: "Payée", color: "bg-green-100 text-green-800" },
  FAILED: { label: "Échouée", color: "bg-red-100 text-red-800" },
  REFUNDED: { label: "Remboursée", color: "bg-purple-100 text-purple-800" },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const { toast } = useToast();

  // Filtrer les commandes en fonction des critères
  const filteredOrders = orders.filter((order) => {
    // Filtre de recherche
    const matchesSearch =
      searchTerm === "" ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtre de statut
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    // Filtre de paiement
    const matchesPayment =
      paymentFilter === "all" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleUpdateStatus = (orderId: number, status: string) => {
    // Dans une vraie application, vous feriez une requête API ici

    // Simuler la mise à jour du statut
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status };
      }
      return order;
    });

    setOrders(updatedOrders);

    toast({
      title: "Statut mis à jour",
      description: `La commande #${orderId} est maintenant "${
        statusMap[status as keyof typeof statusMap].label
      }".`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commandes</h1>
          <p className="text-muted-foreground">
            Gérez les commandes de votre boutique
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des commandes</CardTitle>
          <CardDescription>
            {filteredOrders.length} commandes trouvées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des commandes..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut de commande" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="PENDING">En attente</SelectItem>
                  <SelectItem value="PROCESSING">En cours</SelectItem>
                  <SelectItem value="SHIPPED">Expédiée</SelectItem>
                  <SelectItem value="DELIVERED">Livrée</SelectItem>
                  <SelectItem value="CANCELLED">Annulée</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut de paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les paiements</SelectItem>
                  <SelectItem value="PENDING">En attente</SelectItem>
                  <SelectItem value="PAID">Payé</SelectItem>
                  <SelectItem value="FAILED">Échoué</SelectItem>
                  <SelectItem value="REFUNDED">Remboursé</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Plus de filtres
              </Button>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucune commande trouvée</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Commande</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="hover:underline"
                        >
                          {order.orderNumber}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {order.items} article{order.items > 1 ? "s" : ""}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{order.customer}</div>
                        <div className="text-xs text-muted-foreground">
                          {order.email}
                        </div>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            statusMap[order.status as keyof typeof statusMap]
                              .color
                          }`}
                          variant="outline"
                        >
                          {
                            statusMap[order.status as keyof typeof statusMap]
                              .label
                          }
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            paymentStatusMap[
                              order.paymentStatus as keyof typeof paymentStatusMap
                            ].color
                          }`}
                          variant="outline"
                        >
                          {
                            paymentStatusMap[
                              order.paymentStatus as keyof typeof paymentStatusMap
                            ].label
                          }
                        </Badge>
                      </TableCell>
                      <TableCell>{order.total.toFixed(2)} €</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                (window.location.href = `/admin/orders/${order.id}`)
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Imprimer la facture
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>
                              Changer le statut
                            </DropdownMenuLabel>
                            {order.status !== "PROCESSING" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id, "PROCESSING")
                                }
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                Marquer en cours
                              </DropdownMenuItem>
                            )}
                            {order.status !== "SHIPPED" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id, "SHIPPED")
                                }
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Marquer expédiée
                              </DropdownMenuItem>
                            )}
                            {order.status !== "DELIVERED" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id, "DELIVERED")
                                }
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Marquer livrée
                              </DropdownMenuItem>
                            )}
                            {order.status !== "CANCELLED" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id, "CANCELLED")
                                }
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Annuler la commande
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
