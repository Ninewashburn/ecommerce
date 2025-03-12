# E-Commerce Moderne

![Logo](public/logo.png)

Une plateforme e-commerce complète et moderne construite avec Next.js 14, React, Tailwind CSS, Prisma et PostgreSQL. Cette application offre une expérience d'achat fluide pour les utilisateurs et une interface d'administration puissante pour les gestionnaires.

## 🌟 Caractéristiques

### Pour les clients

- 🛒 Expérience d'achat intuitive avec panier d'achat dynamique
- 💳 Processus de paiement simplifié (PayPal, Carte Bancaire)
- 👤 Gestion de compte utilisateur (commandes, adresses, informations personnelles)
- 📱 Design responsive pour une expérience optimale sur tous les appareils
- 🔍 Navigation et recherche de produits efficace
- 📧 Notifications par email (confirmation de commande)

### Pour les administrateurs

- 📊 Tableau de bord d'administration complet
- 📦 Gestion des produits (ajout, modification, suppression)
- 📝 Gestion des commandes avec mises à jour de statut
- 👥 Gestion des utilisateurs
- 📈 Statistiques et analyses des ventes
- 🗄️ Gestion des catégories de produits

## 🛠️ Technologies

- **Frontend** : Next.js 14, React, Tailwind CSS, Shadcn UI
- **Backend** : Next.js API Routes, Prisma
- **Base de données** : PostgreSQL
- **Authentification** : NextAuth.js
- **Paiement** : PayPal, Stripe (simulation)
- **Emails** : Resend, React Email
- **Déploiement** : Vercel (recommandé)

## 🏗️ Structure du projet

```
ecommerce/
├── app/                   # Routes et pages Next.js App Router
│   ├── admin/             # Dashboard administrateur
│   ├── api/               # API routes
│   ├── shop/              # Boutique en ligne
│   ├── account/           # Gestion de compte utilisateur
│   └── checkout/          # Processus de paiement
├── components/            # Composants React réutilisables
│   ├── ui/                # Composants UI génériques
│   ├── admin/             # Composants pour le dashboard admin
│   ├── shop/              # Composants pour la boutique
│   ├── cart/              # Composants pour le panier
│   ├── emails/            # Templates d'emails
│   └── payment/           # Composants de paiement
├── lib/                   # Bibliothèques et utilitaires
├── prisma/                # Schéma et migrations Prisma
├── public/                # Fichiers statiques
└── styles/                # Styles globaux
```

## 🚀 Installation

### Prérequis

- Node.js 18+ et npm
- PostgreSQL
- Compte Resend pour les emails
- Comptes PayPal et/ou Stripe (pour les paiements)

### Étapes d'installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/votre-username/ecommerce.git
   cd ecommerce
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configuration des variables d'environnement**
   Copier le fichier `.env.example` vers `.env.local` et compléter les variables:

   ```bash
   cp .env.example .env.local
   ```

4. **Configurer la base de données**

   ```bash
   npx prisma migrate dev
   ```

5. **Démarrer le serveur de développement**

   ```bash
   npm run dev
   ```

6. **Accéder à l'application**
   Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 👩‍💻 Utilisation

### Interface client

- Parcourir la boutique : `/shop`
- Voir les détails d'un produit : `/shop/[product-slug]`
- Panier d'achat : accessible depuis n'importe quelle page
- Finaliser une commande : `/checkout`
- Gestion du compte : `/account`

### Interface administrateur

- Tableau de bord : `/admin`
- Gestion des produits : `/admin/products`
- Gestion des commandes : `/admin/orders`
- Gestion des utilisateurs : `/admin/users`
- Statistiques : `/admin/dashboard`

### Comptes de test

- **Admin** : admin@example.com / password123
- **Client** : user@example.com / password123

## 📧 Fonctionnalité d'emails

L'application utilise Resend et React Email pour envoyer des emails transactionnels:

- Confirmation de commande
- Notifications de changement de statut
- Récupération de mot de passe

Pour tester les emails, visitez `/email-preview`.

## 🧪 Tests

```bash
# Exécuter les tests unitaires
npm run test

# Exécuter les tests d'intégration
npm run test:integration

# Exécuter les tests e2e
npm run test:e2e
```

## 🔄 Déploiement

Pour un déploiement optimisé sur Vercel:

```bash
npm run build
vercel deploy --prod
```

## 📚 Documentation additionnelle

- [Guide administrateur](docs/admin-guide.md)
- [Guide de développement](docs/dev-guide.md)
- [API Documentation](docs/api-docs.md)

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

1. Forker le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add some amazing feature'`)
4. Push à la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à nous contacter à [votre-email@exemple.com](mailto:votre-email@exemple.com).

---

Développé avec ❤️ par [Votre Nom]
