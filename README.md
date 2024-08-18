# Loto PDF Generator

## Description

Ce projet TypeScript génère des cartons de loto aléatoires et les exporte au format PDF. Chaque numéro est représenté par une image correspondante, créant ainsi un visuel attrayant pour chaque carton de loto. Le projet inclut une barre de progression pour suivre l'avancement de la génération des fichiers PDF, ainsi qu'une mesure du temps total d'exécution.

## Fonctionnalités

- Génération aléatoire de grilles de numéros de loto.
- Insertion de cases noires (vides) dans les grilles.
- Création de fichiers PDF contenant les grilles de loto avec les images des numéros.
- Barre de progression affichée pendant la génération du PDF.
- Log du temps total d'exécution avec un message personnalisé en français.

## Prérequis

- Node.js
- TypeScript
- `pdf-lib` (pour la génération de PDF)
- `cli-progress` (pour la barre de progression)
- `ansi-colors` (pour les logs colorés dans la console)
- Des images représentant les numéros de 1 à 90, stockées dans un dossier `pictures`.

## Installation

1. Clonez le dépôt :

    ```bash
    git clone https://github.com/votre-utilisateur/loto-pdf-generator.git
    cd loto-pdf-generator
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

## Utilisation

1. Placez vos images de numéros dans le dossier `pictures`. Chaque image doit être nommée en fonction du numéro qu'elle représente, par exemple `1.png`, `2.png`, ..., `90.png`.

2. Modifiez les paramètres dans le script principal si nécessaire (nombre de lignes, de colonnes, etc.) :

    ```typescript
    const rows = 3
    const cols = 5
    ```

3. Exécutez le script :

    ```bash
    npx ts-node src/index.ts
    ```

4. Suivez la progression dans la console, y compris le pourcentage d'avancement de la génération des grilles dans le PDF et le temps total d'exécution à la fin du processus.

5. Le fichier PDF généré (`output.pdf`) sera enregistré dans le répertoire courant. Les grilles utilisées seront également enregistrées dans un fichier JSON (`grids.json`).

## Dépendances

- `pdf-lib` : Pour la création et la manipulation des fichiers PDF.
- `cli-progress` : Pour afficher la barre de progression pendant la génération des grilles dans le PDF.
- `ansi-colors` : Pour ajouter des couleurs aux logs dans la console.
- `ts-node` : Pour exécuter les fichiers TypeScript sans les compiler au préalable.
- `@antfu/eslint-config` : Configuration ESLint pour assurer la qualité du code.

## Journal des modifications récentes

- **Ajout d'une barre de progression** : Suivez la progression de la génération des grilles de loto dans le PDF.
- **Mesure du temps d'exécution** : Le script logge le temps total d'exécution depuis la saisie de l'utilisateur jusqu'à la fin du processus.
- **Personnalisation des logs** : Utilisation de `ansi-colors` pour des messages colorés dans la console.
- **Enregistrement des grilles** : Les grilles générées sont également sauvegardées dans un fichier JSON.
