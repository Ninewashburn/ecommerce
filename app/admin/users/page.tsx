"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  ShieldAlert,
  Mail,
  User as UserIcon,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

// Données fictives pour la démonstration
const initialUsers = [
  {
    id: 1,
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    role: "ADMIN",
    createdAt: "2023-01-15",
    orders: 5,
  },
  {
    id: 2,
    email: "user@example.com",
    firstName: "Client",
    lastName: "User",
    role: "CUSTOMER",
    createdAt: "2023-02-20",
    orders: 3,
  },
  {
    id: 3,
    email: "jean.dupont@example.com",
    firstName: "Jean",
    lastName: "Dupont",
    role: "CUSTOMER",
    createdAt: "2023-03-10",
    orders: 7,
  },
  {
    id: 4,
    email: "marie.martin@example.com",
    firstName: "Marie",
    lastName: "Martin",
    role: "CUSTOMER",
    createdAt: "2023-04-05",
    orders: 2,
  },
  {
    id: 5,
    email: "pierre.durand@example.com",
    firstName: "Pierre",
    lastName: "Durand",
    role: "CUSTOMER",
    createdAt: "2023-05-12",
    orders: 4,
  },
  {
    id: 6,
    email: "sophie.petit@example.com",
    firstName: "Sophie",
    lastName: "Petit",
    role: "CUSTOMER",
    createdAt: "2023-05-20",
    orders: 1,
  },
  {
    id: 7,
    email: "lucas.bernard@example.com",
    firstName: "Lucas",
    lastName: "Bernard",
    role: "CUSTOMER",
    createdAt: "2023-06-01",
    orders: 0,
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const { toast } = useToast();

  // Filtrer les utilisateurs en fonction des critères
  const filteredUsers = users.filter((user) => {
    // Filtre de recherche
    const matchesSearch =
      searchTerm === "" ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    // Filtre de rôle
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId: number) => {
    // Dans une vraie application, vous feriez une requête API ici

    // Vérifier si l'utilisateur est le dernier administrateur
    if (userId === 1) {
      toast({
        title: "Action impossible",
        description:
          "Vous ne pouvez pas supprimer le compte administrateur principal.",
        variant: "destructive",
      });
      return;
    }

    // Simuler la suppression
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);

    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès.",
    });
  };

  const handleChangeRole = (userId: number, role: string) => {
    // Dans une vraie application, vous feriez une requête API ici

    // Vérifier si c'est le dernier administrateur qu'on essaie de rétrograder
    if (userId === 1 && role === "CUSTOMER") {
      toast({
        title: "Action impossible",
        description:
          "Vous ne pouvez pas rétrograder le compte administrateur principal.",
        variant: "destructive",
      });
      return;
    }

    // Simuler le changement de rôle
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, role };
      }
      return user;
    });

    setUsers(updatedUsers);

    toast({
      title: "Rôle modifié",
      description: `L'utilisateur est maintenant ${
        role === "ADMIN" ? "administrateur" : "client"
      }.`,
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les utilisateurs de votre boutique
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <UserIcon className="mr-2 h-4 w-4" />
            Ajouter un utilisateur
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>
            {filteredUsers.length} utilisateurs trouvés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des utilisateurs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="ADMIN">Administrateur</SelectItem>
                  <SelectItem value="CUSTOMER">Client</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Plus de filtres
              </Button>
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                    <TableHead>Commandes</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarFallback>
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.role === "ADMIN" ? (
                          <Badge variant="default">Administrateur</Badge>
                        ) : (
                          <Badge variant="outline">Client</Badge>
                        )}
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell>
                        {user.orders > 0 ? (
                          <span>
                            {user.orders} commande{user.orders > 1 ? "s" : ""}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            Aucune commande
                          </span>
                        )}
                      </TableCell>
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
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Envoyer un email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>
                              Changer le rôle
                            </DropdownMenuLabel>
                            {user.role !== "ADMIN" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleChangeRole(user.id, "ADMIN")
                                }
                              >
                                <ShieldAlert className="mr-2 h-4 w-4" />
                                Promouvoir administrateur
                              </DropdownMenuItem>
                            )}
                            {user.role !== "CUSTOMER" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleChangeRole(user.id, "CUSTOMER")
                                }
                              >
                                <UserIcon className="mr-2 h-4 w-4" />
                                Rétrograder client
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
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
