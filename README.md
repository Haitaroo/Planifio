# Planifio - Application de Gestion de Budget Personnalisée

## Description

**Planifio** est une application de gestion de budget moderne et responsive, conçue pour aider les utilisateurs à suivre leurs dépenses, créer des budgets personnalisés et visualiser leurs données financières.

## Fonctionnalités Principales

### Interface Utilisateur
- Utilisation de **React** avec **Material-UI** pour une interface utilisateur moderne.
- **Framer Motion** pour des animations fluides et agréables.

### Authentification
- Intégration avec **Firebase** pour l'inscription, la connexion et la déconnexion des utilisateurs.

### Création de Budgets
- Création de plusieurs budgets, chacun ayant un nom, une limite de dépenses et une devise associée au pays sélectionné.

### Gestion des Dépenses
- Ajout de dépenses à chaque budget, avec un nom, un montant, une catégorie et une date.
- Calcul automatique des taxes en fonction du pays.

### Catégorisation
- Les dépenses peuvent être catégorisées pour un suivi plus efficace.
- Possibilité d'ajouter de nouvelles catégories.

### Visualisation des Données
- Graphique circulaire pour visualiser la répartition des dépenses par catégorie.
- Historique détaillé des dépenses sous forme de tableau.

### Suivi du Budget
- Calcul et affichage du budget restant.
- Barre de progression colorée pour indiquer visuellement l'état du budget.

### Persistance des Données
- Stockage des données dans l'URL pour permettre le partage et la sauvegarde.

### Importation/Exportation
- Exportation des données de budget au format JSON.
- Importation de budgets à partir de fichiers JSON.

### Identifiants Uniques
- Chaque budget a un identifiant unique généré à partir de ses données.

### Multi-devises
- Support des devises multiples (USD, GBP, CAD, EUR) selon le pays sélectionné.

### Responsive Design
- L'application s'adapte à toutes les tailles d'écran (desktop et mobile).

## Technologies Utilisées
- **React**
- **Material-UI**
- **Framer Motion**
- **Recharts**

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/Haitaroo/Planifio.git
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Démarrez l'application en mode développement :
   ```bash
   npm run dev
   ```

## Déploiement

Pour déployer l'application sur GitHub Pages, utilisez les commandes suivantes :
   ```bash
   npm run build
   npm run deploy
   ```

## Contribuer

Les contributions sont les bienvenues ! Ouvrez une issue ou soumettez une pull request.

## Licence

Ce projet est sous licence MIT.
