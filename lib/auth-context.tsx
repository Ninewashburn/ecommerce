"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface Address {
  id: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  userId: number;
}

export interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: "ADMIN" | "CUSTOMER";
  createdAt: string;
  updatedAt: string;
  addresses?: Address[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fonction pour récupérer les données de l'utilisateur depuis l'API
  const refreshUserData = async () => {
    try {
      const response = await fetch("/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important pour inclure les cookies
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return data.user;
      } else {
        // Si la requête échoue, l'utilisateur n'est pas authentifié
        setUser(null);
        return null;
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur:",
        error
      );
      setUser(null);
      return null;
    }
  };

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        await refreshUserData();
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error
        );
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important pour stocker les cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Échec de la connexion");
      }

      // Stocker le token dans le localStorage pour les requêtes côté client
      localStorage.setItem("auth_token", data.token);

      // Mettre à jour l'état de l'utilisateur
      setUser(data.user);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setIsLoading(false);
      return false;
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      // Appeler l'API de déconnexion
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        credentials: "include", // Important pour supprimer les cookies
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      // Supprimer le token du localStorage
      localStorage.removeItem("auth_token");
      setUser(null);
      router.push("/");
    }
  };

  // Valeurs calculées
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
