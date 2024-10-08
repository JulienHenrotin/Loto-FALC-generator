import { rgb, RGB } from 'pdf-lib'

// * Types de données définissant une couleur initiale
type Couleur = {
  name: string, // * Nom de la couleur
  couleurText: string, // * Couleur du texte en format hexadécimal
  couleurBGprimary: string, // * Couleur de fond principale en format hexadécimal
  couleurBGsecondary: string, // * Couleur de fond secondaire en format hexadécimal
  couleurBorder: string // * Couleur de la bordure en format hexadécimal
}

// * Types de données définissant une couleur convertie au format RGB
type CouleurPdfLib = {
  name: string, // * Nom de la couleur
  couleurText: RGB, // * Couleur du texte en format RGB
  couleurBGprimary: RGB, // * Couleur de fond principale en format RGB
  couleurBGsecondary: RGB, // * Couleur de fond secondaire en format RGB
  couleurBorder: RGB // * Couleur de la bordure en format RGB
}

// ! Définition du tableau de couleurs initiales
// TODO: Ajouter ou modifier les couleurs en fonction des besoins
const tableau: Couleur[] = [
  {
    name: 'Rose Pale',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#f7d3e3',
    couleurBorder: '#b8a7a1'
  },
  {
    name: 'Vert Clair',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#b7e4c7',
    couleurBorder: '#a89c8f'
  },
  {
    name: 'Turquoise',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#a8dadc',
    couleurBorder: '#b4a7d6'
  },
  {
    name: 'Beige Pale',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#f8edeb',
    couleurBorder: '#b0a1ba'
  },
  {
    name: 'Jaune Pale',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#ffedcc',
    couleurBorder: '#a5a58d'
  },
  {
    name: 'Orange Pale',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#ffd6a5',
    couleurBorder: '#b3b3b3'
  },
  {
    name: 'Vert Menthe',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#c8e7e4',
    couleurBorder: '#9a9a9a'
  },
  {
    name: 'Rose Pastel',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#ffcbf2',
    couleurBorder: '#a8a8c4'
  },
  {
    name: 'Jaune Pastel',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#faedcd',
    couleurBorder: '#b0b0aa'
  },
  {
    name: 'Vert Pomme',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#b9fbc0',
    couleurBorder: '#a2a2a2'
  },
  {
    name: 'Turquoise Foncé',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#8DB9B9',
    couleurBorder: '#161414'
  },
  {
    name: 'Vert Clair 2',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#c5ebc3',
    couleurBorder: '#161414'
  },
  {
    name: 'Beige Foncé',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#e1ca96',
    couleurBorder: '#161414'
  },
  {
    name: 'Gris Clair',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#e4e4e4',
    couleurBorder: '#161414'
  },
  {
    name: 'Gris Foncé',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#716f6f',
    couleurBorder: '#161414'
  }
]

// * Fonction pour convertir une couleur hexadécimale en format RGB utilisable par pdf-lib
export function hexToPdfLibRgb(hex: string): RGB {
  // ? Vérifier que le format est correct (# suivi de 6 caractères hexadécimaux)
  if (!/^#([0-9A-Fa-f]{6})$/.test(hex)) {
    throw new Error('Format de couleur hexadécimale invalide. Utilisez un format comme #RRGGBB.')
  }

  const r = parseInt(hex.slice(1, 3), 16) / 255 // * Extraire la valeur rouge
  const g = parseInt(hex.slice(3, 5), 16) / 255 // * Extraire la valeur verte
  const b = parseInt(hex.slice(5, 7), 16) / 255 // * Extraire la valeur bleue
  return rgb(r, g, b) // * Retourner l'objet RGB
}

// ! Conversion du tableau initial en un tableau compatible avec pdf-lib
const tableauPdfLib: CouleurPdfLib[] = tableau.map(objet => ({
  ...objet,
  couleurText: hexToPdfLibRgb(objet.couleurText), // * Conversion de couleurText en RGB
  couleurBGprimary: hexToPdfLibRgb(objet.couleurBGprimary), // * Conversion de couleurBGprimary en RGB
  couleurBGsecondary: hexToPdfLibRgb(objet.couleurBGsecondary), // * Conversion de couleurBGsecondary en RGB
  couleurBorder: hexToPdfLibRgb(objet.couleurBorder) // * Conversion de couleurBorder en RGB
}))

// * Fonction pour obtenir un objet aléatoire du tableau de couleurs converties
// ? Utilisation de Math.random pour sélectionner un index aléatoire
export function getRandomObject(): CouleurPdfLib {
  const randomIndex = Math.floor(Math.random() * tableau.length) // * Calculer un index aléatoire
  return tableauPdfLib[randomIndex] // * Retourner l'objet aléatoire correspondant
}