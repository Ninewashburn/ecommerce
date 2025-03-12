---
description: Règles globales pour le projet e-commerce, définissant le style de code, les conventions de nommage et les meilleures pratiques à suivre.
globs: **/*
---

# Règles Globales pour le Projet E-commerce

## Style de Code et Structure

- Écrire du code TypeScript concis et technique avec des exemples précis.
- Utiliser des modèles de programmation fonctionnelle et déclarative; éviter les classes.
- Préférer l'itération et la modularisation à la duplication de code.
- Utiliser des noms de variables descriptifs avec des verbes auxiliaires (ex: isLoading, hasError).
- Structurer les fichiers: composant exporté, sous-composants, helpers, contenu statique, types.

## Conventions de Nommage

- Utiliser des minuscules avec des tirets pour les répertoires (ex: components/auth-wizard).
- Favoriser les exports nommés pour les composants.
- Utiliser PascalCase pour les noms de composants.
- Utiliser camelCase pour les variables, fonctions et méthodes.
- Préfixer les hooks personnalisés par "use" (ex: useCart, useProducts).

## Utilisation de TypeScript

- Utiliser TypeScript pour tout le code; préférer les interfaces aux types.
- Éviter les enums; utiliser des maps à la place.
- Utiliser des composants fonctionnels avec des interfaces TypeScript.
- Définir des types précis pour les props des composants.
- Éviter l'utilisation de "any" autant que possible.

## Syntaxe et Formatage

- Utiliser le mot-clé "function" pour les fonctions pures.
- Éviter les accolades inutiles dans les conditionnels; utiliser une syntaxe concise pour les instructions simples.
- Utiliser JSX déclaratif.
- Utiliser des fragments React (<>) plutôt que des div inutiles.

## UI et Styling

- Utiliser Shadcn UI, Radix, et Tailwind pour les composants et le styling.
- Implémenter un design responsive avec Tailwind CSS; utiliser une approche mobile-first.
- Éviter les styles inline; préférer les classes Tailwind ou les modules CSS.
- Maintenir une cohérence visuelle dans toute l'application.

## Optimisation des Performances

- Minimiser 'use client', 'useEffect', et 'setState'; favoriser les React Server Components (RSC).
- Envelopper les composants client dans Suspense avec fallback.
- Utiliser le chargement dynamique pour les composants non critiques.
- Optimiser les images: utiliser le format WebP, inclure les données de taille, implémenter le lazy loading.

## Spécificités Next.js

- Utiliser les Server Components par défaut pour améliorer les performances.
- N'utiliser les Client Components que lorsque l'interactivité est requise.
- Utiliser les API Routes pour les fonctions serverless.
- Implémenter des stratégies de mise en cache appropriées.
- Utiliser les fonctionnalités de Next.js pour l'optimisation des images et des polices.

## Gestion d'État

- Utiliser useState pour l'état spécifique aux composants.
- Utiliser useContext pour l'état global qui ne change pas souvent.
- Utiliser Zustand pour des besoins de gestion d'état plus complexes.
- Éviter de muter l'état directement; toujours utiliser les setters appropriés.

## Gestion des Erreurs

- Utiliser des blocs try...catch pour gérer les erreurs dans les opérations asynchrones.
- Créer des composants Error Boundary réutilisables.
- Implémenter une journalisation centralisée des erreurs.
- Utiliser error.tsx dans les segments de route pour gérer les erreurs spécifiques à cette route.

## Sécurité

- Valider toutes les entrées utilisateur côté serveur.
- Stocker les clés API et autres données sensibles dans des variables d'environnement.
- Utiliser des tokens CSRF pour protéger contre les attaques CSRF.
- Implémenter une authentification et une autorisation sécurisées.
- Sanitiser les entrées utilisateur pour prévenir les attaques XSS.

## Tests

- Écrire des tests unitaires pour les composants individuels.
- Écrire des tests d'intégration pour les interactions entre composants.
- Écrire des tests end-to-end pour les flux utilisateur critiques.
- Utiliser React Testing Library pour les tests de composants.
- Organiser les tests par fonctionnalité pour améliorer la maintenabilité.

## Documentation

- Documenter les composants avec des commentaires JSDoc.
- Maintenir un README à jour avec les instructions d'installation et d'utilisation.
- Documenter les API et les endpoints.
- Utiliser des noms de variables et de fonctions auto-documentés.

## Collaboration

- Suivre les conventions Git pour les messages de commit.
- Créer des pull requests descriptives avec des informations sur les changements.
- Effectuer des code reviews avant de merger.
- Maintenir une communication claire sur les changements apportés au codebase.
