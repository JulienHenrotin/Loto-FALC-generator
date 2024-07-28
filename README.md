# Loto PDF Generator

## Description

Ce projet TypeScript génère des cartons de loto aléatoires et les exporte au format PDF. Chaque numéro est représenté par une image correspondante, créant ainsi un visuel attrayant pour chaque carton de loto.

## Fonctionnalités

- Génération aléatoire de grilles de numéros de loto.
- Insertion de cases noires (vides) dans les grilles.
- Création de fichiers PDF contenant les grilles de loto avec les images des numéros.

## Prérequis

- Node.js
- TypeScript
- `pdf-lib` (pour la génération de PDF)
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

1. Placez vos images de numéros dans le dossier `pictures`. Chaque image doit être nommée en fonction du numéro qu'elle représente, par exemple `1.jpg`, `2.jpg`, ..., `90.jpg`.

2. Modifiez les paramètres dans le script principal si nécessaire (nombre de lignes, de colonnes, etc.) :

    ```typescript
    const rows = 3
    const cols = 5
    ```

3. Exécutez le script :

    ```bash
    npx ts-node src/index.ts
    ```

4. Le fichier PDF généré (`output.pdf`) sera enregistré dans le répertoire courant.
