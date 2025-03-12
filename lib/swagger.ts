import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api", // Dossier contenant les routes API avec commentaires JSDoc
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API E-commerce",
        version: "1.0.0",
        description: "Documentation de l'API pour la plateforme e-commerce",
        contact: {
          name: "Support",
          email: "support@example.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Serveur de développement",
        },
        {
          url: "https://ecommerce-production.example.com",
          description: "Serveur de production",
        },
      ],
      tags: [
        {
          name: "Produits",
          description: "Opérations liées aux produits",
        },
        {
          name: "Catégories",
          description: "Opérations liées aux catégories",
        },
        {
          name: "Utilisateurs",
          description: "Opérations liées aux utilisateurs",
        },
        {
          name: "Authentification",
          description: "Opérations liées à l'authentification",
        },
      ],
      components: {
        schemas: {
          Product: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "ID unique du produit",
              },
              name: {
                type: "string",
                description: "Nom du produit",
              },
              slug: {
                type: "string",
                description: "Slug du produit pour les URL",
              },
              description: {
                type: "string",
                description: "Description du produit",
              },
              price: {
                type: "number",
                format: "float",
                description: "Prix du produit",
              },
              comparePrice: {
                type: "number",
                format: "float",
                description: "Prix de comparaison (ancien prix)",
                nullable: true,
              },
              categoryId: {
                type: "integer",
                description: "ID de la catégorie",
              },
              category: {
                $ref: "#/components/schemas/Category",
                description: "Catégorie du produit",
              },
              sku: {
                type: "string",
                description: "Code SKU du produit",
                nullable: true,
              },
              inventory: {
                type: "integer",
                description: "Quantité en stock",
                default: 0,
              },
              isVisible: {
                type: "boolean",
                description: "Visibilité du produit",
                default: true,
              },
              isNew: {
                type: "boolean",
                description: "Indique si le produit est nouveau",
                default: false,
              },
              isFeatured: {
                type: "boolean",
                description: "Indique si le produit est mis en avant",
                default: false,
              },
              images: {
                type: "array",
                description: "Images du produit",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      description: "ID de l'image",
                    },
                    url: {
                      type: "string",
                      description: "URL de l'image",
                    },
                    alt: {
                      type: "string",
                      description: "Texte alternatif de l'image",
                    },
                    position: {
                      type: "integer",
                      description: "Position de l'image dans la galerie",
                    },
                  },
                },
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Date de création",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description: "Date de dernière mise à jour",
              },
            },
            required: ["id", "name", "slug", "price", "categoryId"],
          },
          Category: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "ID unique de la catégorie",
              },
              name: {
                type: "string",
                description: "Nom de la catégorie",
              },
              slug: {
                type: "string",
                description: "Slug de la catégorie pour les URL",
              },
              description: {
                type: "string",
                description: "Description de la catégorie",
                nullable: true,
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Date de création",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description: "Date de dernière mise à jour",
              },
            },
            required: ["id", "name", "slug"],
          },
          User: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "ID unique de l'utilisateur",
              },
              email: {
                type: "string",
                format: "email",
                description: "Email de l'utilisateur",
              },
              firstName: {
                type: "string",
                description: "Prénom de l'utilisateur",
                nullable: true,
              },
              lastName: {
                type: "string",
                description: "Nom de famille de l'utilisateur",
                nullable: true,
              },
              role: {
                type: "string",
                enum: ["ADMIN", "CUSTOMER"],
                description: "Rôle de l'utilisateur",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Date de création",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description: "Date de dernière mise à jour",
              },
            },
            required: ["id", "email", "role"],
          },
          Error: {
            type: "object",
            properties: {
              error: {
                type: "string",
                description: "Message d'erreur",
              },
            },
            required: ["error"],
          },
        },
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "Entrez votre token JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  });
  return spec;
};
